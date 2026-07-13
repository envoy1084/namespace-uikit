"use client";

// @demo-title Compact
import { Avatar, Button, Dropdown } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import { Icon, PlusSignIcon } from "@thenamespace/uikit/icons";

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

function UserMenu() {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button isIconOnly variant="ghost">
          <User />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="profile">Profile</Dropdown.Item>
          <Dropdown.Item id="settings">Settings</Dropdown.Item>
          <Dropdown.Item id="logout" variant="danger">
            Log out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

export const ProCompactExample = () => (
  <div className="border-border w-full overflow-hidden rounded-xl border">
    <Navbar
      height="2.75rem"
      position="static"
      size="sm"
      style={{ "--spacing": "0.22rem" } as React.CSSProperties}
    >
      <Navbar.Header>
        <Navbar.Brand>
          <Logo compact />
        </Navbar.Brand>
        <Navbar.Content>
          {["Home", "Projects", "Tasks"].map((x) => (
            <Navbar.Item key={x} isCurrent={x === "Home"}>
              {x}
            </Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Spacer />
        <Button isIconOnly size="sm" variant="ghost">
          <Icon icon={PlusSignIcon} />
        </Button>
        <UserMenu />
      </Navbar.Header>
    </Navbar>
  </div>
);
