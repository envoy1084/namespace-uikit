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
    // React props are commonly declared inline throughout the component API.
    // These rules flag ordinary render props and small immutable values without
    // proving that memoization would improve runtime performance.
    "react-perf/jsx-no-jsx-as-prop": "off",
    "react-perf/jsx-no-new-array-as-prop": "off",
    "react-perf/jsx-no-new-function-as-prop": "off",
    "react-perf/jsx-no-new-object-as-prop": "off",
  },
  overrides: [
    {
      files: ["apps/docs/**/*.{ts,tsx}", "apps/storybook/**/*.{ts,tsx}"],
      rules: {
        // Examples and stories intentionally optimize for readable fixtures.
        "react/jsx-no-constructed-context-values": "off",
        "react/no-array-index-key": "off",
        "react/no-object-type-as-default-prop": "off",
        "typescript/no-explicit-any": "off",
        "typescript/no-non-null-assertion": "off",
      },
    },
    {
      files: ["apps/docs/src/demos/**/*.{ts,tsx}", "apps/storybook/**/*.{ts,tsx}"],
      rules: {
        "eslint/no-console": "off",
        "oxc/no-map-spread": "off",
      },
    },
    {
      files: [
        "apps/docs/src/app/layout.tsx",
        "apps/docs/src/components/iconify.tsx",
        "packages/uikit/src/components/ai/code-block.tsx",
      ],
      rules: {
        // These files inject generated, sanitized, or static package-owned markup.
        "react/no-danger": "off",
      },
    },
    {
      files: ["packages/uikit/src/components/date-and-time/agenda.tsx"],
      rules: {
        // Agenda uses pointer coordinates to create events and a root keyboard
        // listener to delete the currently selected event.
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/no-static-element-interactions": "off",
      },
    },
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
