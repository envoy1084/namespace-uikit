// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Extensible
import { RichTextEditor, type JSONContent } from "@thenamespace/uikit";
import {
  CodeSquareIcon,
  Calendar03Icon,
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
  SparklesIcon,
  AddCircleIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  Undo02Icon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon, type IconSvgElement } from "@thenamespace/uikit/icons";

const extensibleArticle: JSONContent = {
  type: "doc",
  content: [
    {
      attrs: { level: 2 },
      content: [{ text: "Extensible commands", type: "text" }],
      type: "heading",
    },
    {
      content: [
        {
          text: "This demo adds custom buttons, a floating insert menu, and a slash command menu. Type ",
          type: "text",
        },
        { marks: [{ type: "code" }], text: "/", type: "text" },
        { text: " to open the command list, then filter with ", type: "text" },
        { marks: [{ type: "code" }], text: "h", type: "text" },
        { text: ", ", type: "text" },
        { marks: [{ type: "code" }], text: "list", type: "text" },
        { text: ", ", type: "text" },
        { marks: [{ type: "code" }], text: "quote", type: "text" },
        { text: ", or ", type: "text" },
        { marks: [{ type: "code" }], text: "action", type: "text" },
        { text: ".", type: "text" },
      ],
      type: "paragraph",
    },
    {
      content: [
        {
          content: [
            {
              text: "Each item runs your own Tiptap command; the component only supplies the accessible menu shell.",
              type: "text",
            },
          ],
          type: "paragraph",
        },
      ],
      type: "blockquote",
    },
    {
      attrs: { level: 3 },
      content: [{ text: "Try it", type: "text" }],
      type: "heading",
    },
    {
      content: [
        "Press the date button to insert today's date.",
        "Use the sparkle button to insert a launch checklist.",
        "Move to the empty line below to reveal the floating menu.",
      ].map((text) => ({
        content: [{ content: [{ text, type: "text" }], type: "paragraph" }],
        type: "listItem",
      })),
      type: "bulletList",
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

export const DemoExtensibleExample = () => (
  <div className="w-[720px]">
    <RichTextEditor
      defaultValue={extensibleArticle}
      placeholder="Write notes..."
    >
      <RichTextEditor.Shell>
        <RichTextEditor.Toolbar>
          <RichTextEditor.ToolbarGroup aria-label="Custom commands">
            <RichTextEditor.CommandButton
              aria-label="Insert date"
              tooltip="Insert date"
              onCommand={(editor) =>
                editor
                  .chain()
                  .focus()
                  .insertContent(
                    new Intl.DateTimeFormat("en", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date()),
                  )
                  .run()
              }
            >
              <HugeiconsIcon
                aria-hidden
                className="size-4"
                icon={Calendar03Icon}
                strokeWidth={2}
              />
            </RichTextEditor.CommandButton>
            <RichTextEditor.CommandButton
              aria-label="Insert launch checklist"
              tooltip="Insert checklist"
              onCommand={(editor) =>
                editor
                  .chain()
                  .focus()
                  .insertContent("Preflight checklist")
                  .run()
              }
            >
              <HugeiconsIcon
                aria-hidden
                className="size-4"
                icon={SparklesIcon}
                strokeWidth={2}
              />
            </RichTextEditor.CommandButton>
          </RichTextEditor.ToolbarGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
        <RichTextEditor.FloatingMenu>
          <RichTextEditor.CommandButton
            aria-label="Add heading"
            tooltip="Add heading"
            onCommand={(editor) =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <HugeiconsIcon
              aria-hidden
              className="size-4"
              icon={AddCircleIcon}
              strokeWidth={2}
            />
          </RichTextEditor.CommandButton>
        </RichTextEditor.FloatingMenu>
        <RichTextEditor.SuggestionMenu
          items={({ query }) =>
            [
              {
                title: "Heading 1",
                keywords: ["title"],
                icon: (
                  <HugeiconsIcon
                    aria-hidden
                    className="size-4"
                    icon={Heading01Icon}
                    strokeWidth={2}
                  />
                ),
                command: ({ editor, range }) =>
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .setHeading({ level: 1 })
                    .run(),
              },
              {
                title: "Bullet list",
                icon: (
                  <HugeiconsIcon
                    aria-hidden
                    className="size-4"
                    icon={LeftToRightListBulletIcon}
                    strokeWidth={2}
                  />
                ),
                command: ({ editor, range }) =>
                  editor
                    .chain()
                    .focus()
                    .deleteRange(range)
                    .toggleBulletList()
                    .run(),
              },
            ].filter((item) =>
              `${item.title} ${item.keywords?.join(" ") ?? ""}`
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
          }
        />
        <RichTextEditor.Footer>
          <span>Extensible command surface</span>
          <RichTextEditor.CharacterCount showWords />
        </RichTextEditor.Footer>
      </RichTextEditor.Shell>
    </RichTextEditor>
  </div>
);
