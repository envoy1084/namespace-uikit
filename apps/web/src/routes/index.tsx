import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@thenamespace/uikit";
import { Icon, Notification03Icon } from "@thenamespace/uikit/icons";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="bg-background text-foreground min-h-svh px-6 py-12">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="text-muted flex items-center gap-3 text-sm font-medium">
          <Icon
            color="currentColor"
            icon={Notification03Icon}
            size={20}
            strokeWidth={1.5}
          />
          <span>Namespace UI Kit</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-normal">
            Vite app wired to the local uikit.
          </h1>
          <p className="text-muted max-w-2xl text-base leading-7">
            This page uses TanStack Router, Tailwind CSS, HeroUI components, and
            the uikit icon alias from the workspace package.
          </p>
        </div>

        <div>
          <Button>Ready</Button>
        </div>
      </section>
    </main>
  );
}
