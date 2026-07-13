import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["**/.next/**", "**/.source/**", "**/next-env.d.ts"],
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
  },
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
  overrides: [
    {
      files: ["apps/docs/src/demos/**/*.tsx"],
      rules: {
        "eslint/no-shadow": "off",
        "import/no-unassigned-import": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/no-array-sort": "off",
        "unicorn/prefer-set-has": "off",
      },
    },
    {
      files: ["apps/docs/src/demos/**/*.demo.tsx"],
      rules: {
        "eslint/no-unused-vars": "off",
        "oxc/no-map-spread": "off",
      },
    },
    {
      files: ["apps/docs/scripts/*.mjs"],
      rules: {
        "eslint/no-await-in-loop": "off",
      },
    },
  ],
});
