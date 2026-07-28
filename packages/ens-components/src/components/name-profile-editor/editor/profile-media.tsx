"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileMediaKind,
  NameProfileMediaUpload,
} from "#/components/name-profile-editor/editor/types";

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
} from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

function UploadControl({
  className,
  iconSize,
  kind,
  onChange,
  upload,
}: {
  className: string;
  iconSize: number;
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  upload: NameProfileMediaUpload;
}) {
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const selectFile = async (files: FileList) => {
    const file = files.item(0);
    if (file === null) return;

    setError("");
    setIsUploading(true);
    try {
      const value = await upload(file);
      if (value.trim().length === 0) {
        setError("The upload did not return a URL.");
        return;
      }
      onChange(value);
    } catch {
      setError(`Could not upload the ${kind}. Try again.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <DropZone>
        <DropZone.Trigger
          isIconOnly
          aria-label={`Choose profile ${kind}`}
          className={className}
          isDisabled={isUploading}
          variant="secondary"
        >
          {isUploading ? (
            <Spinner className="size-5" size="sm" />
          ) : (
            <HugeiconsIcon icon={Add01Icon} size={iconSize} strokeWidth={1.5} />
          )}
        </DropZone.Trigger>
        <DropZone.Input accept="image/*" onSelect={selectFile} />
      </DropZone>
      {error.length > 0 && (
        <Typography.Paragraph
          className="text-danger absolute top-full right-0 mt-1 w-56 text-right"
          size="xs"
        >
          {error}
        </Typography.Paragraph>
      )}
    </div>
  );
}

function UrlControl({
  className,
  iconSize,
  kind,
  onChange,
  value,
}: {
  className: string;
  iconSize: number;
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  value: string;
}) {
  const isInvalid =
    value.length > 0 &&
    !/^(?:https?:\/\/|ipfs:\/\/|eip155:)/i.test(value.trim());

  return (
    <Popover>
      <Popover.Trigger
        aria-label={`Set profile ${kind} URL`}
        className={className}
      >
        <HugeiconsIcon icon={Add01Icon} size={iconSize} strokeWidth={1.5} />
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

function MediaControl({
  className,
  iconSize,
  kind,
  onChange,
  upload,
  value,
}: {
  className: string;
  iconSize: number;
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  upload?: NameProfileMediaUpload;
  value: string;
}) {
  if (upload) {
    return (
      <UploadControl
        className={className}
        iconSize={iconSize}
        kind={kind}
        upload={upload}
        onChange={onChange}
      />
    );
  }

  return (
    <UrlControl
      className={className}
      iconSize={iconSize}
      kind={kind}
      value={value}
      onChange={onChange}
    />
  );
}

export function ProfileMedia({
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
    <section
      aria-label="Profile media"
      className="relative h-36 overflow-visible rounded-t-[2rem] bg-gradient-to-b from-[#858585] via-[#d6d6d6] to-[#f1f1f1] @min-[800px]:h-72"
    >
      {header.length > 0 && (
        <img
          alt=""
          className="absolute inset-0 size-full rounded-t-[2rem] object-cover"
          src={header}
        />
      )}

      <div className="absolute top-4 right-4 @min-[800px]:top-7 @min-[800px]:right-7">
        <MediaControl
          className="size-12 min-w-12 rounded-2xl border border-white/20 bg-[#929292]/80 text-white shadow-[0_3px_0_rgba(0,0,0,0.16)] backdrop-blur-sm @min-[800px]:size-20 @min-[800px]:min-w-20 @min-[800px]:rounded-3xl"
          iconSize={30}
          kind="header"
          value={header}
          {...(upload?.header === undefined ? {} : { upload: upload.header })}
          onChange={onHeaderChange}
        />
      </div>

      <div className="absolute top-13 left-1/2 z-10 size-28 -translate-x-1/2 rounded-[1.5rem] border-[6px] border-white/70 bg-white p-5 shadow-[0_18px_28px_rgba(0,0,0,0.12)] @min-[800px]:top-24 @min-[800px]:size-60 @min-[800px]:rounded-[3rem] @min-[800px]:border-[10px] @min-[800px]:p-12">
        {avatar.length > 0 && (
          <img
            alt=""
            className="absolute inset-0 size-full rounded-[2.4rem] object-cover"
            src={avatar}
          />
        )}
        <div className="relative flex size-full items-center justify-center rounded-full bg-[#f2f2f2]">
          <MediaControl
            className="size-14 min-w-14 rounded-full bg-transparent text-[#858585] @min-[800px]:size-28 @min-[800px]:min-w-28"
            iconSize={30}
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
