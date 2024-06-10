# Running the project

## Before running

1. Download `google-services.json` file from Firebase console (Project Overview > Project Settings > Your Apps > Android apps) and place it in `android/app/`.
2. Create and populate the `env/env.ts` file with values from the Firebase Console (Project Overview > Project Settings > Your Apps > Web apps).
3. Add url to your firebase realtime database to `env/env.ts` file under `FIREBASE_RTDB_URL` key.

## Running

```
npm --legacy-peer-deps ci
npx expo run android
```
