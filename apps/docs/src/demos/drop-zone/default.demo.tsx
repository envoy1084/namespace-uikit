"use client";

// @demo-title Default
import { useState } from "react";

import {
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DropZone } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/icon";

type Upload = {
  id: string;
  name: string;
  progress: number;
  size: number;
  status: "complete" | "failed" | "uploading";
};

const formatSize = (size: number) =>
  size < 1024
    ? `${size} B`
    : size < 1024 * 1024
      ? `${(size / 1024).toFixed(0)} KB`
      : `${(size / (1024 * 1024)).toFixed(1)} MB`;

const extension = (name: string) =>
  name.split(".").pop()?.toUpperCase() ?? "FILE";

const colorFor = (format: string) =>
  ({
    PDF: "red",
    PNG: "green",
    JPG: "blue",
    SVG: "green",
    MP4: "purple",
    ZIP: "orange",
  })[format] ?? "gray";

function FileList({
  files,
  onRemove,
  onRetry,
}: {
  files: Upload[];
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
}) {
  return (
    <DropZone.FileList>
      {files.map((file) => {
        const format = extension(file.name);
        return (
          <DropZone.FileItem key={file.id} status={file.status}>
            <DropZone.FileFormatIcon
              color={
                colorFor(format) as
                  | "blue"
                  | "gray"
                  | "green"
                  | "orange"
                  | "purple"
                  | "red"
              }
              format={format}
            />
            <DropZone.FileInfo>
              <DropZone.FileName>{file.name}</DropZone.FileName>
              {file.status === "failed" ? (
                <DropZone.FileMeta>{formatSize(file.size)}</DropZone.FileMeta>
              ) : (
                <DropZone.FileMeta>
                  {formatSize(file.size)} |{" "}
                  <HugeiconsIcon
                    aria-hidden
                    className={
                      file.status === "complete"
                        ? "text-success inline size-3 align-[-1px]"
                        : "inline size-3 animate-spin align-[-1px]"
                    }
                    icon={
                      file.status === "complete"
                        ? CheckmarkCircle02Icon
                        : Loading03Icon
                    }
                    size={12}
                  />{" "}
                  {file.status === "uploading" ? file.progress : 100}%
                </DropZone.FileMeta>
              )}
              {file.status !== "failed" ? (
                <DropZone.FileProgress value={file.progress}>
                  <DropZone.FileProgressTrack>
                    <DropZone.FileProgressFill />
                  </DropZone.FileProgressTrack>
                </DropZone.FileProgress>
              ) : (
                <>
                  <DropZone.FileMeta>
                    Something went wrong, please retry
                  </DropZone.FileMeta>
                  <Button
                    className="mt-2 -ml-1"
                    size="sm"
                    variant="danger-soft"
                    onPress={() => onRetry?.(file.id)}
                  >
                    Try again
                  </Button>
                </>
              )}
            </DropZone.FileInfo>
            <DropZone.FileRemoveTrigger
              aria-label={`Remove ${file.name}`}
              onPress={() => onRemove(file.id)}
            />
          </DropZone.FileItem>
        );
      })}
    </DropZone.FileList>
  );
}

function UploadDemo({
  accept,
  label = "Drag files here or click to browse",
  multiple = false,
}: {
  accept?: string;
  label?: string;
  multiple?: boolean;
}) {
  const [files, setFiles] = useState<Upload[]>([]);
  const add = (selected: FileList) =>
    setFiles((current) => [
      ...Array.from(selected).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        progress: 100,
        size: file.size,
        status: "complete" as const,
      })),
      ...current,
    ]);
  return (
    <DropZone className={multiple ? "w-[480px]" : "w-[420px]"}>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>{label}</DropZone.Label>
        <DropZone.Description>
          Supports JPEG, PNG, PDF, and MP4 up to 50 MB.
        </DropZone.Description>
        <DropZone.Trigger>
          {multiple ? "Choose Files" : "Select File"}
        </DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept={accept} multiple={multiple} onSelect={add} />
      {files.length ? (
        <FileList
          files={files}
          onRemove={(id) =>
            setFiles((all) => all.filter((file) => file.id !== id))
          }
          onRetry={(id) =>
            setFiles((all) =>
              all.map((file) =>
                file.id === id
                  ? { ...file, progress: 0, status: "uploading" }
                  : file,
              ),
            )
          }
        />
      ) : null}
    </DropZone>
  );
}

export const DemoDefaultExample = () => <UploadDemo />;
