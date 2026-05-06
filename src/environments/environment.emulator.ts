export const environment = {
  production: false,
  // Use localhost in the WebView so auth cookies remain same-site. The emulator
  // must expose the host backend through `adb reverse tcp:5000 tcp:5000`.
  apiUrl: 'http://localhost:5000/api'
};
