import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/chrome-extension";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const EXTENSION_URL = chrome.runtime.getURL(".");

if (!PUBLISHABLE_KEY) {
  throw new Error("Please add the PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY to the .env.development file");
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={`${EXTENSION_URL}/popup.html`} signInFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`} signUpFallbackRedirectUrl={`${EXTENSION_URL}/popup.html`}>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the WXT and React logos to learn more</p>
      <header>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
    </ClerkProvider>
  );
}

export default App;
