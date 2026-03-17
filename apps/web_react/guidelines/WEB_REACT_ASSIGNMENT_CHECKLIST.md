# Web React Assignment Checklist

## Completed

- ESLint is configured and `npm run lint` passes.
- PWA manifest and service worker are configured.
- Offline app-shell support is generated in production builds.
- Responsive smoke tests pass at `375px`, `768px`, and `1440px`.

## In Progress

- Form-validation polish and console-cleanliness cleanup.

## Commands

```bash
npm run lint
npm run build
npm run test:responsive
```

## What the responsive smoke test covers

- Public routes: `/`, `/login`, `/signup`
- Authenticated routes: `/role-selection`, `/dashboard`, `/settings`, `/cart`
- Horizontal overflow checks at `375`, `768`, and `1440`
- Mobile dashboard drawer bounds
- Mobile settings drawer bounds
- Touch target sizing for mobile menu buttons
