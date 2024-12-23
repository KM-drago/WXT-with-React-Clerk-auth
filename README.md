# WXT-with-React-Clerk-auth

Clerk auth for browser extention uisng WXT with React

# Adding [Clerk Auth](https://clerk.com/)

### Install

```
pnpm add @clerk/chrome-extension
```

### Set Clerk API keys

#### .env

```
VITE_PUBLIC_CLERK_PUBLISHABLE_KEY=<YOUR_PUBLISHABLE_KEY>
VITE_CLERK_FRONTEND_API=<YOUR_FRONTEND_API_URL>
```

### Adding Clerk Provider

Make changes to the App.tsx in the popup folder. Same can be done for other entrypoints as well.

There is a header component in the App.tsx to demonstrate Clerk working as well. It's not included below.

#### App.tsx

```
...

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = chrome.runtime.getURL(".");

if (!PUBLISHABLE_KEY) {
  throw new Error("Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file");
}

function App() {
 ...

  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl={`${EXTENSION_URL}/sidepanel.html`}
      signInFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}
      signUpFallbackRedirectUrl={`${EXTENSION_URL}/sidepanel.html`}
    >
      ...
    </ClerkProvider>
  );
}

export default App;

```

### Consistent CRX ID

Clerk says "Chrome Extensions have a unique CRX ID that rotates by default, which can cause errors with the Clerk integration. To avoid these problems, ensure that you have a consistent CRX ID in both development and production for your extension."

For this you can follow one of the below ways,

- Google's guide [here](https://developer.chrome.com/docs/extensions/reference/manifest/key).
- Plasmo Itero's [Generate Keypairs](https://itero.plasmo.com/tools/generate-keypairs) tool. Refere step 9 in [here](https://clerk.com/docs/quickstarts/chrome-extension).

Add following to .env.chrome

#### .env.chrome

```
VITE_CRX_PUBLIC_KEY=<YOUR_PUBLIC_KEY>
```

### Updates to manifest.json

Change wxt.config.ts as shown.

```
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: () => ({
    key: import.meta.env.VITE_CRX_PUBLIC_KEY
    permissions: ["popup", "cookies", "storage"],
    host_permissions: ["http://localhost/*", import.meta.env.VITE_CLERK_FRONTEND_API + "/*"],
  }),
});

```

### Warning provided by Clerk [here in step 14](https://clerk.com/docs/quickstarts/chrome-extension)

After signing up or signing in, your popup may appear to crash. Closing and reopening the popup should restart the extension and you should be signed in.

Your extension does not yet have anything to handle routing, and by default, the Clerk components attempt to redirect the user.

### References

- Clerk Plasmo Guide - https://clerk.com/docs/quickstarts/chrome-extension
- Google Key Guide - https://developer.chrome.com/docs/extensions/reference/manifest/key
- Plasmo Itero Key Tool - https://itero.plasmo.com/tools/generate-keypairs
- WXT - https://wxt.dev/
- Clerk - https://clerk.com/
