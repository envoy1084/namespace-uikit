"use client";

// @demo-title Streaming
import { ChainOfThought } from "@thenamespace/uikit";

export const DemoStreamingExample = () => (
  <div className="w-full max-w-[640px]">
    <ChainOfThought isExpanded isStreaming>
      <ChainOfThought.Trigger>Thinking...</ChainOfThought.Trigger>
      <ChainOfThought.Content>
        <ChainOfThought.Steps>
          <ChainOfThought.Step label="Analyze">
            Breaking the request into presentation-only UIKit components.
          </ChainOfThought.Step>
        </ChainOfThought.Steps>
      </ChainOfThought.Content>
    </ChainOfThought>
  </div>
);
