import { createFileRoute } from "@tanstack/react-router";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RegisterEns } from "@thenamespace/ens-components";

import { TransactionProgressDemo } from "@/components/transaction-progress-demo";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 p-6">
      <div className="flex items-center gap-3">
        <ConnectButton showBalance={false} />
        <RegisterEns />
      </div>
      <TransactionProgressDemo />
    </main>
  );
}
