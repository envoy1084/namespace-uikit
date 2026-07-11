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
      from: "src/styles/components/composed-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/line-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/pie-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/radar-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/radial-chart.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/number-value.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/pressable-feedback.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/trend-chip.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/rating.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/emoji-reaction-button.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/resizable.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/cell-color-picker.css",
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
      "react-resizable-panels",
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
    "components/composed-chart":
      "src/components/charts/composed-chart/index.ts",
    "components/line-chart": "src/components/charts/line-chart/index.ts",
    "components/pie-chart": "src/components/charts/pie-chart/index.ts",
    "components/radar-chart": "src/components/charts/radar-chart/index.ts",
    "components/radial-chart": "src/components/charts/radial-chart/index.ts",
    "components/number-value": "src/components/number-value/index.ts",
    "components/pressable-feedback":
      "src/components/pressable-feedback/index.ts",
    "components/trend-chip": "src/components/trend-chip/index.ts",
    "components/rating": "src/components/rating/index.ts",
    "components/emoji-reaction-button":
      "src/components/emoji-reaction-button/index.ts",
    "components/resizable": "src/components/resizable/index.ts",
    "components/cell-color-picker": "src/components/cell-color-picker/index.ts",
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
