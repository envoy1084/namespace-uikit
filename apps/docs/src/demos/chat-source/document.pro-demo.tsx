"use client";

// @demo-title Document
import { ChatMessage, ChatSource } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProDocumentExample = () => (
  <Assistant>
    <ChatMessage.Content>Referenced an uploaded document.</ChatMessage.Content>
    <ChatSource sourceType="document" title="Q3-launch-brief.pdf" />
  </Assistant>
);
