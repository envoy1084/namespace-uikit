import type { DocsPage } from "@/lib/source";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getDemo } from "@/demos";
import { site } from "@/lib/site";

export const textHeaders = {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  "Content-Type": "text/plain; charset=utf-8",
} as const;

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

      const code = await readFile(
        join(process.cwd(), "src/demos", demo.file),
        "utf8",
      );

      return `\`\`\`tsx\n${code}\n\`\`\``;
    },
  );

  return replaceAsync(
    withFreeExamples,
    /<ProExamples\s+component=["']([^"']+)["'][^>]*\/>/g,
    async (match) => {
      const component = match[1] ?? "";
      const storyPath = join(
        process.cwd(),
        "../../apps/storybook/src/components",
        component,
        `${component}.stories.tsx`,
      );

      try {
        const code = await readFile(storyPath, "utf8");

        return `\`\`\`tsx\n${code}\n\`\`\``;
      } catch {
        return `\`\`\`tsx\nimport * as Component from "@thenamespace/uikit/${component}";\n\`\`\``;
      }
    },
  );
}

export async function pageText(page: DocsPage) {
  const filePath = join(process.cwd(), "content/docs", page.path);
  const source = await readFile(filePath, "utf8");
  const rawBody = source.replace(/^---\n[\s\S]*?\n---\n?/, "").trim();
  const body = await expandExamples(rawBody);

  return `<page url="${absoluteUrl(page.url)}">
# ${page.data.title}

> ${page.data.description ?? ""}

${body}
</page>`;
}
