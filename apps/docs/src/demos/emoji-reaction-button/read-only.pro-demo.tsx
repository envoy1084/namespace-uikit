"use client";

// @demo-title Read Only
import { EmojiReactionButton } from "@thenamespace/uikit";

export const ProReadOnlyExample = () => (
  <div className="flex items-center gap-2">
    <EmojiReactionButton isReadOnly isSelected>
      <EmojiReactionButton.Emoji>❤️</EmojiReactionButton.Emoji>
      <EmojiReactionButton.Count>12</EmojiReactionButton.Count>
    </EmojiReactionButton>
    <EmojiReactionButton isReadOnly>
      <EmojiReactionButton.Emoji>👍</EmojiReactionButton.Emoji>
      <EmojiReactionButton.Count>3</EmojiReactionButton.Count>
    </EmojiReactionButton>
  </div>
);
