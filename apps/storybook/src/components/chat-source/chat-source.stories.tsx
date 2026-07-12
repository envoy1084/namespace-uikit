import type { Meta, StoryObj } from "@storybook/react";

import { ChatMessage, ChatSource, ChatSources } from "./index";
const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=64`;
const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);
const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/AI/ChatSource",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <Assistant>
      <ChatMessage.Content>
        Here is an answer backed by a single web source.
      </ChatMessage.Content>
      <ChatSource
        description="HeroUI Pro ships presentation-only AI chat compounds for React."
        faviconUrl={favicon("https://heroui.com")}
        href="https://heroui.com"
        title="HeroUI Pro"
      />
    </Assistant>
  ),
};
export const Document: Story = {
  render: () => (
    <Assistant>
      <ChatMessage.Content>
        Referenced an uploaded document.
      </ChatMessage.Content>
      <ChatSource sourceType="document" title="Q3-launch-brief.pdf" />
    </Assistant>
  ),
};
export const Grouped: Story = {
  render: () => (
    <Assistant>
      <ChatMessage.Content>
        Answer synthesized from multiple sources.
      </ChatMessage.Content>
      <ChatSources defaultExpanded={false}>
        <ChatSources.Trigger>3 sources</ChatSources.Trigger>
        <ChatSources.Content>
          <ChatSources.List>
            <ChatSource href="https://heroui.com" title="HeroUI" />
            <ChatSource
              href="https://tailwind-variants.org"
              title="Tailwind Variants"
            />
            <ChatSource sourceType="document" title="design-system-audit.pdf" />
          </ChatSources.List>
        </ChatSources.Content>
      </ChatSources>
    </Assistant>
  ),
};
export const Composable: Story = {
  render: () => (
    <Assistant>
      <ChatMessage.Content>
        React documentation explains component composition.
      </ChatMessage.Content>
      <ChatSource enablePreview href="https://react.dev">
        <ChatSource.Trigger>
          <ChatSource.Icon faviconUrl={favicon("https://react.dev")} />
          <ChatSource.Title>React docs</ChatSource.Title>
        </ChatSource.Trigger>
        <ChatSource.Preview>
          <div className="flex max-w-72 flex-col gap-2">
            <strong>react.dev</strong>
            <p className="text-muted text-sm">
              Official React documentation for learning modern React patterns.
            </p>
          </div>
        </ChatSource.Preview>
      </ChatSource>
    </Assistant>
  ),
};
export const StackedFavicons: Story = {
  name: "Stacked Favicons",
  render: () => (
    <Assistant>
      <ChatMessage.Content>
        Answer synthesized from multiple sources.
      </ChatMessage.Content>
      <ChatSources defaultExpanded={false}>
        <ChatSources.Trigger>
          <span className="inline-flex -space-x-1.5">
            {[
              "https://reuters.com",
              "https://nypost.com",
              "https://foxsports.com",
            ].map((href) => (
              <img
                alt=""
                className="border-background size-5 rounded-full border"
                key={href}
                src={favicon(href)}
              />
            ))}
          </span>
          <span>Sources</span>
        </ChatSources.Trigger>
        <ChatSources.Content>
          <ChatSources.List>
            <ChatSource href="https://reuters.com" title="Reuters" />
          </ChatSources.List>
        </ChatSources.Content>
      </ChatSources>
    </Assistant>
  ),
};
