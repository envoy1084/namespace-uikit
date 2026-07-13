"use client";

// @demo-title Progress Feedback Callback
import { useState } from "react";

import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

export const ProProgressFeedbackCallbackExample = function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="secondary">
        <PressableFeedback.ProgressFeedback
          className="bg-accent text-accent-foreground"
          onComplete={() => setCount((v) => v + 1)}
        >
          Send
        </PressableFeedback.ProgressFeedback>
        Send
      </Button>
      <p className="text-muted text-xs">
        Count: <strong>{count}</strong>
      </p>
    </div>
  );
};
