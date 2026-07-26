import { Navbar } from "@thenamespace/uikit";

import { ConnectButton } from "@/components/connect-button";
import { NamespaceLogo } from "@/components/icons/namespace";

export function AppNavbar() {
  return (
    <Navbar
      className="border-foreground/8 bg-background/85 border-b backdrop-blur-xl"
      maxWidth="xl"
    >
      <Navbar.Header className="px-4 sm:px-6">
        <Navbar.Brand>
          <a
            className="flex items-center gap-2.5"
            href="/"
            aria-label="ENS Components home"
          >
            <span className="border-foreground/10 grid size-9 place-items-center rounded-xl border bg-white shadow-sm">
              <NamespaceLogo aria-hidden className="size-5" />
            </span>
            <span className="hidden text-base font-semibold tracking-[-0.02em] sm:inline">
              ENS Components
            </span>
          </a>
        </Navbar.Brand>
        <Navbar.Spacer />
        <Navbar.Content className="mr-2 hidden lg:flex">
          <Navbar.Item href="#playground">Playground</Navbar.Item>
          <Navbar.Item href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components">
            Documentation
          </Navbar.Item>
        </Navbar.Content>
        <ConnectButton />
      </Navbar.Header>
    </Navbar>
  );
}
