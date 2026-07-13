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
  "(ui-for-agents)/llms-txt.mdx",
];

function adapt(content) {
  return content
    .replace(/<CopyPrompt[\s\S]*?<\/CopyPrompt>\s*/g, "")
    .replace(
      /## HeroUI Ecosystem[\s\S]*?(?=\*\*Why React Aria\?\*\*)/,
      "## Package Architecture\n\nNamespace UIKit provides a single React package with flat component entry points, shared styles, hooks, icons, and utilities. The documentation and LLM-friendly Markdown routes are generated from the same component sources.\n\n",
    )
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
        "---UI for Agents---",
        "(ui-for-agents)/llms-txt",
      ],
      root: true,
      title: "Getting Started",
    },
    null,
    2,
  )}\n`,
);

await writeFile(
  join(outputRoot, "(ui-for-agents)/llms-txt.mdx"),
  `---
title: LLMs.txt
description: Help ChatGPT, Claude, Cursor, Windsurf, and other AI assistants understand Namespace UIKit.
icon: bot
---

Namespace UIKit publishes [LLMs.txt](https://llmstxt.org/) files so coding assistants can use the documentation as an explicit source of truth instead of relying on memory.

## Available Files

- [/llms.txt](/llms.txt) — A compact index of every documentation page.
- [/llms-full.txt](/llms-full.txt) — The complete documentation in one file.
- Per-page Markdown — Every documentation page is also available by adding \`.mdx\` to its URL, such as [/docs/components/button.mdx](/docs/components/button.mdx).

## ChatGPT and Claude

Give the assistant the compact index and ask it to open relevant page Markdown before writing code:

\`\`\`text
Use Namespace UIKit documentation from https://your-domain.example/llms.txt.
Open the relevant per-page Markdown links before implementing components.
\`\`\`

The **Copy Markdown** menu at the top of each page can also open the current documentation directly in ChatGPT or Claude.

## Cursor

Add the complete documentation through Cursor's **@Docs** feature:

\`\`\`text
@Docs https://your-domain.example/llms-full.txt
\`\`\`

For smaller context windows, prefer the compact index and allow Cursor to fetch only the component pages it needs.

## Windsurf

Reference the documentation from your project rules:

\`\`\`text
#docs https://your-domain.example/llms.txt
\`\`\`

## Project Instructions

You can add this guidance to your project-level agent instructions:

\`\`\`md
When using Namespace UIKit, read /llms.txt first and use the linked component Markdown pages as the API source of truth. Import components from @thenamespace/uikit or their one-level entry points.
\`\`\`

## Keep Context Focused

Use [/llms.txt](/llms.txt) for discovery, a component-specific Markdown page for implementation, and [/llms-full.txt](/llms-full.txt) only when the assistant needs cross-library context.
`,
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
