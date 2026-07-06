import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Colors",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ColorArea: Story = {
  render: () => <ComponentStory id="color-area" />,
};

export const ColorField: Story = {
  render: () => <ComponentStory id="color-field" />,
};

export const ColorPicker: Story = {
  render: () => <ComponentStory id="color-picker" />,
};

export const ColorSlider: Story = {
  render: () => <ComponentStory id="color-slider" />,
};

export const ColorSwatch: Story = {
  render: () => <ComponentStory id="color-swatch" />,
};

export const ColorSwatchPicker: Story = {
  render: () => <ComponentStory id="color-swatch-picker" />,
};
