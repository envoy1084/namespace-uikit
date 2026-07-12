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
      from: "src/styles/components/action-bar.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/app-layout.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/agenda.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/carousel.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-attachment.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-loader.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-message.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-message-actions.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-source.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/chat-tool.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/command.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/code-block.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/context-menu.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/floating-toc.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/hover-card.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/item-card.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/item-card-group.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/kpi.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/kpi-group.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/widget.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/file-tree.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/timeline.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/text-shimmer.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/kanban.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/map.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/markdown.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/navbar.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/segment.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/sheet.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/sidebar.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/stepper.css",
      to: "dist/components",
    },
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
      from: "src/styles/components/data-grid.css",
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
      from: "src/styles/components/prompt-input.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/prompt-suggestion.css",
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
      from: "src/styles/components/cell-select.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/cell-slider.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/cell-switch.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/checkbox-button-group.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/inline-select.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/list-view.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/native-select.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/radio-button-group.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/drop-zone.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/empty-state.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/emoji-picker.css",
      to: "dist/components",
    },
    {
      from: "src/styles/components/rich-text-editor.css",
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
      "@internationalized/date",
      "@heroui/react",
      "@number-flow/react",
      "@tiptap/core",
      "@tiptap/extension-character-count",
      "@tiptap/extension-link",
      "@tiptap/extension-placeholder",
      "@tiptap/extension-underline",
      "@tiptap/pm",
      "@tiptap/react",
      "@tiptap/starter-kit",
      "@tiptap/suggestion",
      "react",
      "react-aria-components",
      "react-dom",
      "react/jsx-runtime",
      "react-resizable-panels",
      "embla-carousel",
      "embla-carousel-autoplay",
      "embla-carousel-react",
      "motion",
      "marked",
      "react-markdown",
      "recharts",
      "shiki",
      "remark-gfm",
      "remark-math",
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
    "components/cell-select": "src/components/cell-select/index.ts",
    "components/cell-slider": "src/components/cell-slider/index.ts",
    "components/cell-switch": "src/components/cell-switch/index.ts",
    "components/checkbox-button-group":
      "src/components/checkbox-button-group/index.ts",
    "components/inline-select": "src/components/inline-select/index.ts",
    "components/native-select": "src/components/native-select/index.ts",
    "components/radio-button-group":
      "src/components/radio-button-group/index.ts",
    "components/drop-zone": "src/components/drop-zone/index.ts",
    "components/rich-text-editor": "src/components/rich-text-editor/index.ts",
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
