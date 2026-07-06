import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Forms",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  render: () => <ComponentStory id="checkbox" />,
};

export const CheckboxGroup: Story = {
  render: () => <ComponentStory id="checkbox-group" />,
};

export const ComboBox: Story = {
  render: () => <ComponentStory id="combo-box" />,
};

export const Fieldset: Story = {
  render: () => <ComponentStory id="fieldset" />,
};

export const Form: Story = {
  render: () => <ComponentStory id="form" />,
};

export const Input: Story = {
  render: () => <ComponentStory id="input" />,
};

export const InputGroup: Story = {
  render: () => <ComponentStory id="input-group" />,
};

export const InputOTP: Story = {
  render: () => <ComponentStory id="input-otp" />,
};

export const NumberField: Story = {
  render: () => <ComponentStory id="number-field" />,
};

export const RadioGroup: Story = {
  render: () => <ComponentStory id="radio-group" />,
};

export const SearchField: Story = {
  render: () => <ComponentStory id="search-field" />,
};

export const Select: Story = {
  render: () => <ComponentStory id="select" />,
};

export const TextArea: Story = {
  render: () => <ComponentStory id="text-area" />,
};

export const TextField: Story = {
  render: () => <ComponentStory id="text-field" />,
};
