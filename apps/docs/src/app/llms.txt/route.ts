import { absoluteUrl, textHeaders } from "@/lib/llms";
import { site } from "@/lib/site";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const pages = source.getPages();
  const lines = [
    `# ${site.name} Documentation`,
    "",
    `> ${site.description}`,
    "",
    `- [Complete documentation](${absoluteUrl("/llms-full.txt")}): All documentation in one text file.`,
    "",
    "## Documentation",
    "",
    ...pages.map((page) => {
      const description = page.data.description
        ? `: ${page.data.description}`
        : "";

      return `- [${page.data.title}](${absoluteUrl(`${page.url}.mdx`)})${description}`;
    }),
  ];

  return new Response(lines.join("\n"), { headers: textHeaders });
}
