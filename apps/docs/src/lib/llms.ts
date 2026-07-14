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

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

function normalizeOrigin(value: string | undefined) {
  if (!value) return undefined;

  try {
    return new URL(value.includes("://") ? value : `https://${value}`).origin;
  } catch {
    return undefined;
  }
}

function isLocalOrigin(origin: string) {
  const hostname = new URL(origin).hostname;

  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

export function requestOrigin(request: Request) {
  const forwarded = firstHeaderValue(request.headers.get("forwarded"));
  const forwardedHost = forwarded?.match(
    /(?:^|;)\s*host=(?:"([^"]+)"|([^;]+))/i,
  );
  const forwardedProtocol = forwarded?.match(
    /(?:^|;)\s*proto=(?:"([^"]+)"|([^;]+))/i,
  );
  const requestUrl = new URL(request.url);
  const protocol =
    firstHeaderValue(request.headers.get("x-forwarded-proto")) ??
    forwardedProtocol?.[1] ??
    forwardedProtocol?.[2]?.trim() ??
    requestUrl.protocol.replace(":", "");
  const host =
    firstHeaderValue(request.headers.get("x-forwarded-host")) ??
    firstHeaderValue(request.headers.get("x-vercel-forwarded-host")) ??
    firstHeaderValue(request.headers.get("x-original-host")) ??
    forwardedHost?.[1] ??
    forwardedHost?.[2]?.trim() ??
    firstHeaderValue(request.headers.get("host"));
  const derivedOrigin = normalizeOrigin(
    host ? `${protocol}://${host}` : requestUrl.origin,
  );
  const configuredOrigin = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]
    .map(normalizeOrigin)
    .find((origin) => origin && !isLocalOrigin(origin));

  if (derivedOrigin && !isLocalOrigin(derivedOrigin)) return derivedOrigin;

  return configuredOrigin ?? derivedOrigin ?? site.url;
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
