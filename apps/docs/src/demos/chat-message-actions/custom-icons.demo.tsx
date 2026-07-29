"use client";

// @demo-title Custom Icons
import { ChatMessage, ChatMessageActions } from "@thenamespace/uikit";
import { Copy01Icon, HugeiconsIcon, ThumbsUpIcon } from "@thenamespace/uikit/icons";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoCustomIconsExample = () => (
  <Assistant>
    <ChatMessage.Content>Swap preset icons via the Icon subcomponents.</ChatMessage.Content>
    <ChatMessageActions>
      <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy">
        <ChatMessageActions.CopyIcon>
          <HugeiconsIcon className="text-accent size-4" icon={Copy01Icon} />
        </ChatMessageActions.CopyIcon>
      </ChatMessageActions.Copy>
      <ChatMessageActions.ThumbsUp aria-label="Good response" tooltip="Good response">
        <ChatMessageActions.ThumbsUpIcon>
          <HugeiconsIcon className="text-success size-4" icon={ThumbsUpIcon} />
        </ChatMessageActions.ThumbsUpIcon>
      </ChatMessageActions.ThumbsUp>
    </ChatMessageActions>
  </Assistant>
);
