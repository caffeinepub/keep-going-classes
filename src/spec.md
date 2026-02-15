# Specification

## Summary
**Goal:** Update the Contact page to show the user’s WhatsApp and phone numbers with copy actions and working deep links.

**Planned changes:**
- Update `/contact` to display two distinct contact methods labeled “WhatsApp” (9889144312) and “Phone” (9838784245).
- Add a visible “Copy” action for each number that copies the correct value to the clipboard and shows an English success toast.
- Make the phone number clickable via a `tel:` link and the WhatsApp number clickable via a WhatsApp deep link (e.g., `wa.me` or `api.whatsapp.com`).
- Remove/replace any placeholder contact phone number so only the provided numbers are presented as the primary contact options.

**User-visible outcome:** On the Contact page, users can tap to open WhatsApp or their phone dialer for the provided numbers, or copy either number and see a success confirmation.
