"use client";

// @demo-title With Dropdowns
import { Avatar, Button, Dropdown } from "@thenamespace/uikit";
import { Navbar } from "@thenamespace/uikit";
import { ArrowDown01Icon, Icon } from "@thenamespace/uikit/icons";

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

export const DemoWithDropdownsExample = () => (
  <div className="border-border w-full overflow-hidden rounded-xl border">
    <Navbar position="static">
      <Navbar.Header>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Content>
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="ghost">
                Acme Inc. <Icon icon={ArrowDown01Icon} />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu>
                {["Acme Inc.", "Namespace UIKit", "Namespace"].map((x) => (
                  <Dropdown.Item id={x} key={x}>
                    {x}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Spacer />
        <Navbar.Content className="hidden md:flex">
          {["Overview", "Projects", "Team", "Settings"].map((x) => (
            <Navbar.Item key={x}>{x}</Navbar.Item>
          ))}
        </Navbar.Content>
        <Navbar.Spacer />
        <UserMenu />
        <Navbar.MenuToggle className="md:hidden" />
      </Navbar.Header>
    </Navbar>
  </div>
);
