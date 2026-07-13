"use client";

// @demo-title Composable
import { ChatMessage, ChatSource } from "@thenamespace/uikit";

const favicon = (url: string) =>
  `/assets/favicons/${new URL(url).hostname.replaceAll(".", "-")}.png`;

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoComposableExample = () => (
  <Assistant>
    <ChatMessage.Content>
      React&apos;s documentation has a clear explanation of component
      composition and state-driven rendering. The source chip below uses custom
      trigger content with a fetched favicon.
    </ChatMessage.Content>
    <ChatSource enablePreview href="https://react.dev">
      <ChatSource.Trigger>
        <ChatSource.Icon faviconUrl={favicon("https://react.dev")} />
        <ChatSource.Title>React docs</ChatSource.Title>
      </ChatSource.Trigger>
      <ChatSource.Preview>
        <div className="flex max-w-72 flex-col gap-2">
          <div className="flex items-center gap-2">
            <ChatSource.Icon faviconUrl={favicon("https://react.dev")} />
            <span className="text-foreground text-sm font-medium">
              react.dev
            </span>
          </div>
          <p className="text-muted text-sm">
            Official React documentation for learning modern React patterns.
          </p>
        </div>
      </ChatSource.Preview>
    </ChatSource>
  </Assistant>
);
