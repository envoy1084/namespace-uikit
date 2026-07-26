import { createFileRoute } from "@tanstack/react-router";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NameRegistration } from "ens-components";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-8 p-6">
      <div className="flex items-center gap-3">
        <ConnectButton showBalance={false} />
        <NameRegistration messages={{ triggerLabel: "Open registration" }} />
      </div>
      <NameRegistration presentation="inline" />
    </main>
  );
}
