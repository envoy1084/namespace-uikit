import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Buttons",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  render: () => <ComponentStory id="button" />,
};

export const ButtonGroup: Story = {
  render: () => <ComponentStory id="button-group" />,
};

export const CloseButton: Story = {
  render: () => <ComponentStory id="close-button" />,
};

export const ToggleButton: Story = {
  render: () => <ComponentStory id="toggle-button" />,
};

export const ToggleButtonGroup: Story = {
  render: () => <ComponentStory id="toggle-button-group" />,
};
