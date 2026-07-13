"use client";

// @demo-title Secondary
import { Fragment, useCallback, useEffect, useRef, useState } from "react";

import { ArrowUp01Icon, Attachment01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Header, ListBox, Select, Separator } from "@thenamespace/uikit";
import {
  ChatAttachment,
  ChatAttachmentGroup,
  ChatAttachmentInput,
  PromptInput,
} from "@thenamespace/uikit";

interface PendingAttachment {
  id: string;
  mimeType?: string;
  name: string;
  src?: string;
}

function attachmentId(file: File): string {
  return `${file.name}-${file.lastModified}-${globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
}

function releaseAttachment(attachment: PendingAttachment): void {
  if (attachment.src?.startsWith("blob:")) URL.revokeObjectURL(attachment.src);
}

function useAttachments() {
  const [attachments, setAttachments] = useState<PendingAttachment[]>([]);
  const latest = useRef(attachments);
  useEffect(() => {
    latest.current = attachments;
  }, [attachments]);
  useEffect(() => () => latest.current.forEach(releaseAttachment), []);
  const clearAttachments = useCallback(() => {
    setAttachments((current) => {
      current.forEach(releaseAttachment);
      return [];
    });
  }, []);
  const handleFilesSelected = useCallback((files: File[]) => {
    setAttachments((current) => [
      ...current,
      ...files.map((file) => ({
        id: attachmentId(file),
        mimeType: file.type,
        name: file.name,
        src: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      })),
    ]);
  }, []);
  const removeAttachment = useCallback((id: string) => {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === id);
      if (attachment) releaseAttachment(attachment);
      return current.filter((item) => item.id !== id);
    });
  }, []);
  return {
    attachments,
    clearAttachments,
    handleFilesSelected,
    removeAttachment,
  };
}

function AttachmentPreviews({
  attachments,
  onRemove,
}: {
  attachments: PendingAttachment[];
  onRemove: (id: string) => void;
}) {
  if (!attachments.length) return null;
  return (
    <PromptInput.Attachments>
      <ChatAttachmentGroup>
        {attachments.map((attachment) => (
          <ChatAttachment
            key={attachment.id}
            mimeType={attachment.mimeType}
            name={attachment.name}
            src={attachment.src}
          >
            <ChatAttachment.Preview />
            <ChatAttachment.Remove
              aria-label={`Remove ${attachment.name}`}
              onPress={() => onRemove(attachment.id)}
            />
          </ChatAttachment>
        ))}
      </ChatAttachmentGroup>
    </PromptInput.Attachments>
  );
}

const modelGroups = [
  {
    models: [
      { id: "gpt-5.4", name: "GPT-5.4" },
      { id: "gpt-5.3-mini", name: "GPT-5.3 Mini" },
      { id: "gpt-4.1", name: "GPT-4.1" },
    ],
    provider: "OpenAI",
  },
  {
    models: [
      { id: "claude-opus-4.1", name: "Claude Opus 4.1" },
      { id: "claude-sonnet-4.5", name: "Claude Sonnet 4.5" },
      { id: "claude-haiku-3.5", name: "Claude Haiku 3.5" },
    ],
    provider: "Anthropic",
  },
  {
    models: [
      { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro" },
      { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash" },
    ],
    provider: "Google",
  },
  {
    models: [{ id: "grok-4", name: "Grok 4" }],
    provider: "xAI",
  },
];

function ModelSelector({ variant }: { variant?: "secondary" }) {
  return (
    <Select
      aria-label="Model"
      className="w-[160px] sm:w-[220px]"
      defaultValue="gpt-5.4"
      variant={variant}
    >
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {modelGroups.map((group, index) => (
            <Fragment key={group.provider}>
              {index ? <Separator /> : null}
              <ListBox.Section>
                <Header>{group.provider}</Header>
                {group.models.map((model) => (
                  <ListBox.Item
                    key={model.id}
                    id={model.id}
                    textValue={model.name}
                  >
                    {model.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox.Section>
            </Fragment>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

function Composer({
  layout,
  variant,
}: {
  layout?: "compact" | "inline";
  variant?: "secondary";
}) {
  const {
    attachments,
    clearAttachments,
    handleFilesSelected,
    removeAttachment,
  } = useAttachments();
  const [value, setValue] = useState("");
  const submit = () => {
    setValue("");
    clearAttachments();
  };
  const isFollowUp = layout === "compact" || layout === "inline";
  return (
    <div className="w-full max-w-[640px]">
      <PromptInput
        layout={layout}
        value={value}
        variant={variant}
        onSubmit={submit}
        onValueChange={setValue}
      >
        <ChatAttachmentInput onFilesSelected={handleFilesSelected}>
          <ChatAttachmentInput.Dropzone
            render={(dropzoneProps) => (
              <PromptInput.Shell {...dropzoneProps}>
                <PromptInput.Content>
                  <AttachmentPreviews
                    attachments={attachments}
                    onRemove={removeAttachment}
                  />
                  <PromptInput.TextArea
                    placeholder={
                      isFollowUp
                        ? "Send follow-up"
                        : "What do you want to know?"
                    }
                  />
                </PromptInput.Content>
                <PromptInput.Toolbar>
                  <PromptInput.ToolbarStart>
                    <ChatAttachmentInput.Trigger
                      render={(triggerProps) => (
                        <PromptInput.Action
                          {...triggerProps}
                          aria-label="Attach file"
                          tooltip="Attach file"
                          variant={variant ? "outline" : undefined}
                        >
                          <HugeiconsIcon
                            aria-hidden
                            className="size-4"
                            icon={Attachment01Icon}
                            strokeWidth={2}
                          />
                        </PromptInput.Action>
                      )}
                    />
                    {!isFollowUp ? (
                      <ModelSelector
                        variant={variant ? undefined : "secondary"}
                      />
                    ) : null}
                  </PromptInput.ToolbarStart>
                  <PromptInput.ToolbarEnd>
                    <PromptInput.Send>
                      <HugeiconsIcon
                        aria-hidden
                        className="size-4"
                        icon={ArrowUp01Icon}
                        strokeWidth={2}
                      />
                    </PromptInput.Send>
                  </PromptInput.ToolbarEnd>
                </PromptInput.Toolbar>
              </PromptInput.Shell>
            )}
          />
        </ChatAttachmentInput>
        <PromptInput.Footer>
          {variant
            ? "Secondary surface with default background tokens."
            : "AI can make mistakes. Check important info."}
        </PromptInput.Footer>
      </PromptInput>
    </div>
  );
}

export const DemoSecondaryExample = () => <Composer variant="secondary" />;
