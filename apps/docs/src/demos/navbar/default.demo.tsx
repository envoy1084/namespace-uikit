"use client";

// @demo-title Default
import { Avatar } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import {
  Icon,
  Notification02Icon,
  Search01Icon,
} from "@thenamespace/uikit/icons";

const links = ["Features", "Customers", "Integrations", "Pricing"];

const Logo = ({ compact = false }: { compact?: boolean }) => (
  <div className="flex items-center gap-2 font-semibold">
    <span className="bg-accent text-accent-foreground flex size-7 items-center justify-center rounded-lg">
      N
    </span>
    {compact ? null : <span>Namespace</span>}
  </div>
);

const User = () => (
  <Avatar className="size-7">
    <Avatar.Image alt="User avatar" src="/assets/avatars/purple.jpg" />
  </Avatar>
);

function BaseHeader({ mobile = false }: { mobile?: boolean }) {
  return (
    <Navbar.Header>
      <Navbar.Brand>
        <Logo />
      </Navbar.Brand>
      <Navbar.Spacer />
      <Navbar.Content className={mobile ? "hidden md:flex" : undefined}>
        {links.map((label) => (
          <Navbar.Item
            href={`#${label.toLowerCase()}`}
            isCurrent={label === "Customers"}
            key={label}
          >
            {label}
          </Navbar.Item>
        ))}
      </Navbar.Content>
      <Navbar.Spacer />
      <Navbar.Content>
        <Navbar.Item aria-label="Search">
          <Icon data-slot="icon" icon={Search01Icon} />
        </Navbar.Item>
        <Navbar.Item aria-label="Notifications">
          <Icon data-slot="icon" icon={Notification02Icon} />
        </Navbar.Item>
        <Navbar.Separator />
        <Navbar.Item aria-label="Profile">
          <User />
        </Navbar.Item>
      </Navbar.Content>
      {mobile ? <Navbar.MenuToggle className="md:hidden" /> : null}
    </Navbar.Header>
  );
}

export const DemoDefaultExample = () => (
  <div className="border-border w-full overflow-hidden rounded-xl border">
    <Navbar position="static">
      <BaseHeader />
    </Navbar>
  </div>
);
