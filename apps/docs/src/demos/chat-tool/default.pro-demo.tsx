"use client";

// @demo-title Default
import { ChatMessage, ChatTool } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const ProDefaultExample = () => (
  <Assistant>
    <ChatMessage.Content>
      Completed tool call with JSON args and result.
    </ChatMessage.Content>
    <ChatTool
      argsText='{"city":"Paris"}'
      defaultExpanded={false}
      output={{ summary: "18°C, partly cloudy" }}
      state="output-available"
      toolName="getWeather"
      triggerPrefix="Used tool: "
    />
  </Assistant>
);
