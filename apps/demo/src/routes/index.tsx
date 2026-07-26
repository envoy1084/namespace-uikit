import { createFileRoute } from "@tanstack/react-router";

import { Button, Surface } from "@thenamespace/uikit";
import {
  ArrowUpRight01Icon,
  GithubIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";
import { NameRegistration } from "ens-components";

export const Route = createFileRoute("/")({ component: Home });

const capabilities = [
  {
    eyebrow: "01",
    title: "Complete registration flow",
    description:
      "Availability, pricing, commitment timing, payment approval, and registration in one component.",
  },
  {
    eyebrow: "02",
    title: "Built for ENS v2",
    description:
      "Typed Viem actions and TanStack Query hooks backed by the ENS v2 contracts.",
  },
  {
    eyebrow: "03",
    title: "Made to fit your product",
    description:
      "Choose inline or dialog presentation, then customize messages, artwork, and lifecycle events.",
  },
] as const;

function Home() {
  return (
    <div className="overflow-hidden">
      <section className="demo-hero relative isolate">
        <div aria-hidden className="demo-grid absolute inset-0 -z-20" />
        <div
          aria-hidden
          className="demo-glow absolute top-0 left-1/2 -z-10 -translate-x-1/2"
        />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,1.1fr)] lg:gap-20 lg:py-24">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <div className="border-foreground/10 bg-background/70 mb-7 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <span className="size-1.5 rounded-full bg-[#5b8def]" />
              ENS v2 · Sepolia testnet
            </div>

            <h1 className="text-foreground text-5xl leading-[0.98] font-semibold tracking-[-0.055em] text-balance sm:text-6xl lg:text-7xl">
              ENS experiences, ready to ship.
            </h1>
            <p className="text-muted mx-auto mt-6 max-w-lg text-base leading-7 text-balance sm:text-lg lg:mx-0">
              Production-ready React components, hooks, and contract actions for
              building ENS v2 registration into your app.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <NameRegistration
                messages={{ triggerLabel: "Open dialog demo" }}
                slots={{
                  trigger: (
                    <Button className="w-full sm:w-auto" size="lg">
                      Open dialog demo
                      <HugeiconsIcon
                        aria-hidden
                        icon={ArrowUpRight01Icon}
                        size={17}
                      />
                    </Button>
                  ),
                }}
              />
              <a
                className="border-foreground/12 text-foreground hover:bg-foreground/5 flex h-11 w-full items-center justify-center gap-2 rounded-xl border bg-white px-5 text-sm font-medium shadow-sm transition-colors sm:w-auto"
                href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
                rel="noreferrer"
                target="_blank"
              >
                <HugeiconsIcon aria-hidden icon={GithubIcon} size={17} />
                View on GitHub
              </a>
            </div>

            <div className="text-muted mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs lg:justify-start">
              <span>React 19</span>
              <span
                aria-hidden
                className="bg-foreground/20 size-1 rounded-full"
              />
              <span>Viem + Wagmi</span>
              <span
                aria-hidden
                className="bg-foreground/20 size-1 rounded-full"
              />
              <span>TypeScript-first</span>
            </div>
          </div>

          <div id="playground" className="relative scroll-mt-24">
            <div
              aria-hidden
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-white/55 blur-2xl"
            />
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-muted text-xs font-medium tracking-wide uppercase">
                Live inline presentation
              </p>
              <code className="text-muted bg-foreground/5 rounded-md px-2 py-1 text-[11px]">
                presentation=&quot;inline&quot;
              </code>
            </div>
            <div className="demo-component-frame relative mx-auto w-full max-w-md rounded-[2rem] p-1.5">
              <NameRegistration
                messages={{
                  searchDescription: "Find and register your ENS v2 name",
                }}
                presentation="inline"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-foreground/8 border-y bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mb-10 max-w-2xl">
            <p className="text-muted mb-3 text-xs font-medium tracking-[0.16em] uppercase">
              One integration, the full journey
            </p>
            <h2 className="text-foreground text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              The hard parts of ENS registration, handled.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {capabilities.map((capability) => (
              <Surface
                className="border-foreground/8 rounded-2xl border p-6 shadow-none"
                key={capability.eyebrow}
              >
                <span className="text-muted text-xs font-medium">
                  {capability.eyebrow}
                </span>
                <h3 className="text-foreground mt-8 text-lg font-semibold tracking-[-0.02em]">
                  {capability.title}
                </h3>
                <p className="text-muted mt-2 text-sm leading-6">
                  {capability.description}
                </p>
              </Surface>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-background">
        <div className="text-muted mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs sm:flex-row sm:px-8">
          <p>Open-source components for the ENS ecosystem.</p>
          <p>Built by Namespace.</p>
        </div>
      </footer>
    </div>
  );
}
