"use client";

// @demo-title With Markdown
import { ChatMessage, Markdown } from "@thenamespace/uikit";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
    {children}
  </div>
);

const markdown =
  'Here is a concise answer with **markdown** support:\n\n```ts\nexport type ChatStatus = "ready" | "streaming";\n```\n\nThe UI stays presentation-only — your SDK owns the message array.';

export const ProWithMarkdownExample = () => (
  <Wrapper>
    <ChatMessage.User>
      <ChatMessage.Bubble>
        <ChatMessage.Content>
          Show me markdown inside assistant messages.
        </ChatMessage.Content>
      </ChatMessage.Bubble>
    </ChatMessage.User>
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
      <ChatMessage.Body>
        <ChatMessage.Content>
          <Markdown>{markdown}</Markdown>
        </ChatMessage.Content>
      </ChatMessage.Body>
    </ChatMessage.Assistant>
  </Wrapper>
);
