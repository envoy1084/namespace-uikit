"use client";

// @demo-title With File List
import { useEffect, useState } from "react";

import { DropZone } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { CancelCircleIcon, CheckmarkCircle02Icon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

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

const extension = (name: string) => name.split(".").pop()?.toUpperCase() ?? "FILE";

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
              color={colorFor(format) as "blue" | "gray" | "green" | "orange" | "purple" | "red"}
              format={format}
            />
            <DropZone.FileInfo>
              <DropZone.FileName>{file.name}</DropZone.FileName>
              <DropZone.FileMeta>
                {formatSize(file.size)}
                {file.status === "uploading" ? (
                  " | Uploading..."
                ) : (
                  <div className="flex items-center gap-1">
                    {" | "}
                    <HugeiconsIcon
                      aria-hidden
                      className={
                        file.status === "complete"
                          ? "text-success inline size-3"
                          : "text-danger inline size-3"
                      }
                      icon={file.status === "complete" ? CheckmarkCircle02Icon : CancelCircleIcon}
                      size={12}
                    />
                    {file.status === "complete" ? (
                      " Complete"
                    ) : (
                      <span className="text-danger">Failed</span>
                    )}
                  </div>
                )}
              </DropZone.FileMeta>
              {file.status !== "failed" ? (
                <DropZone.FileProgress value={file.progress}>
                  <DropZone.FileProgressTrack>
                    <DropZone.FileProgressFill />
                  </DropZone.FileProgressTrack>
                </DropZone.FileProgress>
              ) : (
                <Button
                  className="mt-2 -ml-1"
                  size="sm"
                  variant="danger-soft"
                  onPress={() => onRetry?.(file.id)}
                >
                  Try again
                </Button>
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
    id: "annual-report",
    name: "Annual report 2025.pdf",
    progress: 100,
    size: 2.2 * 1024 * 1024,
    status: "complete",
  },
  {
    id: "hero-banner",
    name: "Hero banner.png",
    progress: 42,
    size: 480 * 1024,
    status: "uploading",
  },
  {
    id: "onboarding-flow",
    name: "Onboarding flow.mp4",
    progress: 0,
    size: 8 * 1024 * 1024,
    status: "failed",
  },
];

export const DemoWithFileListExample = function Demo() {
  const [files, setFiles] = useState(initialFiles);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setFiles((current) =>
        current.map((file) => {
          if (file.status !== "uploading") return file;
          const progress = Math.min(file.progress + 5, 100);
          return {
            ...file,
            progress,
            status: progress === 100 ? "complete" : "uploading",
          };
        }),
      );
    }, 200);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <DropZone className="w-[480px]">
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Upload project assets</DropZone.Label>
        <DropZone.Description>Documents, images, or videos up to 10 MB each.</DropZone.Description>
        <DropZone.Trigger>Add Files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input multiple />
      <FileList
        files={files}
        onRemove={(id) => setFiles((all) => all.filter((file) => file.id !== id))}
        onRetry={(id) =>
          setFiles((all) =>
            all.map((file) =>
              file.id === id ? { ...file, progress: 0, status: "uploading" } : file,
            ),
          )
        }
      />
    </DropZone>
  );
};
