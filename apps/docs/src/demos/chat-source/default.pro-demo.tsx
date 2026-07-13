"use client";

// @demo-title Default
import { ChatMessage, ChatSource } from "@thenamespace/uikit";

const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=64`;

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProDefaultExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Here is an answer backed by a single web source.
    </ChatMessage.Content>
    <ChatSource
      description="Namespace UIKit ships presentation-only AI chat compounds for React."
      faviconUrl={favicon("https://namespace.ninja")}
      href="https://namespace.ninja"
      title="Namespace UIKit"
    />
  </Assistant>
);
