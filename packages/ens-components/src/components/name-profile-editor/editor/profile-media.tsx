"use client";

import type {
  NameProfileEditorUploadHandlers,
  NameProfileMediaKind,
  NameProfileMediaUpload,
} from "#/components/name-profile-editor/editor/types";

import type { ReactNode } from "react";
import { useState } from "react";

import {
  Avatar,
  DropZone,
  FieldError,
  Input,
  Label,
  Spinner,
  TextField,
  Typography,
} from "@thenamespace/uikit";
import {
  Add01Icon,
  HugeiconsIcon,
  Image01Icon,
} from "@thenamespace/uikit/icons";

function MediaPicker({
  accept = "image/*",
  children,
  kind,
  onChange,
  upload,
}: {
  accept?: string;
  children: ReactNode;
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
    <DropZone className="contents">
      <DropZone.Area
        aria-label={`Upload profile ${kind}`}
        className="group relative size-full overflow-hidden rounded-[inherit] border-0 bg-transparent p-0 outline-none ring-inset focus-visible:ring-2"
      >
        {children}
        <DropZone.Trigger
          isIconOnly
          aria-label={`Choose profile ${kind}`}
          className="absolute top-3 right-3 size-9 min-w-9 rounded-xl shadow-sm"
          isDisabled={isUploading}
          size="sm"
          variant="secondary"
        >
          {isUploading ? (
            <Spinner className="size-4" size="sm" />
          ) : (
            <HugeiconsIcon icon={Add01Icon} size={18} />
          )}
        </DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept={accept} onSelect={selectFile} />
      {error.length > 0 && (
        <Typography.Paragraph
          className="text-danger mt-2 text-center"
          size="xs"
        >
          {error}
        </Typography.Paragraph>
      )}
    </DropZone>
  );
}

function MediaUrlField({
  kind,
  onChange,
  value,
}: {
  kind: NameProfileMediaKind;
  onChange: (value: string) => void;
  value: string;
}) {
  const isInvalid =
    value.length > 0 &&
    !/^(?:https?:\/\/|ipfs:\/\/|eip155:)/i.test(value.trim());

  return (
    <TextField
      fullWidth
      isInvalid={isInvalid}
      value={value}
      onChange={onChange}
    >
      <Label className="text-muted text-xs">
        {kind === "avatar" ? "Avatar" : "Header"} URL
      </Label>
      <Input
        className="ring-inset"
        placeholder={
          kind === "avatar" ? "https://… or ipfs://…" : "https://… or ipfs://…"
        }
        spellCheck={false}
        variant="secondary"
      />
      <FieldError>Enter a valid media URL.</FieldError>
    </TextField>
  );
}

function HeaderPreview({ value }: { value: string }) {
  return (
    <div className="relative h-36 overflow-hidden rounded-[inherit] bg-gradient-to-br from-[#161616] via-[#4a4a4a] to-[#d4d4d4] sm:h-44">
      {value.length > 0 && (
        <img
          alt=""
          className="absolute inset-0 size-full object-cover"
          src={value}
        />
      )}
      {value.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <HugeiconsIcon
            className="text-white/60"
            icon={Image01Icon}
            size={24}
          />
        </div>
      )}
    </div>
  );
}

function AvatarPreview({ name, value }: { name: string; value: string }) {
  return (
    <Avatar className="size-24 border-[6px] border-white bg-[#f1f1f1] shadow-xl sm:size-28">
      {value.length > 0 && <Avatar.Image alt="" src={value} />}
      <Avatar.Fallback className="text-muted text-xl font-medium">
        {name.slice(0, 2).toUpperCase()}
      </Avatar.Fallback>
    </Avatar>
  );
}

export function ProfileMedia({
  avatar,
  header,
  name,
  onAvatarChange,
  onHeaderChange,
  upload,
}: {
  avatar: string;
  header: string;
  name: string;
  onAvatarChange: (value: string) => void;
  onHeaderChange: (value: string) => void;
  upload?: NameProfileEditorUploadHandlers;
}) {
  return (
    <section aria-label="Profile media">
      <div className="relative rounded-t-3xl">
        {upload?.header === undefined ? (
          <HeaderPreview value={header} />
        ) : (
          <MediaPicker
            kind="header"
            upload={upload.header}
            onChange={onHeaderChange}
          >
            <HeaderPreview value={header} />
          </MediaPicker>
        )}

        <div className="absolute -bottom-12 left-5 rounded-full sm:left-8">
          {upload?.avatar === undefined ? (
            <AvatarPreview name={name} value={avatar} />
          ) : (
            <MediaPicker
              kind="avatar"
              upload={upload.avatar}
              onChange={onAvatarChange}
            >
              <AvatarPreview name={name} value={avatar} />
            </MediaPicker>
          )}
        </div>
      </div>

      <div className="min-h-20 px-5 pt-14 pb-3 sm:px-8">
        <Typography.Heading
          className="text-xl font-semibold break-all sm:text-2xl"
          level={2}
        >
          {name}
        </Typography.Heading>
        {upload === undefined && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <MediaUrlField
              kind="avatar"
              value={avatar}
              onChange={onAvatarChange}
            />
            <MediaUrlField
              kind="header"
              value={header}
              onChange={onHeaderChange}
            />
          </div>
        )}
        {upload !== undefined &&
          (upload.avatar === undefined || upload.header === undefined) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {upload.avatar === undefined && (
                <MediaUrlField
                  kind="avatar"
                  value={avatar}
                  onChange={onAvatarChange}
                />
              )}
              {upload.header === undefined && (
                <MediaUrlField
                  kind="header"
                  value={header}
                  onChange={onHeaderChange}
                />
              )}
            </div>
          )}
      </div>
    </section>
  );
}
