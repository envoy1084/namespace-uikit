"use client";

// @demo-title Controlled
import { useState } from "react";

import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

function ControlledDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="secondary" onPress={() => setIsOpen(true)}>
          Open Sheet
        </Button>
        <Button size="sm" variant="tertiary" onPress={() => setIsOpen(!isOpen)}>
          Toggle
        </Button>
        <p className="text-muted text-xs">
          Status:{" "}
          <span className="text-foreground font-mono font-medium">
            {isOpen ? "open" : "closed"}
          </span>
        </p>
      </div>
      <Sheet isOpen={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.CloseTrigger />
              <Sheet.Header>
                <Sheet.Heading>Controlled Sheet</Sheet.Heading>
              </Sheet.Header>
              <Sheet.Body>
                <p className="text-muted text-sm">
                  This sheet is controlled via <code>isOpen</code> and{" "}
                  <code>onOpenChange</code> props. The parent manages the state
                  externally.
                </p>
              </Sheet.Body>
              <Sheet.Footer>
                <Sheet.Close>
                  <Button variant="secondary">Close</Button>
                </Sheet.Close>
              </Sheet.Footer>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
    </div>
  );
}

export const ProControlledExample = () => <ControlledDemo />;
