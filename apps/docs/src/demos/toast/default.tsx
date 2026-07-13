"use client";

import { Button, Toast, toast } from "@thenamespace/uikit";
import { Persons } from "@thenamespace/uikit/icons";

export function Default() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <Button
        size="sm"
        variant="secondary"
        onPress={() => {
          toast("You have been invited to join a team", {
            actionProps: {
              children: "Dismiss",
              onPress: () => toast.clear(),
              variant: "tertiary",
            },
            description:
              "Bob sent you an invitation to join Namespace UIKit team",
            indicator: <Persons />,
            variant: "default",
          });
        }}
      >
        Show toast
      </Button>
    </div>
  );
}
