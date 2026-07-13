import type { CSSProperties } from "react";

import { converter, formatHex, parse } from "culori";

import type { ThemeConfig, ThemeMode } from "./theme-config";

const toOklch = converter("oklch");

export function colorInputValue(value: string) {
  try {
    return formatHex(parse(value)) ?? "#000000";
  } catch {
    return "#000000";
  }
}

export function colorToOklch(value: string) {
  const color = toOklch(value);

  if (!color) return value;

  const lightness = Math.round((color.l ?? 0) * 10000) / 100;
  const chroma = Math.round((color.c ?? 0) * 10000) / 10000;
  const hue = Math.round((color.h ?? 0) * 100) / 100;

  return `oklch(${lightness}% ${chroma} ${hue})`;
}

export function themeStyles(
  config: ThemeConfig,
  mode: ThemeMode,
): CSSProperties {
  const variables = Object.fromEntries(
    Object.entries(config.colors[mode]).map(([token, value]) => [
      `--${token}`,
      value,
    ]),
  );

  return {
    ...variables,
    "--field-radius": `${config.fieldRadius}rem`,
    "--font-sans": config.fontFamily,
    "--radius": `${config.radius}rem`,
  } as CSSProperties;
}

function renderVariables(config: ThemeConfig, mode: ThemeMode) {
  return Object.entries(config.colors[mode])
    .map(([token, value]) => `    --${token}: ${value};`)
    .join("\n");
}

export function generateThemeCss(config: ThemeConfig) {
  return `@import "@thenamespace/uikit/styles";

@layer theme {
  :root,
  .light,
  [data-theme="light"] {
${renderVariables(config, "light")}
    --radius: ${config.radius}rem;
    --field-radius: ${config.fieldRadius}rem;
    --font-sans: ${config.fontFamily};
  }

  .dark,
  [data-theme="dark"] {
${renderVariables(config, "dark")}
    --radius: ${config.radius}rem;
    --field-radius: ${config.fieldRadius}rem;
    --font-sans: ${config.fontFamily};
  }
}`;
}
