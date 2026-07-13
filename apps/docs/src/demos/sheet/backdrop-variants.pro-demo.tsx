"use client";

// @demo-title Backdrop Variants
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

function BackdropVariantsDemo() {
  const variants = ["opaque", "blur", "transparent"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Sheet key={variant}>
          <Sheet.Trigger>
            <Button variant="secondary">
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          </Sheet.Trigger>
          <Sheet.Backdrop variant={variant}>
            <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
              <Sheet.Dialog>
                <Sheet.Handle />
                <Sheet.CloseTrigger />
                <Sheet.Header>
                  <Sheet.Heading>
                    Backdrop:{" "}
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Sheet.Heading>
                </Sheet.Header>
                <Sheet.Body>
                  <p className="text-muted text-sm">
                    This sheet uses the{" "}
                    <code className="text-foreground">{variant}</code> backdrop
                    variant.
                  </p>
                </Sheet.Body>
                <Sheet.Footer>
                  <Sheet.Close>
                    <Button className="w-full">Close</Button>
                  </Sheet.Close>
                </Sheet.Footer>
              </Sheet.Dialog>
            </Sheet.Content>
          </Sheet.Backdrop>
        </Sheet>
      ))}
    </div>
  );
}

export const ProBackdropVariantsExample = () => <BackdropVariantsDemo />;
