"use client";

// @demo-title Minimal
import { ChatMessage, ChatMessageActions } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProMinimalExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Minimal action set for compact layouts.
    </ChatMessage.Content>
    <ChatMessageActions>
      <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
      <ChatMessageActions.Menu aria-label="More actions" tooltip="More" />
    </ChatMessageActions>
  </Assistant>
);
