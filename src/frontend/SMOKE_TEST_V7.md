# Version 7 Post-Deployment Smoke Test

This document provides a comprehensive smoke test checklist for validating Version 7 in the live production environment.

## Prerequisites

- Production URL accessible
- Test user credentials (for Internet Identity)
- Admin user credentials (for admin route testing)
- Browser developer tools open (Console tab)

## Test Environment

- **Production URL**: [Insert production URL]
- **Test Date**: [Insert date]
- **Tester**: [Insert name]
- **Browser**: [Insert browser and version]

---

## 1. Public Pages Load Test

Verify all public routes are accessible and render correctly.

### Home Page (/)
- [ ] Page loads without errors
- [ ] Hero image displays correctly
- [ ] Navigation menu is visible and functional
- [ ] Footer displays with correct links
- [ ] No console errors

### Articles (/articles)
- [ ] Page loads and displays article list
- [ ] Article cards render with title and description
- [ ] Click on article navigates to detail page
- [ ] Back navigation returns to list
- [ ] No console errors

### Courses & Exams (/courses-exams)
- [ ] Page loads with both sections visible
- [ ] Academic Classes section displays all 4 classes
- [ ] Competitive Exam Preparation section displays all 5 exams
- [ ] "Apply for Admission" button navigates to admissions page (router-based)
- [ ] No console errors

### YouTube (/youtube)
- [ ] Page loads and displays video grid
- [ ] Video thumbnails and titles render correctly
- [ ] External links open YouTube videos in new tab
- [ ] Channel link works correctly
- [ ] No console errors

### Contact (/contact)
- [ ] Page loads with all contact information
- [ ] WhatsApp link opens WhatsApp with correct number
- [ ] Phone link opens dialer with correct number
- [ ] Copy-to-clipboard functionality works
- [ ] Social media links are functional
- [ ] No console errors

---

## 2. Admissions Form Submission Test

Validate the admissions form submission flow and confirmation state.

### Form Validation
- [ ] Navigate to `/admissions`
- [ ] Form displays with all required fields (data-testid="admissions-form")
- [ ] Submit button is visible (data-testid="admissions-submit")
- [ ] Attempt to submit empty form shows validation errors

### Successful Submission
- [ ] Fill in all required fields:
  - Full Name: "Test User"
  - Email: "test@example.com"
  - Program: Select any program
  - Motivation: "Test submission for smoke test"
- [ ] Click submit button
- [ ] Button shows loading state with spinner during submission
- [ ] Form inputs are disabled during submission
- [ ] Success confirmation displays (data-testid="admissions-success")
- [ ] Success message includes "Application Submitted!" text
- [ ] "Submit Another Application" button is visible
- [ ] No console errors (check for any error logs)

### Post-Submission
- [ ] Click "Submit Another Application"
- [ ] Form resets and is ready for new submission
- [ ] All fields are empty and enabled

---

## 3. Internet Identity Authentication Test

Verify Internet Identity login/logout flow works end-to-end.

### Login Flow
- [ ] Locate login button in header (data-testid="login-button")
- [ ] Click login button
- [ ] Internet Identity modal/window opens
- [ ] Complete authentication (use test identity)
- [ ] Redirected back to application
- [ ] Login button changes to "Logout" (data-testid="login-button")
- [ ] User profile setup modal appears if first-time login
- [ ] No console errors

### Profile Setup (First-Time Users)
- [ ] Profile setup modal displays
- [ ] Enter name and email
- [ ] Submit profile
- [ ] Modal closes after successful save
- [ ] No console errors

### Logout Flow
- [ ] Click logout button (data-testid="login-button")
- [ ] User is logged out
- [ ] Button changes back to "Login"
- [ ] Cached data is cleared (verify by checking admin link disappears if present)
- [ ] No console errors

---

## 4. Admin Route Protection Test

Validate role-based access control for admin-only routes.

### Unauthenticated Access
- [ ] Log out if currently authenticated
- [ ] Navigate to `/admin`
- [ ] Admin guard displays loading state (data-testid="admin-guard-loading")
- [ ] Login prompt appears (data-testid="admin-guard-login-required")
- [ ] "Authentication Required" message is visible
- [ ] Login button is present and functional
- [ ] No console errors

### Non-Admin Authenticated Access
- [ ] Log in with non-admin user
- [ ] Navigate to `/admin`
- [ ] Admin guard displays loading state briefly
- [ ] Access denied screen appears (data-testid="admin-guard-access-denied")
- [ ] "Access Denied" message is visible
- [ ] "Return to Home" button is present and functional
- [ ] No console errors

### Admin Authenticated Access
- [ ] Log in with admin user
- [ ] Navigate to `/admin`
- [ ] Admin dashboard loads successfully
- [ ] Navigation cards for "Manage Articles" and "Manage Admissions" are visible
- [ ] Click "Manage Articles" navigates to `/admin/articles`
- [ ] Articles management page loads with article list
- [ ] Click "Manage Admissions" navigates to `/admin/admissions`
- [ ] Admissions management page loads with request list
- [ ] No console errors

### Admin Route Persistence
- [ ] While logged in as admin, refresh page on `/admin`
- [ ] Page reloads without redirect
- [ ] Admin content remains accessible
- [ ] No console errors

---

## 5. Cross-Browser Testing (Optional but Recommended)

Repeat critical tests in multiple browsers:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Edge

---

## 6. Mobile Responsiveness (Optional but Recommended)

Test on mobile device or using browser dev tools:
- [ ] Navigation menu collapses to hamburger icon
- [ ] All pages render correctly on mobile viewport
- [ ] Forms are usable on mobile
- [ ] Buttons and links are tappable

---

## Issue Tracking

Document any issues discovered during testing:

| Issue # | Page/Feature | Description | Severity | Status |
|---------|--------------|-------------|----------|--------|
| 1       |              |             |          |        |
| 2       |              |             |          |        |

**Severity Levels:**
- **Critical**: Blocks core functionality, requires immediate fix
- **High**: Significant impact on user experience
- **Medium**: Noticeable but workaround available
- **Low**: Minor cosmetic or edge case issue

---

## Sign-Off

- [ ] All critical tests passed
- [ ] No critical or high-severity issues found
- [ ] Application is ready for production use

**Tester Signature**: ___________________  
**Date**: ___________________

---

## Notes

- Use browser developer tools to monitor console for errors
- Take screenshots of any issues for documentation
- Test with realistic data when possible
- Verify all test hooks (data-testid attributes) are present and functional
