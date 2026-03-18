# Performance & SEO Checklist

## What Is Already Implemented

- Route-level code splitting is enabled in `src/app/routes.tsx`
- Route loading fallback is enabled in `src/app/App.tsx`
- Bundle analysis is available with `npm run analyze:bundle`
- HTML metadata for Lighthouse SEO checks is defined in `index.html`
- The shared image wrapper defaults to lazy loading and async decoding in `src/app/components/figma/ImageWithFallback.tsx`

## How To Run Lighthouse

1. Start the app locally with `npm run dev`
2. Open Chrome and visit the page you want to audit
3. Open Chrome DevTools
4. Open the `Lighthouse` tab
5. Select:
   - `Performance`
   - `Accessibility`
   - `Best Practices`
   - `SEO`
6. Choose `Navigation`
7. Run the audit
8. Save screenshots of the score summary for submission

## Suggested Pages To Audit

- Landing page
- Login page
- Dashboard page
- Settings page

## Bundle Analysis

Run:

```bash
npm run analyze:bundle
```

Then open:

- `dist/bundle-analysis.html`

Use that report to identify any oversized route chunks or third-party libraries.

## Image Optimization Notes

- Prefer `WebP` for any future raster images
- Keep hero or card images close to their display size
- Use SVG for logos and icons when possible
- If a page adds a non-critical image, use lazy loading

## Submission Evidence

- Lighthouse screenshots showing scores
- Screenshot or export of `dist/bundle-analysis.html`
- Short note that route-based code splitting and lazy image defaults were implemented
