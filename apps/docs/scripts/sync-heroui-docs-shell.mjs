import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");
const upstream = join(repoRoot, ".repos/heroui/apps/docs/src");
const files = [
  "components/fumadocs/layouts/notebook/client.tsx",
  "components/fumadocs/layouts/notebook/index.tsx",
  "components/fumadocs/layouts/notebook/sidebar.tsx",
  "components/fumadocs/layouts/notebook/page/client.tsx",
  "components/fumadocs/layouts/notebook/page/index.tsx",
  "components/fumadocs/layouts/notebook/page/toc-items.tsx",
  "components/fumadocs/ui/icons.tsx",
  "components/fumadocs/ui/language-toggle.tsx",
  "components/fumadocs/ui/link-item.tsx",
  "components/fumadocs/ui/search-toggle.tsx",
  "components/fumadocs/ui/theme-toggle.tsx",
  "components/fumadocs/utils/merge-refs.ts",
  "components/fumadocs/utils/urls.ts",
  "hooks/use-is-mounted.ts",
  "utils/cn.ts",
];
const upstreamLintCompatibility =
  "// oxlint-disable eslint/no-shadow, jsdoc/check-tag-names, unicorn/consistent-function-scoping\n";

for (const file of files) {
  const output = join(appRoot, "src", file);
  let source = (await readFile(join(upstream, file), "utf8"))
    .replaceAll("@heroui/react", "@thenamespace/uikit")
    .replaceAll("@heroui/styles", "@thenamespace/uikit/styles")
    .replaceAll("HEROUI", "NAMESPACE UIKIT")
    .replaceAll("HeroUI", "Namespace UIKit")
    .replaceAll("heroui", "namespace")
    .replace(/[ \t]+$/gm, "");

  if (file === "components/fumadocs/layouts/notebook/index.tsx") {
    source = source.replace(
      "            {nav.children}\n            {tabs.length > 0 && (",
      "            {tabs.length > 0 && (",
    );
  }

  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, `${upstreamLintCompatibility}${source}`);
}

const globalCss = (await readFile(join(upstream, "app/global.css"), "utf8"))
  .replace('@import "@heroui/styles";', '@import "@thenamespace/uikit/styles";')
  .replace('@import "../styles/theme-presets.css";\n', "")
  .replaceAll("HEROUI", "NAMESPACE UIKIT")
  .replaceAll("HeroUI", "Namespace UIKit")
  .replaceAll("heroui", "namespace")
  .replace(/[ \t]+$/gm, "");

const fontCss = `
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/Inter-Regular.ttf") format("truetype");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500 600;
  font-display: swap;
  src: url("/fonts/Inter-Medium.ttf") format("truetype");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("/fonts/Inter-Bold.ttf") format("truetype");
}

:root {
  --font-inter: "Inter";
}
`;

await writeFile(
  join(appRoot, "src/app/global.css"),
  globalCss.replace(
    "@keyframes float-stars",
    `${fontCss}\n@keyframes float-stars`,
  ),
);

const publicFonts = join(appRoot, "public/fonts");

await mkdir(publicFonts, { recursive: true });
for (const font of [
  "Inter-Regular.ttf",
  "Inter-Medium.ttf",
  "Inter-Bold.ttf",
]) {
  await copyFile(
    join(repoRoot, ".repos/heroui/apps/docs/public/fonts", font),
    join(publicFonts, font),
  );
}

console.log(
  `Synced the exact upstream notebook shell, ${files.length} support modules, and global styles.`,
);
