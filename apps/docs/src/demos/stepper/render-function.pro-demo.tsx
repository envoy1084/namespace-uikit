"use client";

// @demo-title Render Function
import { Stepper } from "@thenamespace/uikit";

const detailed = [
  ["Account", "Create your account"],
  ["Profile", "Set up your profile"],
  ["Settings", "Configure preferences"],
  ["Review", "Review and confirm"],
] as const;

function RenderedStep({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  const { status } = Stepper.useStep();
  return (
    <>
      <Stepper.Indicator />
      <Stepper.Content>
        <Stepper.Title>{title}</Stepper.Title>
        <Stepper.Description>
          {status === "active" ? description : status}
        </Stepper.Description>
      </Stepper.Content>
      <Stepper.Separator />
    </>
  );
}

export const ProRenderFunctionExample = () => (
  <div className="w-[600px]">
    <Stepper currentStep={1}>
      {detailed.map(([title, description]) => (
        <Stepper.Step key={title}>
          <RenderedStep description={description} title={title} />
        </Stepper.Step>
      ))}
    </Stepper>
  </div>
);
