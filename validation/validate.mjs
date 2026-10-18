import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const root=process.cwd();
const data=JSON.parse(fs.readFileSync('src/data/evidence.json','utf8'));
const report=fs.readFileSync('reports/EXPERIMENT_REPORT.md','utf8');
const comparison=fs.readFileSync('reports/MODEL_COMPARISON.md','utf8');
let checks=0;
function check(condition,message){assert.ok(condition,message);checks++;}
for(const x of data.experiments){
 for(const key of ['recall','specificity','precision','f1','auroc']){
  const v=x[key];check(v===null||Number.isFinite(v)&&v>=0&&v<=1,`${x.id} ${key}`);
 }
 const row='| '+x.id+' | '+['recall','specificity','precision','f1','auroc'].map(k=>x[k]===null?'Not available':x[k].toFixed(4)).join(' | ')+' | '+x.aggregation+' |';
 check(report.includes(row),`report mismatch: ${x.id}`);check(comparison.includes(row),`comparison mismatch: ${x.id}`);
}
const [[tn,fp],[fn,tp]]=data.confusion.matrix;
const baseline=data.experiments[0];
check(tn+fp+fn+tp===baseline.rows,'Confusion total');
for(const [key,v] of Object.entries({recall:tp/(tp+fn),specificity:tn/(tn+fp),precision:tp/(tp+fp),f1:2*tp/(2*tp+fp+fn)})) check(Math.abs(baseline[key]-v)<1e-12,`Confusion ${key}`);
const ignore=new Set(['node_modules','dist','.git','.local']);
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>ignore.has(e.name)?[]:e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const all=files(root);
const banned=/\.(csv|parquet|pt|pth|pkl|joblib|onnx|npy|npz|mat|zip|pem|key|p12)$/i;
// Deliberately constructed so the scanner's patterns are not mistaken for credentials.
const secrets=[new RegExp('gh'+'[pousr]_[A-Za-z0-9]{30,}'),new RegExp('AK'+'IA[A-Z0-9]{16}'),new RegExp('sk'+'-[A-Za-z0-9]{32,}'),new RegExp('-----BEGIN '+'(?:RSA |EC |OPENSSH )?PRIVATE KEY-----')];
for(const f of all){
 const rel=path.relative(root,f).replaceAll('\\','/');
 check(!banned.test(f)&&!path.basename(f).startsWith('.env'),`Forbidden file: ${rel}`);
 check(fs.statSync(f).size<2_000_000,`Unexpected large file: ${rel}`);
 const s=fs.readFileSync(f,'utf8');
 check(!secrets.some(r=>r.test(s)),`Secret pattern: ${rel}`);
 check(!/C:[\\/]Users[\\/]/i.test(s),`Personal absolute path: ${rel}`);
 if(f.endsWith('.md')) for(const match of s.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)){
  const target=match[1];if(/^(https?:|#|mailto:)/.test(target))continue;
  check(fs.existsSync(path.resolve(path.dirname(f),target.split('#')[0])),`Broken Markdown link: ${rel} → ${target}`);
 }
}
check(data.evidence.every(e=>/^[0-9a-f]{64}$/.test(e.sha256)),'Source evidence hashes');
if(fs.existsSync('validation/RELEASE_FILES.txt')){
 const allowed=fs.readFileSync('validation/RELEASE_FILES.txt','utf8').trim().split(/\r?\n/).sort();
 check(JSON.stringify(allowed)===JSON.stringify(all.map(f=>path.relative(root,f).replaceAll('\\','/')).sort()),'Release allowlist matches exact files');
 for(const line of fs.readFileSync('validation/SHA256SUMS.txt','utf8').trim().split(/\r?\n/)){
  const [digest,file]=line.split('  ');
  check(createHash('sha256').update(fs.readFileSync(file)).digest('hex')===digest,`Release hash: ${file}`);
 }
}
console.log(JSON.stringify({status:'PASS',checks,files:all.length,scope:'Aggregate arithmetic, report equality, local links, prohibited files, common secret patterns. Not exhaustive secret detection.'},null,2));
