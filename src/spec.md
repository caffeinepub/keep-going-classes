# Specification

## Summary
**Goal:** Build a responsive student portal for “Keep Going Classes” with clear navigation, publishable articles, admissions requests, and contact information, plus a mobile app-like installable experience.

**Planned changes:**
- Create a responsive site with header identity (“Keep Going Classes” + English tagline) and navigation: Home, Articles, Admissions, Contact.
- Home page describing academics + competitive exam preparation, with clear calls to action to Articles and Admissions.
- Articles feature: list and detail pages; backend APIs to list and fetch articles; persistent storage.
- Admin-only (Internet Identity) area to create, edit, publish/unpublish, and delete articles; backend-enforced admin authorization with a configurable admin principal list.
- Admissions feature: student submission form with success/failure feedback; backend persistence; admin-only list with reviewed/archived status.
- Contact page with English placeholders (phone/email/address/social) and click-to-email/phone links.
- Apply a consistent educational/coaching visual theme (avoid blue/purple-dominant palette).
- Add PWA basics: web manifest + icons for installability and functional routing when launched from a home-screen shortcut.

**User-visible outcome:** Students can browse and read articles, submit admissions/enrollment requests, and view/copy contact info on mobile or desktop; admins can sign in with Internet Identity to manage articles and review admissions submissions.
