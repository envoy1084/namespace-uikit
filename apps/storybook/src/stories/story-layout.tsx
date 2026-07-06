import type { ComponentEntry } from "../showcase/catalog";
import {
  components,
  getComponent,
  getComponentsByCategory,
} from "../showcase/catalog";

// oxlint-disable-next-line import/no-unassigned-import -- Storybook CSS is loaded for side effects.
import "../showcase/showcase.css";

export function ComponentStory({ id }: { id: string }) {
  const component = getComponent(id);

  if (!component) {
    return (
      <main className="storybook-component-page">
        <header className="page-heading component-heading">
          <p>Missing component</p>
          <h1>{id}</h1>
        </header>
      </main>
    );
  }

  return <ComponentPage component={component} />;
}

export function ComponentsOverview() {
  return (
    <main className="storybook-components-overview">
      <header className="page-heading">
        <p>@thenamespace/uikit</p>
        <h1>Component catalog</h1>
        <span>
          Consumer-facing previews rendered through the publishable package
          entrypoint.
        </span>
      </header>

      <div className="category-stack">
        {getComponentsByCategory().map((group) => (
          <section className="category-section" key={group.category}>
            <h2>{group.category}</h2>
            <div className="component-grid">
              {group.components.map((component) => (
                <OverviewCard component={component} key={component.id} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export const storyComponentIds = components.map((component) => component.id);

function ComponentPage({ component }: { component: ComponentEntry }) {
  return (
    <main className="storybook-component-page">
      <header className="page-heading component-heading">
        <p>{component.category}</p>
        <h1>{component.title}</h1>
        <span>{component.description}</span>
      </header>

      <div className="example-stack">
        {component.examples.map((example) => (
          <section
            className="component-example"
            data-size={example.size}
            key={example.title}
          >
            <header>
              <h2>{example.title}</h2>
              {example.description ? <p>{example.description}</p> : null}
            </header>
            <div className="example-preview">{example.preview}</div>
          </section>
        ))}
      </div>
    </main>
  );
}

function OverviewCard({ component }: { component: ComponentEntry }) {
  const example = component.examples[0];

  return (
    <article className="component-card">
      <div className="component-card-preview">
        {example ? (
          example.preview
        ) : (
          <span className="storybook-preview-empty">No preview</span>
        )}
      </div>
      <div className="component-card-copy">
        <strong>{component.title}</strong>
        <span>{component.description}</span>
      </div>
    </article>
  );
}
