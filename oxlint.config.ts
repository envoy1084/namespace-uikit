import klarity from "klarity/oxlint/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [klarity],
  ignorePatterns: ["**/.astro/**", "**/.next/**", "**/.source/**", "**/next-env.d.ts"],
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
