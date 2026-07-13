import { pageText, requestOrigin, textHeaders } from "@/lib/llms";
import { source } from "@/lib/source";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const origin = requestOrigin(request);
  const pages = source.getPages();
  const content = await Promise.all(
    pages.map((page) => pageText(page, origin)),
  );

  return new Response(content.join("\n\n"), { headers: textHeaders });
}
