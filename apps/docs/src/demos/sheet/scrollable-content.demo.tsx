"use client";

// @demo-title Scrollable Content
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

function ScrollableContentDemo() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Terms &amp; Conditions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Terms &amp; Conditions</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              {Array.from({ length: 20 }).map((_, index) => (
                <p className="text-muted mb-3 text-sm" key={index}>
                  Paragraph {index + 1}: Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Nullam pulvinar risus non risus hendrerit
                  venenatis. Pellentesque sit amet hendrerit risus, sed
                  porttitor quam. Donec nec vestibulum libero.
                </p>
              ))}
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Decline</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Accept</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoScrollableContentExample = () => <ScrollableContentDemo />;
