"use client";

// @demo-title Queue
import { useCallback, useEffect, useRef, useState } from "react";

import { Dropdown, Label } from "@thenamespace/uikit";
import {
  ChatAttachment,
  ChatAttachmentGroup,
  PromptInput,
} from "@thenamespace/uikit";
import {
  Attachment01Icon,
  Copy01Icon,
  Delete02Icon,
  PencilEdit01Icon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

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

interface QueueValue {
  attachments?: PendingAttachment[];
  id: string;
  text: string;
}

const sampleAttachments: PendingAttachment[] = [
  {
    id: "attachment-1",
    mimeType: "image/png",
    name: "hero.png",
    src: "/assets/docs/demo/hero.png",
  },
  {
    id: "attachment-2",
    mimeType: "image/jpeg",
    name: "dashboard.jpg",
    src: "/assets/docs/demo/dashboard.jpg",
  },
  { id: "attachment-3", mimeType: "application/pdf", name: "brief.pdf" },
];

const initialQueue: QueueValue[] = [
  {
    attachments: sampleAttachments.slice(0, 2),
    id: "queue-1",
    text: "Review the attached mockups before implementing the landing page updates.",
  },
  {
    attachments: sampleAttachments,
    id: "queue-2",
    text: "Add dark mode support to the settings page.",
  },
  {
    id: "queue-3",
    text: "Refactor the queue item layout to match Codex.",
  },
  { attachments: sampleAttachments.slice(0, 1), id: "queue-4", text: "" },
];

function queueItemLabel(item: QueueValue): string {
  if (item.text.trim()) return item.text;
  const count = item.attachments?.length ?? 0;
  return count ? `${count} attachment${count === 1 ? "" : "s"}` : "";
}

function cloneAttachment(attachment: PendingAttachment): PendingAttachment {
  return {
    id: attachment.id,
    mimeType: attachment.mimeType,
    name: attachment.name,
    src: attachment.src,
  };
}

function cloneQueueItem(item: QueueValue, id = item.id): QueueValue {
  return {
    attachments: item.attachments?.map(cloneAttachment),
    id,
    text: item.text,
  };
}

function QueueItemMenu({
  item,
  onDuplicate,
  onEdit,
  onRemove,
}: {
  item: QueueValue;
  onDuplicate: (id: string) => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Dropdown>
      <PromptInput.Queue.Item.More aria-label="More queue actions" />
      <Dropdown.Popover className="w-44" offset={6} placement="bottom end">
        <Dropdown.Menu
          aria-label="Queued prompt actions"
          onAction={(key) => {
            if (key === "edit") onEdit(item.id);
            if (key === "duplicate") onDuplicate(item.id);
            if (key === "remove") onRemove(item.id);
          }}
        >
          <Dropdown.Item id="edit" textValue="Edit prompt">
            <HugeiconsIcon
              aria-hidden
              className="text-muted size-4 shrink-0"
              icon={PencilEdit01Icon}
              strokeWidth={2}
            />
            <Label>Edit prompt</Label>
          </Dropdown.Item>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            <HugeiconsIcon
              aria-hidden
              className="text-muted size-4 shrink-0"
              icon={Copy01Icon}
              strokeWidth={2}
            />
            <Label>Duplicate</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="remove"
            textValue="Remove from queue"
            variant="danger"
          >
            <HugeiconsIcon
              aria-hidden
              className="text-danger size-4 shrink-0"
              icon={Delete02Icon}
              strokeWidth={2}
            />
            <Label>Remove from queue</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function QueueDemo() {
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<QueueValue[]>(() =>
    initialQueue.map((item) => cloneQueueItem(item)),
  );
  const { attachments, clearAttachments, removeAttachment } = useAttachments();
  const submit = () => {
    const text = value.trim();
    if (!text && !attachments.length) return;
    setQueue((current) => [
      ...current,
      {
        attachments: attachments.length
          ? attachments.map(cloneAttachment)
          : undefined,
        id: crypto.randomUUID(),
        text,
      },
    ]);
    setValue("");
    clearAttachments();
  };
  const remove = (id: string) =>
    setQueue((current) => current.filter((item) => item.id !== id));
  const duplicate = (id: string) =>
    setQueue((current) => {
      const index = current.findIndex((item) => item.id === id);
      const item = current[index];
      if (!item) return current;
      const copy = cloneQueueItem(item, crypto.randomUUID());
      return [
        ...current.slice(0, index + 1),
        copy,
        ...current.slice(index + 1),
      ];
    });
  const edit = (id: string) => {
    const item = queue.find((queued) => queued.id === id);
    if (!item) return;
    setValue(item.text);
    remove(id);
  };
  return (
    <div className="w-full max-w-[640px]">
      <PromptInput value={value} onSubmit={submit} onValueChange={setValue}>
        {queue.length ? (
          <PromptInput.Queue>
            <PromptInput.Queue.List values={queue} onReorder={setQueue}>
              {queue.map((item) => (
                <PromptInput.Queue.Item key={item.id} value={item}>
                  <PromptInput.Queue.Item.Handle aria-label="Reorder queued prompt" />
                  <PromptInput.Queue.Item.Body>
                    <PromptInput.Queue.Item.Icon />
                    <PromptInput.Queue.Item.Content>
                      {queueItemLabel(item)}
                    </PromptInput.Queue.Item.Content>
                  </PromptInput.Queue.Item.Body>
                  <PromptInput.Queue.Item.Actions>
                    <PromptInput.Queue.Item.Remove
                      aria-label="Remove queued prompt"
                      onPress={() => remove(item.id)}
                    />
                    <QueueItemMenu
                      item={item}
                      onDuplicate={duplicate}
                      onEdit={edit}
                      onRemove={remove}
                    />
                  </PromptInput.Queue.Item.Actions>
                </PromptInput.Queue.Item>
              ))}
            </PromptInput.Queue.List>
          </PromptInput.Queue>
        ) : null}
        <PromptInput.Shell>
          <PromptInput.Content>
            <AttachmentPreviews
              attachments={attachments}
              onRemove={removeAttachment}
            />
            <PromptInput.TextArea placeholder="Ask for follow-up changes" />
          </PromptInput.Content>
          <PromptInput.Toolbar>
            <PromptInput.ToolbarStart>
              <PromptInput.Action
                aria-label="Add attachment"
                tooltip="Add attachment"
              >
                <HugeiconsIcon
                  aria-hidden
                  className="size-4"
                  icon={Attachment01Icon}
                  strokeWidth={2}
                />
              </PromptInput.Action>
            </PromptInput.ToolbarStart>
            <PromptInput.ToolbarEnd>
              <PromptInput.Send />
            </PromptInput.ToolbarEnd>
          </PromptInput.Toolbar>
        </PromptInput.Shell>
      </PromptInput>
    </div>
  );
}

export const DemoQueueExample = () => <QueueDemo />;
