"use client";

// @demo-title Onboarding Timeline
import { Stepper } from "@thenamespace/uikit";

function Timeline({ kind }: { kind: "onboarding" | "package" | "trial" }) {
  const data =
    kind === "package"
      ? [
          ["Order placed", "We received your order"],
          ["Shipped", "Package left the warehouse"],
          ["In transit", "Arriving tomorrow"],
          ["Delivered", "Pending delivery"],
        ]
      : kind === "trial"
        ? [
            ["Start free trial", "Today"],
            ["Trial reminder", "In 10 days"],
            ["Trial ends", "In 14 days"],
            ["First payment", "Only if you continue"],
          ]
        : [
            ["Create account", "Add your details"],
            ["Choose a workspace", "Invite your team"],
            ["Connect tools", "Link your workflow"],
            ["You're ready", "Start building"],
          ];
  return (
    <div className="border-border bg-surface w-[360px] rounded-xl border p-6">
      <h3 className="mb-5 font-semibold capitalize">
        {kind === "package" ? "Package tracking" : kind}
      </h3>
      <Stepper
        currentStep={kind === "package" ? 1.5 : 1}
        orientation="vertical"
      >
        {data.map(([title, description]) => (
          <Stepper.Step key={title}>
            <Stepper.Indicator />
            <Stepper.Content>
              <Stepper.Title>{title}</Stepper.Title>
              <Stepper.Description>{description}</Stepper.Description>
            </Stepper.Content>
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>
    </div>
  );
}

export const ProOnboardingTimelineExample = () => (
  <Timeline kind="onboarding" />
);
