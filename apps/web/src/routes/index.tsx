import { Link, createFileRoute } from "@tanstack/react-router";

import { Button, Switch, useTheme } from "@thenamespace/uikit";
import { Icon, Moon02Icon, Sun03Icon } from "@thenamespace/uikit/icons";

import { components, getComponentsByCategory } from "../showcase/catalog";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <DocsShell>
      <main className="docs-main">
        <header className="page-heading">
          <p>Overview</p>
          <h1>All Components</h1>
          <span>{components.length} live component previews</span>
        </header>

        <div className="category-stack">
          {getComponentsByCategory().map((group) => (
            <section
              className="category-section"
              id={slugify(group.category)}
              key={group.category}
            >
              <h2>{group.category}</h2>
              <div className="component-grid">
                {group.components.map((component) => (
                  <Link
                    className="component-card"
                    key={component.id}
                    to="/components/$componentId"
                    params={{ componentId: component.id }}
                  >
                    <div className="component-card-preview">
                      {component.examples[0]?.preview}
                    </div>
                    <div className="component-card-copy">
                      <strong>{component.title}</strong>
                      <span>{component.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </DocsShell>
  );
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme("system");
  const isDark = resolvedTheme === "dark";

  return (
    <div className="docs-app">
      <aside className="docs-sidebar">
        <div className="sidebar-brand">
          <Link to="/">Namespace UI</Link>
          <Button
            aria-label="Back to all components"
            size="sm"
            variant="ghost"
            onPress={() => setTheme("system")}
          >
            System
          </Button>
        </div>
        <div className="sidebar-theme">
          <Icon
            color="currentColor"
            icon={isDark ? Moon02Icon : Sun03Icon}
            size={17}
          />
          <Switch
            aria-label="Toggle dark theme"
            isSelected={isDark}
            onChange={(selected) => setTheme(selected ? "dark" : "light")}
            size="sm"
          >
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <span>{isDark ? "Dark" : "Light"}</span>
            </Switch.Content>
          </Switch>
        </div>
        <nav className="sidebar-nav" aria-label="Components">
          <Link activeProps={{ "data-active": "true" }} to="/">
            All Components
          </Link>
          {getComponentsByCategory().map((group) => (
            <div className="sidebar-group" key={group.category}>
              <span>{group.category}</span>
              {group.components.map((component) => (
                <Link
                  activeProps={{ "data-active": "true" }}
                  key={component.id}
                  to="/components/$componentId"
                  params={{ componentId: component.id }}
                >
                  {component.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      {children}
    </div>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
