import { notFound } from "next/navigation";

import { pageText, textHeaders } from "@/lib/llms";
import { source } from "@/lib/source";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  return new Response(await pageText(page), {
    headers: textHeaders,
  });
}
