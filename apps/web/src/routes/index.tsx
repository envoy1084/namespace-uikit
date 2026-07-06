import type { ReactNode } from "react";

import { createFileRoute } from "@tanstack/react-router";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Chip,
  Code,
  Input,
  Kbd,
  ProgressBar,
  Radio,
  RadioGroup,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Tabs,
  Tooltip,
  useTheme,
} from "@thenamespace/uikit";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  CodeIcon,
  ColorPickerIcon,
  Database01Icon,
  Icon,
  LayoutGridIcon,
  MagicWand01Icon,
  Moon02Icon,
  Notification03Icon,
  PackageIcon,
  Search01Icon,
  Settings02Icon,
  Shield01Icon,
  Sun03Icon,
} from "@thenamespace/uikit/icons";

export const Route = createFileRoute("/")({ component: Home });

const buttonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
] as const;

const brandSwatches = [
  ["Black 950", "#1f1f1f", "Foreground, dark canvas"],
  ["Black 600", "#363636", "Elevated dark controls"],
  ["Black 300", "#878787", "Muted copy"],
  ["Black 200", "#bcbcbc", "Quiet borders"],
  ["Black 100", "#dadada", "Dividers"],
  ["Off White", "#f4f4f4", "Light canvas"],
  ["White", "#ffffff", "Surface"],
  ["Skylume", "#5474f6", "Accent"],
  ["Danger", "#ff6262", "Critical"],
] as const;

const componentMap = [
  "Button",
  "Card",
  "Input",
  "Switch",
  "Badge",
  "Chip",
  "Tabs",
  "Tooltip",
  "Progress",
  "Avatar",
  "Alert",
  "Skeleton",
] as const;

function Home() {
  return (
    <main className="bg-background text-foreground min-h-svh">
      <HeroSection />
      <section className="showcase-shell">
        <ThemeTile />
        <ButtonStatesTile />
        <BrandPaletteTile />
        <InputsTile />
        <FeedbackTile />
        <NavigationTile />
        <IdentityTile />
        <ControlsTile />
        <LoadingTile />
        <ProtocolTile />
      </section>
    </main>
  );
}

function HeroSection() {
  return (
    <section className="hero-band">
      <div className="hero-copy">
        <div className="hero-eyebrow">
          <Icon
            color="currentColor"
            icon={LayoutGridIcon}
            size={20}
            strokeWidth={1.5}
          />
          <span>Namespace UI Kit Preview</span>
        </div>
        <h1>One page to inspect the whole component language.</h1>
        <p>
          A free-flow mosaic for the local package, built with the real
          `@thenamespace/uikit` exports and the current Namespace theme tokens.
        </p>
      </div>
      <div className="hero-meter" aria-label="Showcase summary">
        <span>10 tiles</span>
        <span>9 brand tokens</span>
        <span>light + dark</span>
      </div>
    </section>
  );
}

function MosaicTile({
  children,
  eyebrow,
  icon,
  title,
  tone = "default",
}: {
  children: ReactNode;
  eyebrow: string;
  icon: typeof LayoutGridIcon;
  title: string;
  tone?: "default" | "accent" | "dark" | "soft";
}) {
  return (
    <section className={`mosaic-tile tone-${tone}`}>
      <header className="tile-header">
        <div className="tile-kicker">
          <Icon color="currentColor" icon={icon} size={17} strokeWidth={1.5} />
          <span>{eyebrow}</span>
        </div>
        <h2>{title}</h2>
      </header>
      {children}
    </section>
  );
}

function ThemeTile() {
  const { resolvedTheme, setTheme, theme } = useTheme("system");
  const isDark = resolvedTheme === "dark";

  return (
    <MosaicTile
      eyebrow="Theme"
      icon={Sun03Icon}
      title="Switch the entire preview"
      tone="accent"
    >
      <div className="theme-stage">
        <div className="theme-icon-plate">
          <Icon
            color="currentColor"
            icon={isDark ? Moon02Icon : Sun03Icon}
            size={34}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <p className="tile-copy">
            `useTheme` writes the class and `data-theme` attribute on the
            document. The current resolved theme is{" "}
            <strong>{resolvedTheme ?? "loading"}</strong>.
          </p>
          <div className="theme-actions">
            <Switch
              aria-label="Toggle dark theme"
              isSelected={isDark}
              onChange={(selected) => setTheme(selected ? "dark" : "light")}
              size="md"
            >
              <Switch.Content>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
                <span>{isDark ? "Dark" : "Light"}</span>
              </Switch.Content>
            </Switch>
            <Button
              onPress={() => setTheme("system")}
              size="sm"
              variant={theme === "system" ? "primary" : "outline"}
            >
              System
            </Button>
          </div>
        </div>
      </div>
    </MosaicTile>
  );
}

function ButtonStatesTile() {
  return (
    <MosaicTile
      eyebrow="Actions"
      icon={ArrowRight02Icon}
      title="Button variants and states"
    >
      <div className="button-matrix">
        {buttonVariants.map((variant) => (
          <Button key={variant} size="sm" variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <Separator />
      <div className="state-row">
        <Button size="lg" variant="primary">
          <Icon
            color="currentColor"
            icon={MagicWand01Icon}
            size={18}
            strokeWidth={1.5}
          />
          Compose
        </Button>
        <Button isDisabled size="lg" variant="secondary">
          Disabled
        </Button>
        <Button isIconOnly aria-label="Open settings" size="lg" variant="ghost">
          <Icon
            color="currentColor"
            icon={Settings02Icon}
            size={20}
            strokeWidth={1.5}
          />
        </Button>
      </div>
      <div className="state-grid">
        <StateSpec label="default" value="Ready for primary commands" />
        <StateSpec label="hover" value="Native component styles" />
        <StateSpec label="disabled" value="Muted but still readable" />
        <StateSpec label="icon-only" value="Stable square hit target" />
      </div>
    </MosaicTile>
  );
}

function StateSpec({ label, value }: { label: string; value: string }) {
  return (
    <div className="state-spec">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
}

function BrandPaletteTile() {
  return (
    <MosaicTile
      eyebrow="Tokens"
      icon={ColorPickerIcon}
      title="Namespace brand palette"
      tone="soft"
    >
      <div className="swatch-field">
        {brandSwatches.map(([name, value, usage]) => (
          <div className="swatch" key={name}>
            <span className="swatch-chip" style={{ backgroundColor: value }} />
            <div>
              <strong>{name}</strong>
              <code>{value}</code>
              <p>{usage}</p>
            </div>
          </div>
        ))}
      </div>
    </MosaicTile>
  );
}

function InputsTile() {
  return (
    <MosaicTile eyebrow="Forms" icon={Search01Icon} title="Inputs and choice">
      <div className="form-stack">
        <Input
          aria-label="Project name"
          defaultValue="Namespace Console"
          fullWidth
          placeholder="Project name"
          variant="primary"
        />
        <Input
          aria-label="Search components"
          fullWidth
          placeholder="Search components"
          variant="secondary"
        />
        <Checkbox defaultSelected>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <span>Include interactive states</span>
          </Checkbox.Content>
        </Checkbox>
        <RadioGroup
          aria-label="Density"
          className="density-group"
          defaultValue="comfortable"
          variant="secondary"
        >
          <Radio value="compact">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <span>Compact</span>
            </Radio.Content>
          </Radio>
          <Radio value="comfortable">
            <Radio.Content>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <span>Comfortable</span>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </div>
    </MosaicTile>
  );
}

function FeedbackTile() {
  return (
    <MosaicTile
      eyebrow="Feedback"
      icon={Notification03Icon}
      title="Status, alerts, and progress"
    >
      <Alert status="accent">
        <Alert.Indicator>
          <Icon
            color="currentColor"
            icon={CheckmarkCircle02Icon}
            size={20}
            strokeWidth={1.5}
          />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title>Tokens synced</Alert.Title>
          <Alert.Description>
            Component colors are reading from the Namespace theme variables.
          </Alert.Description>
        </Alert.Content>
      </Alert>
      <div className="progress-stack">
        <ProgressBar color="accent" value={72}>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
        <ProgressBar color="danger" size="sm" value={28}>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </div>
      <div className="feedback-row">
        <Chip color="success" variant="soft">
          Stable
        </Chip>
        <Chip color="warning" variant="secondary">
          Review
        </Chip>
        <Chip color="danger" variant="tertiary">
          Blocked
        </Chip>
      </div>
    </MosaicTile>
  );
}

function NavigationTile() {
  return (
    <MosaicTile eyebrow="Navigation" icon={PackageIcon} title="Tabs and docs">
      <Tabs defaultSelectedKey="components" variant="secondary">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Showcase sections">
            <Tabs.Tab id="components">
              <Tabs.Indicator />
              Components
            </Tabs.Tab>
            <Tabs.Tab id="tokens">
              <Tabs.Separator />
              <Tabs.Indicator />
              Tokens
            </Tabs.Tab>
            <Tabs.Tab id="usage">
              <Tabs.Separator />
              <Tabs.Indicator />
              Usage
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="components">
          <div className="component-map">
            {componentMap.map((name) => (
              <Chip key={name} color="accent" variant="soft">
                {name}
              </Chip>
            ))}
          </div>
        </Tabs.Panel>
        <Tabs.Panel id="tokens">
          <p className="tile-copy">
            The page mirrors the docs pattern of showing anatomy, variants, and
            states close together.
          </p>
        </Tabs.Panel>
        <Tabs.Panel id="usage">
          <Code>@thenamespace/uikit</Code>
        </Tabs.Panel>
      </Tabs>
    </MosaicTile>
  );
}

function IdentityTile() {
  return (
    <MosaicTile
      eyebrow="Identity"
      icon={Shield01Icon}
      title="Badges, avatars, and copy"
      tone="dark"
    >
      <div className="identity-row">
        <Avatar color="accent" size="lg">
          <Avatar.Fallback>NS</Avatar.Fallback>
        </Avatar>
        <div>
          <h3>Namespace</h3>
          <p>Internal UI primitives for product teams.</p>
        </div>
      </div>
      <div className="badge-stack">
        <Badge.Anchor>
          <Button size="sm" variant="secondary">
            Inbox
          </Button>
          <Badge color="accent" placement="top-right" variant="primary">
            <Badge.Label>3</Badge.Label>
          </Badge>
        </Badge.Anchor>
        <Kbd>
          <Kbd.Abbr keyValue="command" />
          <Kbd.Content>K</Kbd.Content>
        </Kbd>
      </div>
    </MosaicTile>
  );
}

function ControlsTile() {
  return (
    <MosaicTile
      eyebrow="Controls"
      icon={Settings02Icon}
      title="Sliders and switches"
      tone="soft"
    >
      <div className="control-panel">
        <Slider
          aria-label="Preview intensity"
          defaultValue={64}
          maxValue={100}
          minValue={0}
        >
          <Slider.Output />
          <Slider.Track>
            <Slider.Fill />
            <Slider.Thumb />
          </Slider.Track>
        </Slider>
        <Switch defaultSelected size="sm">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <span>Enable motion</span>
          </Switch.Content>
        </Switch>
        <Switch size="sm">
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            <span>Compact mode</span>
          </Switch.Content>
        </Switch>
      </div>
    </MosaicTile>
  );
}

function LoadingTile() {
  return (
    <MosaicTile
      eyebrow="Loading"
      icon={Database01Icon}
      title="Async and empty surfaces"
    >
      <div className="loading-layout">
        <Spinner color="accent" size="lg" />
        <div className="skeleton-stack" aria-hidden="true">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
      <div className="loading-note">
        <p className="tile-copy">
          Empty, loading, and pending states keep the same surface and border
          rhythm as complete content.
        </p>
      </div>
    </MosaicTile>
  );
}

function ProtocolTile() {
  return (
    <MosaicTile
      eyebrow="Reference"
      icon={CodeIcon}
      title="Composable like protocol primitives"
      tone="accent"
    >
      <div className="protocol-grid">
        <ProtocolPrimitive label="Resources" value="Design tokens" />
        <ProtocolPrimitive label="Tools" value="Components" />
        <ProtocolPrimitive label="Prompts" value="States" />
        <ProtocolPrimitive label="Tasks" value="Flows" />
      </div>
      <Tooltip>
        <Tooltip.Trigger>
          <Button size="sm" variant="outline">
            Inspect contract
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content showArrow>
          Every tile is a standalone component.
        </Tooltip.Content>
      </Tooltip>
      <Button fullWidth variant="primary">
        <Icon
          color="currentColor"
          icon={ArrowRight02Icon}
          size={18}
          strokeWidth={1.5}
        />
        Start composing
      </Button>
    </MosaicTile>
  );
}

function ProtocolPrimitive({ label, value }: { label: string; value: string }) {
  return (
    <div className="protocol-primitive">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
