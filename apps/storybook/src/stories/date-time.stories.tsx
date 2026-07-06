import type { Meta, StoryObj } from "@storybook/react";

import { ComponentStory } from "./story-layout";

const meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Date and Time",
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  render: () => <ComponentStory id="calendar" />,
};

export const DateField: Story = {
  render: () => <ComponentStory id="date-field" />,
};

export const DatePicker: Story = {
  render: () => <ComponentStory id="date-picker" />,
};

export const TimeField: Story = {
  render: () => <ComponentStory id="time-field" />,
};
