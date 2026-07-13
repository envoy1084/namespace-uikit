"use client";

import { Button, Tooltip } from "@thenamespace/uikit";
import { CircleInfo } from "@thenamespace/uikit/icons";

export function CustomRenderFunction() {
  return (
    <div className="flex items-center gap-4">
      <Tooltip delay={0}>
        <Button variant="secondary">Hover me</Button>
        <Tooltip.Content
          render={(props) => <div {...props} data-custom="foo" />}
        >
          <p>This is a tooltip</p>
        </Tooltip.Content>
      </Tooltip>

      <Tooltip delay={0}>
        <Button isIconOnly variant="tertiary">
          <CircleInfo />
        </Button>
        <Tooltip.Content
          render={(props) => <div {...props} data-custom="foo" />}
        >
          <p>More information</p>
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}
