import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Icon } from "@iconify/react";

import { Button } from "../button";
import { RichTextEditor, type JSONContent } from "./index";

const meta = {
  component: RichTextEditor,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/RichTextEditor",
} satisfies Meta<typeof RichTextEditor>;
export default meta;
type Story = StoryObj<typeof meta>;

const article: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 2 },
      content: [{ type: "text", text: "Building better products" }],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "A rich text editor should feel familiar, focused, and fast. Select text to reveal the floating formatting tools.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: "Compose structured content" }],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: [
                { type: "text", text: "Format without leaving the keyboard" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
const notes: JSONContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: { level: 3 },
      content: [{ type: "text", text: "Meeting notes" }],
    },
    {
      type: "paragraph",
      content: [
        { type: "text", text: "Capture decisions and next steps here." },
      ],
    },
  ],
};

function Tool({
  command,
  icon,
}: {
  command: Parameters<typeof RichTextEditor.ToggleButton>[0]["command"];
  icon: string;
}) {
  return (
    <RichTextEditor.ToggleButton command={command}>
      <Icon icon={icon} />
    </RichTextEditor.ToggleButton>
  );
}
function Toolbar() {
  return (
    <RichTextEditor.Toolbar>
      <RichTextEditor.ToolbarGroup>
        <Tool command="bold" icon="lucide:bold" />
        <Tool command="italic" icon="lucide:italic" />
        <Tool command="underline" icon="lucide:underline" />
        <Tool command="strike" icon="lucide:strikethrough" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup>
        <Tool command="heading-1" icon="lucide:heading-1" />
        <Tool command="heading-2" icon="lucide:heading-2" />
        <Tool command="blockquote" icon="lucide:text-quote" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup>
        <Tool command="bulletList" icon="lucide:list" />
        <Tool command="orderedList" icon="lucide:list-ordered" />
        <Tool command="codeBlock" icon="lucide:square-code" />
      </RichTextEditor.ToolbarGroup>
      <RichTextEditor.ToolbarSeparator />
      <RichTextEditor.ToolbarGroup>
        <RichTextEditor.ActionButton action="undo">
          <Icon icon="lucide:undo-2" />
        </RichTextEditor.ActionButton>
        <RichTextEditor.ActionButton action="redo">
          <Icon icon="lucide:redo-2" />
        </RichTextEditor.ActionButton>
      </RichTextEditor.ToolbarGroup>
    </RichTextEditor.Toolbar>
  );
}
function BubbleTools() {
  return (
    <RichTextEditor.BubbleMenu>
      <Tool command="bold" icon="lucide:bold" />
      <Tool command="italic" icon="lucide:italic" />
      <Tool command="underline" icon="lucide:underline" />
    </RichTextEditor.BubbleMenu>
  );
}
function Editor({ children, ...props }: Parameters<typeof RichTextEditor>[0]) {
  return (
    <RichTextEditor {...props}>
      <RichTextEditor.Shell>
        {children ?? (
          <>
            <Toolbar />
            <RichTextEditor.Content />
            <BubbleTools />
            <RichTextEditor.Footer>
              <span>Rich text</span>
              <RichTextEditor.CharacterCount showWords />
            </RichTextEditor.Footer>
          </>
        )}
      </RichTextEditor.Shell>
    </RichTextEditor>
  );
}

export const Default: Story = {
  render: () => (
    <div className="w-[760px]">
      <Editor defaultValue={article} />
    </div>
  ),
};
export const Controlled: Story = {
  render: function Demo() {
    const [value, setValue] = useState<JSONContent>(article);
    return (
      <div className="grid w-[760px] gap-3">
        <div className="flex gap-2">
          <Button size="sm" onPress={() => setValue(article)}>
            Load guide
          </Button>
          <Button size="sm" variant="tertiary" onPress={() => setValue(notes)}>
            Load notes
          </Button>
        </div>
        <Editor value={value} onValueChange={setValue} />
        <pre className="bg-surface-secondary max-h-36 overflow-auto rounded-lg p-3 text-xs">
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>
    );
  },
};
export const CharacterCount: Story = {
  render: () => (
    <div className="w-[680px]">
      <Editor defaultValue={notes} maxLength={240} />
    </div>
  ),
};
export const Placeholder: Story = {
  render: () => (
    <div className="w-[680px]">
      <Editor placeholder="Share your ideas…" />
    </div>
  ),
};
export const Disabled: Story = {
  render: () => (
    <div className="grid w-[760px] grid-cols-2 gap-5">
      <div className="grid gap-2">
        <span className="text-sm font-medium">Disabled</span>
        <Editor defaultValue={notes} isDisabled />
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium">Read only</span>
        <Editor defaultValue={notes} isReadOnly />
      </div>
    </div>
  ),
};
export const CustomComposition: Story = {
  render: () => (
    <div className="w-[600px]">
      <RichTextEditor defaultValue={notes}>
        <RichTextEditor.Shell>
          <RichTextEditor.Content />
          <RichTextEditor.Footer>
            <Toolbar />
            <RichTextEditor.CharacterCount />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>
    </div>
  ),
};
export const Extensible: Story = {
  render: () => (
    <div className="w-[720px]">
      <RichTextEditor defaultValue={article}>
        <RichTextEditor.Shell>
          <Toolbar />
          <RichTextEditor.Content />
          <RichTextEditor.FloatingMenu>
            <RichTextEditor.CommandButton
              aria-label="Insert horizontal rule"
              onCommand={(editor) =>
                editor.chain().focus().setHorizontalRule().run()
              }
            >
              <Icon icon="lucide:minus" />
            </RichTextEditor.CommandButton>
          </RichTextEditor.FloatingMenu>
          <RichTextEditor.SuggestionMenu
            items={({ query }) =>
              [
                {
                  title: "Heading 1",
                  description: "Large section heading",
                  icon: <Icon icon="lucide:heading-1" />,
                  keywords: ["title"],
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
                  description: "Create a simple list",
                  icon: <Icon icon="lucide:list" />,
                  command: ({ editor, range }) =>
                    editor
                      .chain()
                      .focus()
                      .deleteRange(range)
                      .toggleBulletList()
                      .run(),
                },
              ].filter((item) =>
                `${item.title} ${item.description} ${item.keywords?.join(" ") ?? ""}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
            }
          />
          <RichTextEditor.Footer>
            <span>Type / for commands</span>
            <RichTextEditor.CharacterCount showWords />
          </RichTextEditor.Footer>
        </RichTextEditor.Shell>
      </RichTextEditor>
    </div>
  ),
};
