import Link from "next/link";

import { source } from "@/lib/source";

import componentMeta from "../../content/docs/components/meta.json";

function groups() {
  const result = new Map<string, string[]>();
  let category = "Components";

  for (const item of componentMeta.pages) {
    const separator = item.match(/^---(.+)---$/);
    if (separator) {
      category = separator[1];
      result.set(category, []);
    } else if (item !== "index") {
      const entries = result.get(category) ?? [];
      entries.push(item);
      result.set(category, entries);
    }
  }

  return result;
}

export function ComponentsCategory({ category }: { category: string }) {
  const slugs = groups().get(category) ?? [];

  return (
    <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {slugs.map((slug) => {
        const page = source.getPage(["components", slug]);
        if (!page) return null;

        return (
          <Link
            className="group border-separator bg-surface hover:bg-surface-secondary flex min-h-36 flex-col justify-between rounded-xl border p-4 no-underline transition-colors"
            href={page.url}
            key={slug}
          >
            <div className="bg-background text-muted group-hover:text-foreground flex h-16 items-center justify-center rounded-lg text-sm font-medium transition-colors">
              {page.data.title}
            </div>
            <div className="mt-4">
              <div className="text-foreground font-medium">
                {page.data.title}
              </div>
              <p className="text-muted mt-1 line-clamp-2 text-xs">
                {page.data.description}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
