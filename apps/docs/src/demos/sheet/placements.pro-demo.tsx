"use client";

// @demo-title Placements
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

function PlacementsDemo() {
  const placements = ["bottom", "top", "left", "right"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {placements.map((placement) => (
        <Sheet key={placement} placement={placement}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {placement.charAt(0).toUpperCase() + placement.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant="blur">
            <Sheet.Content
              className={
                placement === "left" || placement === "right"
                  ? "w-[400px]"
                  : undefined
              }
            >
              <Sheet.Dialog>
                <Sheet.CloseTrigger />
                {placement === "bottom" ? <Sheet.Handle /> : null}
                <Sheet.Header>
                  <Sheet.Heading>
                    {placement.charAt(0).toUpperCase() + placement.slice(1)}{" "}
                    Sheet
                  </Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-muted text-sm">
                    This sheet slides in from the <strong>{placement}</strong>{" "}
                    edge of the screen with a smooth spring-like animation.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button variant="secondary">Cancel</Button>
                  </Sheet.Close>
                  <Sheet.Close>
                    <Button>Done</Button>
                  </Sheet.Close>
                </Sheet.Footer>
                {placement === "top" ? <Sheet.Handle /> : null}
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const ProPlacementsExample = () => <PlacementsDemo />;
