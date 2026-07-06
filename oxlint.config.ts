import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
  },
  ignorePatterns: [
    ".storybook/**",
    "apps/storybook/.storybook/stories/**",
    "apps/storybook/.storybook/**",
    "src/components/**/*.stories.tsx",
    "apps/storybook/src/components/**/*.stories.tsx",
  ],
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "jsdoc",
    "node",
    "promise",
  ],
});
