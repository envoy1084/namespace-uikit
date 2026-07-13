import type { DocsPage } from "@/lib/source";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getDemo } from "@/demos";
import { proDemoCatalog } from "@/demos/pro-catalog";
import { site } from "@/lib/site";

export const textHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

const DEFAULT_CATEGORY = "docs";
const DEFAULT_TITLE = "Untitled";

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

async function replaceAsync(
  source: string,
  pattern: RegExp,
  replacer: (match: RegExpMatchArray) => Promise<string>,
) {
  const matches = [...source.matchAll(pattern)];
  const replacements = await Promise.all(matches.map(replacer));
  let index = 0;

  return source.replace(pattern, () => replacements[index++] ?? "");
}

async function expandExamples(source: string) {
  const withFreeExamples = await replaceAsync(
    source,
    /<ComponentPreview\s+[^>]*name=["']([^"']+)["'][^>]*\/>/g,
    async (match) => {
      const demo = getDemo(match[1] ?? "");

      if (!demo) return "";

      return `\`\`\`tsx\n${demo.source}\n\`\`\``;
    },
  );

  return replaceAsync(
    withFreeExamples,
    /<ProExamples\s+component=["']([^"']+)["'][^>]*\/>/g,
    async (match) => {
      const component = match[1] ?? "";
      const demos = proDemoCatalog[component] ?? [];
      const demoSources = demos
        .map((demo) => getDemo(demo.name)?.source)
        .filter((demoSource): demoSource is string => Boolean(demoSource));

      return demoSources
        .map((demoSource) => `\`\`\`tsx\n${demoSource}\n\`\`\``)
        .join("\n\n");
    },
  );
}

function cleanMdx(source: string) {
  return source
    .replace(
      /<CollapsibleCode\s+lang\s*=\s*["']([^"']+)["']\s+code\s*=\s*{?`([\s\S]*?)`}?\s*\/>/g,
      (_match, lang: string, code: string) =>
        `\`\`\`${lang || "tsx"}\n${code}\n\`\`\``,
    )
    .replace(/<(RelatedComponents|RelatedShowcases|DocsImage)[^>]*\/?>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function pageText(page: DocsPage) {
  const filePath = join(process.cwd(), "content/docs", page.path);
  const source = await readFile(filePath, "utf8");
  const rawBody = source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  const body = cleanMdx(await expandExamples(rawBody));
  const category = page.slugs[0] ?? DEFAULT_CATEGORY;
  const title = page.data.title || DEFAULT_TITLE;
  const url = absoluteUrl(page.url);
  const sourceUrl = `${site.repository}/blob/main/apps/docs/content/docs/${page.path}`;
  const description = page.data.description
    ? `\n> ${page.data.description}\n`
    : "";

  return `<page url="${page.url}">
# ${title}

**Category**: ${category}
**URL**: ${url}
**Source**: ${sourceUrl}${description}

${body}
</page>`;
}
