"use client";

import { buttonVariants } from "@thenamespace/uikit";
import { Rocket01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import LinkRoot from "fumadocs-core/link";

import { DemoShowcase } from "@/components/demo-showcase";
import { GitHubIcon } from "@/icons/github";

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      <section className="z-10 flex min-h-0 flex-1 flex-col items-center px-4 pt-12 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
          <LinkRoot
            className="bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft-hover flex items-center gap-1 rounded-full px-2 py-1 text-xs transition-colors"
            href="/docs/getting-started"
          >
            <HugeiconsIcon icon={Rocket01Icon} className="size-3 shrink-0" />
            Namespace UIKit v0.1.0
          </LinkRoot>
          <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:mt-4 lg:text-5xl">
            Beautiful by default.
            <div className="text-muted/70">Built for Namespace.</div>
          </h1>
          <p className="text-muted text-balance md:text-lg">
            Namespace UIKit is a modern React component library for building
            accessible, consistent, and delightful products for the
            decentralized web.
          </p>
          <div className="mt-4 flex gap-3">
            <LinkRoot
              className={buttonVariants({ variant: "primary" })}
              href="/docs/getting-started"
            >
              Get started
            </LinkRoot>
            <LinkRoot
              className={buttonVariants({ variant: "outline" })}
              href="/docs/components"
            >
              View components
            </LinkRoot>
          </div>
          <a
            className="text-muted hover:text-foreground mt-2 flex items-center justify-around gap-2 text-xs transition-colors lg:mt-4"
            href="https://github.com/thenamespace/uikit"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
            <span>Open source on GitHub</span>
          </a>
        </div>
        <DemoShowcase />
      </section>
      <footer className="text-muted mt-auto flex w-full flex-row flex-wrap items-center justify-center gap-2 py-3">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Namespace. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
