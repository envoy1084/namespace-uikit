import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Overlays",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Drawer: Story = {
  render: () => <ComponentStory id="drawer" />,
};

export const Modal: Story = {
  render: () => <ComponentStory id="modal" />,
};

export const Popover: Story = {
  render: () => <ComponentStory id="popover" />,
};

export const Tooltip: Story = {
  render: () => <ComponentStory id="tooltip" />,
};
