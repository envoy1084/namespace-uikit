import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Collections",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
  render: () => <ComponentStory id="dropdown" />,
};

export const ListBox: Story = {
  render: () => <ComponentStory id="list-box" />,
};

export const TagGroup: Story = {
  render: () => <ComponentStory id="tag-group" />,
};
