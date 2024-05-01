# Running the project

## Before running

1. Download `google-services.json` file from Firebase console (Project Overview > Project Settings > Your Apps > Android apps) and place it in `android/app/`.
2. Create and populate the `env/env.ts` file with values from the Firebase Console (Project Overview > Project Settings > Your Apps > Web apps).

## Running

```
npm --legacy-peer-deps ci
npx expo run android
```
