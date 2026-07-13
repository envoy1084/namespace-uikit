"use client";

// @demo-title Detached
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

function DetachedDemo() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Sheet isDetached key={placement} placement={placement}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop>
            <Sheet.Content
              className={
                placement === "left" || placement === "right"
                  ? "w-[310px]"
                  : "mx-auto max-w-[420px]"
              }
            >
              <Sheet.Dialog
                className={
                  placement === "left" || placement === "right"
                    ? "h-full"
                    : undefined
                }
              >
                {placement === "bottom" ? <Sheet.Handle /> : null}
                <Sheet.Body className="flex flex-col gap-4 py-5">
                  <Sheet.Heading>Detached {placement}</Sheet.Heading>
                  <p className="text-muted text-sm">
                    The sheet floats away from the viewport edge with rounded
                    corners on all sides.
                  </p>
                </Sheet.Body>
                {placement === "top" ? <Sheet.Handle /> : null}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const ProDetachedExample = () => <DetachedDemo />;
