"use client";

import type { ReactNode } from "react";

import { Button, Spinner, Surface } from "@thenamespace/uikit";
import {
  Add01Icon,
  HugeiconsIcon,
  PencilEdit01Icon,
} from "@thenamespace/uikit/icons";

export const DEFAULT_PROFILE_HEADER_URL =
  "https://app.namespace.ninja/assets/default-header.webp";
export const DEFAULT_PROFILE_AVATAR_URL =
  "https://app.namespace.ninja/assets/default-avatar.webp";

function MediaActionIcon({
  hasValue,
  isUploading,
}: {
  hasValue: boolean;
  isUploading: boolean;
}) {
  if (isUploading) return <Spinner className="size-4" size="sm" />;

  return (
    <HugeiconsIcon
      icon={hasValue ? PencilEdit01Icon : Add01Icon}
      size={16}
      strokeWidth={2}
    />
  );
}

function mediaLabel(type: "avatar" | "header", hasValue: boolean): string {
  const label = type === "avatar" ? "profile avatar" : "profile header";
  return `${hasValue ? "Edit" : "Add"} ${label}`;
}

export function EditorHeader({
  avatarPlaceholder,
  avatarUrl,
  headerPlaceholder,
  headerUrl,
  isAvatarDisabled = false,
  isAvatarUploading = false,
  isHeaderDisabled = false,
  isHeaderUploading = false,
  onAvatarPress,
  onHeaderPress,
}: {
  avatarPlaceholder?: ReactNode;
  avatarUrl?: string | undefined;
  headerPlaceholder?: ReactNode;
  headerUrl?: string | undefined;
  isAvatarDisabled?: boolean;
  isAvatarUploading?: boolean;
  isHeaderDisabled?: boolean;
  isHeaderUploading?: boolean;
  onAvatarPress: () => void;
  onHeaderPress: () => void;
}) {
  const hasAvatar = avatarUrl !== undefined && avatarUrl.trim().length > 0;
  const hasHeader = headerUrl !== undefined && headerUrl.trim().length > 0;

  return (
    <section aria-label="Profile media" className="relative w-full p-2 pb-6">
      <div className="group/header relative h-36 overflow-hidden rounded-2xl">
        {hasHeader || headerPlaceholder === undefined ? (
          <img
            alt=""
            className="size-full object-cover"
            src={hasHeader ? headerUrl : DEFAULT_PROFILE_HEADER_URL}
            onError={(event) => {
              event.currentTarget.src = DEFAULT_PROFILE_HEADER_URL;
            }}
          />
        ) : (
          <div className="size-full [&>img]:size-full [&>img]:object-cover">
            {headerPlaceholder}
          </div>
        )}
        <div className="absolute top-4 left-4 opacity-0 transition-opacity group-focus-within/header:opacity-100 group-hover/header:opacity-100">
          <Button
            isIconOnly
            aria-label={mediaLabel("header", hasHeader)}
            isDisabled={isHeaderDisabled || isHeaderUploading}
            size="md"
            type="button"
            variant="secondary"
            onPress={onHeaderPress}
          >
            <MediaActionIcon
              hasValue={hasHeader}
              isUploading={isHeaderUploading}
            />
          </Button>
        </div>
      </div>

      <Surface className="group/avatar absolute top-16 left-1/2 flex size-28 -translate-x-1/2 items-center justify-center rounded-2xl">
        {hasAvatar || avatarPlaceholder === undefined ? (
          <img
            alt=""
            className="absolute inset-0 size-full rounded-2xl object-cover p-1"
            src={hasAvatar ? avatarUrl : DEFAULT_PROFILE_AVATAR_URL}
            onError={(event) => {
              event.currentTarget.src = DEFAULT_PROFILE_AVATAR_URL;
            }}
          />
        ) : (
          <div className="absolute inset-0 size-full overflow-hidden rounded-2xl p-1 [&>img]:size-full [&>img]:object-cover">
            {avatarPlaceholder}
          </div>
        )}
        <Button
          isIconOnly
          aria-label={mediaLabel("avatar", hasAvatar)}
          className="relative opacity-0 transition-opacity group-focus-within/avatar:opacity-100 group-hover/avatar:opacity-100"
          isDisabled={isAvatarDisabled || isAvatarUploading}
          size="md"
          type="button"
          variant="secondary"
          onPress={onAvatarPress}
        >
          <MediaActionIcon
            hasValue={hasAvatar}
            isUploading={isAvatarUploading}
          />
        </Button>
      </Surface>
    </section>
  );
}
