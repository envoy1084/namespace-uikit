"use client";

// @demo-title Compact File List
import { useState } from "react";

import { DropZone } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import {
  CheckmarkCircle02Icon,
  Loading03Icon,
} from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

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

const initialFiles: Upload[] = [
  {
    id: "1",
    name: "Logo dark.svg",
    progress: 100,
    size: 24576,
    status: "complete",
  },
  {
    id: "2",
    name: "Meeting notes.docx",
    progress: 68,
    size: 358400,
    status: "uploading",
  },
  {
    id: "3",
    name: "Demo recording.mp4",
    progress: 18,
    size: 5242880,
    status: "failed",
  },
];

export const DemoCompactFileListExample = function Demo() {
  const [files, setFiles] = useState(initialFiles);
  return (
    <DropZone className="w-[480px]">
      <FileList
        files={files}
        onRemove={(id) =>
          setFiles((all) => all.filter((file) => file.id !== id))
        }
      />
    </DropZone>
  );
};
