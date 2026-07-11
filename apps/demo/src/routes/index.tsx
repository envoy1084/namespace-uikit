import { createFileRoute } from "@tanstack/react-router";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RegisterEns } from "@thenamespace/ens-components";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div>
      <ConnectButton showBalance={false} />
      <RegisterEns />
    </div>
  );
}
