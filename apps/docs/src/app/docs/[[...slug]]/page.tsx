import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createRelativeLink } from "fumadocs-ui/mdx";

import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/fumadocs/layouts/notebook/page";
import { PageActions } from "@/components/page-actions";
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
      <section className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <DocsTitle>{page.data.title}</DocsTitle>
          <PageActions
            markdownUrl={
              slug?.length ? `/llms.mdx/${slug.join("/")}` : "/docs.mdx"
            }
          />
        </div>
        <DocsDescription className="text-md mt-2 mb-4">
          {page.data.description}
        </DocsDescription>
      </section>
      <DocsBody className="prose-sm">
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
