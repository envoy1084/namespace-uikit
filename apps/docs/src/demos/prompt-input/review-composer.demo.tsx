"use client";

// @demo-title Review Composer
import { useState } from "react";

import {
  Button,
  ListBox,
  ProgressCircle,
  Select,
  Tooltip,
} from "@thenamespace/uikit";
import { PromptInput } from "@thenamespace/uikit";
import {
  Add01Icon,
  ArrowUp01Icon,
  ComputerIcon,
  GitBranchIcon,
  Mic01Icon,
  MoreHorizontalIcon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

const reviewModels = [
  { id: "composer-2.5", label: "Composer 2.5", meta: "Fast" },
  { id: "opus-4.8", label: "Opus 4.8", meta: "1M High" },
  { id: "gpt-5.5", label: "GPT-5.5", meta: "1M High" },
  { id: "sonnet-4.6", label: "Sonnet 4.6", meta: "1M Medium" },
  { id: "codex-5.3", label: "Codex 5.3", meta: "High Fast" },
  { id: "opus-4.6", label: "Opus 4.6", meta: "1M High" },
  { id: "gemini-3.1-pro", label: "Gemini 3.1 Pro", meta: "" },
];

function ReviewComposerDemo() {
  const [value, setValue] = useState("");
  const [model, setModel] = useState("composer-2.5");
  const selected =
    reviewModels.find((item) => item.id === model) ?? reviewModels[0]!;
  return (
    <div className="flex w-full max-w-[800px] min-w-0 flex-col gap-3 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-1.5">
        <Button size="sm" variant="outline">
          <span>Review</span>
          <span className="text-success-soft-foreground font-semibold">
            +469
          </span>
          <span className="text-danger-soft-foreground font-semibold">-34</span>
        </Button>
        <Button className="hidden sm:inline-flex" size="sm" variant="outline">
          <span>Create Branch &amp; Commit</span>
        </Button>
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              isIconOnly
              aria-label="More actions"
              size="sm"
              variant="outline"
            >
              <HugeiconsIcon
                aria-hidden
                icon={MoreHorizontalIcon}
                size={16}
                strokeWidth={2}
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>More actions</Tooltip.Content>
        </Tooltip>
      </div>
      <PromptInput
        className="group max-w-full min-w-0 overflow-hidden"
        layout="compact"
        value={value}
        onSubmit={() => setValue("")}
        onValueChange={setValue}
      >
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea
              className="min-w-0"
              placeholder="Send follow-up"
            />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Add context"
                tooltip="Add context"
              >
                <HugeiconsIcon
                  aria-hidden
                  icon={Add01Icon}
                  size={16}
                  strokeWidth={2}
                />
              </PromptInput.Action>
              <Select
                aria-label="Model"
                className="w-auto min-w-0"
                value={model}
                onChange={(key) => typeof key === "string" && setModel(key)}
              >
                <Select.Trigger className="h-8 max-w-[180px] min-w-0 rounded-full border-0 bg-transparent px-2 shadow-none">
                  <Select.Value>
                    <span className="flex min-w-0 items-center gap-1">
                      <span className="truncate">{selected.label}</span>
                      {selected.meta ? (
                        <span className="text-muted shrink-0">
                          {selected.meta}
                        </span>
                      ) : null}
                    </span>
                  </Select.Value>
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="w-[min(320px,calc(100vw-2rem))]">
                  <ListBox>
                    {reviewModels.map((item) => (
                      <ListBox.Item
                        key={item.id}
                        id={item.id}
                        textValue={item.label}
                      >
                        <span className="flex min-w-0 items-center gap-1">
                          <span>{item.label}</span>
                          {item.meta ? (
                            <span className="text-muted">{item.meta}</span>
                          ) : null}
                        </span>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              {value.trim() ? (
                <>
                  <PromptInput.Action
                    aria-label="Voice input"
                    tooltip="Voice input"
                  >
                    <HugeiconsIcon
                      aria-hidden
                      icon={Mic01Icon}
                      size={16}
                      strokeWidth={2}
                    />
                  </PromptInput.Action>
                  <PromptInput.Send>
                    <HugeiconsIcon
                      aria-hidden
                      icon={ArrowUp01Icon}
                      size={16}
                      strokeWidth={2}
                    />
                  </PromptInput.Send>
                </>
              ) : (
                <PromptInput.Action
                  aria-label="Voice input"
                  tooltip="Voice input"
                >
                  <HugeiconsIcon
                    aria-hidden
                    icon={Mic01Icon}
                    size={16}
                    strokeWidth={2}
                  />
                </PromptInput.Action>
              )}
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
      <div className="text-muted flex items-center justify-between gap-3 px-2 text-xs sm:px-4 sm:text-sm">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon
              aria-hidden
              icon={GitBranchIcon}
              size={16}
              strokeWidth={2}
            />
            develop
          </span>
          <span className="flex items-center gap-1.5">
            <HugeiconsIcon
              aria-hidden
              icon={ComputerIcon}
              size={16}
              strokeWidth={2}
            />
            Local
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ProgressCircle
            aria-label="Task progress"
            color="default"
            size="sm"
            value={32}
          >
            <ProgressCircle.Track>
              <ProgressCircle.TrackCircle />
              <ProgressCircle.FillCircle />
            </ProgressCircle.Track>
          </ProgressCircle>
          <span className="tabular-nums">32%</span>
        </div>
      </div>
    </div>
  );
}

export const DemoReviewComposerExample = () => <ReviewComposerDemo />;
