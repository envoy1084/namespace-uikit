"use client";

// @demo-title Controlled
import { useState } from "react";

import { RichTextEditor, type JSONContent } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import {
  CodeSquareIcon,
  Delete02Icon,
  EraserIcon,
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Link01Icon,
  QuoteUpIcon,
  Redo02Icon,
  SourceCodeIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  Undo02Icon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon, type IconSvgElement } from "@thenamespace/uikit/icons";

const controlledArticle: JSONContent = {
  type: "doc",
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: "Controlled JSON value", type: "text" }],
      type: "heading",
    },
    {
      type: "paragraph",
      content: [
        {
          text: "This demo keeps the editor document in React state. The buttons above replace the ",
          type: "text",
        },
        { marks: [{ type: "code" }], text: "value", type: "text" },
        {
          text: " prop, and the JSON preview below updates after every edit.",
          type: "text",
        },
      ],
    },
    {
      content: [
        {
          content: [
            {
              content: [
                {
                  text: "Edit this paragraph and watch the JSON mirror change.",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
          ],
          type: "listItem",
        },
        {
          content: [
            {
              content: [
                { text: "The footer reads ", type: "text" },
                {
                  marks: [{ type: "bold" }],
                  text: "character",
                  type: "text",
                },
                { text: " and ", type: "text" },
                {
                  marks: [{ type: "italic" }],
                  text: "word",
                  type: "text",
                },
                {
                  text: " counts from Tiptap storage.",
                  type: "text",
                },
              ],
              type: "paragraph",
            },
          ],
          type: "listItem",
        },
      ],
      type: "bulletList",
    },
    {
      content: [
        {
          content: [
            {
              text: "Controlled mode should feel editable, not fragile: external updates only replace content when the incoming JSON differs.",
              type: "text",
            },
          ],
          type: "paragraph",
        },
      ],
      type: "blockquote",
    },
    { type: "paragraph" },
  ],
};

const releaseNote: JSONContent = {
  type: "doc",
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: "Loaded release note", type: "text" }],
      type: "heading",
    },
    {
      content: [
        {
          text: "Switching documents should preserve the same toolbar, footer, and editor shell while replacing the serialized ",
          type: "text",
        },
        { marks: [{ type: "code" }], text: "JSONContent", type: "text" },
        { text: " value.", type: "text" },
      ],
      type: "paragraph",
    },
  ],
};

function Tool({
  command,
  icon,
  tooltip,
}: {
  command: Parameters<typeof RichTextEditor.ToggleButton>[0]["command"];
  icon: IconSvgElement;
  tooltip: string;
}) {
  return (
    <RichTextEditor.ToggleButton command={command} tooltip={tooltip}>
      <HugeiconsIcon
        aria-hidden
        className="size-4"
        icon={icon}
        strokeWidth={2}
      />
    </RichTextEditor.ToggleButton>
  );
}

function LinkTool() {
  return (
    <RichTextEditor.LinkPopover>
      <RichTextEditor.LinkPopover.Trigger>
        <HugeiconsIcon
          aria-hidden
          className="size-4"
          icon={Link01Icon}
          strokeWidth={2}
        />
      </RichTextEditor.LinkPopover.Trigger>
      <RichTextEditor.LinkPopover.Content>
        <RichTextEditor.LinkPopover.Input />
        <RichTextEditor.LinkPopover.Actions>
          <RichTextEditor.LinkPopover.UnsetButton />
          <RichTextEditor.LinkPopover.ApplyButton />
        </RichTextEditor.LinkPopover.Actions>
      </RichTextEditor.LinkPopover.Content>
    </RichTextEditor.LinkPopover>
  );
}

function Action({
  action,
  icon,
  tooltip,
}: {
  action: Parameters<typeof RichTextEditor.ActionButton>[0]["action"];
  icon: IconSvgElement;
  tooltip: string;
}) {
  return (
    <RichTextEditor.ActionButton action={action} tooltip={tooltip}>
      <HugeiconsIcon
        aria-hidden
        className="size-4"
        icon={icon}
        strokeWidth={2}
      />
    </RichTextEditor.ActionButton>
  );
}

function Toolbar() {
  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ToolbarGroup aria-label="History">
        <Action action="undo" icon={Undo02Icon} tooltip="Undo" />
        <Action action="redo" icon={Redo02Icon} tooltip="Redo" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup aria-label="Text style">
        <Tool command="bold" icon={TextBoldIcon} tooltip="Bold" />
        <Tool command="italic" icon={TextItalicIcon} tooltip="Italic" />
        <Tool
          command="underline"
          icon={TextUnderlineIcon}
          tooltip="Underline"
        />
        <Tool
          command="strike"
          icon={TextStrikethroughIcon}
          tooltip="Strikethrough"
        />
        <Tool command="code" icon={SourceCodeIcon} tooltip="Inline code" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup aria-label="Blocks">
        <Tool command="heading-1" icon={Heading01Icon} tooltip="Heading 1" />
        <Tool command="heading-2" icon={Heading02Icon} tooltip="Heading 2" />
        <Tool command="heading-3" icon={Heading03Icon} tooltip="Heading 3" />
        <Tool command="blockquote" icon={QuoteUpIcon} tooltip="Blockquote" />
        <Tool command="codeBlock" icon={CodeSquareIcon} tooltip="Code block" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup aria-label="Lists and links">
        <Tool
          command="bulletList"
          icon={LeftToRightListBulletIcon}
          tooltip="Bulleted list"
        />
        <Tool
          command="orderedList"
          icon={LeftToRightListNumberIcon}
          tooltip="Numbered list"
        />
        <LinkTool />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup aria-label="Clear">
        <Action
          action="clearFormatting"
          icon={EraserIcon}
          tooltip="Clear formatting"
        />
        <Action
          action="clearContent"
          icon={Delete02Icon}
          tooltip="Clear content"
        />
      </RichTextEditor.ToolbarGroup>
    </RichTextEditor.Toolbar>
  );
}

function BubbleTools() {
  return (
    <RichTextEditor.BubbleMenu>
      <Tool command="bold" icon={TextBoldIcon} tooltip="Bold" />
      <Tool command="italic" icon={TextItalicIcon} tooltip="Italic" />
      <Tool command="underline" icon={TextUnderlineIcon} tooltip="Underline" />
      <Tool
        command="strike"
        icon={TextStrikethroughIcon}
        tooltip="Strikethrough"
      />
      <LinkTool />
    </RichTextEditor.BubbleMenu>
  );
}

function Editor({
  children,
  footerLabel = "JSON-first editor state",
  ...props
}: Parameters<typeof RichTextEditor>[0] & { footerLabel?: string }) {
  return (
    <RichTextEditor {...props}>
      <RichTextEditor.Shell>
        {children ?? (
          <>
            <Toolbar />
            <RichTextEditor.Content />
            <BubbleTools />
            <RichTextEditor.Footer>
              <span>{footerLabel}</span>
              <RichTextEditor.CharacterCount showWords />
            </RichTextEditor.Footer>
          </>
        )}
      </RichTextEditor.Shell>
    </RichTextEditor>
  );
}

export const DemoControlledExample = function Demo() {
  const [value, setValue] = useState<JSONContent>(controlledArticle);
  const [stats, setStats] = useState<{
    characterCount: number;
    wordCount: number;
  } | null>(null);
  return (
    <div className="flex w-full max-w-[760px] flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setValue(controlledArticle)}
        >
          Load Guide
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setValue(releaseNote)}
        >
          Load Notes
        </Button>
        {stats ? (
          <span className="text-muted text-xs sm:ml-auto">
            {stats.characterCount} chars, {stats.wordCount} words
          </span>
        ) : null}
      </div>
      <Editor
        footerLabel="Controlled JSON value"
        value={value}
        onValueChange={(nextValue, details) => {
          setValue(nextValue);
          setStats({
            characterCount: details.characterCount,
            wordCount: details.wordCount,
          });
        }}
      />
      <pre className="bg-default text-muted max-h-[220px] overflow-auto rounded-2xl p-3 text-xs break-words whitespace-pre-wrap">
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  );
};
