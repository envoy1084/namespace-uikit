"use client";

// @demo-title Disabled
import { EmojiReactionButton } from "@thenamespace/uikit";

export const DemoDisabledExample = () => (
  <div className="flex items-center gap-2">
    <EmojiReactionButton isDisabled isSelected>
      <EmojiReactionButton.Emoji>❤️</EmojiReactionButton.Emoji>
      <EmojiReactionButton.Count>12</EmojiReactionButton.Count>
    </EmojiReactionButton>
    <EmojiReactionButton isDisabled>
      <EmojiReactionButton.Emoji>👍</EmojiReactionButton.Emoji>
      <EmojiReactionButton.Count>3</EmojiReactionButton.Count>
    </EmojiReactionButton>
  </div>
);
