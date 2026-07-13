import { notFound } from "next/navigation";

import { pageText, requestOrigin, textHeaders } from "@/lib/llms";
import { source } from "@/lib/source";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const page = source.getPage([]);

  if (!page) notFound();

  return new Response(await pageText(page, requestOrigin(request)), {
    headers: textHeaders,
  });
}
