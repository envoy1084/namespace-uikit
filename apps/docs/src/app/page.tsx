import Link from "next/link";

import { ArrowRight, CheckShapeFill } from "@gravity-ui/icons";
import { buttonVariants } from "@thenamespace/uikit";

import { ThemeToggle } from "@/components/fumadocs/ui/theme-toggle";
import { GitHubLink } from "@/components/github-link";
import { HomeShowcase } from "@/components/home-showcase";
import { NamespaceLogo } from "@/components/namespace-logo";
import { GitHubIcon } from "@/icons/github";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="bg-background/90 sticky top-0 z-50 h-14 border-b border-transparent backdrop-blur-md">
        <nav className="mx-auto flex h-full w-full max-w-[1400px] items-center gap-6 px-4 md:px-6">
          <Link aria-label="Namespace UIKit home" href="/">
            <NamespaceLogo />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            <Link
              className="text-muted hover:text-foreground px-2 py-1.5 text-sm transition-colors"
              href="/docs/getting-started"
            >
              Docs
            </Link>
            <Link
              className="text-muted hover:text-foreground px-2 py-1.5 text-sm transition-colors"
              href="/docs/components"
            >
              Components
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle mode="light-dark" />
            <GitHubLink />
          </div>
        </nav>
      </header>

      <main className="flex min-h-[calc(100vh-3.5rem)] flex-col">
        <section className="flex flex-1 flex-col items-center px-4 pt-12 text-center md:pt-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <a
              className="bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft-hover flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-colors"
              href="https://www.ens.domains/ecosystem"
              rel="noreferrer"
              target="_blank"
            >
              <CheckShapeFill className="size-3.5" />
              Official ENS Service Provider
            </a>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Build for Web3.{" "}
              <span className="text-muted/70 block">ENS-ready by design.</span>
            </h1>
            <p className="text-muted mt-4 max-w-2xl text-balance md:text-lg">
              Namespace UIKit is a modern React component library for shipping
              accessible Web3 products, ENS registration flows, and
              decentralized identity experiences faster.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                className={buttonVariants({ variant: "primary" })}
                href="/docs/getting-started"
              >
                Get started <ArrowRight className="size-4" />
              </Link>
              <Link
                className={buttonVariants({ variant: "outline" })}
                href="/docs/components"
              >
                View components
              </Link>
            </div>
            <a
              className="text-muted hover:text-foreground mt-4 flex items-center gap-2 text-xs transition-colors"
              href="https://github.com/thenamespace/uikit"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon className="size-4" />
              Open source on GitHub
            </a>
          </div>

          <div className="flex w-full max-w-[1200px] flex-1 flex-col py-8 lg:py-12">
            <HomeShowcase />
          </div>
        </section>

        <footer className="text-muted flex w-full flex-wrap items-center justify-center gap-2 py-5 text-sm">
          <span>© {new Date().getFullYear()} Namespace.</span>
          <a
            className="hover:text-foreground transition-colors"
            href="https://namespace.ninja"
            rel="noreferrer"
            target="_blank"
          >
            Built for the decentralized web.
          </a>
        </footer>
      </main>
    </div>
  );
}
