import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");
const todo = await readFile(join(repoRoot, "TODO.md"), "utf8");
const componentDirectory = join(appRoot, "content/docs/components");
const componentUrls = new Map();

for (const match of todo.matchAll(
  /https:\/\/heroui\.pro\/docs\/react\/components\/([a-z0-9-]+)/g,
)) {
  componentUrls.set(match[1], match[0]);
}

function adaptPage(raw, slug) {
  const page = raw.match(/^<page[^>]*>\n([\s\S]*)\n<\/page>\s*$/)?.[1];

  if (!page) throw new Error(`Invalid Pro documentation response for ${slug}`);

  const title = page.match(/^# (.+)$/m)?.[1];
  const rawDescription = page.match(/^> (.+)$/m)?.[1];

  if (!title || !rawDescription)
    throw new Error(`Missing metadata for ${slug}`);

  const description = rawDescription
    .replace(/HeroUI Pro/g, "Namespace UIKit")
    .replace(/HeroUI/g, "Namespace UIKit")
    .replace(/heroui/g, "namespace");

  const body = page
    .replace(/^# .+\n+/, "")
    .replace(/^\*\*Category\*\*:[^\n]*\n/gm, "")
    .replace(/^\*\*URL\*\*:[^\n]*\n/gm, "")
    .replace(/^\*\*Source\*\*:[^\n]*\n/gm, "")
    .replace(/^> .+\n+/, "")
    .replace(/@heroui-pro\/react/g, "@thenamespace/uikit")
    .replace(/@heroui\/react/g, "@thenamespace/uikit")
    .replace(/HeroUI Pro/g, "Namespace UIKit")
    .replace(/HeroUI/g, "Namespace UIKit")
    .replace(/heroui/g, "namespace")
    .replace(
      /## Usage\n*/,
      `## Usage\n\n<ProExamples component="${slug}" title="${title}" />\n\n`,
    )
    .trim();

  return `---\ntitle: ${title}\ndescription: ${description}\n---\n\n${body}\n`;
}

for (const [slug, url] of componentUrls) {
  const response = await fetch(`${url}.mdx`);

  if (!response.ok)
    throw new Error(`Unable to fetch ${url}: ${response.status}`);

  await writeFile(
    join(componentDirectory, `${slug}.mdx`),
    adaptPage(await response.text(), slug),
  );
}

const metaPath = join(componentDirectory, "meta.json");
const meta = JSON.parse(await readFile(metaPath, "utf8"));

meta.pages = [...new Set([...meta.pages, ...componentUrls.keys()])].toSorted();
meta.pages = ["index", ...meta.pages.filter((page) => page !== "index")];

await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

await import("./build-pro-demo-registry.mjs");

console.log(`Synced ${componentUrls.size} authoritative Pro component pages.`);
