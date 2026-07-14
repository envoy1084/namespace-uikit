import { textHeaders } from "@/lib/llms";
import { absoluteSiteUrl, site } from "@/lib/site";
import { source } from "@/lib/source";

export const dynamic = "force-dynamic";

export function GET() {
  const pages = source.getPages();
  const lines = [
    `# ${site.name} Documentation`,
    "",
    `> ${site.description}`,
    "",
    `- [Complete documentation](${absoluteSiteUrl("/llms-full.txt")}): All documentation in one text file.`,
    "",
    "## Documentation",
    "",
    ...pages.map((page) => {
      const description = page.data.description
        ? `: ${page.data.description}`
        : "";

      return `- [${page.data.title}](${absoluteSiteUrl(`${page.url}.mdx`)})${description}`;
    }),
  ];

  return new Response(lines.join("\n"), { headers: textHeaders });
}
