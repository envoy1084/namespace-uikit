"use client";

// @demo-title Snap Points (Sequential)
import { useState } from "react";

import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const snapPoints = ["148px", "355px", 1];

const sequentialPoints = ["148px", "355px", 1];

function SnapPointsSequentialDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(sequentialPoints[0]!);

  return (
    <Sheet
      snapToSequentialPoint
      activeSnapPoint={activeSnapPoint}
      snapPoints={sequentialPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Sequential Snap Points</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Sequential</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                Velocity-based snapping is disabled with{" "}
                <code className="text-foreground">snapToSequentialPoint</code>.
                A snap point won&apos;t be skipped even if you flick quickly.
                Useful when each level is equally important.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const ProSnapPointsSequentialExample = () => (
  <SnapPointsSequentialDemo />
);
