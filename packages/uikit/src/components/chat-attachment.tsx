"use client";

import type {
  ChangeEvent,
  ClipboardEvent,
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  DragEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";
import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { CloseButton, cn } from "@heroui/react";

export type ChatAttachmentMediaType =
  | "audio"
  | "document"
  | "image"
  | "unknown"
  | "video";
interface AttachmentContextValue {
  mediaType: ChatAttachmentMediaType;
  mimeType?: string | undefined;
  name?: string | undefined;
  src?: string | undefined;
}
const AttachmentContext = createContext<AttachmentContextValue | null>(null);
const useAttachment = (): AttachmentContextValue =>
  useContext(AttachmentContext) ?? { mediaType: "unknown" };
const cls = (base: string, className: unknown): string =>
  cn(base, typeof className === "string" ? className : undefined) ?? base;
export const inferChatAttachmentMediaType = (
  mimeType?: string,
): ChatAttachmentMediaType => {
  if (!mimeType) return "unknown";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType.startsWith("text/") || mimeType.startsWith("application/"))
    return "document";
  return "unknown";
};
export interface ChatAttachmentRootProps extends ComponentPropsWithRef<"div"> {
  mediaType?: ChatAttachmentMediaType;
  mimeType?: string;
  name?: string;
  src?: string;
}
export function ChatAttachmentRoot({
  children,
  className,
  mediaType,
  mimeType,
  name,
  src,
  ...props
}: ChatAttachmentRootProps): ReactElement {
  const value = useMemo(
    () => ({
      mediaType: mediaType ?? inferChatAttachmentMediaType(mimeType),
      mimeType,
      name,
      src,
    }),
    [mediaType, mimeType, name, src],
  );
  return (
    <AttachmentContext value={value}>
      <div
        className={cls("chat-attachment", className)}
        data-slot="chat-attachment"
        {...props}
      >
        {children ?? <ChatAttachmentPreview />}
      </div>
    </AttachmentContext>
  );
}
export interface ChatAttachmentPreviewProps {
  children?: ReactNode;
  className?: string;
}
const FileIcon = (): ReactElement => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path
      d="M6 3h8l4 4v14H6z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path
      d="M14 3v5h4"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export function ChatAttachmentPreview({
  children,
  className,
}: ChatAttachmentPreviewProps): ReactElement {
  const { mediaType, name, src } = useAttachment();
  if (children && isValidElement(children))
    return cloneElement(
      children as ReactElement<{ className?: string; "data-slot"?: string }>,
      {
        className: cls(
          "chat-attachment__preview",
          cn(className, (children.props as { className?: string }).className),
        ),
        "data-slot": "chat-attachment-preview",
      },
    );
  return (
    <div
      className={cls("chat-attachment__preview", className)}
      data-slot="chat-attachment-preview"
    >
      {mediaType === "image" && src ? (
        <img
          alt={name ?? "Attachment"}
          className="chat-attachment__preview-image"
          data-slot="chat-attachment-preview-image"
          src={src}
        />
      ) : mediaType === "video" && src ? (
        <video
          muted
          className="chat-attachment__preview-video"
          data-slot="chat-attachment-preview-video"
          src={src}
        />
      ) : (
        <span className="chat-attachment__preview-fallback">
          <FileIcon />
        </span>
      )}
    </div>
  );
}
export function ChatAttachmentName({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement {
  const { name } = useAttachment();
  return (
    <span
      className={cls("chat-attachment__name", className)}
      data-slot="chat-attachment-name"
      {...props}
    >
      {children ?? name}
    </span>
  );
}
export type ChatAttachmentRemoveProps = ComponentPropsWithRef<
  typeof CloseButton
>;
export function ChatAttachmentRemove({
  className,
  ...props
}: ChatAttachmentRemoveProps): ReactElement {
  return (
    <CloseButton
      className={cls("chat-attachment__remove", className)}
      data-slot="chat-attachment-remove"
      {...props}
    />
  );
}
export function ChatAttachmentGroupRoot({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <div
      className={cls("chat-attachment-group", className)}
      data-slot="chat-attachment-group"
      {...props}
    >
      {children}
    </div>
  );
}
interface InputContextValue {
  accept?: string | undefined;
  addFiles: (files: File[] | FileList) => void;
  disabled: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  multiple: boolean;
  openFilePicker: () => void;
}
const InputContext = createContext<InputContextValue | null>(null);
export interface ChatAttachmentInputRootProps {
  accept?: string;
  children: ReactNode;
  disabled?: boolean;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}
export function ChatAttachmentInputRoot({
  accept,
  children,
  disabled = false,
  multiple = true,
  onFilesSelected,
}: ChatAttachmentInputRootProps): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const openFilePicker = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);
  const addFiles = useCallback(
    (input: File[] | FileList) => {
      if (disabled) return;
      const files = Array.from(input);
      if (files.length) onFilesSelected(multiple ? files : files.slice(0, 1));
    },
    [disabled, multiple, onFilesSelected],
  );
  const value = useMemo(
    () => ({ accept, addFiles, disabled, inputRef, multiple, openFilePicker }),
    [accept, addFiles, disabled, multiple, openFilePicker],
  );
  const change = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      addFiles(event.target.files);
      event.target.value = "";
    }
  };
  return (
    <InputContext value={value}>
      <input
        ref={inputRef}
        aria-hidden
        accept={accept}
        className="hidden"
        disabled={disabled}
        multiple={multiple}
        type="file"
        onChange={change}
      />
      {children}
    </InputContext>
  );
}
export interface ChatAttachmentInputTriggerRenderProps {
  "aria-label"?: string | undefined;
  className?: string | undefined;
  disabled?: boolean | undefined;
  isDisabled?: boolean | undefined;
  onPress: () => void;
  type: "button" | "reset" | "submit";
}
export interface ChatAttachmentInputTriggerProps extends ComponentPropsWithoutRef<"button"> {
  render?: (props: ChatAttachmentInputTriggerRenderProps) => ReactNode;
}
export function ChatAttachmentInputTrigger({
  children,
  className,
  onClick,
  render,
  ...props
}: ChatAttachmentInputTriggerProps): ReactElement {
  const state = useContext(InputContext);
  const open = () => {
    if (!state?.disabled) state?.openFilePicker();
  };
  if (render)
    return (
      <>
        {render({
          "aria-label": props["aria-label"],
          className,
          disabled: state?.disabled || props.disabled,
          isDisabled: state?.disabled || props.disabled,
          onPress: open,
          type: props.type ?? "button",
        })}
      </>
    );
  const click = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    open();
    onClick?.(event);
  };
  return (
    <button className={className} type="button" onClick={click} {...props}>
      {children}
    </button>
  );
}
const hasFiles = (event: DragEvent<HTMLElement>): boolean =>
  event.dataTransfer?.types?.includes("Files") ?? false;
const accepts = (file: File, accept: string): boolean =>
  accept
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .some((value) =>
      value.endsWith("/*")
        ? file.type.toLowerCase().startsWith(value.slice(0, -1))
        : value.startsWith(".")
          ? file.name.toLowerCase().endsWith(value)
          : file.type.toLowerCase() === value,
    );
const compose =
  <E,>(original: ((event: E) => void) | undefined, added: (event: E) => void) =>
  (event: E) => {
    original?.(event);
    added(event);
  };
export type ChatAttachmentInputDropzoneRenderProps =
  ComponentPropsWithoutRef<"div"> & { "data-dragging"?: true };
export interface ChatAttachmentInputDropzoneProps extends ComponentPropsWithoutRef<"div"> {
  render?: (props: ChatAttachmentInputDropzoneRenderProps) => ReactNode;
}
export function ChatAttachmentInputDropzone({
  children,
  className,
  onDragEnterCapture,
  onDragLeaveCapture,
  onDragOverCapture,
  onDropCapture,
  onPasteCapture,
  render,
  ...props
}: ChatAttachmentInputDropzoneProps): ReactElement {
  const state = useContext(InputContext);
  const [dragging, setDragging] = useState(false);
  const enter = (event: DragEvent<HTMLDivElement>) => {
    if (!state?.disabled && hasFiles(event)) {
      event.preventDefault();
      setDragging(true);
    }
  };
  const leave = (event: DragEvent<HTMLDivElement>) => {
    if (!state?.disabled) {
      event.preventDefault();
      const related = event.relatedTarget as Node | null;
      if (!related || !event.currentTarget.contains(related))
        setDragging(false);
    }
  };
  const drop = (event: DragEvent<HTMLDivElement>) => {
    if (state?.disabled) return;
    event.preventDefault();
    setDragging(false);
    let files = Array.from(event.dataTransfer.files ?? []);
    if (state?.accept)
      files = files.filter((file) => accepts(file, state.accept!));
    if (files.length) state?.addFiles(files);
  };
  const paste = (event: ClipboardEvent<HTMLDivElement>) => {
    if (state?.disabled) return;
    let files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
      file.type.startsWith("image/"),
    );
    if (state?.accept)
      files = files.filter((file) => accepts(file, state.accept!));
    if (files.length) {
      if (!event.clipboardData?.types?.includes("text/plain"))
        event.preventDefault();
      state?.addFiles(files);
    }
  };
  const merged = {
    ...props,
    ...(dragging ? { "data-dragging": true as const } : {}),
    className,
    onDragEnterCapture: compose(onDragEnterCapture, enter),
    onDragLeaveCapture: compose(onDragLeaveCapture, leave),
    onDragOverCapture: compose(onDragOverCapture, enter),
    onDropCapture: compose(onDropCapture, drop),
    onPasteCapture: compose(onPasteCapture, paste),
  };
  return render ? <>{render(merged)}</> : <div {...merged}>{children}</div>;
}
type ChatAttachmentComponent = typeof ChatAttachmentRoot & {
  Name: typeof ChatAttachmentName;
  Preview: typeof ChatAttachmentPreview;
  Remove: typeof ChatAttachmentRemove;
  Root: typeof ChatAttachmentRoot;
};
export const ChatAttachment: ChatAttachmentComponent = Object.assign(
  ChatAttachmentRoot,
  {
    Name: ChatAttachmentName,
    Preview: ChatAttachmentPreview,
    Remove: ChatAttachmentRemove,
    Root: ChatAttachmentRoot,
  },
);
type ChatAttachmentGroupComponent = typeof ChatAttachmentGroupRoot & {
  Root: typeof ChatAttachmentGroupRoot;
};
export const ChatAttachmentGroup: ChatAttachmentGroupComponent = Object.assign(
  ChatAttachmentGroupRoot,
  { Root: ChatAttachmentGroupRoot },
);
type ChatAttachmentInputComponent = typeof ChatAttachmentInputRoot & {
  Dropzone: typeof ChatAttachmentInputDropzone;
  Root: typeof ChatAttachmentInputRoot;
  Trigger: typeof ChatAttachmentInputTrigger;
};
export const ChatAttachmentInput: ChatAttachmentInputComponent = Object.assign(
  ChatAttachmentInputRoot,
  {
    Dropzone: ChatAttachmentInputDropzone,
    Root: ChatAttachmentInputRoot,
    Trigger: ChatAttachmentInputTrigger,
  },
);
