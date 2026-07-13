import { default as tailwindcss } from "@tailwindcss/vite";
import { default as react } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
      "@thenamespace/uikit/styles.css": new URL(
        "../../packages/uikit/src/styles/globals.css",
        import.meta.url,
      ).pathname,
    },
    conditions: ["@thenamespace/source"],
  },
  optimizeDeps: {
    include: ["@mdx-js/react"],
    exclude: ["sb-vite"],
  },
});
