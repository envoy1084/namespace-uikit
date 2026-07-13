"use client";

// @demo-title Composable
import { ChatMessage, ChatTool } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoComposableExample = () => (
  <Assistant>
    <ChatTool
      defaultExpanded={false}
      state="output-available"
      toolName="getWeather"
    >
      <ChatTool.Trigger>
        <ChatTool.StatusIcon />
        Used tool: <strong>getWeather</strong>
      </ChatTool.Trigger>
      <ChatTool.Content>
        <ChatTool.Args input={{ city: "Paris" }} label="Parameters" />
        <ChatTool.Result
          label="Result"
          value={{ summary: "18°C, partly cloudy" }}
        />
      </ChatTool.Content>
    </ChatTool>
  </Assistant>
);
