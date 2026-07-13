"use client";

import { Button, Toast, toast } from "@thenamespace/uikit";
import {
  HardDriveIcon,
  UserGroupIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

const noop = () => {};

export function Variants() {
  return (
    <div className="flex h-full max-w-xl flex-col items-center justify-center">
      <Toast.Provider placement="bottom" />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        <Button
          size="sm"
          variant="tertiary"
          onPress={() => {
            toast("You have been invited to join a team", {
              actionProps: {
                children: "Dismiss",
                onPress: () => toast.clear(),
                variant: "tertiary",
              },
              description:
                "Bob sent you an invitation to join Namespace UIKit team",
              indicator: <HugeiconsIcon icon={UserGroupIcon} />,
              variant: "default",
            });
          }}
        >
          Default toast
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() =>
            toast.info("You have 2 credits left", {
              actionProps: { children: "Upgrade", onPress: noop },
              description: "Get a paid plan for more credits",
            })
          }
        >
          Accent toast
        </Button>
        <Button
          className="text-success-soft-foreground"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.success("You have upgraded your plan", {
              actionProps: {
                children: "Billing",
                className: "bg-success text-success-foreground",
                onPress: noop,
              },
              description: "You can continue using Namespace UIKit Chat",
            })
          }
        >
          Success toast
        </Button>
        <Button
          className="text-warning-soft-foreground"
          size="sm"
          variant="tertiary"
          onPress={() =>
            toast.warning("You have no credits left", {
              actionProps: {
                children: "Upgrade",
                className: "bg-warning text-warning-foreground",
                onPress: noop,
              },
              description: "Upgrade to a paid plan to continue",
            })
          }
        >
          Warning toast
        </Button>
        <Button
          size="sm"
          variant="danger-soft"
          onPress={() =>
            toast.danger("Storage is full", {
              actionProps: {
                children: "Remove",
                onPress: noop,
                variant: "danger",
              },
              description:
                "Remove files to release space. Adding more text to demonstrate longer content display",
              indicator: <HugeiconsIcon icon={HardDriveIcon} />,
            })
          }
        >
          Danger toast
        </Button>
      </div>
    </div>
  );
}
