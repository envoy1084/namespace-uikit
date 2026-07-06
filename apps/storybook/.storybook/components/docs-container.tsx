import type { Preview } from "@storybook/react";

import React from "react";

import { DocsContainer as StorybookDocsContainer } from "@storybook/addon-docs/blocks";

/**
 * Keep docs in the preview bundle free of manager-only Storybook theming code.
 * The preview iframe theme is applied by the theme decorator through CSS vars.
 */
export const DocsContainer: NonNullable<
  Preview["parameters"]
>["docs"]["container"] = ({ children, context }) => {
  return (
    <StorybookDocsContainer context={context}>
      {children}
    </StorybookDocsContainer>
  );
};
