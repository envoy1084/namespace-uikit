"use client";

// @demo-title With Ripple
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { PressableFeedback } from "@thenamespace/uikit/pressable-feedback";

export const DemoWithRippleExample = () => (
  <CheckboxButtonGroup
    className="w-full max-w-2xl grid-cols-3"
    defaultValue={["github"]}
    layout="grid"
    name="integrations"
    variant="secondary"
  >
    <Label className="col-span-full">Integrations</Label>
    {["GitHub", "Slack", "Linear"].map((title) => (
      <CheckboxButtonGroup.Item key={title} value={title.toLowerCase()}>
        <PressableFeedback.Ripple />
        <CheckboxButtonGroup.Indicator />
        <CheckboxButtonGroup.ItemContent>
          <Label>{title}</Label>
          <Description>Connect your {title} integration</Description>
        </CheckboxButtonGroup.ItemContent>
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
