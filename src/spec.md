# Specification

## Summary
**Goal:** Ensure the app works correctly on both custom domains (root) and subpath deployments, including routing, PWA install behavior, and Internet Identity compatibility.

**Planned changes:**
- Update frontend routing and internal links so navigation and static asset URLs work when the app is hosted under a non-root base path (no hardcoded `href="/"`/root-based paths that break subpath hosting).
- Adjust PWA metadata and references (index HTML + web manifest) to avoid root-dependent URLs so the manifest, icons, and `start_url` resolve correctly for both hosting modes.
- Add a `.well-known` static configuration file required for Internet Identity custom-domain/origin support, served from the frontend at the expected path.
- Add a short repository documentation guide describing how to connect a custom domain, including DNS records, required `.well-known` configuration for Internet Identity, verification steps, and basic troubleshooting.

**User-visible outcome:** The app can be served from either a custom domain root or a subpath without broken navigation/assets, can be installed as a PWA that launches to the correct URL, and continues to support Internet Identity login (including on custom domains with the required well-known configuration).
