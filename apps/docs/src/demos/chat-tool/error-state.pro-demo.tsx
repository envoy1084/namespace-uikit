"use client";

// @demo-title Error State
import { ChatMessage, ChatTool } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProErrorStateExample = () => (
  <Assistant>
    <ChatTool
      defaultExpanded
      argsText='{"url":"https://example.com"}'
      errorText="Request timed out after 30s"
      state="output-error"
      toolName="fetchPage"
      triggerPrefix="Failed tool: "
    />
  </Assistant>
);
