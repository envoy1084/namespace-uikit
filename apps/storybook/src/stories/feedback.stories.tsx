import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Feedback",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Alert: Story = {
  render: () => <ComponentStory id="alert" />,
};

export const EmptyState: Story = {
  render: () => <ComponentStory id="empty-state" />,
};

export const ProgressBar: Story = {
  render: () => <ComponentStory id="progress-bar" />,
};

export const ProgressCircle: Story = {
  render: () => <ComponentStory id="progress-circle" />,
};

export const Skeleton: Story = {
  render: () => <ComponentStory id="skeleton" />,
};

export const Spinner: Story = {
  render: () => <ComponentStory id="spinner" />,
};
