import type { Meta, StoryObj } from "@storybook/react";

import { useMemo, useRef, useState } from "react";

import {
  Button,
  ScrollShadow,
  SearchField,
  Tooltip,
} from "@thenamespace/uikit";

import { EmojiPicker, EMOJI_SKIN_TONES } from "./index";

interface EmojiItem {
  category: string;
  label: string;
  tags: string[];
  unicode: string;
}
const groups = [
  [
    "Smileys & Emotion",
    "😀",
    "😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😋 😛 😜 🤪 🤨 🧐 🤓 😎 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 🤗 🤔 🫣 🤭 🤫 🤥 😶 😐 😑 😬 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪",
  ],
  [
    "People & Body",
    "👋",
    "👋 🤚 🖐️ ✋ 🖖 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏",
  ],
  [
    "Animals & Nature",
    "🐶",
    "🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐸 🐵 🐔 🐧 🐦 🦄 🐝 🦋 🌸 🌻 🌈",
  ],
  [
    "Food & Drink",
    "🍎",
    "🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🥑 🍕 🍔 🍟 🍣 🍪 🎂 ☕",
  ],
] as const;
const emojiItems: EmojiItem[] = groups.flatMap(([category, , values]) =>
  values.split(" ").map((unicode) => ({
    category,
    label: `${category} ${unicode}`,
    tags: [category.toLowerCase(), unicode],
    unicode,
  })),
);
function PickerContents() {
  const [tone, setTone] = useState("default");
  const gridRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => emojiItems, []);
  return (
    <>
      <SearchField autoFocus aria-label="Search emoji" variant="secondary">
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search emoji..." />
          <EmojiPicker.SkinTonePicker value={tone} onChange={setTone}>
            <EmojiPicker.SkinToneTrigger className="mr-1" />
            <EmojiPicker.SkinToneContent>
              {EMOJI_SKIN_TONES.map((item) => (
                <EmojiPicker.SkinToneOption
                  aria-label={item.label}
                  id={item.id}
                  key={item.id}
                >
                  {item.emoji}
                </EmojiPicker.SkinToneOption>
              ))}
            </EmojiPicker.SkinToneContent>
          </EmojiPicker.SkinTonePicker>
        </SearchField.Group>
      </SearchField>
      <EmojiPicker.Grid
        ref={gridRef}
        items={items}
        renderEmptyState={() => <span>No emoji found.</span>}
      >
        {(item) => (
          <EmojiPicker.Item
            id={item.unicode}
            textValue={`${item.label} ${item.tags.join(" ")}`}
          >
            {item.unicode}
          </EmojiPicker.Item>
        )}
      </EmojiPicker.Grid>
      <EmojiPicker.Footer>
        <ScrollShadow hideScrollBar orientation="horizontal">
          <div className="flex items-center gap-1 overflow-visible px-2 py-0.5 pr-3">
            {groups.map(([label, emoji]) => (
              <Tooltip delay={0} key={label}>
                <Button
                  excludeFromTabOrder
                  isIconOnly
                  aria-label={label}
                  className="flex size-6 shrink-0 items-center justify-center rounded-md"
                  variant="ghost"
                >
                  <span className="text-base">{emoji}</span>
                </Button>
                <Tooltip.Content placement="top">
                  <p>{label}</p>
                </Tooltip.Content>
              </Tooltip>
            ))}
          </div>
        </ScrollShadow>
      </EmojiPicker.Footer>
    </>
  );
}
function DefaultDemo({ size = "md" }: { size?: "lg" | "md" | "sm" }) {
  return (
    <EmojiPicker aria-label={`Emoji ${size}`} defaultValue="😀" size={size}>
      <EmojiPicker.Trigger className="text-xl">
        <EmojiPicker.Value />
      </EmojiPicker.Trigger>
      <EmojiPicker.Popover>
        <EmojiPicker.Content>
          <PickerContents />
        </EmojiPicker.Content>
      </EmojiPicker.Popover>
    </EmojiPicker>
  );
}
const meta = {
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/EmojiPicker",
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <DefaultDemo /> };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex flex-col items-center gap-2" key={size}>
          <span className="text-muted text-xs font-medium">{size}</span>
          <DefaultDemo size={size} />
        </div>
      ))}
    </div>
  ),
};
export const Inline: Story = {
  render: () => (
    <EmojiPicker aria-label="Inline Emoji" size="md">
      <div className="emoji-picker__popover emoji-picker__popover--md relative">
        <EmojiPicker.Content>
          <PickerContents />
        </EmojiPicker.Content>
      </div>
    </EmojiPicker>
  ),
};
export const CustomCategories: Story = {
  name: "Custom Categories",
  render: () => (
    <EmojiPicker aria-label="Emoji" defaultValue="😀">
      <EmojiPicker.Trigger className="text-xl">
        <EmojiPicker.Value />
      </EmojiPicker.Trigger>
      <EmojiPicker.Popover>
        <EmojiPicker.Content>
          <PickerContents />
        </EmojiPicker.Content>
      </EmojiPicker.Popover>
    </EmojiPicker>
  ),
};
