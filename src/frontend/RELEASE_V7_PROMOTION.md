# Version 7 Production Promotion Checklist

This document outlines the frontend readiness verification steps for promoting Version 7 to production.

## Pre-Deployment Checklist

### 1. Build Assets
- [ ] Run `npm run build` successfully without errors
- [ ] Verify all static assets are generated in `dist/` directory
- [ ] Confirm generated assets are present in `dist/assets/generated/`

### 2. Base Path Configuration
- [ ] Verify `index.html` uses relative paths (`./ prefix`) for manifest, favicon, and scripts
- [ ] Confirm `manifest.webmanifest` uses relative paths for icons and start_url
- [ ] Check `assetPaths.ts` utility correctly builds base-path-aware URLs
- [ ] Test navigation works correctly under both root domain and subpath hosting

### 3. Internet Identity Configuration
- [ ] Verify `.well-known/ii-alternative-origins` file exists in `frontend/public/`
- [ ] Confirm all deployment origins are listed:
  - `https://caffeine.icp0.io`
  - `https://keepgoingclasses.com`
  - `https://www.keepgoingclasses.com`
- [ ] Ensure the file is copied to `dist/.well-known/` during build

### 4. Asset References
- [ ] Verify hero image loads correctly using `getAssetPath()`
- [ ] Confirm logo images load in header and footer
- [ ] Check all static assets use proper path resolution

## Post-Deployment Verification

### 1. Public Access
- [ ] Confirm application loads at production URL
- [ ] Verify no console errors on initial load
- [ ] Check all static assets load correctly (images, fonts, icons)

### 2. Navigation
- [ ] Test all public routes load successfully
- [ ] Verify router-based navigation works (no hard-coded anchor links)
- [ ] Confirm mobile navigation menu functions properly

### 3. Internet Identity
- [ ] Test login flow completes successfully
- [ ] Verify logout clears session and cached data
- [ ] Confirm authentication persists across page refreshes

### 4. Admin Access
- [ ] Verify admin routes are protected (redirect to login if not authenticated)
- [ ] Confirm access denied screen shows for non-admin users
- [ ] Test admin functionality works after successful authentication

## Smoke Test Reference

For detailed post-deployment testing procedures, see `SMOKE_TEST_V7.md`.

## Rollback Plan

If critical issues are discovered:
1. Document the issue with screenshots/logs
2. Revert to previous stable version
3. Investigate and fix issues in development environment
4. Re-test before attempting promotion again

## Notes

- All frontend files follow production-ready patterns with proper error handling
- Loading states are implemented consistently across all mutations
- Form inputs are disabled during submission to prevent duplicate requests
- Success confirmations provide clear user feedback
