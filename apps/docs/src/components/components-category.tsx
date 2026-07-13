import { source } from "@/lib/source";

import componentMeta from "../../content/docs/components/meta.json";
import { ComponentItem } from "./component-item";

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
    <div className="not-prose flex flex-col gap-12">
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {slugs.map((slug) => {
          const page = source.getPage(["components", slug]);
          if (!page) return null;

          return (
            <ComponentItem
              href={page.url}
              imageName={slug}
              key={slug}
              title={page.data.title}
            />
          );
        })}
      </div>
    </div>
  );
}
