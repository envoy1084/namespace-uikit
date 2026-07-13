import type { DocsPage } from "@/lib/source";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getDemo } from "@/demos";
import { site } from "@/lib/site";

export const textHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

const DEFAULT_CATEGORY = "docs";
const DEFAULT_TITLE = "Untitled";

export function absoluteUrl(path: string, origin = site.url) {
  return new URL(path, origin).toString();
}

export function requestOrigin(request: Request) {
  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    ?.trim();
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const host = forwardedHost ?? request.headers.get("host");

  if (host) {
    return `${forwardedProtocol ?? new URL(request.url).protocol.replace(":", "")}://${host}`;
  }

  return new URL(request.url).origin;
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

  return withFreeExamples;
}

function cleanMdx(source: string, origin: string) {
  return source
    .replace(
      /<OriginCode\s+prefix=["']([^"']*)["']\s+path=["']([^"']+)["']\s*\/>/g,
      (_match, prefix: string, path: string) =>
        `${prefix}${absoluteUrl(path, origin)}`,
    )
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

export async function pageText(page: DocsPage, origin = site.url) {
  const filePath = join(process.cwd(), "content/docs", page.path);
  const source = await readFile(filePath, "utf8");
  const rawBody = source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  const body = cleanMdx(await expandExamples(rawBody), origin);
  const category = page.slugs[0] ?? DEFAULT_CATEGORY;
  const title = page.data.title || DEFAULT_TITLE;
  const url = absoluteUrl(page.url, origin);
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
