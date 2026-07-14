import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { createRelativeLink } from "fumadocs-ui/mdx";

import { ComponentLinks } from "@/components/component-links";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "@/components/fumadocs/layouts/notebook/page";
import { PageActions } from "@/components/page-actions";
import { getComponentResourceLinks } from "@/lib/component-resources";
import { createPageMetadata } from "@/lib/metadata";
import { absoluteSiteUrl, site } from "@/lib/site";
import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  if (!slug?.length) redirect("/docs/getting-started");

  const page = source.getPage(slug);

  if (!page) notFound();

  const Content = page.data.body;
  const componentLinks =
    slug.length === 2 && slug[0] === "components"
      ? getComponentResourceLinks(slug[1] ?? "")
      : undefined;

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
            markdownUrl={absoluteSiteUrl(`/docs/${slug.join("/")}.mdx`)}
          />
        </div>
        <DocsDescription className="text-md mt-2 mb-4">
          {page.data.description}
        </DocsDescription>
        {componentLinks ? <ComponentLinks links={componentLinks} /> : null}
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

  const path = `/docs/${page.slugs.join("/")}`;
  const title = page.data.title;
  const description = page.data.description ?? site.description;

  return createPageMetadata({
    description,
    path,
    title,
    type: "article",
  });
}

export function generateStaticParams() {
  return source.generateParams();
}
