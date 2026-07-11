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
      from: "src/styles/components/area-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/bar-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/line-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/globals.css",
      rename: "styles.css",
      to: "dist",
    },
    {
      from: "src/styles/components/chart-tooltip.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/number-stepper.css",
      to: "dist/components",
    },
  ],
  deps: {
    neverBundle: [
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "@heroui/react",
      "@number-flow/react",
      "react",
      "react-aria-components",
      "react-dom",
      "react/jsx-runtime",
      "recharts",
      "tailwindcss",
    ],
  },
  dts: {
    enabled: true,
    sourcemap: true,
  },
  entry: {
    ...componentEntries,
    "components/area-chart": "src/components/charts/area-chart/index.ts",
    "components/bar-chart": "src/components/charts/bar-chart/index.ts",
    "components/line-chart": "src/components/charts/line-chart/index.ts",
    "components/chart-tooltip": "src/components/charts/chart-tooltip/index.ts",
    "components/number-stepper": "src/components/forms/number-stepper/index.ts",
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
