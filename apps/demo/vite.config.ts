import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  optimizeDeps: {
    exclude: ["@thenamespace/ens-components", "@thenamespace/uikit"],
  },
  resolve: {
    conditions: [
      "@thenamespace/source",
      "module",
      "browser",
      "development|production",
    ],
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackRouter({ target: "react", autoCodeSplitting: true }),
    viteReact(),
  ],
  server: {
    port: 3000,
  },
});

export default config;
