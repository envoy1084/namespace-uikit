"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileMediaKind,
  NameProfileMediaUpload,
} from "#/components/name-profile-editor/types";

import { useState } from "react";

import {
  DropZone,
  FieldError,
  Input,
  Label,
  Popover,
  Spinner,
  TextField,
  Typography,
  cn,
} from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

interface MediaControlProps {
  className: string;
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  upload?: NameProfileMediaUpload;
  value: string;
}

function UploadMediaControl({
  className,
  kind,
  onChange,
  upload,
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
          className={className}
          isDisabled={isUploading}
          variant="secondary"
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
  className,
  kind,
  onChange,
  value,
}: MediaControlProps) {
  const isInvalid =
    value.length > 0 &&
    !/^(?:https?:\/\/|ipfs:\/\/|eip155:)/i.test(value.trim());

  return (
    <Popover>
      <Popover.Trigger
        aria-label={`Set profile ${kind} URL`}
        className={className}
      >
        <HugeiconsIcon icon={Add01Icon} size={28} strokeWidth={1.6} />
      </Popover.Trigger>
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

export function ProfileHeader({
  avatar,
  className,
  header,
  onAvatarChange,
  onHeaderChange,
  upload,
}: {
  avatar: string;
  className?: string;
  header: string;
  onAvatarChange: (value: string) => void;
  onHeaderChange: (value: string) => void;
  upload?: NameProfileEditorUploadHandlers;
}) {
  return (
    <section
      aria-label="Profile media"
      className={cn(
        "bg-default relative w-full overflow-visible rounded-3xl pb-12",
        className,
      )}
    >
      <div className="relative h-36 overflow-hidden rounded-t-3xl bg-gradient-to-b from-[#858585] via-[#d4d4d4] to-[#f2f2f2]">
        {header.length > 0 && (
          <img
            alt=""
            className="absolute inset-0 size-full object-cover"
            src={header}
          />
        )}

        <div className="absolute top-4 right-4">
          <MediaControl
            className="flex size-12 items-center justify-center rounded-2xl border border-white/20 bg-[#8d8d8d]/85 text-white shadow-[0_3px_0_rgba(0,0,0,0.14)] backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            kind="header"
            value={header}
            {...(upload?.header === undefined ? {} : { upload: upload.header })}
            onChange={onHeaderChange}
          />
        </div>
      </div>

      <div className="absolute top-13 left-1/2 size-28 -translate-x-1/2 rounded-[1.6rem] border-[6px] border-white/70 bg-white p-4 shadow-[0_16px_28px_rgba(0,0,0,0.12)]">
        {avatar.length > 0 && (
          <img
            alt=""
            className="absolute inset-1 size-[calc(100%_-_0.5rem)] rounded-[1.25rem] object-cover"
            src={avatar}
          />
        )}
        <div className="relative flex size-full items-center justify-center rounded-full bg-[#f2f2f2]">
          <MediaControl
            className="flex size-14 items-center justify-center rounded-full text-[#858585] outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            kind="avatar"
            value={avatar}
            {...(upload?.avatar === undefined ? {} : { upload: upload.avatar })}
            onChange={onAvatarChange}
          />
        </div>
      </div>
    </section>
  );
}
