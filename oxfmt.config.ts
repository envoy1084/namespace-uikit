import klarity from "klarity/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...klarity,
  sortTailwindcss: {
    functions: ["clsx", "cn", "cva", "twMerge", "tw"],
    attributes: ["class", "className"],
    preserveWhitespace: false,
    preserveDuplicates: false,
  },
  ignorePatterns: [
    ...klarity.ignorePatterns,
    "**/.agents/**",
    "**/storybook-static/**",
    // Generated demo markers and indented MDX fences are semantically
    // significant; formatting them breaks component previews and install tabs.
    "apps/docs/content/**/*.mdx",
    "apps/docs/public/assets/**/*.geojson",
    "apps/docs/src/demos/index.ts",
    "**/route-tree.gen.ts",
    "**/routeTree.gen.ts",
  ],
});
