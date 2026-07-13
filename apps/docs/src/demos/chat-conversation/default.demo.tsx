"use client";

// @demo-title Default
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

const messages: Message[] = [
  {
    id: "1",
    role: "user",
    text: "How does auto-scroll work in chat UIs?",
  },
  {
    id: "2",
    role: "assistant",
    text: `Stick-to-bottom keeps the viewport pinned to the latest message while you stream.

It also leaves the user in control: once they scroll away from the bottom, new content can arrive without snapping the viewport away from what they are reading.`,
  },
  {
    id: "3",
    role: "user",
    text: "What happens when the assistant is doing multiple steps?",
  },
  {
    id: "4",
    role: "assistant",
    text: "You can combine the conversation viewport with reasoning and tool UI so the whole exchange remains in one scrollable surface.",
    trace: true,
  },
];

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

function DefaultDemo() {
  return (
    <div className="flex h-[520px] w-[640px] flex-col overflow-hidden">
      <ChatConversation className="flex-1">
        <ChatConversation.Content className="max-w-[714px] flex-col gap-8 px-4 pt-8 pb-8">
          {messages.map((message) => (
            <MessageView key={message.id} message={message} />
          ))}
        </ChatConversation.Content>
      </ChatConversation>
    </div>
  );
}

export const DemoDefaultExample = () => <DefaultDemo />;
