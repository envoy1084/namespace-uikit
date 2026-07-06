import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Typography",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Kbd: Story = {
  render: () => <ComponentStory id="kbd" />,
};

export const Typography: Story = {
  render: () => <ComponentStory id="typography" />,
};
