# Engine-Sentinel

**Marine-engine AI research, with the evidence and the limitations in view.**

A static research portfolio by **Bohyeon Kim**. Explore anomaly detection, calibration and fault-classification experiments through verified aggregate metrics. This is a presentation of development evidence, not a deployed diagnostic product.

## What this project shows

- Six research views: overview, experiments, performance, failures, methodology and limitations.
- Accessible charts and a verified aggregate confusion matrix.
- Clear separation of ranking metrics, alarm thresholds, averaging and evaluation populations.
- Failure reporting: V3.18 recall 0.9993 comes with specificity 0.0128 and a 90% false-event rate.
- No datasets, inference service, trained models, login or external paid APIs.

## Performance, with context

V3.8: run-median AUROC **0.9920** (minimum **0.9253**); pooled recall **0.8111**, specificity **0.7883**, nine eligible development runs. V3.16 robust-z: mean run recall **0.8858**, specificity **0.7179**. V3.18: mean run recall **0.9993**, specificity **0.0128**, ten runs; operationally rejected. These protocols are **not directly comparable**. No independent field performance is claimed.

V3.4 six-class macro F1 **0.186041** and known-three-class macro F1 **0.561131** refer to different tasks. Later V4 experiments exist; this curated portfolio does not claim an exhaustive review or the latest champion.

## Stack and architecture

Public: React, TypeScript, Vite and CSS; aggregate JSON → static UI. Original private research: Python, NumPy/pandas, scikit-learn, PyTorch, LightGBM/XGBoost; original minimal application: static HTML + FastAPI. Public code does not load the private backend. See [architecture](docs/ARCHITECTURE.md).

## Run locally

```sh
npm ci
npm run validate
npm run build
npm run dev
```

Node.js 24 was used for validation. The dashboard is served locally; `npm run preview` previews the production build. Relative asset paths support static subpath hosting, subject to separately approved deployment.

## Reports

- [Experiment report and evidence](reports/EXPERIMENT_REPORT.md)
- [Model comparison](reports/MODEL_COMPARISON.md)
- [Error analysis](reports/ERROR_ANALYSIS.md)
- [Limitations](reports/LIMITATIONS.md)
- [Release checklist](validation/PUBLIC_RELEASE_CHECKLIST.md)

## Scope, security and authorship

Only aggregate metrics are included. No record-level predictions, raw/validation/test data, credentials, checkpoints or private reports are published. Training cannot be reproduced from this presentation-only package. Source hashes identify private evidence; original sources are intentionally not downloadable. See [publication scope](docs/PUBLICATION_SCOPE.md).

Owner and contributor: **Bohyeon Kim**. AI tools assisted implementation, experimentation, audits and writing; [AI assistance disclosure](docs/AI_ASSISTANCE.md) explains the limits of attribution. No open-source license is automatically granted; the owner has not chosen one. Public release and Pages deployment are pending separate approvals.
