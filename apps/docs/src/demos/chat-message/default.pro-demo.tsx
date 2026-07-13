"use client";

// @demo-title Default
import { ChatMessage } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
    {children}
  </div>
);

export const ProDefaultExample = () => (
  <Wrapper>
    <ChatMessage.User>
      <ChatMessage.Bubble>
        <ChatMessage.Content>
          Can you explain how compound components help AI chat UIs stay
          SDK-agnostic?
        </ChatMessage.Content>
      </ChatMessage.Bubble>
    </ChatMessage.User>
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
      <ChatMessage.Body>
        <ChatMessage.Content>
          Compound components let you compose message layout explicitly while
          keeping state in your app layer.
        </ChatMessage.Content>
        <ChatMessage.Actions>
          <ChatMessage.Action aria-label="Copy" tooltip="Copy">
            <Icon icon="gravity-ui:copy" />
          </ChatMessage.Action>
          <ChatMessage.Action
            aria-label="Good response"
            tooltip="Good response"
          >
            <Icon icon="gravity-ui:thumbs-up" />
          </ChatMessage.Action>
          <ChatMessage.Action aria-label="Bad response" tooltip="Bad response">
            <Icon icon="gravity-ui:thumbs-down" />
          </ChatMessage.Action>
          <ChatMessage.Action aria-label="Regenerate" tooltip="Regenerate">
            <Icon icon="gravity-ui:arrow-uturn-ccw-left" />
          </ChatMessage.Action>
        </ChatMessage.Actions>
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  </Wrapper>
);
