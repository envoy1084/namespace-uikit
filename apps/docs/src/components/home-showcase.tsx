"use client";

import {
  ArrowRight,
  Check,
  CircleCheckFill,
  Copy,
  Globe,
  Lock,
  Magnifier,
  ShieldCheck,
} from "@gravity-ui/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Chip,
  Input,
  KPI,
  Label,
  ProgressBar,
  Tabs,
} from "@thenamespace/uikit";

const records = [
  ["ETH Address", "0x71C…F45d"],
  ["Website", "ipfs://bafy…ens"],
  ["Email", "hello@namespace.ninja"],
] as const;

function NameSearchCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between gap-3">
          <div>
            <Card.Title>Find your name</Card.Title>
            <Card.Description>Search the ENS namespace.</Card.Description>
          </div>
          <span className="bg-accent-soft text-accent-soft-foreground grid size-9 place-items-center rounded-full">
            <Magnifier className="size-4" />
          </span>
        </div>
      </Card.Header>
      <Card.Content className="mt-4 flex gap-2">
        <Input aria-label="ENS name" defaultValue="namespace" />
        <Button variant="primary">Search</Button>
      </Card.Content>
      <Card.Footer className="mt-3 flex items-center justify-between text-sm">
        <span className="text-muted">namespace.eth</span>
        <Chip color="success" size="sm">
          Available
        </Chip>
      </Card.Footer>
    </Card>
  );
}

function IdentityCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Content className="flex items-center gap-3">
        <Avatar className="size-12">
          <Avatar.Fallback>NS</Avatar.Fallback>
        </Avatar>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-semibold">namespace.eth</p>
            <CircleCheckFill className="text-accent size-4 shrink-0" />
          </div>
          <p className="text-muted truncate text-xs">0x71C4...F45d</p>
        </div>
        <Button aria-label="Copy address" isIconOnly size="sm" variant="ghost">
          <Copy className="size-4" />
        </Button>
      </Card.Content>
    </Card>
  );
}

function RecordsCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <Card.Title>Profile records</Card.Title>
        <Card.Description>Portable identity across Web3.</Card.Description>
      </Card.Header>
      <Card.Content className="divide-separator mt-3 divide-y">
        {records.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 py-2.5 text-sm"
          >
            <span className="text-muted">{label}</span>
            <span className="truncate font-mono text-xs">{value}</span>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}

function RegistrationCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <Card.Title>Register namespace.eth</Card.Title>
            <Card.Description>One year registration</Card.Description>
          </div>
          <Globe className="text-accent size-5" />
        </div>
      </Card.Header>
      <Card.Content className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted">Registration</span>
          <span>0.0038 ETH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Network fee</span>
          <span>0.0007 ETH</span>
        </div>
        <div className="border-separator flex justify-between border-t pt-3 font-semibold">
          <span>Total</span>
          <span>0.0045 ETH</span>
        </div>
      </Card.Content>
      <Card.Footer className="mt-4">
        <Button className="w-full" variant="primary">
          Continue <ArrowRight className="size-4" />
        </Button>
      </Card.Footer>
    </Card>
  );
}

function SecurityCard() {
  return (
    <Alert status="success" className="w-full max-w-sm text-left">
      <Alert.Indicator>
        <ShieldCheck className="size-5" />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Ownership verified</Alert.Title>
        <Alert.Description>
          This name is secured by your connected wallet.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

function RenewalCard() {
  return (
    <Card className="w-full max-w-sm">
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>Registration status</Card.Title>
          <Lock className="text-muted size-4" />
        </div>
      </Card.Header>
      <Card.Content className="mt-4">
        <ProgressBar aria-label="Registration duration" value={72}>
          <div className="mb-2 flex justify-between text-xs">
            <Label>263 days remaining</Label>
            <ProgressBar.Output />
          </div>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </Card.Content>
    </Card>
  );
}

function ComponentsPanel() {
  return (
    <div className="mx-auto grid w-full max-w-[1080px] gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col items-center gap-8">
        <NameSearchCard />
        <IdentityCard />
      </div>
      <div className="flex flex-col items-center gap-8">
        <RegistrationCard />
        <SecurityCard />
      </div>
      <div className="flex flex-col items-center gap-8 md:col-span-2 lg:col-span-1">
        <RecordsCard />
        <RenewalCard />
      </div>
    </div>
  );
}

function RegistrationPanel() {
  return (
    <div className="mx-auto grid w-full max-w-3xl items-start gap-8 md:grid-cols-2">
      <NameSearchCard />
      <RegistrationCard />
    </div>
  );
}

function IdentityPanel() {
  return (
    <div className="mx-auto grid w-full max-w-3xl items-start gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        <IdentityCard />
        <SecurityCard />
      </div>
      <RecordsCard />
    </div>
  );
}

function PortfolioPanel() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid gap-3 sm:grid-cols-3">
        <KPI>
          <KPI.Header>
            <KPI.Title>Names managed</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value value={24} />
            <KPI.Trend trend="up">+3</KPI.Trend>
          </KPI.Content>
        </KPI>
        <KPI>
          <KPI.Header>
            <KPI.Title>Subnames issued</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value value={1842} />
            <KPI.Trend trend="up">+12%</KPI.Trend>
          </KPI.Content>
        </KPI>
        <KPI>
          <KPI.Header>
            <KPI.Title>Names expiring</KPI.Title>
          </KPI.Header>
          <KPI.Content>
            <KPI.Value value={2} />
            <KPI.Trend trend="neutral">30 days</KPI.Trend>
          </KPI.Content>
        </KPI>
      </div>
      <Card className="mt-6">
        <Card.Header>
          <Card.Title>Recent activity</Card.Title>
          <Card.Description>
            Updates across your ENS portfolio.
          </Card.Description>
        </Card.Header>
        <Card.Content className="divide-separator mt-3 divide-y">
          {[
            "vitalik.namespace.eth registered",
            "avatar record updated",
            "namespace.eth renewed",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 py-3 text-sm">
              <span className="bg-success-soft text-success grid size-7 place-items-center rounded-full">
                <Check className="size-3.5" />
              </span>
              <span className="flex-1 text-left">{item}</span>
              <span className="text-muted text-xs">Just now</span>
            </div>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
}

export function HomeShowcase() {
  return (
    <Tabs className="w-full" defaultSelectedKey="components">
      <div className="mb-4 hidden justify-center lg:flex">
        <Tabs.ListContainer>
          <Tabs.List aria-label="ENS interface examples">
            <Tabs.Tab id="components">
              Components
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="registration">
              Registration
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="identity">
              Identity
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="portfolio">
              Portfolio
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
      </div>
      <div className="border-separator bg-background min-h-[420px] overflow-hidden rounded-2xl border p-6 py-8 md:p-10">
        <Tabs.Panel id="components">
          <ComponentsPanel />
        </Tabs.Panel>
        <Tabs.Panel id="registration">
          <RegistrationPanel />
        </Tabs.Panel>
        <Tabs.Panel id="identity">
          <IdentityPanel />
        </Tabs.Panel>
        <Tabs.Panel id="portfolio">
          <PortfolioPanel />
        </Tabs.Panel>
      </div>
    </Tabs>
  );
}
