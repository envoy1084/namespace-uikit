import { notFound } from "next/navigation";

import { pageText, textHeaders } from "@/lib/llms";
import { source } from "@/lib/source";

export const revalidate = false;

export async function GET() {
  const page = source.getPage([]);

  if (!page) notFound();

  return new Response(await pageText(page), { headers: textHeaders });
}
