"use client";

// @demo-title With Ripple
import { RadioButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";
import { PressableFeedback } from "@thenamespace/uikit/pressable-feedback";

export const ProWithRippleExample = () => (
  <RadioButtonGroup
    className="w-full max-w-2xl grid-cols-1 sm:grid-cols-3"
    defaultValue="us-east-1"
    layout="grid"
    name="region"
    variant="secondary"
  >
    <Label className="col-span-full">Deploy region</Label>
    {[
      ["us-east-1", "US East", "Lowest latency for US-based users"],
      ["eu-west-1", "EU West", "Covers Western Europe and UK"],
      ["ap-south-1", "Asia Pacific", "Optimized for Asia-Pacific traffic"],
    ].map(([region, title, description]) => (
      <RadioButtonGroup.Item key={region} value={region}>
        <PressableFeedback.Ripple className="text-muted/50" />
        <RadioButtonGroup.Indicator />
        <RadioButtonGroup.ItemContent>
          <Label>{title}</Label>
          <Description>{description}</Description>
          <span className="text-muted mt-2 font-mono text-xs">{region}</span>
        </RadioButtonGroup.ItemContent>
      </RadioButtonGroup.Item>
    ))}
  </RadioButtonGroup>
);
