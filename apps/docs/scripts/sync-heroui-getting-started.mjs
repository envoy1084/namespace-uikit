import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");
const upstreamRoot = join(
  repoRoot,
  ".repos/heroui/apps/docs/content/docs/en/react/getting-started",
);
const outputRoot = join(appRoot, "content/docs/getting-started");
const pages = [
  "index.mdx",
  "(overview)/quick-start.mdx",
  "(overview)/design-principles.mdx",
  "(overview)/frameworks.mdx",
  "(handbook)/colors.mdx",
  "(handbook)/theming.mdx",
  "(handbook)/dark-mode.mdx",
  "(handbook)/styling.mdx",
  "(handbook)/animation.mdx",
  "(handbook)/composition.mdx",
];

function adapt(content) {
  return content
    .replace(/<CopyPrompt[\s\S]*?<\/CopyPrompt>\s*/g, "")
    .replaceAll("@heroui/react", "@thenamespace/uikit")
    .replaceAll("@heroui/styles", "@thenamespace/uikit/styles")
    .replaceAll("HeroUI v3", "Namespace UIKit")
    .replaceAll("HeroUI", "Namespace UIKit")
    .replace(/^image:.*\n/m, "")
    .replace(/<DocsImage[\s\S]*?heroui-og-black_2x\.jpg[\s\S]*?\/>\s*/g, "")
    .replaceAll(
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/",
      "/assets/getting-started/",
    )
    .replaceAll("/docs/react/getting-started", "/docs/getting-started")
    .replaceAll("/docs/react/components", "/docs/components")
    .replaceAll("/docs/handbook/", "/docs/getting-started/")
    .replaceAll("/themes", "/docs/getting-started/theming")
    .replaceAll(
      "https://github.com/heroui-inc/heroui",
      "https://github.com/thenamespace/uikit",
    )
    .replaceAll("https://link.heroui.com/native", "https://namespace.ninja")
    .replaceAll("https://heroui.chat?ref=heroui-v3", "https://namespace.ninja")
    .replaceAll("https://x.com/hero_ui", "https://namespace.ninja")
    .replaceAll("https://discord.gg/9b6yyZKmH4", "https://namespace.ninja")
    .replaceAll(
      "https://herouiv3.featurebase.app/roadmap",
      "https://namespace.ninja",
    )
    .replaceAll("heroui", "namespace-uikit");
}

await rm(outputRoot, { force: true, recursive: true });
await rm(join(appRoot, "content/docs/getting-started.mdx"), { force: true });

for (const page of pages) {
  const output = join(outputRoot, page);

  await mkdir(dirname(output), { recursive: true });
  await writeFile(
    output,
    adapt(await readFile(join(upstreamRoot, page), "utf8")),
  );
}

await writeFile(
  join(outputRoot, "meta.json"),
  `${JSON.stringify(
    {
      description:
        "Learn how to install, customize, and compose Namespace UIKit.",
      icon: "book-open",
      pages: [
        "---Overview---",
        "index",
        "(overview)/quick-start",
        "(overview)/design-principles",
        "(overview)/frameworks",
        "---Handbook---",
        "(handbook)/colors",
        "(handbook)/theming",
        "(handbook)/dark-mode",
        "(handbook)/styling",
        "(handbook)/animation",
        "(handbook)/composition",
      ],
      root: true,
      title: "Getting Started",
    },
    null,
    2,
  )}\n`,
);

const assets = {
  "emphasis-dark.jpg": "emphasis-dark.jpg",
  "emphasis.jpg": "emphasis.jpg",
};
const assetRoot = join(appRoot, "public/assets/getting-started");

await rm(assetRoot, { force: true, recursive: true });
await mkdir(assetRoot, { recursive: true });
for (const [remoteName, localName] of Object.entries(assets)) {
  const response = await fetch(
    `https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/${remoteName}`,
  );

  if (!response.ok) throw new Error(`Unable to fetch ${basename(remoteName)}`);
  await writeFile(
    join(assetRoot, localName),
    Buffer.from(await response.arrayBuffer()),
  );
}

console.log(
  `Synced ${pages.length} detailed Getting Started pages and local assets.`,
);
