import type { Preview } from "@storybook/react";

import React, { useEffect, useMemo, useState } from "react";

import { DocsContainer as StorybookDocsContainer } from "@storybook/addon-docs/blocks";
import { addons } from "storybook/preview-api";

import {
  DEFAULT_THEME,
  THEME_EVENT_NAME,
  THEME_GLOBAL_TYPE_ID,
  ensureThemeKey,
} from "../addons/theme/constants";
import { themes } from "../styles/theme";

/**
 * Synchronize the documentation theme with the toolbar theme, matching HeroUI's
 * Storybook configuration.
 */
export const DocsContainer: NonNullable<
  Preview["parameters"]
>["docs"]["container"] = ({ children, context }) => {
  const initialTheme = useMemo(
    () =>
      ensureThemeKey(
        (context?.globals?.[THEME_GLOBAL_TYPE_ID] as string | undefined) ||
          undefined,
      ),
    [context?.globals],
  );
  const [themeKey, setThemeKey] = useState(initialTheme);

  useEffect(() => {
    const nextTheme = ensureThemeKey(
      (context?.globals?.[THEME_GLOBAL_TYPE_ID] as string | undefined) ||
        undefined,
    );

    setThemeKey((currentTheme) =>
      currentTheme === nextTheme ? currentTheme : nextTheme,
    );
  }, [context?.globals]);

  useEffect(() => {
    const channel = addons.getChannel();
    const handleThemeChange = (event: { theme: string }) => {
      const nextTheme = ensureThemeKey(event.theme);

      setThemeKey((currentTheme) =>
        currentTheme === nextTheme ? currentTheme : nextTheme,
      );
    };

    channel.on(THEME_EVENT_NAME, handleThemeChange);

    return () => channel.off(THEME_EVENT_NAME, handleThemeChange);
  }, []);

  const selectedTheme =
    themes[themeKey as keyof typeof themes] || themes[DEFAULT_THEME];

  return (
    <StorybookDocsContainer context={context} theme={selectedTheme}>
      {children}
    </StorybookDocsContainer>
  );
};
