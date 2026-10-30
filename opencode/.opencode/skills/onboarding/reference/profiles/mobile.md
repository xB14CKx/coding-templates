# Profile — Mobile

**Detect:** `pubspec.yaml` (Flutter), `*.xcodeproj` / `Package.swift` (native),
`app.json` + `android/` + `ios/` (React Native / Expo), `build.gradle.kts` +
`src/main/AndroidManifest.xml` (Android).

## Where things live

| Stack | Code lives |
|---|---|
| Flutter | `lib/` with `screens/`, `widgets/`, `models/`, `services/`; `test/` mirrors `lib/` |
| React Native | `src/screens/`, `src/components/`, `src/navigation/`; `ios/`, `android/` |
| Native Android | `app/src/main/java/<pkg>/`, `res/`, `AndroidManifest.xml` |
| Native iOS | `<App>/` sources, `*.storyboard`, `Info.plist` |

## Check before writing

- **Platform targets.** iOS only, Android only, or both. Half the bugs in a
  "cross-platform" task are platform-conditional code that was never run on the
  other target.
- **Minimum OS / SDK version** — it decides which APIs exist.
- **State management** — Provider, Riverpod, Bloc, Redux, plain `setState`.
  Follow the existing one; do not introduce a second.
- **Navigation** — the declared router and whether deep links are supported.
- **Permission model.** What does the app ask for, when, and does it handle
  denial? Platform permission flows are a common source of silent failures.
- **Offline and sync** if the app is offline-capable — the hardest part of a
  mobile app, and the part most likely to be under-designed.

## Conventions worth recording

- Widget/component composition pattern.
- Where platform-specific code is isolated.
- How permissions are requested and their denial path.
- Test approach: widget tests, integration tests, or none.

## Commands

Read them from the project files — Flutter is `flutter test` / `flutter analyze`;
native iOS uses `xcodebuild`; Android uses `./gradlew test`. These vary a lot;
record what actually exists.

## Where units land

| Area | Unit |
|---|---|
| UI, layout, navigation, accessibility | `mason` |
| platform channels, permissions, native config | `hammer` |
| offline sync, conflict resolution | `cartographer` first, then `hammer` |
| anything handling user data or credentials | `aegis` |

## Mistakes that recur here

- A screen that assumes data is already loaded and renders empty forever.
- No handling for permission denial — the user sees a dead button.
- Keyboard covering an input; safe-area insets ignored.
- Blocking the UI thread with real work.
- Testing on one platform only and reporting it as done.
- Storing a token in plain preferences instead of the keychain / keystore.
- Screen-reader labels missing on icon-only controls.