import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  copy: [
    {
      from: "src/styles/globals.css",
      rename: "styles.css",
      to: "dist",
    },
  ],
  deps: {
    neverBundle: [
      "@thenamespace/uikit",
      "react",
      "react-dom",
      "react/jsx-runtime",
      "tailwindcss",
    ],
  },
  dts: {
    enabled: true,
    sourcemap: true,
  },
  entry: {
    index: "src/index.ts",
  },
  failOnWarn: true,
  fixedExtension: true,
  format: ["esm"],
  hash: false,
  nodeProtocol: true,
  outDir: "dist",
  platform: "browser",
  sourcemap: true,
  target: ["es2022"],
  treeshake: true,
  unbundle: true,
});
