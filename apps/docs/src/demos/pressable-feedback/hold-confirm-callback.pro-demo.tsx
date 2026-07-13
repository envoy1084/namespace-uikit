"use client";

// @demo-title Hold Confirm Callback
import { useState } from "react";

import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

const Trash = () => <Icon icon="solar:trash-bin-trash-linear" />;

export const ProHoldConfirmCallbackExample = function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="danger-soft">
        <PressableFeedback.HoldConfirm
          className="bg-danger text-danger-foreground"
          onComplete={() => setCount((v) => v + 1)}
        >
          <Trash />
          Hold to Delete
        </PressableFeedback.HoldConfirm>
        <Trash />
        Hold to Delete
      </Button>
      <p className="text-muted text-xs">
        Count: <strong>{count}</strong>
      </p>
    </div>
  );
};
