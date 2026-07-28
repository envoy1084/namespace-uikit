import klarity from "klarity/oxlint/react";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [klarity],
  ignorePatterns: [
    "**/.astro/**",
    "**/.next/**",
    "**/.source/**",
    "**/next-env.d.ts",
    "apps/docs/src/demos/index.ts",
  ],
  rules: {
    eqeqeq: ["error", "always", { null: "ignore" }],
    "jsx-a11y/prefer-tag-over-role": "off",
  },
  overrides: [
    {
      files: ["apps/docs/src/demos/**/*.tsx"],
      rules: {
        "eslint/no-shadow": "off",
        "import/no-unassigned-import": "off",
        "jsx-a11y/no-autofocus": "off",
        "jsx-a11y/prefer-tag-over-role": "off",
        "react/no-children-prop": "off",
        "react/no-unstable-nested-components": "off",
        "react/style-prop-object": "off",
        "react-hooks/rules-of-hooks": "off",
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
    {
      files: [
        "apps/docs/src/app/**/*.tsx",
        "apps/docs/src/components/**/*.tsx",
        "apps/docs/src/mdx-components/**/*.tsx",
      ],
      rules: {
        "react/no-unstable-nested-components": "off",
      },
    },
    {
      files: ["apps/storybook/**/*.stories.tsx"],
      rules: {
        "jsx-a11y/no-autofocus": "off",
        "jsx-a11y/prefer-tag-over-role": "off",
        "react/no-children-prop": "off",
        "react/no-unstable-nested-components": "off",
        "react/style-prop-object": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
});
