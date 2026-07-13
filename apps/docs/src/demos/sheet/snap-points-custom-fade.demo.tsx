"use client";

// @demo-title Snap Points (Custom Fade)
import { useState } from "react";

import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const snapPoints = ["148px", "355px", 1];

const customFadePoints = ["150px", "300px", "450px", 1];

function SnapPointsCustomFadeDemo() {
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(customFadePoints[0]!);

  return (
    <Sheet
      activeSnapPoint={activeSnapPoint}
      fadeFromIndex={1}
      snapPoints={customFadePoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Custom Fade Index</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content>
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Header>
              <Sheet.Heading>Custom Fade</Sheet.Heading>
              <p className="text-muted text-sm">
                Current:{" "}
                {typeof activeSnapPoint === "number" ? "100%" : activeSnapPoint}
              </p>
            </Sheet.Header>
            <Sheet.Body>
              <p className="text-muted text-sm">
                The <code className="text-foreground">fadeFromIndex</code> prop
                controls when the overlay starts fading in. Here it&apos;s set
                to index 1 (300px), so the overlay begins appearing at the
                second snap point instead of the last.
              </p>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoSnapPointsCustomFadeExample = () => (
  <SnapPointsCustomFadeDemo />
);
