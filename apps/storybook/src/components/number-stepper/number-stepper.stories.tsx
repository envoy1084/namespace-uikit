import type { Meta, StoryObj } from "@storybook/react";

import React from "react";

import { Description } from "../description";
import { Label } from "../label";
import { NumberStepper } from "./index";

const meta: Meta<typeof NumberStepper> = {
  component: NumberStepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/NumberStepper",
};

export default meta;
type Story = StoryObj<typeof meta>;

function StepperContent() {
  return (
    <NumberStepper.Group>
      <NumberStepper.DecrementButton />
      <NumberStepper.Value />
      <NumberStepper.IncrementButton />
    </NumberStepper.Group>
  );
}

export const Default: Story = {
  args: {
    defaultValue: 1,
    maxValue: 99,
    minValue: 0,
  },
  render: (args) => (
    <NumberStepper {...args}>
      <StepperContent />
    </NumberStepper>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <NumberStepper defaultValue={1} key={size} size={size}>
          <StepperContent />
        </NumberStepper>
      ))}
    </div>
  ),
};

function ControlledExample() {
  const [value, setValue] = React.useState(3);

  return (
    <div className="flex flex-col items-center gap-3">
      <NumberStepper
        maxValue={10}
        minValue={0}
        onChange={setValue}
        value={value}
      >
        <StepperContent />
      </NumberStepper>
      <p className="text-muted text-sm">Current value: {value}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledExample />,
};

export const FormatOptions: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <NumberStepper
        defaultValue={25}
        formatOptions={{ currency: "USD", style: "currency" }}
        step={5}
      >
        <StepperContent />
      </NumberStepper>
      <NumberStepper
        defaultValue={0.5}
        formatOptions={{ style: "percent" }}
        maxValue={1}
        minValue={0}
        step={0.1}
      >
        <StepperContent />
      </NumberStepper>
    </div>
  ),
};

export const CustomValue: Story = {
  render: () => (
    <NumberStepper defaultValue={2} maxValue={8} minValue={1}>
      <NumberStepper.Group>
        <NumberStepper.DecrementButton />
        <NumberStepper.Value>
          {({ value }) => (
            <span className="number-stepper__value number-stepper__value--md px-2">
              {value} {value === 1 ? "guest" : "guests"}
            </span>
          )}
        </NumberStepper.Value>
        <NumberStepper.IncrementButton />
      </NumberStepper.Group>
    </NumberStepper>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <NumberStepper defaultValue={1} maxValue={10} minValue={0}>
      <Label>Quantity</Label>
      <StepperContent />
      <Description>Choose between 0 and 10 items.</Description>
    </NumberStepper>
  ),
};

export const Reversed: Story = {
  render: () => (
    <NumberStepper defaultValue={1}>
      <NumberStepper.Group>
        <NumberStepper.IncrementButton />
        <NumberStepper.Value />
        <NumberStepper.DecrementButton />
      </NumberStepper.Group>
    </NumberStepper>
  ),
};

export const Disabled: Story = {
  render: () => (
    <NumberStepper isDisabled defaultValue={1}>
      <StepperContent />
    </NumberStepper>
  ),
};
