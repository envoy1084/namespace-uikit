"use client";

// @demo-title Default
import { RichTextEditor, type JSONContent } from "@thenamespace/uikit";
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

const article: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Features" }],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          content: [
            {
              marks: [{ type: "italic" }],
              text: "A composable rich text editor with toolbar controls, contextual menus, JSON persistence, and common writing shortcuts.",
              type: "text",
            },
            { text: " Try markdown ", type: "text" },
            { marks: [{ type: "code" }], text: "**", type: "text" },
            {
              text: " or keyboard shortcuts for common marks.",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        { text: "Select the phrase ", type: "text" },
        {
          marks: [{ type: "bold" }],
          text: "contextual selection actions",
          type: "text",
        },
        {
          text: " and use the bubble menu to apply bold, italic, underline, strike, or a link without leaving the document.",
          type: "text",
        },
      ],
    },
    {
      attrs: { level: 3 },
      content: [{ text: "What to try", type: "text" }],
      type: "heading",
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "Use the toolbar to switch headings, lists, quotes, and code blocks.",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { text: "Add a link to ", type: "text" },
                {
                  marks: [
                    { attrs: { href: "https://tiptap.dev" }, type: "link" },
                  ],
                  text: "tiptap.dev",
                  type: "text",
                },
                {
                  text: " or remove formatting with the clear actions.",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { text: "Notice how ", type: "text" },
                {
                  marks: [{ type: "code" }],
                  text: "onValueChange",
                  type: "text",
                },
                {
                  text: " can store JSON while still exposing HTML and text details.",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "codeBlock",
      content: [
        {
          text: "editor.chain().focus().toggleHeading({ level: 2 }).run()",
          type: "text",
        },
      ],
    },
    { type: "paragraph" },
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

export const DemoDefaultExample = () => (
  <div className="w-[760px]">
    <Editor defaultValue={article} />
  </div>
);
