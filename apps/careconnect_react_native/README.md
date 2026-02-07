# Mobile React Native (Expo) Conversion Starter

**Important:** the provided `/mnt/data/mobile_flutter.zip` is an empty zip in this environment, so I couldn't inspect your Flutter code/screens to do a 1:1 feature conversion. This repo is therefore an **industry-standard Expo + React Navigation + Zustand + TypeScript starter** that already satisfies your assignment rubric and is designed so you can drop in your Flutter features screen-by-screen.

If you re-export/upload the Flutter project zip with files, I can map every Flutter screen/widget/service to the exact RN equivalent and generate the final React Native code.

## Assignment checklist coverage

### Feature parity (structure ready)
- ✅ React Navigation (native-stack)
- ✅ State management via Zustand (`src/store/useAppStore.ts`)
- ✅ Responsive phone/tablet layout (Home list uses 1 or 2 columns via `useResponsive`)
- ✅ Basic accessibility props on interactive UI (labels/roles/hints are included)
- ✅ Expo (managed)

### Code quality
- ✅ Organized file structure: `src/screens`, `src/components`, `src/hooks`, `src/store`, `src/utils`, `src/navigation`
- ✅ TypeScript everywhere
- ✅ ESLint config (flat config) + security rules (`eslint-plugin-security`)
- ✅ Prettier + EditorConfig

### Builds
- ✅ EAS build scripts:
  - `npm run build:android` → `eas build --platform android`
  - `npm run build:ios` → `eas build --platform ios`

## Setup

```bash
npm install
# or
yarn
```

Run:
```bash
npm run start
npm run android
npm run ios
```

Lint & typecheck:
```bash
npm run lint
npm run typecheck
```

## Where to port your Flutter features

This starter includes a simple "Items" feature (list + details + settings) as a placeholder.

Map your Flutter app like this:

| Flutter | React Native (this repo) |
|---|---|
| `lib/main.dart` | `App.tsx` |
| Routes / Navigator | `src/navigation/AppNavigator.tsx` |
| Screens (pages) | `src/screens/*` |
| Widgets | `src/components/*` |
| Providers / BLoC / Riverpod | Zustand store in `src/store/*` or Context API |
| Services / repositories | `src/utils/*` (or add `src/services/*`) |

### Suggested port steps
1. **List Flutter screens** (each `Widget` page) → create matching RN screens under `src/screens/`.
2. **Copy UI structure** using RN primitives (`View`, `Text`, `Pressable`, `FlatList`, etc.).
3. **Port state** into `src/store/` (Zustand) or switch to Redux Toolkit if your app is complex.
4. **Port networking/storage** with:
   - `fetch` for HTTP
   - `expo-secure-store` for secrets (tokens)
   - `@react-native-async-storage/async-storage` for non-sensitive caching
5. Add accessibility props for touch targets (already modeled in this starter).
6. Confirm tablet layout (>=768dp) works for your main screens.

## Notes on React Navigation with Expo
React Navigation’s docs explain the core package and dependencies. In Expo projects, install peer deps with `expo install` to ensure compatible versions. 

