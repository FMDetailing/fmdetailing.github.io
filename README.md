# FM Detailing

Website for FM Detailing — premium car detailing in the Greater Toronto Area.

Built with Next.js (static export) and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Deploying

Push to `main` — the GitHub Actions workflow builds the site and publishes it
to GitHub Pages automatically.

**One-time setup:** in the GitHub repo go to
**Settings → Pages → Build and deployment → Source** and choose
**GitHub Actions**.

The site will be live at `https://fmdetailing.github.io/`.

## Where things live

- `lib/site.ts` — business info (phone, service area) and the service
  catalog with prices. Edit here to change what every page shows.
- `lib/booking.ts` — booking submission stub. The UI collects a complete
  `BookingRequest`; wire `submitBookingRequest()` to a real backend
  (serverless function, Formspree, Google Apps Script…) when ready.
- `app/` — pages: home, `services/`, `reviews/`, `booking/`.
- `components/` — nav, footer, calendar, before/after slider, booking flow.
- `public/images/` — before/after placeholders. Replace the `.svg`
  placeholders with real photos (e.g. `before-1.jpg`) and update the
  `GALLERY` list at the top of `app/reviews/page.tsx`.

## Replacing placeholder content

- **Reviews:** edit the `REVIEWS` list at the top of `app/reviews/page.tsx`.
- **Before/after photos:** drop photos into `public/images/` and point the
  `GALLERY` entries at them.
