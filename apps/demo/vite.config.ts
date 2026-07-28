import { defineConfig } from "vite";

const config = defineConfig({
  optimizeDeps: {
    exclude: ["@thenamespace/uikit", "ens-components"],
  },
  resolve: {
    conditions: ["@thenamespace/source", "module", "browser", "development|production"],
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
});

export default config;
