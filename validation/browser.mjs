import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import { preview } from 'vite';
const server=process.env.PORTFOLIO_URL?null:await preview({preview:{host:'127.0.0.1',port:4175,strictPort:true}});
const base=process.env.PORTFOLIO_URL??'http://127.0.0.1:4175/';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];const errors=[];const requests=[];
fs.mkdirSync('.local',{recursive:true});
try{
 for(const [name,width,height] of [['desktop',1440,1050],['tablet',820,1180],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height}});
  const page=await context.newPage();
  page.setDefaultTimeout(15000);
  page.on('pageerror',e=>errors.push(String(e)));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  page.on('request',r=>{if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))requests.push(r.url())});
  await page.goto(base);
  for(const section of ['Overview','Model experiments','Performance analysis','Failure analysis','Methodology','Limitations']){
   console.log(`${name}: ${section}`);
   await page.getByRole('button',{name:new RegExp(section,'i')}).first().click();
   await page.locator('h1').waitFor();
   if(section==='Model experiments'){
    await page.getByLabel('Inspect experiment').selectOption('3');
    await page.getByRole('heading',{name:'V3.18 · Regime residual + latched CUSUM'}).waitFor();
   }
   if(section==='Performance analysis')await page.getByLabel('Metric',{exact:true}).selectOption('specificity');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth);
   const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   results.push({viewport:name,section,overflow,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)}))});
   if(section==='Overview'){
    await page.locator('main').focus();await page.evaluate(()=>window.scrollTo(0,0));
    await page.screenshot({path:`.local/${name}.png`,fullPage:true});
   }
  }
  for(const link of ['reports/EXPERIMENT_REPORT.md','docs/PUBLICATION_SCOPE.md']){
   const response=await page.request.get(new URL(link,base).href);
   if(response.status()!==200||!(await response.text()).startsWith('# '))errors.push(`Broken static doc: ${link}`);
  }
  await page.goto(base);await page.getByRole('link',{name:'Skip to content'}).focus();
  if(await page.evaluate(()=>document.activeElement?.textContent)!=='Skip to content')errors.push('Skip link focus missing');
  await page.keyboard.press('Enter');
  if(await page.evaluate(()=>document.activeElement?.id)!=='main')errors.push('Skip link target missing');
  await context.close();
 }
}finally{await browser.close();server?.httpServer.closeAllConnections();await new Promise(resolve=>server?server.httpServer.close(resolve):resolve())}
const pass=!errors.length&&!requests.length&&results.every(r=>!r.overflow&&!r.violations.length);
fs.writeFileSync('.local/browser-results.json',JSON.stringify({status:pass?'PASS':'FAIL',results,errors,externalRequests:requests},null,2));
console.log(JSON.stringify({status:pass?'PASS':'FAIL',screens:results.length,errors,externalRequests:requests,failures:results.filter(r=>r.overflow||r.violations.length)},null,2));
if(!pass)process.exitCode=1;
