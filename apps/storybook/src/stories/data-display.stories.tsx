import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Data Display",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  render: () => <ComponentStory id="avatar" />,
};

export const Badge: Story = {
  render: () => <ComponentStory id="badge" />,
};

export const Chip: Story = {
  render: () => <ComponentStory id="chip" />,
};

export const Table: Story = {
  render: () => <ComponentStory id="table" />,
};
