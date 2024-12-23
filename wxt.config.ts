import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: () => ({
    key: import.meta.env.VITE_CRX_PUBLIC_KEY,
    permissions: ["popup", "cookies", "storage"],
    host_permissions: ["http://localhost/*", import.meta.env.VITE_CLERK_FRONTEND_API + "/*"],
  }),
});
