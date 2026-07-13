"use client";

// @demo-title Snap Points
import { useState } from "react";

import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const snapPoints = ["148px", "355px", 1];

function SnapPointsDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(snapPoints[0]!);

  return (
    <Sheet
      activeSnapPoint={activeSnapPoint}
      snapPoints={snapPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Snap Points</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <div className="flex flex-col gap-4">
                <p className="text-muted text-sm">
                  Snap points let users drag a sheet to predefined positions.
                  This sheet snaps to 148px, 355px, and full height. The overlay
                  fades in as you reach the highest point.
                </p>
                {Array.from({ length: 6 }).map((_, index) => (
                  <p className="text-muted text-sm" key={index}>
                    {index === 0
                      ? "Drag the handle up to reveal more content and see the overlay fade in."
                      : `More content at this level (${index + 1}).`}
                  </p>
                ))}
              </div>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoSnapPointsExample = () => <SnapPointsDemo />;
