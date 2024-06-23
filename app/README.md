# Running the project

## Before running

1. Download `google-services.json` file from Firebase console (Project Overview > Project Settings > Your Apps > Android apps) and place it in `android/app/`.
2. Create and populate the `env/env.ts` file with values from the Firebase Console (Project Overview > Project Settings > Your Apps > Web apps).
3. Add url to your firebase realtime database to `env/env.ts` file under `FIREBASE_RTDB_URL` key.

## Running

```bash
npm --legacy-peer-deps ci
npx expo run android
```

## Building with EAS

1. Install EAS CLI: `npm install -g eas-cli`
2. Hash google-services.json: `base64 -i ./android/app/google-services.json`
3. Copy the output and create a secret: `eas secret:create --scope project --name GOOGLE_SERVICES_BASE64 --value <output> --type string`
4. Hash env/env.ts: `base64 -i ./env/env.ts`
5. Copy the output and create a secret: `eas secret:create --scope project --name ENV_TS_BASE64 --value <output> --type string`
6. Run `eas build --platform android --profile preview`
