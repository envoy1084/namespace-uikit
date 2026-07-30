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
    // Component libraries commonly expose render-prop `style` values and JSX
    // callback props that these generic React rules cannot distinguish.
    "react/style-prop-object": "off",
    "react-perf/jsx-no-jsx-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
  },
  overrides: [
    {
      files: ["apps/docs/src/demos/**/*.{ts,tsx}"],
      rules: {
        "eslint/no-shadow": "off",
        "jsx-a11y/no-autofocus": "off",
        "react/no-children-prop": "off",
        "react/no-unstable-nested-components": "off",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/no-array-sort": "off",
      },
    },
    {
      files: ["apps/docs/src/demos/**/*.demo.tsx"],
      rules: {
        "eslint/no-unused-vars": "off",
      },
    },
    {
      files: ["apps/storybook/**/*.stories.tsx"],
      rules: {
        "jsx-a11y/no-autofocus": "off",
        "react/no-children-prop": "off",
        "react/no-unstable-nested-components": "off",
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
      files: ["packages/uikit/src/components/agenda.tsx"],
      rules: {
        "jsx-a11y/no-noninteractive-element-interactions": "off",
      },
    },
  ],
});
