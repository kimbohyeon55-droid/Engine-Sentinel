# Error analysis

V3.18 reaches recall 0.9993 with specificity 0.0128: mean normal false-positive rate 98.72%. Nine of ten runs have a false first alarm. This is an operational rejection, not a near-perfect model. Latched CUSUM and potentially abnormal commissioning are plausible contributors.

V3.16 robust-z has six false-event runs out of nine; empirical percentiles have nine out of nine. V3.8 misses 6,400 abnormal rows despite high AUROC. Ranking and threshold transfer differ.

V3.4 has three zero-recall classes under six-class grouped evaluation. Known-class success cannot replace this result. See [evidence and conditions](EXPERIMENT_REPORT.md).
