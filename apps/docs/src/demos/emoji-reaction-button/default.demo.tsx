"use client";

// @demo-title Default
import { useState } from "react";

import { EmojiReactionButton } from "@thenamespace/uikit";

const initial = {
  "❤️": { count: 12, selected: true },
  "🎉": { count: 1, selected: false },
  "👍": { count: 5, selected: false },
  "😂": { count: 3, selected: false },
  "🚀": { count: 1, selected: false },
};

export const DemoDefaultExample = function Demo() {
  const [reactions, setReactions] = useState(initial);
  const toggle = (emoji: keyof typeof initial) =>
    setReactions((current) => {
      const item = current[emoji];
      const selected = !item.selected;
      const count = selected ? item.count + 1 : item.count - 1;
      if (count < 1) {
        const next = { ...current };
        delete next[emoji];
        return next;
      }
      return { ...current, [emoji]: { count, selected } };
    });
  return (
    <div className="flex flex-wrap items-center gap-2">
      {Object.entries(reactions).map(([emoji, item]) => (
        <EmojiReactionButton
          isSelected={item.selected}
          key={emoji}
          onChange={() => toggle(emoji as keyof typeof initial)}
        >
          <EmojiReactionButton.Emoji>{emoji}</EmojiReactionButton.Emoji>
          {item.count > 0 ? (
            <EmojiReactionButton.Count>{item.count}</EmojiReactionButton.Count>
          ) : null}
        </EmojiReactionButton>
      ))}
    </div>
  );
};
