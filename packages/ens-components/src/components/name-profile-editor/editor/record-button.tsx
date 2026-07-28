"use client";

import type { RecordIconComponent } from "#/components/name-profile-editor/get-record-icon";

import { Button } from "@thenamespace/uikit";

export interface RecordButtonProps {
  icon: RecordIconComponent;
  isDisabled?: boolean | undefined;
  name: string;
  onPress: () => void;
}

export function RecordButton({
  icon: RecordIcon,
  isDisabled = false,
  name,
  onPress,
}: RecordButtonProps) {
  return (
    <Button
      className="h-[4.25rem] w-full min-w-0 flex-col gap-1 overflow-hidden rounded-xl p-1.5"
      isDisabled={isDisabled}
      type="button"
      variant="secondary"
      onPress={onPress}
    >
      <RecordIcon aria-hidden className="size-6 shrink-0" />
      <span
        className="w-full truncate text-[10px] leading-none whitespace-nowrap"
        title={name}
      >
        {name}
      </span>
    </Button>
  );
}
