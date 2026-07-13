"use client";

// @demo-title Loading
import { ChatLoader, ChatMessage, TextShimmer } from "@thenamespace/uikit";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto flex w-full max-w-[714px] flex-col gap-8">
    {children}
  </div>
);

export const DemoLoadingExample = () => (
  <Wrapper>
    <ChatMessage.User>
      <ChatMessage.Bubble>
        <ChatMessage.Content>
          What is the weather in San Francisco?
        </ChatMessage.Content>
      </ChatMessage.Bubble>
    </ChatMessage.User>
    <ChatMessage.Assistant>
      <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
      <ChatMessage.Body>
        <TextShimmer>Thinking...</TextShimmer>
        <ChatLoader.Dots label="Thinking..." />
      </ChatMessage.Body>
    </ChatMessage.Assistant>
    <ChatLoader.Skeleton label="Loading response" />
  </Wrapper>
);
