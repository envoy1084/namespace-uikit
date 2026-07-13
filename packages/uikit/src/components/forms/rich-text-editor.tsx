"use client";

import type {
  Editor,
  EditorOptions,
  Extensions,
  JSONContent,
} from "@tiptap/core";
import type { SuggestionProps } from "@tiptap/suggestion";

import type {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Button,
  cn,
  Input,
  Popover,
  Separator,
  ToggleButton,
} from "@heroui/react";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { PluginKey } from "@tiptap/pm/state";
import {
  EditorContent,
  EditorContext,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import { StarterKit } from "@tiptap/starter-kit";
import { Suggestion } from "@tiptap/suggestion";

export type RichTextEditorCommand =
  | "blockquote"
  | "bold"
  | "bulletList"
  | "code"
  | "codeBlock"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "italic"
  | "orderedList"
  | "strike"
  | "underline";
export type RichTextEditorAction =
  | "clearContent"
  | "clearFormatting"
  | "redo"
  | "undo";

export interface RichTextEditorValueChangeDetails {
  characterCount: number;
  html: string;
  isEmpty: boolean;
  text: string;
  wordCount: number;
}

interface RichTextEditorContextValue {
  editor: Editor | null;
  isDisabled: boolean;
  isReadOnly: boolean;
  maxLength?: number;
}
const RichTextEditorContext = createContext<RichTextEditorContextValue>({
  editor: null,
  isDisabled: false,
  isReadOnly: false,
});
function useRichTextEditor(): RichTextEditorContextValue {
  return useContext(RichTextEditorContext);
}

const emptyDocument: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};
function details(editor: Editor): RichTextEditorValueChangeDetails {
  return {
    characterCount:
      editor.storage.characterCount?.characters() ?? editor.getText().length,
    html: editor.getHTML(),
    isEmpty: editor.isEmpty,
    text: editor.getText(),
    wordCount:
      editor.storage.characterCount?.words() ??
      editor.getText().trim().split(/\s+/).filter(Boolean).length,
  };
}

export interface RichTextEditorRootProps extends Omit<
  ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange"
> {
  defaultValue?: JSONContent;
  editorOptions?: Partial<EditorOptions>;
  extensions?: Extensions;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  maxLength?: number;
  onValueChange?: (
    value: JSONContent,
    details: RichTextEditorValueChangeDetails,
  ) => void;
  placeholder?: string;
  value?: JSONContent;
}

function RichTextEditorRoot({
  children,
  className,
  defaultValue,
  editorOptions,
  extensions,
  isDisabled = false,
  isReadOnly = false,
  maxLength,
  onValueChange,
  placeholder = "Start writing...",
  value,
  ...props
}: RichTextEditorRootProps): ReactElement {
  const initial = useRef(value ?? defaultValue ?? emptyDocument);
  const callbacks = useRef({
    onValueChange,
    onUpdate: editorOptions?.onUpdate,
  });
  callbacks.current = { onValueChange, onUpdate: editorOptions?.onUpdate };
  const editorExtensions = useMemo(
    () => [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder }),
      CharacterCount.configure({ limit: maxLength }),
      ...(extensions ?? []),
    ],
    [extensions, maxLength, placeholder],
  );
  const editor = useEditor(
    {
      ...editorOptions,
      content: initial.current,
      editable: !isDisabled && !isReadOnly,
      editorProps: {
        ...editorOptions?.editorProps,
        attributes: {
          ...(typeof editorOptions?.editorProps?.attributes === "object"
            ? editorOptions.editorProps.attributes
            : {}),
          class:
            cn(
              "rich-text-editor__prosemirror",
              typeof editorOptions?.editorProps?.attributes === "object"
                ? editorOptions.editorProps.attributes["class"]
                : undefined,
            ) ?? "rich-text-editor__prosemirror",
          "data-slot": "rich-text-editor-prosemirror",
        },
      },
      extensions: editorExtensions,
      immediatelyRender: false,
      onUpdate: (event) => {
        callbacks.current.onUpdate?.(event);
        callbacks.current.onValueChange?.(
          event.editor.getJSON(),
          details(event.editor),
        );
      },
    },
    [editorExtensions],
  );
  useEffect(() => {
    editor?.setEditable(!isDisabled && !isReadOnly);
  }, [editor, isDisabled, isReadOnly]);
  useEffect(() => {
    if (!editor || value === undefined) return;
    if (JSON.stringify(editor.getJSON()) !== JSON.stringify(value))
      editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);
  const context = useMemo(
    () => ({
      editor,
      isDisabled,
      isReadOnly,
      ...(maxLength === undefined ? {} : { maxLength }),
    }),
    [editor, isDisabled, isReadOnly, maxLength],
  );
  const body = editor ? (
    <EditorContext value={{ editor }}>{children}</EditorContext>
  ) : (
    children
  );
  return (
    <RichTextEditorContext value={context}>
      <div
        {...props}
        className={cn("rich-text-editor", className)}
        data-disabled={isDisabled || undefined}
        data-readonly={isReadOnly || undefined}
        data-slot="rich-text-editor"
      >
        {body}
      </div>
    </RichTextEditorContext>
  );
}

function slotDiv(slot: string) {
  return function Slot({
    children,
    className,
    ...props
  }: ComponentPropsWithRef<"div">): ReactElement {
    return (
      <div
        {...props}
        className={cn(slot, className)}
        data-slot={slot.replaceAll("__", "-")}
      >
        {children}
      </div>
    );
  };
}
const RichTextEditorShell: ReturnType<typeof slotDiv> = slotDiv(
  "rich-text-editor__shell",
);
function RichTextEditorToolbarGroup({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <div
      {...props}
      className={cn("rich-text-editor__toolbar-group", className)}
      data-slot="rich-text-editor-toolbar-group"
      role="group"
    >
      {children}
    </div>
  );
}
const RichTextEditorFooter: ReturnType<typeof slotDiv> = slotDiv(
  "rich-text-editor__footer",
);

export interface RichTextEditorToolbarProps extends ComponentPropsWithRef<"div"> {
  orientation?: "horizontal" | "vertical";
}
function RichTextEditorToolbar({
  "aria-label": ariaLabel = "Editor toolbar",
  children,
  className,
  orientation = "horizontal",
  ...props
}: RichTextEditorToolbarProps): ReactElement {
  return (
    <div
      {...props}
      aria-label={ariaLabel}
      className={cn("rich-text-editor__toolbar", "toolbar", className)}
      data-orientation={orientation}
      data-slot="rich-text-editor-toolbar"
      role="toolbar"
    >
      {children}
    </div>
  );
}
function RichTextEditorToolbarSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>): ReactElement {
  return (
    <Separator
      {...props}
      className={
        cn("rich-text-editor__toolbar-separator", className) ??
        "rich-text-editor__toolbar-separator"
      }
      data-slot="rich-text-editor-toolbar-separator"
      orientation="vertical"
    />
  );
}

function active(editor: Editor, command: RichTextEditorCommand): boolean {
  if (command.startsWith("heading-"))
    return editor.isActive("heading", { level: Number(command.at(-1)) });
  return editor.isActive(
    command === "bulletList"
      ? "bulletList"
      : command === "orderedList"
        ? "orderedList"
        : command === "codeBlock"
          ? "codeBlock"
          : command,
  );
}
function run(editor: Editor, command: RichTextEditorCommand): boolean {
  const chain = editor.chain().focus();
  switch (command) {
    case "bold":
      return chain.toggleBold().run();
    case "italic":
      return chain.toggleItalic().run();
    case "underline":
      return chain.toggleUnderline().run();
    case "strike":
      return chain.toggleStrike().run();
    case "code":
      return chain.toggleCode().run();
    case "blockquote":
      return chain.toggleBlockquote().run();
    case "bulletList":
      return chain.toggleBulletList().run();
    case "orderedList":
      return chain.toggleOrderedList().run();
    case "codeBlock":
      return chain.toggleCodeBlock().run();
    case "heading-1":
      return chain.toggleHeading({ level: 1 }).run();
    case "heading-2":
      return chain.toggleHeading({ level: 2 }).run();
    case "heading-3":
      return chain.toggleHeading({ level: 3 }).run();
  }
}

function canRun(editor: Editor, command: RichTextEditorCommand): boolean {
  const chain = editor.can().chain().focus();
  switch (command) {
    case "bold":
      return chain.toggleBold().run();
    case "italic":
      return chain.toggleItalic().run();
    case "underline":
      return chain.toggleUnderline().run();
    case "strike":
      return chain.toggleStrike().run();
    case "code":
      return chain.toggleCode().run();
    case "blockquote":
      return chain.toggleBlockquote().run();
    case "bulletList":
      return chain.toggleBulletList().run();
    case "orderedList":
      return chain.toggleOrderedList().run();
    case "codeBlock":
      return chain.toggleCodeBlock().run();
    case "heading-1":
      return chain.toggleHeading({ level: 1 }).run();
    case "heading-2":
      return chain.toggleHeading({ level: 2 }).run();
    case "heading-3":
      return chain.toggleHeading({ level: 3 }).run();
  }
}
const commandLabels: Record<RichTextEditorCommand, string> = {
  blockquote: "Blockquote",
  bold: "Bold",
  bulletList: "Bulleted list",
  code: "Inline code",
  codeBlock: "Code block",
  "heading-1": "Heading 1",
  "heading-2": "Heading 2",
  "heading-3": "Heading 3",
  italic: "Italic",
  orderedList: "Numbered list",
  strike: "Strikethrough",
  underline: "Underline",
};

export interface RichTextEditorToggleButtonProps extends Omit<
  ComponentProps<typeof ToggleButton>,
  "isSelected"
> {
  command: RichTextEditorCommand;
  tooltip?: ReactNode;
}
function RichTextEditorToggleButton({
  "aria-label": ariaLabel,
  children,
  className,
  command,
  isDisabled,
  tooltip,
  ...props
}: RichTextEditorToggleButtonProps): ReactElement {
  const { editor, isDisabled: rootDisabled, isReadOnly } = useRichTextEditor();
  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      active: current ? active(current, command) : false,
      canRun: current ? canRun(current, command) : false,
    }),
  });
  const disabled =
    rootDisabled || isReadOnly || isDisabled || !editor || !state?.canRun;
  return (
    <ToggleButton
      {...props}
      aria-label={
        ariaLabel ??
        (typeof tooltip === "string" ? tooltip : commandLabels[command])
      }
      className={(renderProps) =>
        cn(
          "rich-text-editor__toolbar-button",
          typeof className === "function" ? className(renderProps) : className,
        ) ?? "rich-text-editor__toolbar-button"
      }
      data-active={state?.active || undefined}
      data-command={command}
      data-slot="rich-text-editor-toggle-button"
      isDisabled={disabled}
      isIconOnly={props.isIconOnly ?? true}
      isSelected={state?.active ?? false}
      size={props.size ?? "sm"}
      variant={props.variant ?? "ghost"}
      onPress={(event) => {
        if (editor && !disabled) run(editor, command);
        props.onPress?.(event);
      }}
    >
      {children ?? commandLabels[command]}
    </ToggleButton>
  );
}

export interface RichTextEditorActionButtonProps extends ComponentProps<
  typeof Button
> {
  action: RichTextEditorAction;
  tooltip?: ReactNode;
}
function RichTextEditorActionButton({
  action,
  "aria-label": ariaLabel,
  children,
  className,
  isDisabled,
  tooltip,
  ...props
}: RichTextEditorActionButtonProps): ReactElement {
  const { editor, isDisabled: rootDisabled, isReadOnly } = useRichTextEditor();
  const canInvoke = useEditorState({
    editor,
    selector: ({ editor: current }) => {
      if (!current || current.isDestroyed) return false;
      if (action === "undo") return true;
      if (action === "redo") {
        try {
          return current.can().chain().focus().redo().run();
        } catch {
          return false;
        }
      }
      return !current.isEmpty;
    },
  });
  const disabled =
    rootDisabled || isReadOnly || isDisabled || !editor || !canInvoke;
  const invoke = () => {
    if (!editor || disabled) return;
    const chain = editor.chain().focus();
    if (action === "undo") chain.undo().run();
    else if (action === "redo") chain.redo().run();
    else if (action === "clearContent") chain.clearContent().run();
    else chain.unsetAllMarks().clearNodes().run();
  };
  return (
    <Button
      {...props}
      aria-label={
        ariaLabel ??
        (typeof tooltip === "string"
          ? tooltip
          : {
              clearContent: "Clear content",
              clearFormatting: "Clear formatting",
              redo: "Redo",
              undo: "Undo",
            }[action])
      }
      className={(state) =>
        cn(
          "rich-text-editor__toolbar-button",
          typeof className === "function" ? className(state) : className,
        ) ?? "rich-text-editor__toolbar-button"
      }
      data-action={action}
      data-slot="rich-text-editor-action-button"
      isDisabled={disabled}
      isIconOnly={props.isIconOnly ?? true}
      size={props.size ?? "sm"}
      variant={props.variant ?? "tertiary"}
      onPress={(event) => {
        invoke();
        props.onPress?.(event);
      }}
    >
      {children ?? action}
    </Button>
  );
}

export interface RichTextEditorCommandButtonProps extends Omit<
  ComponentProps<typeof Button>,
  "isDisabled"
> {
  isActive?: boolean | ((editor: Editor) => boolean);
  isDisabled?: boolean | ((editor: Editor) => boolean);
  onCommand: (editor: Editor) => boolean | void;
  tooltip?: ReactNode;
}
function RichTextEditorCommandButton({
  children,
  className,
  isActive,
  isDisabled,
  onCommand,
  ...props
}: RichTextEditorCommandButtonProps): ReactElement {
  const { editor, isDisabled: rootDisabled, isReadOnly } = useRichTextEditor();
  const selected = editor
    ? typeof isActive === "function"
      ? isActive(editor)
      : !!isActive
    : false;
  const disabled =
    rootDisabled ||
    isReadOnly ||
    !editor ||
    (typeof isDisabled === "function" ? isDisabled(editor) : !!isDisabled);
  return (
    <Button
      {...props}
      {...(selected ? { "aria-pressed": true as const } : {})}
      className={(state) =>
        cn(
          "rich-text-editor__toolbar-button",
          typeof className === "function" ? className(state) : className,
        ) ?? "rich-text-editor__toolbar-button"
      }
      data-active={selected || undefined}
      data-slot="rich-text-editor-command-button"
      isDisabled={disabled}
      isIconOnly={props.isIconOnly ?? true}
      size={props.size ?? "sm"}
      variant={props.variant ?? "tertiary"}
      onPress={(event) => {
        if (editor && !disabled) onCommand(editor);
        props.onPress?.(event);
      }}
    >
      {children}
    </Button>
  );
}

function RichTextEditorContent({
  className,
  ...props
}: Omit<ComponentProps<typeof EditorContent>, "editor">): ReactElement {
  const { editor } = useRichTextEditor();
  return editor ? (
    <EditorContent
      {...props}
      className={cn("rich-text-editor__content", className)}
      data-slot="rich-text-editor-content"
      editor={editor}
    />
  ) : (
    <div
      className="rich-text-editor__loading"
      data-slot="rich-text-editor-loading"
    />
  );
}

function RichTextEditorBubbleMenu({
  children,
  className,
  ...props
}: Omit<ComponentProps<typeof BubbleMenu>, "editor">): ReactElement | null {
  const { editor, isDisabled, isReadOnly } = useRichTextEditor();
  return editor ? (
    <BubbleMenu
      {...props}
      className={cn("rich-text-editor__bubble-menu", className)}
      editor={editor}
      shouldShow={(context) =>
        !isDisabled &&
        !isReadOnly &&
        (props.shouldShow
          ? props.shouldShow(context)
          : context.editor.isFocused && !context.editor.state.selection.empty)
      }
    >
      <div
        className="rich-text-editor__bubble-menu-toolbar toolbar"
        role="toolbar"
      >
        {children}
      </div>
    </BubbleMenu>
  ) : null;
}
function RichTextEditorFloatingMenu({
  children,
  className,
  shouldShow,
  ...props
}: Omit<ComponentProps<typeof FloatingMenu>, "editor">): ReactElement | null {
  const { editor, isDisabled, isReadOnly } = useRichTextEditor();
  const visibility =
    isDisabled || isReadOnly
      ? { shouldShow: () => false }
      : shouldShow
        ? { shouldShow }
        : {};
  return editor ? (
    <FloatingMenu
      {...props}
      {...visibility}
      className={cn("rich-text-editor__floating-menu", className)}
      editor={editor}
    >
      <div
        className="rich-text-editor__floating-menu-toolbar toolbar"
        role="toolbar"
      >
        {children}
      </div>
    </FloatingMenu>
  ) : null;
}

export interface RichTextEditorCharacterCountProps extends Omit<
  ComponentPropsWithRef<"span">,
  "children"
> {
  children?:
    | ReactNode
    | ((stats: {
        characters: number;
        isEmpty: boolean;
        words: number;
      }) => ReactNode);
  showWords?: boolean;
}
function RichTextEditorCharacterCount({
  children,
  className,
  showWords = false,
  ...props
}: RichTextEditorCharacterCountProps): ReactElement {
  const { editor, maxLength } = useRichTextEditor();
  const stats = useEditorState({
    editor,
    selector: ({ editor: current }) =>
      current
        ? {
            characters: current.storage.characterCount?.characters() ?? 0,
            isEmpty: current.isEmpty,
            words: current.storage.characterCount?.words() ?? 0,
          }
        : { characters: 0, isEmpty: true, words: 0 },
  });
  const value = stats ?? { characters: 0, isEmpty: true, words: 0 };
  const content =
    typeof children === "function"
      ? children(value)
      : (children ??
        `${value.characters}${maxLength ? ` / ${maxLength}` : ""} characters${showWords ? `, ${value.words} words` : ""}`);
  return (
    <span
      {...props}
      className={cn("rich-text-editor__character-count", className)}
      data-over-limit={
        (maxLength !== undefined && value.characters > maxLength) || undefined
      }
      data-slot="rich-text-editor-character-count"
    >
      {content}
    </span>
  );
}

interface LinkContextValue {
  apply: () => void;
  href: string;
  isDisabled: boolean;
  setHref: (value: string) => void;
  unset: () => void;
}
const LinkContext = createContext<LinkContextValue | null>(null);
function useLinkContext(): LinkContextValue {
  const value = useContext(LinkContext);
  if (!value)
    throw new Error(
      "RichTextEditor.LinkPopover subcomponents must be used within LinkPopover",
    );
  return value;
}
function LinkPopoverRoot({
  children,
  ...props
}: ComponentProps<typeof Popover>): ReactElement {
  const { editor, isDisabled, isReadOnly } = useRichTextEditor();
  const [href, setHref] = useState("");
  const disabled = isDisabled || isReadOnly || !editor;
  const apply = useCallback(() => {
    if (!editor || disabled) return;
    const value = href.trim();
    if (value)
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: /^(https?:\/\/|mailto:|tel:)/.test(value)
            ? value
            : `https://${value}`,
        })
        .run();
    else editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [disabled, editor, href]);
  const unset = useCallback(() => {
    if (editor && !disabled)
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [disabled, editor]);
  return (
    <LinkContext value={{ apply, href, isDisabled: disabled, setHref, unset }}>
      <Popover {...props}>{children}</Popover>
    </LinkContext>
  );
}
function LinkPopoverTrigger({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>): ReactElement {
  const { editor } = useRichTextEditor();
  const { isDisabled, setHref } = useLinkContext();
  return (
    <Popover.Trigger>
      <Button
        {...props}
        aria-label={props["aria-label"] ?? "Link"}
        className={(state) =>
          cn(
            "rich-text-editor__toolbar-button",
            "rich-text-editor__link-popover-trigger",
            typeof className === "function" ? className(state) : className,
          ) ?? "rich-text-editor__toolbar-button"
        }
        data-active={editor?.isActive("link") || undefined}
        isDisabled={isDisabled}
        isIconOnly={props.isIconOnly ?? true}
        size={props.size ?? "sm"}
        variant={props.variant ?? "ghost"}
        onPress={(event) => {
          setHref(editor?.getAttributes("link")["href"] ?? "");
          props.onPress?.(event);
        }}
      >
        {children ?? "Link"}
      </Button>
    </Popover.Trigger>
  );
}
function LinkPopoverContent({
  children,
  className,
  ...props
}: ComponentProps<typeof Popover.Content>): ReactElement {
  return (
    <Popover.Content
      className={(state) =>
        cn(
          "rich-text-editor__link-popover",
          typeof className === "function" ? className(state) : className,
        ) ?? "rich-text-editor__link-popover"
      }
      data-slot="rich-text-editor-link-popover"
      {...props}
    >
      <Popover.Arrow />
      <Popover.Dialog className="rich-text-editor__link-popover-content">
        {children}
      </Popover.Dialog>
    </Popover.Content>
  );
}
function LinkPopoverInput(props: ComponentProps<typeof Input>): ReactElement {
  const { href, isDisabled, setHref } = useLinkContext();
  return (
    <Input
      {...props}
      aria-label={props["aria-label"] ?? "Link URL"}
      className={
        cn("rich-text-editor__link-input", props.className) ??
        "rich-text-editor__link-input"
      }
      disabled={isDisabled || props.disabled || false}
      placeholder={props.placeholder ?? "https://example.com"}
      value={String(props.value ?? href)}
      variant={props.variant ?? "secondary"}
      onChange={(event) => {
        setHref(event.target.value);
        props.onChange?.(event);
      }}
    />
  );
}
const LinkPopoverActions: ReturnType<typeof slotDiv> = slotDiv(
  "rich-text-editor__link-popover-actions",
);
function LinkApplyButton({
  children = "Apply",
  ...props
}: ComponentProps<typeof Button>): ReactElement {
  const { apply, href, isDisabled } = useLinkContext();
  return (
    <Button
      {...props}
      data-slot="rich-text-editor-link-apply-button"
      isDisabled={!!(isDisabled || props.isDisabled || !href.trim())}
      size={props.size ?? "sm"}
      variant={props.variant ?? "primary"}
      onPress={(event) => {
        apply();
        props.onPress?.(event);
      }}
    >
      {children}
    </Button>
  );
}
function LinkUnsetButton({
  children = "Remove",
  ...props
}: ComponentProps<typeof Button>): ReactElement {
  const { isDisabled, unset } = useLinkContext();
  return (
    <Button
      {...props}
      data-slot="rich-text-editor-link-unset-button"
      isDisabled={!!(isDisabled || props.isDisabled)}
      size={props.size ?? "sm"}
      variant={props.variant ?? "tertiary"}
      onPress={(event) => {
        unset();
        props.onPress?.(event);
      }}
    >
      {children}
    </Button>
  );
}
type LinkPopoverComponent = typeof LinkPopoverRoot & {
  Actions: typeof LinkPopoverActions;
  ApplyButton: typeof LinkApplyButton;
  Content: typeof LinkPopoverContent;
  Input: typeof LinkPopoverInput;
  Root: typeof LinkPopoverRoot;
  Trigger: typeof LinkPopoverTrigger;
  UnsetButton: typeof LinkUnsetButton;
};
const RichTextEditorLinkPopover: LinkPopoverComponent = Object.assign(
  LinkPopoverRoot,
  {
    Actions: LinkPopoverActions,
    ApplyButton: LinkApplyButton,
    Content: LinkPopoverContent,
    Input: LinkPopoverInput,
    Root: LinkPopoverRoot,
    Trigger: LinkPopoverTrigger,
    UnsetButton: LinkUnsetButton,
  },
);

export interface RichTextEditorSuggestionItem {
  command?: (props: {
    editor: Editor;
    item: RichTextEditorSuggestionItem;
    query: string;
    range: { from: number; to: number };
    text: string;
  }) => void;
  description?: string;
  icon?: ReactNode;
  id?: string;
  keywords?: string[];
  title: string;
}
export interface RichTextEditorSuggestionMenuProps extends Omit<
  ComponentPropsWithRef<"div">,
  "onSelect"
> {
  char?: string;
  items: (props: {
    editor: Editor;
    query: string;
  }) =>
    | RichTextEditorSuggestionItem[]
    | Promise<RichTextEditorSuggestionItem[]>;
  maxHeight?: number;
  onSelect?: (props: {
    editor: Editor;
    item: RichTextEditorSuggestionItem;
    query: string;
    range: { from: number; to: number };
    text: string;
  }) => void;
}
interface SuggestionState {
  clientRect: (() => DOMRect | null) | null | undefined;
  props: SuggestionProps<RichTextEditorSuggestionItem>;
}
function RichTextEditorSuggestionMenu({
  char = "/",
  className,
  items,
  maxHeight = 320,
  onSelect,
  style,
  ...props
}: RichTextEditorSuggestionMenuProps): ReactElement | null {
  const { editor, isDisabled, isReadOnly } = useRichTextEditor();
  const [menu, setMenu] = useState<SuggestionState | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const latest = useRef({ items, onSelect });
  const menuRef = useRef<SuggestionState | null>(null);
  const selectedIndexRef = useRef(0);
  latest.current = { items, onSelect };
  const updateMenu = useCallback((value: SuggestionState | null) => {
    menuRef.current = value;
    setMenu(value);
  }, []);
  const updateSelectedIndex = useCallback(
    (value: number | ((current: number) => number)) => {
      const next =
        typeof value === "function" ? value(selectedIndexRef.current) : value;
      selectedIndexRef.current = next;
      setSelectedIndex(next);
    },
    [],
  );
  const select = useCallback(
    (index: number, current = menuRef.current) => {
      if (!current) return;
      const item = current.props.items[index];
      if (!item) return;
      const payload = {
        editor: current.props.editor,
        item,
        query: current.props.query,
        range: current.props.range,
        text: `${char}${current.props.query}`,
      };
      if (item.command) item.command(payload);
      else if (latest.current.onSelect) latest.current.onSelect(payload);
      else
        current.props.editor
          .chain()
          .focus()
          .deleteRange(current.props.range)
          .insertContent(item.title)
          .run();
      current.props.command(item);
      updateMenu(null);
    },
    [char, updateMenu],
  );
  useEffect(() => {
    if (!editor || isDisabled || isReadOnly) return;
    const pluginKey = new PluginKey(
      `rich-text-editor-suggestion-${char.codePointAt(0) ?? 0}`,
    );
    const plugin = Suggestion<RichTextEditorSuggestionItem>({
      char,
      decorationClass: "rich-text-editor__suggestion-decoration",
      editor,
      pluginKey,
      items: ({ editor: current, query }) =>
        latest.current.items({ editor: current, query }),
      command: () => undefined,
      render: () => ({
        onStart: (suggestionProps) => {
          updateSelectedIndex(0);
          updateMenu({
            clientRect: suggestionProps.clientRect,
            props: suggestionProps,
          });
        },
        onUpdate: (suggestionProps) => {
          updateSelectedIndex(0);
          updateMenu({
            clientRect: suggestionProps.clientRect,
            props: suggestionProps,
          });
        },
        onExit: () => updateMenu(null),
        onKeyDown: ({ event }) => {
          if (event.key === "Escape") {
            updateMenu(null);
            return true;
          }
          if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            updateSelectedIndex((value) => {
              const count = menuRef.current?.props.items.length ?? 1;
              return event.key === "ArrowUp"
                ? (value + count - 1) % count
                : (value + 1) % count;
            });
            return true;
          }
          if (event.key === "Enter") {
            select(selectedIndexRef.current);
            return true;
          }
          return false;
        },
      }),
    });
    editor.registerPlugin(plugin);
    return () => {
      editor.unregisterPlugin(pluginKey);
      updateMenu(null);
    };
  }, [
    char,
    editor,
    isDisabled,
    isReadOnly,
    select,
    updateMenu,
    updateSelectedIndex,
  ]);
  if (!menu) return null;
  const rect = menu.clientRect?.();
  const position: CSSProperties = rect
    ? { left: rect.left, position: "fixed", top: rect.bottom + 6 }
    : {};
  return (
    <div
      {...props}
      aria-label="Editor commands"
      className={cn("rich-text-editor__suggestion-menu", className)}
      data-slot="rich-text-editor-suggestion-menu"
      role="listbox"
      style={{ ...position, ...style }}
    >
      <div
        className="rich-text-editor__suggestion-list rich-text-editor__suggestion-menu-list"
        style={{ maxHeight }}
      >
        {menu.props.items.length ? (
          menu.props.items.map((item, index) => (
            <button
              aria-selected={index === selectedIndex}
              className="rich-text-editor__suggestion-item rich-text-editor__suggestion-menu-item"
              key={item.id ?? item.title}
              role="option"
              type="button"
              onClick={() => select(index)}
              onMouseEnter={() => updateSelectedIndex(index)}
            >
              {item.icon ? (
                <span className="rich-text-editor__suggestion-icon rich-text-editor__suggestion-menu-icon">
                  {item.icon}
                </span>
              ) : null}
              <span className="rich-text-editor__suggestion-content rich-text-editor__suggestion-menu-item-content">
                <span className="rich-text-editor__suggestion-title rich-text-editor__suggestion-menu-title">
                  {item.title}
                </span>
                {item.description ? (
                  <span className="rich-text-editor__suggestion-description rich-text-editor__suggestion-menu-description">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </button>
          ))
        ) : (
          <div className="rich-text-editor__suggestion-empty rich-text-editor__suggestion-menu-empty">
            No results
          </div>
        )}
      </div>
    </div>
  );
}

type RichTextEditorComponent = typeof RichTextEditorRoot & {
  ActionButton: typeof RichTextEditorActionButton;
  BubbleMenu: typeof RichTextEditorBubbleMenu;
  CharacterCount: typeof RichTextEditorCharacterCount;
  CommandButton: typeof RichTextEditorCommandButton;
  Content: typeof RichTextEditorContent;
  FloatingMenu: typeof RichTextEditorFloatingMenu;
  Footer: typeof RichTextEditorFooter;
  LinkPopover: typeof RichTextEditorLinkPopover;
  Root: typeof RichTextEditorRoot;
  Shell: typeof RichTextEditorShell;
  SuggestionMenu: typeof RichTextEditorSuggestionMenu;
  ToggleButton: typeof RichTextEditorToggleButton;
  Toolbar: typeof RichTextEditorToolbar;
  ToolbarGroup: typeof RichTextEditorToolbarGroup;
  ToolbarSeparator: typeof RichTextEditorToolbarSeparator;
};
export const RichTextEditor: RichTextEditorComponent = Object.assign(
  RichTextEditorRoot,
  {
    ActionButton: RichTextEditorActionButton,
    BubbleMenu: RichTextEditorBubbleMenu,
    CharacterCount: RichTextEditorCharacterCount,
    CommandButton: RichTextEditorCommandButton,
    Content: RichTextEditorContent,
    FloatingMenu: RichTextEditorFloatingMenu,
    Footer: RichTextEditorFooter,
    LinkPopover: RichTextEditorLinkPopover,
    Root: RichTextEditorRoot,
    Shell: RichTextEditorShell,
    SuggestionMenu: RichTextEditorSuggestionMenu,
    ToggleButton: RichTextEditorToggleButton,
    Toolbar: RichTextEditorToolbar,
    ToolbarGroup: RichTextEditorToolbarGroup,
    ToolbarSeparator: RichTextEditorToolbarSeparator,
  },
);

export type { Editor, Extensions, JSONContent };
