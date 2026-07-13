"use client";

// @demo-title Default
import { ChatMessage, ChatMessageActions } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoDefaultExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Assistant responses can expose quick actions beneath the message body.
    </ChatMessage.Content>
    <ChatMessageActions>
      <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
      <ChatMessageActions.ThumbsUp
        aria-label="Good response"
        tooltip="Good response"
      />
      <ChatMessageActions.ThumbsDown
        aria-label="Bad response"
        tooltip="Bad response"
      />
      <ChatMessageActions.Regenerate
        aria-label="Regenerate"
        tooltip="Regenerate"
      />
      <ChatMessageActions.Menu aria-label="More actions" tooltip="More" />
    </ChatMessageActions>
  </Assistant>
);
