"use client";

// @demo-title Custom Icons
import { ChatMessage, ChatMessageActions } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProCustomIconsExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Swap preset icons via the Icon subcomponents.
    </ChatMessage.Content>
    <ChatMessageActions>
      <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy">
        <ChatMessageActions.CopyIcon>
          <span className="text-accent size-4">C</span>
        </ChatMessageActions.CopyIcon>
      </ChatMessageActions.Copy>
      <ChatMessageActions.ThumbsUp
        aria-label="Good response"
        tooltip="Good response"
      >
        <ChatMessageActions.ThumbsUpIcon>
          <span className="text-success size-4">★</span>
        </ChatMessageActions.ThumbsUpIcon>
      </ChatMessageActions.ThumbsUp>
    </ChatMessageActions>
  </Assistant>
);
