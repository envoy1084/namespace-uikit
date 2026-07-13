"use client";

// @demo-title Nested
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

const nestedHeight = "h-[320px]";

function NestedDemo() {
  return (
    <Sheet>
      <Sheet.Trigger>
        <Button variant="secondary">Open Parent Sheet</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-w-[420px]">
          <Sheet.Dialog className={nestedHeight}>
            <Sheet.Handle />
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Parent Sheet</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className="flex flex-col justify-between pb-4">
              <p className="text-muted mb-4 text-sm">
                This is the parent sheet. Open a nested sheet from here — the
                parent will scale down and the child slides on top.
              </p>
              <Sheet.NestedRoot>
                <Sheet.Trigger>
                  <Button className="w-full" variant="secondary">
                    Open Nested Sheet
                  </Button>
                </Sheet.Trigger>
                <Sheet.Backdrop>
                  <Sheet.Content className="mx-auto max-w-[420px]">
                    <Sheet.Dialog className={nestedHeight}>
                      <Sheet.Handle />
                      <Sheet.CloseTrigger />
                      <Sheet.Header>
                        <Sheet.Heading>Nested Sheet</Sheet.Heading>
                      </Sheet.Header>
                      <Sheet.Body>
                        <p className="text-muted mb-4 text-sm">
                          This is a nested sheet that sits on top of the parent.
                          Drag it down to dismiss and return to the parent
                          sheet.
                        </p>
                        <Sheet.NestedRoot>
                          <Sheet.Trigger>
                            <Button className="w-full" variant="secondary">
                              Go Deeper
                            </Button>
                          </Sheet.Trigger>
                          <Sheet.Backdrop>
                            <Sheet.Content className="mx-auto max-w-[420px]">
                              <Sheet.Dialog className={nestedHeight}>
                                <Sheet.Handle />
                                <Sheet.CloseTrigger />
                                <Sheet.Header>
                                  <Sheet.Heading>Third Level</Sheet.Heading>
                                </Sheet.Header>
                                <Sheet.Body>
                                  <p className="text-muted text-sm">
                                    Three levels deep! Each parent sheet scales
                                    down as the next one opens, creating a
                                    stacking effect.
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
                        </Sheet.NestedRoot>
                      </Sheet.Body>
                      <Sheet.Footer>
                        <Sheet.Close>
                          <Button variant="secondary">Back</Button>
                        </Sheet.Close>
                      </Sheet.Footer>
                    </Sheet.Dialog>
                  </Sheet.Content>
                </Sheet.Backdrop>
              </Sheet.NestedRoot>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoNestedExample = () => <NestedDemo />;
