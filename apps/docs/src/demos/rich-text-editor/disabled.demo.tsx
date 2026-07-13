"use client";

// @demo-title Disabled
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
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { RichTextEditor } from "@thenamespace/uikit";

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

export const DemoDisabledExample = () => (
  <div className="grid w-full max-w-[860px] grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))] gap-4">
    <Editor
      isDisabled
      defaultValue={{
        type: "doc",
        content: [
          {
            attrs: { level: 3 },
            content: [{ text: "Disabled state", type: "text" }],
            type: "heading",
          },
          {
            content: [
              {
                text: "Use disabled mode when the entire field is unavailable. Toolbar actions, editing, and link changes are all blocked.",
                type: "text",
              },
            ],
            type: "paragraph",
          },
          {
            content: [
              {
                content: [
                  {
                    content: [
                      {
                        text: "Best for locked forms or pending permissions.",
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
          { type: "paragraph" },
        ],
      }}
      footerLabel="Disabled"
    />
    <Editor
      isReadOnly
      defaultValue={{
        type: "doc",
        content: [
          {
            attrs: { level: 3 },
            content: [{ text: "Read-only review", type: "text" }],
            type: "heading",
          },
          {
            content: [
              {
                text: "Read-only mode keeps the same visual surface and selectable text while preventing document mutations.",
                type: "text",
              },
            ],
            type: "paragraph",
          },
          {
            content: [
              {
                content: [
                  {
                    content: [
                      {
                        text: "Best for review screens, previews, and archived records.",
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
          { type: "paragraph" },
        ],
      }}
      footerLabel="Read only"
    />
  </div>
);
