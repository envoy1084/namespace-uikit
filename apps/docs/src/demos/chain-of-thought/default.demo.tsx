"use client";

// @demo-title Default
import { ChainOfThought } from "@thenamespace/uikit";

export const DemoDefaultExample = () => (
  <div className="w-full max-w-[640px]">
    <ChainOfThought defaultExpanded={false}>
      <ChainOfThought.Trigger>Thought for 4 seconds</ChainOfThought.Trigger>
      <ChainOfThought.Content>
        <ChainOfThought.Steps>
          <ChainOfThought.Step label="Search">
            Looked up Namespace UIKit chat template patterns for message layout
            and composer spacing.
          </ChainOfThought.Step>
          <ChainOfThought.Step label="Plan">
            Mapped the template structure to SDK-agnostic compound components.
          </ChainOfThought.Step>
        </ChainOfThought.Steps>
      </ChainOfThought.Content>
    </ChainOfThought>
  </div>
);
