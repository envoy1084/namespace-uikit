import type { DocsPage } from "@/lib/source";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { site } from "@/lib/site";

export const textHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export async function pageText(page: DocsPage) {
  const filePath = join(process.cwd(), "content/docs", page.path);
  const source = await readFile(filePath, "utf8");
  const body = source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();

  return `<page url="${absoluteUrl(page.url)}">
# ${page.data.title}

> ${page.data.description ?? ""}

${body}
</page>`;
}
