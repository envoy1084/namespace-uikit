"use client";

// @demo-title With Suggestions
import { useState } from "react";

import {
  Add01Icon,
  ArrowUp01Icon,
  Database01Icon,
  Mic01Icon,
  MusicNote01Icon,
  PaintBoardIcon,
  TextIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { TextShimmer } from "@thenamespace/uikit";
import { PromptInput, PromptSuggestion } from "@thenamespace/uikit";

const suggestionItems: Array<{ icon: IconSvgElement; label: string }> = [
  { icon: PaintBoardIcon, label: "Design a launch page" },
  { icon: TextIcon, label: "Summarize meeting notes" },
  { icon: MusicNote01Icon, label: "Generate a sound brief" },
  { icon: Database01Icon, label: "Plan a data model" },
];

function WithSuggestionsDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="mx-auto flex min-h-[520px] w-full max-w-[920px] flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-foreground text-3xl font-normal tracking-tight">
          Build something useful with{" "}
          <TextShimmer className="text-muted">Namespace UIKit AI</TextShimmer>
        </h2>
        <p className="text-muted text-sm">
          Start with a prompt, add files, or pick a suggestion to shape the
          first response.
        </p>
      </div>
      <PromptInput
        className="w-full max-w-[780px]"
        value={value}
        onSubmit={() => setValue("")}
        onValueChange={setValue}
      >
        <PromptInput.Shell className="shadow-overlay">
          <PromptInput.Content>
            <PromptInput.TextArea
              className="min-h-19"
              placeholder="Describe an app, workflow, or interface..."
            />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action aria-label="Use voice" tooltip="Use voice">
                <HugeiconsIcon
                  aria-hidden
                  className="size-4"
                  icon={Mic01Icon}
                  strokeWidth={2}
                />
              </PromptInput.Action>
              <PromptInput.Action
                aria-label="Add context"
                tooltip="Add context"
              >
                <HugeiconsIcon
                  aria-hidden
                  className="size-4"
                  icon={Add01Icon}
                  strokeWidth={2}
                />
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send>
                <HugeiconsIcon
                  aria-hidden
                  className="size-4"
                  icon={ArrowUp01Icon}
                  strokeWidth={2}
                />
              </PromptInput.Send>
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
      <PromptSuggestion className="w-full max-w-[560px]">
        <PromptSuggestion.Items className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {suggestionItems.map((suggestion) => (
            <PromptSuggestion.Item
              key={suggestion.label}
              className="items-center justify-start"
              showEndIcon={false}
              onPress={() => setValue(suggestion.label)}
            >
              <span className="inline-flex min-w-0 items-center gap-2">
                <HugeiconsIcon
                  aria-hidden
                  className="size-4 shrink-0"
                  icon={suggestion.icon}
                  strokeWidth={2}
                />
                <span className="truncate">{suggestion.label}</span>
              </span>
            </PromptSuggestion.Item>
          ))}
        </PromptSuggestion.Items>
      </PromptSuggestion>
    </div>
  );
}

export const DemoWithSuggestionsExample = () => <WithSuggestionsDemo />;
