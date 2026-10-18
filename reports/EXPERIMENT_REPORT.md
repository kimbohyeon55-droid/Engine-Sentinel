# Engine-Sentinel — Experiment Report

## 1. Executive Summary

This is a research evidence portfolio, not a deployed diagnostic system. Local saved summaries and aggregate run tables were inspected on 2026-10-18. No training, inference, historical held-out evaluation or raw-data access was performed for this publication preparation. The requested V3.8, V3.16 and V3.18 reference numbers are confirmed against local aggregate records; independent experimental reproduction is not claimed.

## 2. Project Background

Engine-Sentinel investigates marine-engine fault classification and anomaly alarms under changes in operating load and experimental run. Owner: Bohyeon Kim. The original minimal interface is static HTML with a read-only FastAPI backend. This separate React/TypeScript/Vite presentation contains only aggregate evidence and authored analysis.

## 3. Problem Definition

Recognizing faults within one trajectory is easier than producing reliable alarms on a new run. The study separates six-class classification, known-three-class classification, binary row detection, and first-event alarm quality. These are different tasks and must not share a leaderboard.

## 4. System Architecture

Private research: measured sensors → run-aware preprocessing → grouped training/calibration → out-of-fold predictions → aggregate metrics. Public presentation: reviewed aggregate JSON → React components and accessible charts → static browser. There is no model inference, backend connection, database, login or dataset download in the public package.

## 5. AI/ML Methodology

Inspected research code includes LogisticRegression, RandomForest/ExtraTrees/HistGradientBoosting experiments, LightGBM/XGBoost controls, residual features, causal TCN experiments and multi-source pretraining. V3.4 used source-specific adapters with a shared residual encoder and a causal target TCN; the strict six-class primary remained a classical KNN-reference residual/window LogisticRegression. Its secondary known-class ensemble combined a frozen pretrained TCN with LightGBM and XGBoost. These trained models are not included here.

V3.8 uses run-relative residual anomaly scoring and nested leave-one-run-out configuration/threshold selection. V3.16 recalibrates frozen V3.8 scores with robust-z or empirical percentiles. V3.18 uses nearest commissioning regimes, robust residuals and a leaky, latched CUSUM. An anomaly score is not a calibrated failure probability.

## 6. Dataset Overview

Earlier verified project records describe 114,770 measured rows, including a separate reference collection, with 58,926 development scenario rows and 30,542 historical held-out rows. The historical split was reused during V2 selection and is not an independent new benchmark. Later experiments declare development-only use. V3.4 strict evaluation contains 5,765 sequence endpoints, not independent physical trials. V3.8 evaluates 49,284 rows across nine eligible runs; one injector scenario is excluded for lack of a normal commissioning baseline. V3.18 includes ten runs. External pretraining sources are discussed only as provenance; no datasets are distributed.

## 7. Experimental Setup

### V3.8

Model: Nested run-adaptive residual scoring. Evaluation: 9 eligible development runs; one cold-start run excluded. Evaluation rows: 49284. Runs/folds: 9. Independent training repetitions / seed distribution: Not verified. Aggregation: Pooled row metrics; AUROC median across 9 outer runs. Threshold/configuration: Inner-run selection: 80 calibration/smoothing/top-fraction configurations; outer thresholds 5.6064–10.9914. Decision: Target not met. High within-run ranking does not establish a transferable alarm threshold. Event detection allows earlier false alarms; not comparable to clean-event metrics.

Evidence: `results/v38/V38_SUMMARY.json` (relative to private source root, not distributed).

### V3.16 ROBUST_Z

Model: Run-relative robust z. Evaluation: 9 eligible development runs; frozen V3.8 scores. Evaluation rows: Not available in reviewed aggregate files. Runs/folds: 9. Independent training repetitions / seed distribution: Not verified. Aggregation: Unweighted mean of outer-run metrics. Threshold/configuration: 1500 s commissioning; inner-run threshold selection; robust-z grid 0–12, step 0.25. Decision: Target not met. Commissioning eligibility checks normal labels. Reuses nested V3.8 scores; end-to-end nested independence not established by this summary.

Evidence: `results/v316/V316_SUMMARY.json + V316_OUTER_RESULTS.csv` (relative to private source root, not distributed).

### V3.16 EMPIRICAL_PERCENTILE

Model: Run-relative empirical percentile. Evaluation: 9 eligible development runs; frozen V3.8 scores. Evaluation rows: Not available in reviewed aggregate files. Runs/folds: 9. Independent training repetitions / seed distribution: Not verified. Aggregation: Unweighted mean of outer-run metrics. Threshold/configuration: 1500 s commissioning; empirical percentile grid 0.90–0.999. Decision: Target not met. Commissioning eligibility checks normal labels. Reuses nested V3.8 scores; end-to-end nested independence not established by this summary.

Evidence: `results/v316/V316_SUMMARY.json + V316_OUTER_RESULTS.csv` (relative to private source root, not distributed).

### V3.18

Model: Regime residual + latched CUSUM. Evaluation: 10 development runs, including cold-start scenario. Evaluation rows: Not available in reviewed aggregate files. Runs/folds: 10. Independent training repetitions / seed distribution: Not verified. Aggregation: Run means; undefined values omitted (specificity: 9 of 10 runs). Threshold/configuration: 450 s commissioning; nearest 3 regimes; local weight .5; 30 s smoothing; CUSUM k=.25, h=8, decay=.98. Decision: Rejected for operational use. Recall is near 1, but normal false-positive rate is 98.72%. A latched alarm causes persistent alarms after an early crossing. Commissioning is not guaranteed normal.

Evidence: `results/v318/V318_SUMMARY.json` (relative to private source root, not distributed).

## 8. Evaluation Metrics

Recall = TP/(TP+FN), specificity = TN/(TN+FP), precision = TP/(TP+FP), binary F1 = 2TP/(2TP+FP+FN). AUROC evaluates score ranking, not a chosen operating point. V3.8 AUROC is a median across runs, while its displayed threshold metrics are pooled across rows. V3.16 and V3.18 use means of per-run metrics. V3.18 omits undefined metrics: specificity uses nine runs with normal samples out of ten total. V3.16 row metrics include all finite frozen scores, including commissioning samples; its event audit suppresses commissioning alarms. V3.18 row metrics exclude the first 450 seconds. These evaluation windows further prevent direct comparisons. False-event rate counts runs whose first alarm precedes fault onset; it is not the row false-positive rate. Confidence intervals and repeated-seed uncertainty: Not verified. Precision–recall curves: Not available in the reviewed aggregates; no synthetic curve is drawn.

## 9. Experimental Results

<!-- METRICS:START -->
| Experiment | Recall | Specificity | Precision | Binary F1 | AUROC | Aggregation |
|---|---:|---:|---:|---:|---:|---|
| V3.8 | 0.8111 | 0.7883 | 0.8939 | 0.8505 | 0.9920 | Pooled row metrics; AUROC median across 9 outer runs |
| V3.16 ROBUST_Z | 0.8858 | 0.7179 | 0.8960 | 0.8739 | Not available | Unweighted mean of outer-run metrics |
| V3.16 EMPIRICAL_PERCENTILE | 0.9941 | 0.4988 | 0.8101 | 0.8887 | Not available | Unweighted mean of outer-run metrics |
| V3.18 | 0.9993 | 0.0128 | 0.7140 | 0.8242 | Not available | Run means; undefined values omitted (specificity: 9 of 10 runs) |
<!-- METRICS:END -->

V3.8 AUROC median 0.9920; minimum 0.9253. Pooled confusion counts: TN=12,143; FP=3,261; FN=6,400; TP=27,480. Rows=49,284. Counts were independently summed from the outer_results entries in the saved summary and agree with its overall counts; the separate V3.8 run table also matches recall/specificity.

## 10. Model Comparison

Compare V3.16 methods within their shared frozen-score protocol. Across versions, charts show operating profiles, not causal performance gains: commissioning periods, eligible runs, score pipelines and averaging differ. V3.4 six-class macro F1 0.186041 and known-three-class macro F1 0.561131 are separate tasks; three strict classes have zero recall. V4.9A also exists: saved-summary recall 0.587694, specificity 0.920451; its full protocol is outside this curated audit. This portfolio does not claim that V3.18 is the latest experiment or that all later experiments were independently verified.

## 11. Error Analysis

V3.18 mean specificity 0.012775 implies a mean normal false-positive fraction 0.987225. Its false-event rate is 0.9 (9 of 10 runs), and clean-event rate is 0.1. Near-perfect recall is therefore not operational success. CUSUM latching is a plausible contributing mechanism confirmed in code, not an isolated causal attribution. V3.16 robust-z false-event rate is 0.6667 (6 of 9); empirical-percentile false-event rate is 1.0. V3.8 pooled missed abnormal rows total 6,400. Cold-start exclusion changes the population and must remain visible.

## 12. Robustness & Generalization

Few independent runs, load/run shifts, variable fault severity and unrepresented classes limit generalization. Nested development evaluation reduces direct selection leakage but repeated research on the same development set remains optimistic. V3.16 consumes V3.8 OOF scores, so its second-stage threshold selection is not established as fully nested end-to-end. Its eligibility check uses normal labels for the commissioning interval. V3.18 uses an unlabeled commissioning period that may already contain a fault. No claim of independent vessel, fleet, unseen engine or prospective field validation is justified.

## 13. Reproducibility

The public package reproduces the presentation and arithmetic checks, not training. Install with `npm ci`, run `npm run validate`, `npm run build`, and `npm run dev`. The lockfile fixes frontend dependencies. The canonical aggregate JSON powers the dashboard and report consistency tests. Source aggregate hashes below permit private-owner provenance checking without publishing source logs. One saved evaluation per protocol was reviewed; independent reruns, seed means, standard deviations and hardware equivalence are Not verified for these versions.

## 14. Limitations

Not production-ready, not a certified safety system, not a fleet benchmark. No raw data, per-record predictions, models or internal reports are distributed. No public inference API exists. Dataset licensing does not establish competition disclosure permission. Original competition rules and third-party publication consent are Not verified. No license is assigned to this authored package pending the owner's decision.

## 15. Future Improvements

Collect independent repeated fault-by-load runs and an untouched prospective evaluation cohort. Rebuild end-to-end nested calibration. Establish safe commissioning eligibility without oracle labels. Evaluate hysteresis/reset and alarm persistence with predeclared false-event and delay budgets. Report uncertainty by independent run, not by correlated row. Test cost-sensitive thresholds on inner data only.

## 16. Conclusion

The evidence supports a portfolio about evaluation discipline and failure analysis. High ranking quality and recall alone did not produce reliable deployment alarms. Operational readiness remains unproven.

## 17. Evidence & Verification Notes

Paths below identify private local records relative to the original project root; they are provenance identifiers, not public download links. Only newly authored text and manually whitelisted aggregate fields are published. Full private reports, conversations and record predictions are excluded. A saved aggregate match is distinct from a fresh model rerun.

- `results/v38/V38_SUMMARY.json` — SHA-256 `74804b4b1a973c7d97da0d776389508bf28ad401a9d125923dee771c7b3ecdef`; Verified against saved aggregate; training not rerun.
- `results/v316/V316_SUMMARY.json` — SHA-256 `a64df85ccc92cfbd30bab278346742cd47f99e4e81f2f6367780f62d01fc9e03`; Verified against saved aggregate; training not rerun.
- `results/v318/V318_SUMMARY.json` — SHA-256 `2511a9241d4603e525e1ff0989ca22eebc6e32f780c51e7f2e7abe86c1d58f47`; Verified against saved aggregate; training not rerun.
- `results/v34/submission_metrics.json` — SHA-256 `77a1ad07d8df2dd7ce795a60c788153a9a8cdb0f8cd849f66a66bf2f946dbb7a`; Verified against saved aggregate; training not rerun.
- `results/v49a/V49A_SUMMARY.json` — SHA-256 `d09da25a3d343c4a6a71a49ada2224eabbb64a5c92ee57521ae26238fa62c26a`; Verified against saved aggregate; training not rerun.
- `results/v316/V316_OUTER_RESULTS.csv` — SHA-256 `d284a1285d9d06e8b1d98b93cc574a9c75bb7fa458189c4129ae8959a4fd101d`; Aggregate run metrics only; no record predictions read.
- `results/v318/V318_OUTER_RESULTS.csv` — SHA-256 `059fe6f3e8a801bd1dd8c35c71e76128307da0998dc8c96938ba2fc678029b2b`; Aggregate run metrics only; no record predictions read.
- `results/v38/V38_OUTER_RUN_RESULTS.csv` — SHA-256 `1a90a3903d07538dc89cbb859a68141a878964a9af6c67b00ba51888bd932be6`; Aggregate run metrics only; no record predictions read.
