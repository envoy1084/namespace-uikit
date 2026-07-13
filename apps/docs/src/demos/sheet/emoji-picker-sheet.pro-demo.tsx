// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Emoji Picker Sheet
import { useMemo, useRef, useState } from "react";

import {
  Basketball01Icon,
  Car01Icon,
  CurrencyIcon,
  Flag01Icon,
  FlowerIcon,
  HandPointingRight01Icon,
  Idea01Icon,
  SmileIcon,
  SpoonAndForkIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import {
  EmojiPicker,
  EMOJI_SKIN_TONES,
} from "@thenamespace/uikit/emoji-picker";
import { EmptyState } from "@thenamespace/uikit/empty-state";
import { Input } from "@thenamespace/uikit/input";
import { ScrollShadow } from "@thenamespace/uikit/scroll-shadow";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Tooltip } from "@thenamespace/uikit/tooltip";
import emojiDataSource from "emojibase-data/en/compact.json";
import { Size } from "react-aria-components";

const snapPoints = ["148px", "355px", 1];

const sheetEmojiData = emojiDataSource.filter(
  (emoji) =>
    typeof emoji.label === "string" &&
    !emoji.label.startsWith("regional indicator"),
);

const sheetEmojiGroups = {
  activities: 6,
  "animals-nature": 3,
  flags: 9,
  "food-drink": 4,
  objects: 7,
  "people-body": 1,
  "smileys-emotion": 0,
  symbols: 8,
  "travel-places": 5,
} as const;

const sheetEmojiCategories: Array<{
  icon: IconSvgElement;
  id: keyof typeof sheetEmojiGroups;
  label: string;
}> = [
  { icon: SmileIcon, id: "smileys-emotion", label: "Smileys & Emotion" },
  {
    icon: HandPointingRight01Icon,
    id: "people-body",
    label: "People & Body",
  },
  { icon: FlowerIcon, id: "animals-nature", label: "Animals & Nature" },
  { icon: SpoonAndForkIcon, id: "food-drink", label: "Food & Drink" },
  { icon: Basketball01Icon, id: "activities", label: "Activities" },
  { icon: Car01Icon, id: "travel-places", label: "Travel & Places" },
  { icon: Idea01Icon, id: "objects", label: "Objects" },
  { icon: CurrencyIcon, id: "symbols", label: "Symbols" },
  { icon: Flag01Icon, id: "flags", label: "Flags" },
];

function SheetEmojiPicker({
  onEmojiSelect,
}: {
  onEmojiSelect?: (emoji: string) => void;
}) {
  const [tone, setTone] = useState("default");
  const gridRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => {
    const skinIndex =
      EMOJI_SKIN_TONES.findIndex((item) => item.id === tone) - 1;
    const data = sheetEmojiData.slice(0, 200);

    if (skinIndex < 0) return data;

    return data.map((emoji) => {
      const skin = emoji.skins?.[skinIndex];

      return skin ? Object.assign({}, emoji, { unicode: skin.unicode }) : emoji;
    });
  }, [tone]);
  const groupStarts = useMemo(() => {
    const starts: Partial<Record<keyof typeof sheetEmojiGroups, number>> = {};

    for (const [id, group] of Object.entries(sheetEmojiGroups) as Array<
      [keyof typeof sheetEmojiGroups, number]
    >) {
      const index = items.findIndex((emoji) => emoji.group === group);

      if (index !== -1) starts[id] = index;
    }

    return starts;
  }, [items]);

  const scrollToGroup = (id: keyof typeof sheetEmojiGroups) => {
    const grid = gridRef.current;
    const index = groupStarts[id];

    if (!grid || index === undefined) return;

    const itemSize = 48;
    const columns = Math.floor(grid.clientWidth / itemSize);

    grid.scrollTo({
      behavior: "smooth",
      top: Math.floor(index / columns) * itemSize,
    });
  };

  return (
    <EmojiPicker
      aria-label="Emoji sheet picker"
      className="h-full min-h-0"
      size="lg"
      onSelectionChange={(key) => {
        if (key != null) onEmojiSelect?.(String(key));
      }}
    >
      <EmojiPicker.Content className="h-full">
        <SearchField aria-label="Search emoji" variant="secondary">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search" />
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
          layoutOptions={{
            maxItemSize: new Size(48, 48),
            minItemSize: new Size(48, 48),
          }}
          renderEmptyState={() => (
            <EmptyState className="flex h-full min-h-20 flex-1 flex-col items-center justify-center gap-2">
              <HugeiconsIcon
                aria-hidden
                className="text-muted size-5"
                icon={SmileIcon}
              />
              No emoji found.
            </EmptyState>
          )}
        >
          {(item) => (
            <EmojiPicker.Item
              id={String(item.unicode)}
              textValue={`${item.label ?? ""} ${Array.isArray(item.tags) ? item.tags.join(" ") : ""}`}
            >
              {item.unicode}
            </EmojiPicker.Item>
          )}
        </EmojiPicker.Grid>
        <EmojiPicker.Footer>
          <ScrollShadow hideScrollBar orientation="horizontal">
            <div className="flex items-center gap-1 overflow-visible px-2 py-0.5 pr-3">
              {sheetEmojiCategories.map(({ icon, id, label }) => (
                <Tooltip delay={0} key={id}>
                  <Button
                    excludeFromTabOrder
                    isIconOnly
                    aria-label={label}
                    className="hover:bg-muted/20 text-muted flex size-8 shrink-0 items-center justify-center rounded-full rounded-md"
                    variant="ghost"
                    onPress={() => scrollToGroup(id)}
                  >
                    <HugeiconsIcon aria-hidden icon={icon} size={16} />
                  </Button>
                  <Tooltip.Content placement="top">
                    <p>{label}</p>
                  </Tooltip.Content>
                </Tooltip>
              ))}
            </div>
          </ScrollShadow>
        </EmojiPicker.Footer>
      </EmojiPicker.Content>
    </EmojiPicker>
  );
}

function EmojiPickerSheetDemo() {
  const emojiSheetSnapPoints = ["355px", 1];
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(emojiSheetSnapPoints[0]!);
  const [isOpen, setIsOpen] = useState(false);
  const [emoji, setEmoji] = useState("😀");

  return (
    <Sheet
      isDetached
      activeSnapPoint={activeSnapPoint}
      isOpen={isOpen}
      snapPoints={emojiSheetSnapPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
      onOpenChange={setIsOpen}
    >
      <Sheet.Trigger>
        <Button variant="secondary">
          <span className="text-lg">{emoji}</span> Emoji Picker
        </Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Body className="min-h-0 overflow-hidden p-0">
              <SheetEmojiPicker
                onEmojiSelect={(value) => {
                  setEmoji(value);
                  setIsOpen(false);
                }}
              />
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const ProEmojiPickerSheetExample = () => <EmojiPickerSheetDemo />;
