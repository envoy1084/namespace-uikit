"use client";

// @demo-title Composer
import { useEffect, useRef, useState } from "react";

import {
  ChatAttachment,
  ChatAttachmentGroup,
  ChatAttachmentInput,
  PromptInput,
} from "@thenamespace/uikit";
import { ArrowUp01Icon, Attachment01Icon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

interface Attachment {
  id: string;
  mimeType: string;
  name: string;
  src?: string;
}

function ComposerDemo() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const refs = useRef<Attachment[]>([]);
  useEffect(() => {
    refs.current = attachments;
  }, [attachments]);
  useEffect(
    () => () =>
      refs.current.forEach((item) => {
        if (item.src?.startsWith("blob:")) URL.revokeObjectURL(item.src);
      }),
    [],
  );
  const add = (files: File[]) =>
    setAttachments((values) => [
      ...values,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
        mimeType: file.type,
        name: file.name,
        src: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      })),
    ]);
  return (
    <div className="max-w-xl">
      <ChatAttachmentInput onFilesSelected={add}>
        <ChatAttachmentInput.Dropzone
          render={(dropProps) => (
            <PromptInput>
              <PromptInput.Shell {...dropProps}>
                <PromptInput.Content>
                  {attachments.length ? (
                    <PromptInput.Attachments>
                      <ChatAttachmentGroup>
                        {attachments.map((item) => (
                          <ChatAttachment
                            key={item.id}
                            mimeType={item.mimeType}
                            name={item.name}
                            src={item.src}
                          >
                            <ChatAttachment.Preview />
                            <ChatAttachment.Remove
                              aria-label="Remove attachment"
                              onPress={() =>
                                setAttachments((values) =>
                                  values.filter(
                                    (value) => value.id !== item.id,
                                  ),
                                )
                              }
                            />
                          </ChatAttachment>
                        ))}
                      </ChatAttachmentGroup>
                    </PromptInput.Attachments>
                  ) : null}
                  <PromptInput.TextArea placeholder="Ask about your files..." />
                </PromptInput.Content>
                <PromptInput.Toolbar>
                  <PromptInput.ToolbarStart>
                    <ChatAttachmentInput.Trigger
                      render={(props) => (
                        <PromptInput.Action
                          {...props}
                          aria-label="Attach file"
                          tooltip="Attach file"
                        >
                          <HugeiconsIcon
                            aria-hidden
                            icon={Attachment01Icon}
                            strokeWidth={2}
                          />
                        </PromptInput.Action>
                      )}
                    />
                  </PromptInput.ToolbarStart>
                  <PromptInput.ToolbarEnd>
                    <PromptInput.Send aria-label="Send">
                      <HugeiconsIcon
                        aria-hidden
                        icon={ArrowUp01Icon}
                        strokeWidth={2}
                      />
                    </PromptInput.Send>
                  </PromptInput.ToolbarEnd>
                </PromptInput.Toolbar>
              </PromptInput.Shell>
            </PromptInput>
          )}
        />
      </ChatAttachmentInput>
    </div>
  );
}

export const DemoComposerExample = () => <ComposerDemo />;
