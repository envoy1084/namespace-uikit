import { Button, Drawer } from "@thenamespace/uikit";
import {
  type IconSvgElement,
  Menu01Icon,
  Notification01Icon,
  Mail01Icon,
  Settings01Icon,
  Home01Icon,
  Search01Icon,
  UserIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Navigation() {
  const navItems: {
    icon: IconSvgElement;
    label: string;
  }[] = [
    { icon: Home01Icon, label: "Home" },
    { icon: Search01Icon, label: "Search" },
    { icon: Notification01Icon, label: "Notifications" },
    { icon: Mail01Icon, label: "Messages" },
    { icon: UserIcon, label: "Profile" },
    { icon: Settings01Icon, label: "Settings" },
  ];

  return (
    <Drawer>
      <Button variant="secondary">
        <HugeiconsIcon icon={Menu01Icon} />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className="text-foreground hover:bg-default flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors"
                    type="button"
                  >
                    <HugeiconsIcon
                      className="text-muted size-5"
                      icon={item.icon}
                    />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
