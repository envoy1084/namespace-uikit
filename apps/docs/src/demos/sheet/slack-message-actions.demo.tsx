"use client";

// @demo-title Slack-like Message Actions
import type { Key } from "react";
import { useState } from "react";

import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  Bookmark01Icon,
  Clock01Icon,
  Copy01Icon,
  Link01Icon,
  Mail01Icon,
  MoreHorizontalIcon,
  Notification01Icon,
  PinIcon,
  SmileIcon,
  Task01Icon,
  TextIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Description } from "@thenamespace/uikit/description";
import { EmojiPicker } from "@thenamespace/uikit/emoji-picker";
import { EmojiReactionButton } from "@thenamespace/uikit/emoji-reaction-button";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { ListBox } from "@thenamespace/uikit/list-box";
import { SearchField } from "@thenamespace/uikit/search-field";
import { Separator } from "@thenamespace/uikit/separator";
import emojiDataSource from "emojibase-data/en/compact.json";

const snapPoints = ["148px", "355px", 1];

const sheetEmojiData = emojiDataSource.filter(
  (emoji) =>
    typeof emoji.label === "string" &&
    !emoji.label.startsWith("regional indicator"),
);

function ActionIcon({ icon }: { icon: IconSvgElement }) {
  return (
    <HugeiconsIcon
      aria-hidden
      className="text-muted size-5 shrink-0"
      icon={icon}
      strokeWidth={2}
    />
  );
}

function SlackMessageActionsDemo() {
  const sheetSnapPoints = ["355px", 1];
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(sheetSnapPoints[0]!);
  const [showMore, setShowMore] = useState(false);
  const [reactions, setReactions] = useState<
    Record<string, { count: number; selected: boolean }>
  >({});
  const quickReactions = ["🚀", "🙌", "👍", "🤔", "🙏"];
  const toggleReaction = (emoji: string) => {
    setReactions((current) => {
      const reaction = current[emoji];

      if (!reaction)
        return { ...current, [emoji]: { count: 1, selected: true } };

      const selected = !reaction.selected;
      const count = selected ? reaction.count + 1 : reaction.count - 1;

      if (count < 1) {
        const next = { ...current };
        delete next[emoji];
        return next;
      }

      return { ...current, [emoji]: { count, selected } };
    });
  };
  const addReaction = (key: Key | null) => {
    if (key == null) return;

    const emoji = String(key);
    setReactions((current) => ({
      ...current,
      [emoji]: {
        count: (current[emoji]?.count ?? 0) + 1,
        selected: false,
      },
    }));
  };

  return (
    <Sheet
      activeSnapPoint={activeSnapPoint}
      snapPoints={sheetSnapPoints}
      onActiveSnapPointChange={setActiveSnapPoint}
    >
      <Sheet.Trigger>
        <Button variant="secondary">Slack message actions</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
          <Sheet.Dialog>
            <Sheet.Handle />
            <Sheet.Body className="px-0 pt-0">
              <div className="flex items-center justify-center gap-2 px-4 pt-1 pb-3">
                {quickReactions.map((emoji) => {
                  const reaction = reactions[emoji];

                  return (
                    <EmojiReactionButton
                      isSelected={reaction?.selected ?? false}
                      key={emoji}
                      size="lg"
                      onChange={() => toggleReaction(emoji)}
                    >
                      <EmojiReactionButton.Emoji>
                        {emoji}
                      </EmojiReactionButton.Emoji>
                      {reaction && reaction.count > 0 ? (
                        <EmojiReactionButton.Count>
                          {reaction.count}
                        </EmojiReactionButton.Count>
                      ) : null}
                    </EmojiReactionButton>
                  );
                })}
                <EmojiPicker
                  aria-label="Add reaction"
                  size="md"
                  onSelectionChange={addReaction}
                >
                  <EmojiPicker.Trigger
                    aria-label="Add reaction"
                    className="emoji-reaction-button emoji-reaction-button--lg min-h-0 min-w-0"
                  >
                    <HugeiconsIcon aria-hidden icon={SmileIcon} size={20} />
                  </EmojiPicker.Trigger>
                  <EmojiPicker.Popover>
                    <EmojiPicker.Content>
                      <SearchField
                        autoFocus
                        aria-label="Search emoji"
                        variant="secondary"
                      >
                        <SearchField.Group>
                          <SearchField.SearchIcon />
                          <SearchField.Input placeholder="Search emoji..." />
                        </SearchField.Group>
                      </SearchField>
                      <EmojiPicker.Grid items={sheetEmojiData}>
                        {(item) => (
                          <EmojiPicker.Item
                            id={String(item.unicode)}
                            textValue={`${item.label ?? ""} ${item.tags?.join(" ") ?? ""}`}
                          >
                            {item.unicode}
                          </EmojiPicker.Item>
                        )}
                      </EmojiPicker.Grid>
                    </EmojiPicker.Content>
                  </EmojiPicker.Popover>
                </EmojiPicker>
              </div>
              <div className="grid grid-cols-3 gap-2 px-4 pb-3">
                {[
                  ["Reply", ArrowTurnBackwardIcon],
                  ["Forward", ArrowTurnForwardIcon],
                  ["Save", Bookmark01Icon],
                ].map(([label, icon]) => (
                  <Button
                    className="flex h-auto w-full flex-col gap-1.5 rounded-xl py-3"
                    key={label as string}
                    variant="tertiary"
                  >
                    <HugeiconsIcon
                      aria-hidden
                      icon={icon as IconSvgElement}
                      size={20}
                    />
                    <span className="text-xs font-medium">
                      {label as string}
                    </span>
                  </Button>
                ))}
              </div>
              <ListBox
                aria-label="Message actions"
                className="w-full"
                selectionMode="none"
                onAction={(key) => {
                  if (key === "more-actions") setShowMore(!showMore);
                }}
              >
                <ListBox.Section>
                  <ListBox.Item id="mark-unread" textValue="Mark Unread">
                    <ActionIcon icon={Mail01Icon} />
                    <Label>Mark Unread</Label>
                  </ListBox.Item>
                  <ListBox.Item id="remind-me" textValue="Remind Me">
                    <ActionIcon icon={Clock01Icon} />
                    <Label>Remind Me</Label>
                  </ListBox.Item>
                  <ListBox.Item
                    id="get-reply-notifications"
                    textValue="Get Reply Notifications"
                  >
                    <ActionIcon icon={Notification01Icon} />
                    <Label>Get Reply Notifications</Label>
                  </ListBox.Item>
                </ListBox.Section>
                <Separator />
                <ListBox.Section>
                  <ListBox.Item id="copy-link" textValue="Copy Link to Message">
                    <ActionIcon icon={Link01Icon} />
                    <Label>Copy Link to Message</Label>
                  </ListBox.Item>
                  <ListBox.Item id="copy-message" textValue="Copy Message">
                    <ActionIcon icon={Copy01Icon} />
                    <Label>Copy Message</Label>
                  </ListBox.Item>
                </ListBox.Section>
                <Separator />
                <ListBox.Section>
                  <ListBox.Item id="more-actions" textValue="More Actions">
                    <ActionIcon icon={MoreHorizontalIcon} />
                    <Label>More Actions</Label>
                    <HugeiconsIcon
                      aria-hidden
                      className="text-muted ms-auto size-4 shrink-0"
                      icon={showMore ? ArrowDown01Icon : ArrowRight01Icon}
                    />
                  </ListBox.Item>
                  {showMore ? (
                    <>
                      <ListBox.Item id="add-to-list" textValue="Add to List">
                        <ActionIcon icon={Task01Icon} />
                        <Label>Add to List</Label>
                      </ListBox.Item>
                      <ListBox.Item
                        id="pin-to-channel"
                        textValue="Pin to Channel"
                      >
                        <ActionIcon icon={PinIcon} />
                        <Label>Pin to Channel</Label>
                      </ListBox.Item>
                      <ListBox.Item id="select-text" textValue="Select Text">
                        <ActionIcon icon={TextIcon} />
                        <Label>Select Text</Label>
                      </ListBox.Item>
                      <ListBox.Item
                        id="link-existing"
                        textValue="Link existing..."
                      >
                        <ActionIcon icon={Link01Icon} />
                        <div className="flex flex-col">
                          <Label>Link existing...</Label>
                          <Description>
                            Links an existing issue or project in Linear
                          </Description>
                        </div>
                      </ListBox.Item>
                      <ListBox.Item
                        id="turn-into-poll"
                        textValue="Turn question into poll"
                      >
                        <ActionIcon icon={Task01Icon} />
                        <div className="flex flex-col">
                          <Label>Turn question into poll</Label>
                          <Description>
                            Turns a message into a Simple Poll question
                          </Description>
                        </div>
                      </ListBox.Item>
                    </>
                  ) : null}
                </ListBox.Section>
              </ListBox>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoSlackMessageActionsExample = () => <SlackMessageActionsDemo />;
