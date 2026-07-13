"use client";

// @demo-title Grouped
import { ChatMessage, ChatSource, ChatSources } from "@thenamespace/uikit";

const favicon = (url: string) =>
  `/assets/favicons/${new URL(url).hostname.replaceAll(".", "-")}.png`;

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoGroupedExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Answer synthesized from multiple sources.
    </ChatMessage.Content>
    <ChatSources defaultExpanded={false}>
      <ChatSources.Trigger>3 sources</ChatSources.Trigger>
      <ChatSources.Content>
        <ChatSources.List>
          <ChatSource
            faviconUrl={favicon("https://namespace.ninja")}
            href="https://namespace.ninja"
            title="Namespace UIKit"
          />
          <ChatSource
            description="Tailwind Variants powers slot-based styling in UIKit components."
            faviconUrl={favicon("https://tailwind-variants.org")}
            href="https://tailwind-variants.org"
            title="Tailwind Variants"
          />
          <ChatSource sourceType="document" title="design-system-audit.pdf" />
        </ChatSources.List>
      </ChatSources.Content>
    </ChatSources>
  </Assistant>
);
