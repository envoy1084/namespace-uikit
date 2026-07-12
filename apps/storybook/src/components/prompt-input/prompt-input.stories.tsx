import type { Meta, StoryObj } from "@storybook/react";

import { useEffect, useRef, useState } from "react";

import { Button } from "@thenamespace/uikit";

import { PromptInput, PromptSuggestion } from "./index";
const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/AI/PromptInput",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
function Composer({
  layout = "stacked",
  variant = "primary",
}: {
  layout?: "compact" | "inline" | "stacked";
  variant?: "primary" | "secondary";
}) {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        layout={layout}
        value={value}
        variant={variant}
        onSubmit={() => setValue("")}
        onValueChange={setValue}
      >
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea placeholder="What do you want to know?" />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Attach file"
                tooltip="Attach file"
              >
                ＋
              </PromptInput.Action>
              <PromptInput.Action aria-label="Use voice" tooltip="Use voice">
                🎙
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
        <PromptInput.Footer>
          AI can make mistakes. Check important info.
        </PromptInput.Footer>
      </PromptInput>
    </div>
  );
}
export const Default: Story = { render: () => <Composer /> };
function RunStateDemo() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"ready" | "streaming" | "submitted">(
    "ready",
  );
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const stop = () => setStatus("ready");
  const submit = () => {
    if (!value.trim() || status !== "ready") return;
    setValue("");
    setStatus("submitted");
    timers.current.push(
      window.setTimeout(() => setStatus("streaming"), 400),
      window.setTimeout(() => setStatus("ready"), 1800),
    );
  };
  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        status={status}
        value={value}
        onStop={stop}
        onSubmit={submit}
        onValueChange={setValue}
      >
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea placeholder="Send to see submitted → streaming → ready" />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
        <PromptInput.Footer>
          Status-driven send button with stop while generating.
        </PromptInput.Footer>
      </PromptInput>
    </div>
  );
}
export const RunState: Story = {
  name: "Run State",
  render: () => <RunStateDemo />,
};
export const Secondary: Story = {
  render: () => <Composer variant="secondary" />,
};
export const Inline: Story = { render: () => <Composer layout="inline" /> };
export const Compact: Story = { render: () => <Composer layout="compact" /> };
function ReviewComposerDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-[720px]">
      <PromptInput layout="compact" value={value} onValueChange={setValue}>
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea placeholder="Ask a follow-up about this review..." />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action aria-label="Add context">
                ＋
              </PromptInput.Action>
              <Button size="sm" variant="ghost">
                Review changes
              </Button>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <span className="text-muted text-xs">32%</span>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
    </div>
  );
}
export const ReviewComposer: Story = {
  name: "Review Composer",
  render: () => <ReviewComposerDemo />,
};
interface QueueValue {
  id: string;
  text: string;
}
function QueueDemo() {
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<QueueValue[]>([
    { id: "one", text: "Summarize the latest customer feedback" },
    { id: "two", text: "Draft a follow-up with the action items" },
    { id: "three", text: "Turn this into a launch checklist" },
  ]);
  return (
    <div className="w-full max-w-[640px]">
      <PromptInput value={value} onValueChange={setValue}>
        <PromptInput.Queue>
          <PromptInput.Queue.List values={queue} onReorder={setQueue}>
            {queue.map((item) => (
              <PromptInput.Queue.Item key={item.id} value={item}>
                <PromptInput.Queue.Item.Handle />
                <PromptInput.Queue.Item.Body>
                  <PromptInput.Queue.Item.Icon />
                  <PromptInput.Queue.Item.Content>
                    {item.text}
                  </PromptInput.Queue.Item.Content>
                </PromptInput.Queue.Item.Body>
                <PromptInput.Queue.Item.Actions>
                  <PromptInput.Queue.Item.Remove
                    onPress={() =>
                      setQueue((values) =>
                        values.filter((queued) => queued.id !== item.id),
                      )
                    }
                  />
                  <PromptInput.Queue.Item.More />
                </PromptInput.Queue.Item.Actions>
              </PromptInput.Queue.Item>
            ))}
          </PromptInput.Queue.List>
        </PromptInput.Queue>
        <PromptInput.Shell>
          <PromptInput.Content>
            <PromptInput.TextArea placeholder="Add a follow-up" />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
    </div>
  );
}
export const Queue: Story = { render: () => <QueueDemo /> };
function WithSuggestionsDemo() {
  const [value, setValue] = useState("");
  const suggestions = [
    "Design a launch page",
    "Summarize meeting notes",
    "Generate a sound brief",
    "Plan a data model",
  ];
  return (
    <div className="mx-auto flex min-h-[520px] w-full max-w-[920px] flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <h2 className="text-foreground text-3xl">
          Build something useful with HeroUI Pro AI
        </h2>
        <p className="text-muted text-sm">
          Start with a prompt, add files, or pick a suggestion.
        </p>
      </div>
      <div className="w-full max-w-[780px]">
        <PromptInput
          value={value}
          onSubmit={() => setValue("")}
          onValueChange={setValue}
        >
          <PromptInput.Shell>
            <PromptInput.Content>
              <PromptInput.TextArea placeholder="Describe an app, workflow, or interface..." />
            </PromptInput.Content>
            <PromptInput.Toolbar>
              <PromptInput.ToolbarStart>
                <PromptInput.Action aria-label="Use voice">
                  🎙
                </PromptInput.Action>
              </PromptInput.ToolbarStart>
              <PromptInput.ToolbarEnd>
                <PromptInput.Send />
              </PromptInput.ToolbarEnd>
            </PromptInput.Toolbar>
          </PromptInput.Shell>
        </PromptInput>
      </div>
      <PromptSuggestion className="w-full max-w-[560px]">
        <PromptSuggestion.Items>
          {suggestions.map((suggestion) => (
            <PromptSuggestion.Item
              key={suggestion}
              showEndIcon={false}
              onPress={() => setValue(suggestion)}
            >
              {suggestion}
            </PromptSuggestion.Item>
          ))}
        </PromptSuggestion.Items>
      </PromptSuggestion>
    </div>
  );
}
export const WithSuggestions: Story = {
  name: "With Suggestions",
  render: () => <WithSuggestionsDemo />,
};
