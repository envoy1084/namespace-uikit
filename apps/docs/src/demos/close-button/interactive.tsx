"use client";

import { useState } from "react";

import { CloseButton } from "@thenamespace/uikit";

export function Interactive() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <CloseButton
        aria-label={`Close (clicked ${count} times)`}
        onPress={() => setCount(count + 1)}
      />
      <span className="text-muted text-sm">Clicked: {count} times</span>
    </div>
  );
}
