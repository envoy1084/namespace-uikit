"use client";

// @demo-title Stacked Favicons
import { ChatMessage, ChatSource, ChatSources } from "@thenamespace/uikit";

const favicon = (url: string) =>
  `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=64`;

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProStackedFaviconsExample = () => {
  const sources = [
    { href: "https://www.reuters.com", label: "Reuters" },
    { href: "https://nypost.com", label: "New York Post" },
    { href: "https://www.foxsports.com", label: "Fox Sports" },
  ];

  return (
    <Assistant>
      <ChatMessage.Content>
        Answer synthesized from multiple sources.
      </ChatMessage.Content>
      <ChatSources defaultExpanded={false}>
        <ChatSources.Trigger>
          <span className="inline-flex -space-x-1.5">
            {sources.map((source) => (
              <img
                alt=""
                className="border-background size-5 rounded-full border object-cover"
                key={source.href}
                src={favicon(source.href)}
              />
            ))}
          </span>
          <span>Sources</span>
        </ChatSources.Trigger>
        <ChatSources.Content>
          <ChatSources.List>
            {sources.map((source) => (
              <ChatSource
                faviconUrl={favicon(source.href)}
                href={source.href}
                key={source.href}
                title={source.label}
              />
            ))}
          </ChatSources.List>
        </ChatSources.Content>
      </ChatSources>
    </Assistant>
  );
};
