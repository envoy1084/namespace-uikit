"use client";

// @demo-title Default
import { CheckboxButtonGroup } from "@thenamespace/uikit";
import { Description } from "@thenamespace/uikit/description";
import { Label } from "@thenamespace/uikit/label";

const features = [
  {
    description: "Real-time threat detection and prevention",
    value: "security",
  },
  {
    description: "Cloud-based storage with automatic backups",
    value: "storage",
  },
  {
    description: "Usage reports and performance dashboards",
    value: "analytics",
  },
];

function FeatureContent({
  description,
  value,
}: {
  description: string;
  value: string;
}) {
  return (
    <CheckboxButtonGroup.ItemContent>
      <Label className="capitalize">{value}</Label>
      <Description>{description}</Description>
    </CheckboxButtonGroup.ItemContent>
  );
}

export const ProDefaultExample = () => (
  <CheckboxButtonGroup
    className="w-[360px]"
    defaultValue={["security", "storage"]}
    name="features"
    variant="secondary"
  >
    <Label>Select features</Label>
    <Description>Choose all that apply to your project</Description>
    {features.map((feature) => (
      <CheckboxButtonGroup.Item key={feature.value} value={feature.value}>
        <CheckboxButtonGroup.Indicator />
        <FeatureContent {...feature} />
      </CheckboxButtonGroup.Item>
    ))}
  </CheckboxButtonGroup>
);
