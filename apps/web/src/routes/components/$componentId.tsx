import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Button } from "@thenamespace/uikit";
import { Icon, ArrowLeft02Icon } from "@thenamespace/uikit/icons";

import { getComponent } from "../../showcase/catalog";
import { DocsShell } from "../index";

export const Route = createFileRoute("/components/$componentId")({
  component: ComponentPage,
  loader: ({ params }) => {
    const component = getComponent(params.componentId);

    if (!component) {
      throw notFound();
    }

    return { component };
  },
});

function ComponentPage() {
  const { component } = Route.useLoaderData();

  return (
    <DocsShell>
      <main className="docs-main">
        <header className="page-heading component-heading">
          <Link className="back-link" to="/">
            <Icon color="currentColor" icon={ArrowLeft02Icon} size={17} />
            All components
          </Link>
          <p>{component.category}</p>
          <div className="component-title-row">
            <h1>{component.title}</h1>
            <Button size="sm" variant="secondary">
              {component.examples.length} preview
              {component.examples.length === 1 ? "" : "s"}
            </Button>
          </div>
          <span>{component.description}</span>
        </header>

        <section className="example-stack">
          {component.examples.map((example) => (
            <article
              className="component-example"
              data-size={example.size}
              key={example.title}
            >
              <header>
                <h2>{example.title}</h2>
                {example.description ? <p>{example.description}</p> : null}
              </header>
              <div className="example-preview">{example.preview}</div>
            </article>
          ))}
        </section>
      </main>
    </DocsShell>
  );
}
