# Architecture

```mermaid
flowchart LR
 A[Private grouped research pipeline] --> B[Reviewed aggregate statistics]
 B --> C[Whitelisted evidence JSON]
 C --> D[Static React dashboard]
 C --> E[Authored technical report]
```

The original application uses static HTML and FastAPI read-only /health, /results and /leakage endpoints. The public application has no runtime dependency on it. No model, sensor record, external image or external API is shipped.
