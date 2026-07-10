import { createFileRoute } from "@tanstack/react-router";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <ConnectButton showBalance={false} />
    </div>
  );
}
