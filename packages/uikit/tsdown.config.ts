import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  deps: {
    neverBundle: [
      "@heroui/react",
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
  entry: ["src/index.ts"],
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
