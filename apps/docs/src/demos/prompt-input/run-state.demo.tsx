"use client";

// @demo-title Run State
import { useCallback, useEffect, useRef, useState } from "react";

import { PromptInput } from "@thenamespace/uikit";

function RunStateDemo() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"ready" | "streaming" | "submitted">(
    "ready",
  );
  const timers = useRef<number[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clearTimers, [clearTimers]);
  const stop = () => {
    clearTimers();
    setStatus("ready");
  };
  const submit = () => {
    if (!value.trim() || status !== "ready") return;
    setValue("");
    setStatus("submitted");
    clearTimers();
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

export const DemoRunStateExample = () => <RunStateDemo />;
