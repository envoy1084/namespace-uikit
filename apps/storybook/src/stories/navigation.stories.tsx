import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Navigation",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Breadcrumbs: Story = {
  render: () => <ComponentStory id="breadcrumbs" />,
};

export const Pagination: Story = {
  render: () => <ComponentStory id="pagination" />,
};

export const Tabs: Story = {
  render: () => <ComponentStory id="tabs" />,
};
