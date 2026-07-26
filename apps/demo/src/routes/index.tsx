import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@thenamespace/uikit";
import {
  ArrowUpRight01Icon,
  GithubIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";
import { NameRegistration } from "ens-components";

export const Route = createFileRoute("/")({ component: Home });

const toolkitLayers = [
  {
    label: "Components",
    description:
      "Complete ENS flows with the difficult states already handled.",
  },
  {
    label: "Hooks",
    description: "Query-ready React primitives for names, prices, and status.",
  },
  {
    label: "Actions",
    description: "Typed contract calls for products that need full control.",
  },
] as const;

const toolkitScope = ["Names", "Records", "Profiles", "Subnames"] as const;

const publicExports = [
  "NameRegistration",
  "useNameAvailability",
  "getNamePrice",
  "commitName",
  "registerName",
] as const;

function Home() {
  return (
    <div className="brand-page">
      <section className="brand-hero">
        <div className="brand-hero__inner">
          <div className="brand-hero__copy">
            <p className="brand-eyebrow">
              <span aria-hidden className="brand-eyebrow__mark" />
              Open-source toolkit for ENS v2
            </p>

            <h1>Build the ENS layer your product needs.</h1>
            <p className="brand-hero__lede">
              A growing set of React components, hooks, and typed actions for
              names, records, profiles, and the ENS flows still to come.
            </p>

            <div className="brand-hero__actions">
              <NameRegistration
                messages={{ triggerLabel: "Try name registration" }}
                slots={{
                  trigger: (
                    <Button className="brand-primary-action" size="lg">
                      Try name registration
                      <HugeiconsIcon
                        aria-hidden
                        icon={ArrowUpRight01Icon}
                        size={18}
                      />
                    </Button>
                  ),
                }}
              />
              <a
                className="brand-secondary-action"
                href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
                rel="noreferrer"
                target="_blank"
              >
                <HugeiconsIcon aria-hidden icon={GithubIcon} size={18} />
                Read the source
              </a>
            </div>

            <p className="brand-hero__note">
              The first complete component ships today. The system is designed
              to grow with the rest of ENS.
            </p>
          </div>

          <div className="brand-hero__stage">
            <div className="brand-stage__header">
              <span>Growing toolkit</span>
              <span>ENS v2</span>
            </div>
            <img
              alt="Namespace ninja mascot holding a shuriken"
              className="brand-stage__mascot"
              height="500"
              src="/images/namespace-mascot.png"
              width="628"
            />
            <div className="brand-stage__scope">
              {toolkitScope.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="toolkit-title" className="brand-toolkit">
        <div className="brand-toolkit__heading">
          <p className="brand-section-label">How it fits together</p>
          <h2 id="toolkit-title">One toolkit. Three levels of control.</h2>
        </div>

        <div className="brand-toolkit__layers">
          {toolkitLayers.map((layer) => (
            <article className="brand-toolkit__layer" key={layer.label}>
              <h3>{layer.label}</h3>
              <p>{layer.description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="brand-export-strip" aria-label="Selected package exports">
        <span className="brand-export-strip__label">Inside the package</span>
        <div className="brand-export-strip__items">
          {publicExports.map((item) => (
            <code key={item}>{item}</code>
          ))}
        </div>
      </div>

      <section
        aria-labelledby="registration-title"
        className="brand-demo"
        id="playground"
      >
        <div className="brand-demo__copy">
          <p className="brand-section-label">Available now · Component 01</p>
          <h2 id="registration-title">Name registration, end to end.</h2>
          <p>
            Availability, pricing, commitment timing, payment approval, and
            registration—composed into one production-ready flow.
          </p>
          <div className="brand-demo__meta">
            <span>Inline or dialog</span>
            <span>Custom slots and messages</span>
            <span>Lifecycle callbacks</span>
          </div>
        </div>

        <div className="brand-demo__component">
          <div className="brand-demo__component-header">
            <span>Live on Sepolia</span>
            <code>presentation=&quot;inline&quot;</code>
          </div>
          <NameRegistration
            messages={{
              searchDescription: "Find and register your ENS v2 name",
            }}
            presentation="inline"
          />
        </div>
      </section>

      <footer className="brand-footer">
        <a className="brand-footer__mark" href="/" aria-label="ENS Components">
          <img alt="" height="32" src="/namespace.svg" width="32" />
          <span>ENS Components</span>
        </a>
        <p>Open source. Built by Namespace for the ENS ecosystem.</p>
        <a
          href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
          <HugeiconsIcon aria-hidden icon={ArrowUpRight01Icon} size={15} />
        </a>
      </footer>
    </div>
  );
}
