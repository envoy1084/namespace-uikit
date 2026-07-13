import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createRelativeLink } from "fumadocs-ui/mdx";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/fumadocs/layouts/notebook/page";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  const Content = page.data.body;

  return (
    <DocsPage
      full={page.data.full}
      tableOfContent={{ style: "normal" }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Content
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) notFound();

  return {
    description: page.data.description,
    title: page.data.title,
  };
}

export function generateStaticParams() {
  return source.generateParams();
}
