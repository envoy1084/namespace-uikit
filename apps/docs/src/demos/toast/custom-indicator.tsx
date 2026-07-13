"use client";

import { Star } from "@gravity-ui/icons";
import { Button, Toast, toast } from "@thenamespace/uikit";

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
