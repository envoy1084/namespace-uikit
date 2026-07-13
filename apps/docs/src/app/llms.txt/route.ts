import { absoluteUrl, requestOrigin, textHeaders } from "@/lib/llms";
import { site } from "@/lib/site";
import { source } from "@/lib/source";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const origin = requestOrigin(request);
  const pages = source.getPages();
  const lines = [
    `# ${site.name} Documentation`,
    "",
    `> ${site.description}`,
    "",
    `- [Complete documentation](${absoluteUrl("/llms-full.txt", origin)}): All documentation in one text file.`,
    "",
    "## Documentation",
    "",
    ...pages.map((page) => {
      const description = page.data.description
        ? `: ${page.data.description}`
        : "";

      return `- [${page.data.title}](${absoluteUrl(`${page.url}.mdx`, origin)})${description}`;
    }),
  ];

  return new Response(lines.join("\n"), { headers: textHeaders });
}
