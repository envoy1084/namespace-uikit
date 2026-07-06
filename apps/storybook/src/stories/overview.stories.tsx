import type { Meta, StoryObj } from "@storybook/react";

import { ComponentsOverview } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Catalog: Story = {
  render: () => <ComponentsOverview />,
};
