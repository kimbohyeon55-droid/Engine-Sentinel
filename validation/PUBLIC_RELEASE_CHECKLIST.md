# Public release checklist

## Completed

- [x] Separate publication directory; original project untouched within recorded metadata checks.
- [x] Whitelisted aggregates only; raw data, record predictions, weights and conversations excluded.
- [x] Requested V3.8/V3.16/V3.18 values checked; failed targets and incompatible protocols disclosed.
- [x] Type check, build, 18 browser views, basic accessibility and local links passed.
- [x] Common-secret scan and dependency audit passed; see [executed checks](TEST_RESULTS.md).
- [x] Dependency licenses inventoried; original license left undecided.
- [x] Existing local Git history checked: zero commits; no original history will be uploaded.
- [x] Exact candidate allowlist and SHA-256 manifest generated.

## Owner decisions before publication

- [ ] Confirm authority to publish these aggregates, including competition restrictions.
- [ ] Choose a license, or explicitly publish with no license grant.
- [ ] Confirm target repository accessibility/creation and approve the exact candidate files.
- [ ] Separately approve any GitHub Pages deployment.

Target lookup: `kimbohyeon55-droid/Engine-Sentinel` did not resolve under current authentication. This does not prove that no private repository exists. No public repository was created, no visibility changed, and no files were uploaded.

Upload only the paths in `RELEASE_FILES.txt`. Never add the parent workspace wholesale. `SHA256SUMS.txt` hashes every candidate file except itself; its own hash is kept in the private release audit to avoid self-reference.
