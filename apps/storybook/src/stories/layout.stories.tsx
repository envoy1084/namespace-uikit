import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Layout",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accordion: Story = {
  render: () => <ComponentStory id="accordion" />,
};

export const Card: Story = {
  render: () => <ComponentStory id="card" />,
};

export const Disclosure: Story = {
  render: () => <ComponentStory id="disclosure" />,
};

export const DisclosureGroup: Story = {
  render: () => <ComponentStory id="disclosure-group" />,
};

export const Separator: Story = {
  render: () => <ComponentStory id="separator" />,
};

export const Toolbar: Story = {
  render: () => <ComponentStory id="toolbar" />,
};
