# CareConnect Web React

CareConnect Web React is the React + Vite web client for the CareConnect platform. It provides a responsive healthcare portal for patients and caregivers to manage appointments, medications, records, accessibility settings, and account preferences.

## Overview

- Framework: React 18 + TypeScript
- Build tool: Vite
- Routing: React Router
- State management: React Context
- Styling: global token-driven CSS
- PWA: enabled with manifest + service worker
- Deployment target: GitHub Pages

## Features

- Responsive patient and caregiver flows
- Authentication and profile management
- Dashboard, settings, and cart experiences
- Accessibility controls such as text size and motion preferences
- Installable PWA with offline app-shell support
- Route-level code splitting
- Bundle analysis support

## Project Structure

```text
apps/web_react/
├─ public/                  # Static assets, PWA icons, offline fallback
├─ src/
│  ├─ app/                  # Pages, layouts, components, contexts, utils
│  ├─ styles/               # Global tokens, theme, and app styles
│  └─ main.tsx              # App entry and PWA registration
├─ tests/                   # Playwright responsive tests
├─ guidelines/              # Assignment and performance notes
├─ vite.config.ts           # Vite, PWA, code splitting, bundle analysis
└─ package.json             # Scripts and dependencies
```

## Requirements

- Node.js 20 or newer recommended
- npm 10 or newer recommended

## Getting Started

From this folder:

```powershell
npm.cmd install
```

Start the development server:

```powershell
npm.cmd run dev
```

By default, Vite will print the local development URL in the terminal.

## Available Scripts

- `npm.cmd run dev`: start the local development server
- `npm.cmd run build`: create a production build in `dist/`
- `npm.cmd run lint`: run ESLint
- `npm.cmd run test`: run Jest tests
- `npm.cmd run test:watch`: run Jest in watch mode
- `npm.cmd run test:coverage`: generate Jest coverage output
- `npm.cmd run test:responsive`: run Playwright responsive smoke tests
- `npm.cmd run analyze:bundle`: generate a bundle analysis report in `dist/bundle-analysis.html`

## Testing

Run unit/integration tests:

```powershell
npm.cmd run test
```

Run coverage:

```powershell
npm.cmd run test:coverage
```

Coverage reports are written to:

- `coverage/`
- `coverage/lcov-report/index.html`

Run responsive browser checks:

```powershell
npm.cmd run test:responsive
```

## Production Preview

To test the production build locally:

```powershell
npm.cmd run build
npx vite preview --host 127.0.0.1 --port 4173
```

The GitHub Pages-ready preview URL is:

```text
http://127.0.0.1:4173/Team4/
```

## PWA

This application is configured as a Progressive Web App.

Included PWA behavior:

- web app manifest
- service worker registration
- installable app support
- offline shell support after first load

If the browser supports install prompts, the UI will show an `Install App` button automatically.

## Performance Tooling

Generate a bundle report:

```powershell
npm.cmd run analyze:bundle
```

Then open:

- `dist/bundle-analysis.html`

Lighthouse notes and performance checklist are documented in:

- [PERFORMANCE_SEO_CHECKLIST.md](./guidelines/PERFORMANCE_SEO_CHECKLIST.md)

## Deployment

### GitHub Pages

This app is configured to deploy to GitHub Pages for the `Team4` repository under:

```text
/Team4/
```

The deployment workflow lives at:

- [../../.github/workflows/deploy-pages.yml](../../.github/workflows/deploy-pages.yml)

### Deployment Prerequisites

1. Push this project to the `main` branch of the `Team4` repository.
2. In GitHub, open `Settings` -> `Pages`.
3. Set the Pages source to `GitHub Actions`.

### Deployment Process

On every push to `main`, GitHub Actions will:

1. install dependencies
2. run ESLint
3. run responsive Playwright checks
4. build the production site
5. publish `apps/web_react/dist` to GitHub Pages

### Expected URL

After deployment, the site should be available at:

```text
https://<your-github-username>.github.io/Team4/
```

## SEO and Lighthouse

For class submission, run Lighthouse against the production preview or deployed site and capture screenshots for:

- Performance
- Accessibility
- Best Practices
- SEO

Recommended pages to audit:

- landing page
- login page
- dashboard
- settings

## Accessibility

The app includes:

- keyboard-focus styles
- skip link support
- responsive touch targets
- text size preferences
- reduced motion support

## AI-Assisted Development

This application was developed with AI-assisted support during design, implementation, refactoring, debugging, documentation, and testing workflows. All AI-generated suggestions were reviewed by a human developer, with final decisions, validation, and integration performed under human oversight.

AI was used as a productivity and brainstorming tool rather than as an autonomous replacement for engineering judgment. Project-specific requirements, accessibility checks, responsive behavior, deployment setup, and final code acceptance remained the responsibility of the development team.

## Troubleshooting

### Install button does not appear

- Use Chrome or another browser with PWA install support
- Make sure you are using the production build or deployed site
- The button only appears when the browser fires the install prompt event

### Route refresh returns 404 on GitHub Pages

The app includes a GitHub Pages SPA fallback via `public/404.html`. Make sure the deployed build includes that file and that Pages is serving the latest artifact.

### PWA changes do not appear immediately

Because the app uses a service worker, you may need to hard refresh once or unregister the service worker in DevTools during testing.

## License

This project is part of the Team4 CareConnect coursework repository. Follow your course and repository contribution guidelines for reuse and submission.
