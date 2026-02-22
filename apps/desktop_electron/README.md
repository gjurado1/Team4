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

## Build (Windows)

```powershell
npm run dist
```

This builds the Vite renderer and packages a Windows installer with Electron Builder.
