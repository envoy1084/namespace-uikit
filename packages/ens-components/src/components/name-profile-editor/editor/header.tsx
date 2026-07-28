"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileMediaKind,
  NameProfileMediaUpload,
} from "#/components/name-profile-editor/types";

import { useState } from "react";

import {
  Button,
  DropZone,
  FieldError,
  Input,
  Label,
  Popover,
  Spinner,
  Surface,
  TextField,
  Typography,
} from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

interface MediaControlProps {
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  upload?: NameProfileMediaUpload;
  value: string;
  variant: "primary" | "secondary";
}

function UploadMediaControl({
  kind,
  onChange,
  upload,
  variant,
}: MediaControlProps & { upload: NameProfileMediaUpload }) {
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const selectFile = async (files: FileList) => {
    const file = files.item(0);
    if (file === null) return;

    setError("");
    setIsUploading(true);
    try {
      const url = await upload(file);
      if (url.trim().length === 0) {
        setError("The upload did not return a URL.");
        return;
      }
      onChange(url);
    } catch {
      setError(`Could not upload the ${kind}. Try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      <DropZone>
        <DropZone.Trigger
          isIconOnly
          aria-label={`Choose profile ${kind}`}
          isDisabled={isUploading}
          size="lg"
          variant={variant}
        >
          {isUploading ? (
            <Spinner size="sm" />
          ) : (
            <HugeiconsIcon icon={Add01Icon} size={28} strokeWidth={1.6} />
          )}
        </DropZone.Trigger>
        <DropZone.Input accept="image/*" onSelect={selectFile} />
      </DropZone>
      {error.length > 0 && (
        <Typography.Paragraph
          className="text-danger absolute top-full right-0 z-20 mt-2 w-56 text-right"
          size="xs"
        >
          {error}
        </Typography.Paragraph>
      )}
    </div>
  );
}

function UrlMediaControl({
  kind,
  onChange,
  value,
  variant,
}: MediaControlProps) {
  const isInvalid =
    value.length > 0 &&
    !/^(?:https?:\/\/|ipfs:\/\/|eip155:)/i.test(value.trim());

  return (
    <Popover>
      <Button
        isIconOnly
        aria-label={`Set profile ${kind} URL`}
        size="lg"
        variant={variant}
      >
        <HugeiconsIcon icon={Add01Icon} size={28} strokeWidth={1.6} />
      </Button>
      <Popover.Content placement="bottom">
        <Popover.Arrow />
        <Popover.Dialog className="w-72 p-3">
          <TextField
            fullWidth
            isInvalid={isInvalid}
            value={value}
            onChange={onChange}
          >
            <Label className="text-sm font-medium">
              {kind === "avatar" ? "Avatar" : "Header"} URL
            </Label>
            <Input
              className="mt-2 ring-inset"
              placeholder="https://… or ipfs://…"
              spellCheck={false}
              variant="secondary"
            />
            <FieldError>Enter a valid media URL.</FieldError>
          </TextField>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

function MediaControl(props: MediaControlProps) {
  if (props.upload) {
    return <UploadMediaControl {...props} upload={props.upload} />;
  }

  return <UrlMediaControl {...props} />;
}

export function EditorHeader({
  avatar,
  header,
  onAvatarChange,
  onHeaderChange,
  upload,
}: {
  avatar: string;
  header: string;
  onAvatarChange: (value: string) => void;
  onHeaderChange: (value: string) => void;
  upload?: NameProfileEditorUploadHandlers;
}) {
  return (
    <section aria-label="Profile media" className="relative w-full pb-12">
      <Surface
        className="relative h-36 overflow-hidden rounded-2xl p-0"
        variant="secondary"
      >
        {header.length > 0 && (
          <img
            alt=""
            className="absolute inset-0 size-full object-cover"
            src={header}
          />
        )}

        <div className="absolute top-4 right-4">
          <MediaControl
            kind="header"
            value={header}
            variant="primary"
            {...(upload?.header === undefined ? {} : { upload: upload.header })}
            onChange={onHeaderChange}
          />
        </div>
      </Surface>

      <Surface className="absolute top-13 left-1/2 flex size-28 -translate-x-1/2 items-center justify-center rounded-2xl p-4">
        {avatar.length > 0 && (
          <img
            alt=""
            className="absolute inset-2 size-[calc(100%_-_1rem)] rounded-xl object-cover"
            src={avatar}
          />
        )}
        <div className="relative">
          <MediaControl
            kind="avatar"
            value={avatar}
            variant="secondary"
            {...(upload?.avatar === undefined ? {} : { upload: upload.avatar })}
            onChange={onAvatarChange}
          />
        </div>
      </Surface>
    </section>
  );
}
