export type ThemeFont = {
  family: string;
  id: string;
  label: string;
  source: string | null;
};

const allowedFontHosts = [
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "api.fontshare.com",
  "cdnfonts.com",
];

const fontFileExtensions = [".woff2", ".woff", ".ttf", ".otf", ".eot"];

export function isValidFontSource(source: string) {
  try {
    const url = new URL(source);

    if (url.protocol !== "https:") return false;
    if (url.hostname === "cdn.jsdelivr.net") {
      return [
        "/fontsource/fonts/",
        "/npm/@fontsource/",
        "/npm/@fontsource-variable/",
      ].some((prefix) => url.pathname.startsWith(prefix));
    }

    return allowedFontHosts.some(
      (host) => url.hostname === host || url.hostname.endsWith(`.${host}`),
    );
  } catch {
    return false;
  }
}

export function isFontFileSource(source: string) {
  try {
    const path = new URL(source).pathname.toLowerCase();

    return fontFileExtensions.some((extension) => path.endsWith(extension));
  } catch {
    return false;
  }
}

export function extractFontFamily(source: string): string | null {
  try {
    const url = new URL(source);
    const googleFamily = url.searchParams
      .get("family")
      ?.split("|")[0]
      ?.split(":")[0];

    if (googleFamily) return googleFamily.replaceAll("+", " ");

    const fontshareFamily = url.searchParams.get("f[]")?.split("@")[0];

    if (fontshareFamily) return titleCase(fontshareFamily);

    const fontsourceNpm = url.pathname.match(
      /\/npm\/@fontsource(?:-variable)?\/([^@/]+)/,
    )?.[1];

    if (fontsourceNpm) return titleCase(fontsourceNpm);

    const fontsourceDirect = url.pathname.match(
      /\/fontsource\/fonts\/([^@/:]+)/,
    )?.[1];

    if (fontsourceDirect) return titleCase(fontsourceDirect);

    const cdnFonts =
      url.pathname.match(/\/css\/([^/?]+)/)?.[1] ??
      url.pathname.match(/\/([^/]+)\.font$/)?.[1];

    if (cdnFonts) return titleCase(cdnFonts);

    const cssFile = url.pathname.match(/\/([^/]+)\.css$/)?.[1];

    return cssFile ? titleCase(cssFile) : null;
  } catch {
    return null;
  }
}

function titleCase(value: string) {
  return value
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function createThemeFont(source: string): ThemeFont | null {
  if (!isValidFontSource(source)) return null;
  const label = extractFontFamily(source);

  if (!label) return null;

  return {
    family: `"${label}", ui-sans-serif, system-ui, sans-serif`,
    id: `custom-${label.toLowerCase().replace(/\s+/g, "-")}`,
    label,
    source,
  };
}

export function injectThemeFont(font: ThemeFont) {
  if (!font.source || typeof document === "undefined") return () => {};

  const id = `namespace-theme-font-${font.id}`;
  if (document.getElementById(id)) return () => {};

  if (isFontFileSource(font.source)) {
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `@font-face { font-family: "${font.label}"; src: url("${font.source}"); font-display: swap; font-style: normal; font-weight: 100 900; }`;
    document.head.append(style);
  } else {
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = font.source;
    document.head.append(link);
  }

  return () => document.getElementById(id)?.remove();
}

export function renderFontSource(font: ThemeFont) {
  if (!font.source) return "";

  if (isFontFileSource(font.source)) {
    return `@font-face {
  font-family: "${font.label}";
  src: url("${font.source}");
  font-display: swap;
  font-style: normal;
  font-weight: 100 900;
}`;
  }

  return `@import url("${font.source}");`;
}
