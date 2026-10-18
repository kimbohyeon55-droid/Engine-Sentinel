# Model comparison

| Experiment | Recall | Specificity | Precision | Binary F1 | AUROC | Aggregation |
|---|---:|---:|---:|---:|---:|---|
| V3.8 | 0.8111 | 0.7883 | 0.8939 | 0.8505 | 0.9920 | Pooled row metrics; AUROC median across 9 outer runs |
| V3.16 ROBUST_Z | 0.8858 | 0.7179 | 0.8960 | 0.8739 | Not available | Unweighted mean of outer-run metrics |
| V3.16 EMPIRICAL_PERCENTILE | 0.9941 | 0.4988 | 0.8101 | 0.8887 | Not available | Unweighted mean of outer-run metrics |
| V3.18 | 0.9993 | 0.0128 | 0.7140 | 0.8242 | Not available | Run means; undefined values omitted (specificity: 9 of 10 runs) |

No cross-version winner is inferred. V3.8 pooled metrics and V3.16/V3.18 run means use different populations and commissioning policies. See [full conditions](EXPERIMENT_REPORT.md#7-experimental-setup).
