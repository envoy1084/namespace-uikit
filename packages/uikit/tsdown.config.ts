import { readdirSync } from "node:fs";
import { basename, extname } from "node:path";

import { defineConfig } from "tsdown";

const componentEntries = Object.fromEntries(
  readdirSync("src/components", { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith(".ts") &&
        entry.name !== "index.ts",
    )
    .map((entry) => {
      const name = basename(entry.name, extname(entry.name));

      return [`components/${name}`, `src/components/${entry.name}`];
    }),
);

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
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
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
  entry: {
    ...componentEntries,
    hooks: "src/hooks.ts",
    icons: "src/icons.ts",
    index: "src/index.ts",
    utils: "src/utils.ts",
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
