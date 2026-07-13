"use client";

// @demo-title Standalone Ripple
import { PressableFeedback } from "@thenamespace/uikit";
import { ArrowRight01Icon, UserIcon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

function StandaloneRow({ mode }: { mode: "highlight" | "ripple" }) {
  return (
    <div className="w-[500px]">
      <button
        className="border-separator bg-surface relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border p-4 text-left"
        type="button"
      >
        {mode === "ripple" ? (
          <PressableFeedback.Ripple />
        ) : (
          <PressableFeedback.Highlight />
        )}
        <span className="bg-default flex size-10 items-center justify-center rounded-xl">
          <HugeiconsIcon
            aria-hidden
            icon={UserIcon}
            size={16}
            strokeWidth={2}
          />
        </span>
        <span className="flex flex-1 flex-col">
          <strong>Profile</strong>
          <span className="text-muted text-sm">
            Update your personal information
          </span>
        </span>
        <span>
          <HugeiconsIcon
            aria-hidden
            className="text-muted size-4"
            icon={ArrowRight01Icon}
            strokeWidth={2}
          />
        </span>
      </button>
    </div>
  );
}

export const DemoStandaloneRippleExample = () => (
  <StandaloneRow mode="ripple" />
);
