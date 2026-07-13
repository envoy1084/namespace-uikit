import { pageText, textHeaders } from "@/lib/llms";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const pages = source.getPages();
  const content = await Promise.all(pages.map(pageText));

  return new Response(content.join("\n\n"), { headers: textHeaders });
}
