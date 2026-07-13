"use client";

import { Button, Toast, toast } from "@thenamespace/uikit";
import { Star } from "@thenamespace/uikit/icons";

export function CustomIndicator() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <Button
        size="sm"
        variant="secondary"
        onPress={() =>
          toast("Custom icon indicator", {
            indicator: <Star />,
          })
        }
      >
        Custom indicator
      </Button>
    </div>
  );
}
