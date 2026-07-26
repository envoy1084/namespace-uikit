import { Navbar } from "@thenamespace/uikit";

import { ConnectButton } from "@/components/connect-button";
import { NamespaceLogo } from "@/components/icons/namespace";

export function AppNavbar() {
  return (
    <Navbar
      className="border-foreground/12 border-b bg-[#f4f4f4]"
      maxWidth="xl"
    >
      <Navbar.Header className="px-4 sm:px-6">
        <Navbar.Brand>
          <a
            className="flex items-center gap-2.5 font-bold tracking-[-0.02em]"
            href="/"
            aria-label="ENS Components home"
          >
            <span className="grid size-8 place-items-center">
              <NamespaceLogo aria-hidden className="size-6" />
            </span>
            <span className="hidden text-[15px] sm:inline">ENS Components</span>
          </a>
        </Navbar.Brand>
        <Navbar.Spacer />
        <Navbar.Content className="mr-2 hidden lg:flex">
          <Navbar.Item href="#playground">Components</Navbar.Item>
          <Navbar.Item href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components">
            Docs
          </Navbar.Item>
        </Navbar.Content>
        <ConnectButton />
      </Navbar.Header>
    </Navbar>
  );
}
