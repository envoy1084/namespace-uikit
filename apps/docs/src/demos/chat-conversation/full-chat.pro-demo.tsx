"use client";

// @demo-title Full Chat
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ChainOfThought,
  ChatConversation,
  ChatMessage,
  ChatMessageActions,
  Markdown,
  PromptInput,
} from "@thenamespace/uikit";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
  trace?: boolean;
}

function MessageView({
  message,
  showActions = false,
}: {
  message: Message;
  showActions?: boolean;
}) {
  return message.role === "user" ? (
    <ChatMessage.User>
      <ChatMessage.Bubble>
        <ChatMessage.Content>{message.text}</ChatMessage.Content>
      </ChatMessage.Bubble>
    </ChatMessage.User>
  ) : (
    <ChatMessage.Assistant>
      <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
      <ChatMessage.Body>
        <ChatMessage.Content>
          <Markdown>{message.text}</Markdown>
        </ChatMessage.Content>
        {message.trace ? (
          <ChainOfThought defaultExpanded>
            <ChainOfThought.Trigger>Thought for 2s</ChainOfThought.Trigger>
            <ChainOfThought.Content>
              <ChainOfThought.Steps>
                <ChainOfThought.Step label="Check scroll behavior">
                  Verified the viewport remains pinned while the assistant
                  streams.
                </ChainOfThought.Step>
                <ChainOfThought.Step label="Compose response">
                  Added reasoning UI inline with the assistant message body.
                </ChainOfThought.Step>
              </ChainOfThought.Steps>
            </ChainOfThought.Content>
          </ChainOfThought>
        ) : null}
        {showActions ? (
          <ChatMessageActions>
            <ChatMessageActions.Copy aria-label="Copy" tooltip="Copy" />
            <ChatMessageActions.Regenerate
              aria-label="Regenerate"
              tooltip="Regenerate"
            />
          </ChatMessageActions>
        ) : null}
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  );
}

const initialFullChatMessages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Build a settings page with profile and notifications.",
  },
  {
    id: "2",
    role: "assistant",
    text: `Here is a **settings layout** outline with profile, notifications, and a danger zone section.

- Profile card for avatar, display name, and email
- Notification preferences grouped by channel
- Danger zone with clear destructive affordances`,
    trace: true,
  },
  {
    id: "3",
    role: "user",
    text: "Add a compact version that works well in a dashboard drawer.",
  },
  {
    id: "4",
    role: "assistant",
    text: "For a drawer, I would reduce section padding, keep labels visible, and move destructive actions behind a confirmation step. The same components can stay responsive with container width constraints.",
  },
];

function FullChatDemo() {
  const [currentMessages, setMessages] = useState(initialFullChatMessages);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"ready" | "streaming" | "submitted">(
    "ready",
  );
  const timers = useRef<number[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const stop = () => {
    clearTimers();
    setStatus("ready");
  };
  const submit = () => {
    const text = value.trim();
    if (!text || status !== "ready") return;
    setMessages((current) => [
      ...current,
      { id: String(Date.now()), role: "user", text },
    ]);
    setValue("");
    setStatus("submitted");
    clearTimers();
    timers.current.push(
      window.setTimeout(() => setStatus("streaming"), 300),
      window.setTimeout(() => {
        setMessages((current) => [
          ...current,
          {
            id: String(Date.now() + 1),
            role: "assistant",
            text: "This is a mocked assistant reply rendered with Namespace UIKit AI components.",
          },
        ]);
        setStatus("ready");
      }, 1200),
    );
  };

  return (
    <div className="flex h-[640px] w-[760px] flex-col overflow-hidden">
      <ChatConversation className="flex-1">
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {currentMessages.map((message) => (
            <MessageView
              key={message.id}
              message={message}
              showActions={message.role === "assistant"}
            />
          ))}
        </ChatConversation.Content>
      </ChatConversation>
      <div className="bg-background shrink-0 px-4 pt-3 pb-4">
        <PromptInput
          status={status}
          value={value}
          onStop={stop}
          onSubmit={submit}
          onValueChange={setValue}
        >
          <PromptInput.Shell>
            <PromptInput.Content>
              <PromptInput.TextArea placeholder="What do you want to know?" />
            </PromptInput.Content>
            <PromptInput.Toolbar>
              <PromptInput.ToolbarEnd>
                <PromptInput.Send />
              </PromptInput.ToolbarEnd>
            </PromptInput.Toolbar>
          </PromptInput.Shell>
          <PromptInput.Footer>
            AI can make mistakes. Check important info.
          </PromptInput.Footer>
        </PromptInput>
      </div>
    </div>
  );
}

export const ProFullChatExample = () => <FullChatDemo />;
