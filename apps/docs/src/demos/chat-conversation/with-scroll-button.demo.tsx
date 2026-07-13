"use client";

// @demo-title With Scroll Button
import { useEffect, useRef } from "react";

import {
  ChainOfThought,
  ChatConversation,
  ChatMessage,
  ChatMessageActions,
  Markdown,
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

const scrollMessages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "Can you summarize the release notes?",
  },
  {
    id: "2",
    role: "assistant",
    text: `The release focuses on the chat surface, component polish, and small API cleanup.

- Chat messages now compose with markdown, sources, and actions
- Conversation viewports keep streaming content readable
- AI components share the same spacing and typography rhythm`,
  },
  {
    id: "3",
    role: "user",
    text: "What changed for long conversations?",
  },
  {
    id: "4",
    role: "assistant",
    text: "Long threads keep their message column centered while the viewport owns scrolling. The optional jump button can be added when an app wants an explicit return-to-bottom control.",
  },
  {
    id: "5",
    role: "user",
    text: "Show me the button treatment.",
  },
  {
    id: "6",
    role: "assistant",
    text: "Scroll away from the latest response and the button appears over the lower edge of the conversation. Pressing it returns the viewport to the newest message.",
  },
  {
    id: "7",
    role: "assistant",
    text: "The default conversation examples omit this control so teams can choose whether the extra affordance belongs in their product.",
  },
];

function WithScrollButtonDemo() {
  const conversationRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const conversation = conversationRef.current;
      conversation?.scrollTo({
        behavior: "auto",
        top: Math.max(
          0,
          conversation.scrollHeight - conversation.clientHeight - 160,
        ),
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex h-[520px] w-[640px] flex-col overflow-hidden">
      <ChatConversation
        ref={conversationRef}
        className="flex-1"
        initial="instant"
      >
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {scrollMessages.map((message) => (
            <MessageView key={message.id} message={message} />
          ))}
        </ChatConversation.Content>
        <ChatConversation.ScrollButton
          aria-label="Scroll to bottom"
          tooltip="Scroll to bottom"
        />
      </ChatConversation>
    </div>
  );
}

export const DemoWithScrollButtonExample = () => <WithScrollButtonDemo />;
