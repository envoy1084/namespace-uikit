import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Controls",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  render: () => <ComponentStory id="slider" />,
};

export const Switch: Story = {
  render: () => <ComponentStory id="switch" />,
};
