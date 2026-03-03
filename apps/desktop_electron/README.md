# CareConnect Desktop (Electron)

Electron host for the CareConnect Vite renderer in `../desktop_vite`.

## Development

```powershell
npm install
npm run dev
```

This starts:
- Vite renderer (`../desktop_vite`)
- Electron main process (`src/main/main.cjs`)

## Package for Windows

Run these commands from `Team4/apps/desktop_electron`:

```powershell
npm install
npm run dist
```

`npm run dist` does two things:
1. Builds the React/Vite renderer (`npm run build:renderer`)
2. Packages Electron with `electron-builder` using the Windows `nsis` target

## Build Output

Installer artifacts are generated in:

- `Team4/apps/desktop_electron/release/`

Look for a Windows installer `.exe` file in that folder.

## Optional: Build Renderer Only

```powershell
npm run build:renderer
```

This compiles `../desktop_vite` and syncs files into `renderer-dist/` without creating an installer.

## Troubleshooting

- If packaging fails due to missing dependencies, run `npm install` again.
- If renderer assets are stale, run `npm run build:renderer` before `npm run dist`.
- If PowerShell script policy blocks npm, use `cmd /c npm run dist`.
