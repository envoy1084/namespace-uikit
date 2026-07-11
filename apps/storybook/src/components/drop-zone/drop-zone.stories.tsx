import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";

import { Icon } from "@iconify/react";

import { Button } from "../button";
import { Link } from "../link";
import { DropZone, useDropZone } from "./index";

const meta = {
  component: DropZone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/DropZone",
} satisfies Meta<typeof DropZone>;
export default meta;
type Story = StoryObj<typeof meta>;

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
}: {
  files: Upload[];
  onRemove: (id: string) => void;
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
              <DropZone.FileMeta>
                {formatSize(file.size)}
                {file.status === "uploading" ? ` | ${file.progress}%` : null}
                {file.status === "complete" ? " | 100%" : null}
              </DropZone.FileMeta>
              {file.status !== "failed" ? (
                <DropZone.FileProgress value={file.progress}>
                  <DropZone.FileProgressTrack>
                    <DropZone.FileProgressFill />
                  </DropZone.FileProgressTrack>
                </DropZone.FileProgress>
              ) : (
                <DropZone.FileRetryTrigger>Try again</DropZone.FileRetryTrigger>
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
        />
      ) : null}
    </DropZone>
  );
}

export const Default: Story = { render: () => <UploadDemo /> };

const initialFiles: Upload[] = [
  {
    id: "1",
    name: "Annual report 2025.pdf",
    progress: 100,
    size: 2306867,
    status: "complete",
  },
  {
    id: "2",
    name: "Hero banner.png",
    progress: 42,
    size: 491520,
    status: "uploading",
  },
  {
    id: "3",
    name: "Onboarding flow.mp4",
    progress: 18,
    size: 8388608,
    status: "failed",
  },
];

export const WithFileList: Story = {
  render: function Demo() {
    const [files, setFiles] = useState(initialFiles);
    return (
      <DropZone className="w-[480px]">
        <DropZone.Area>
          <DropZone.Icon />
          <DropZone.Label>Upload project assets</DropZone.Label>
          <DropZone.Description>
            Documents, images, or videos up to 10 MB each.
          </DropZone.Description>
          <DropZone.Trigger>Add Files</DropZone.Trigger>
        </DropZone.Area>
        <DropZone.Input multiple />
        <FileList
          files={files}
          onRemove={(id) =>
            setFiles((all) => all.filter((file) => file.id !== id))
          }
        />
      </DropZone>
    );
  },
};

export const ImageOnly: Story = {
  render: () => (
    <DropZone className="w-[420px]">
      <DropZone.Area
        getDropOperation={(types) =>
          [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
          ].some((type) => types.has(type))
            ? "copy"
            : "cancel"
        }
      >
        <DropZone.Icon>
          <Icon icon="solar:gallery-outline" />
        </DropZone.Icon>
        <DropZone.Label>Drop your images here</DropZone.Label>
        <DropZone.Description>
          Accepts PNG, JPG, GIF, WebP, and SVG.
        </DropZone.Description>
        <DropZone.Trigger>Select Images</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept="image/*" />
    </DropZone>
  ),
};

export const MaxSizeLimit: Story = {
  render: function Demo() {
    const [error, setError] = useState<string | null>(null);
    return (
      <DropZone className="w-[420px]">
        <DropZone.Area>
          <DropZone.Icon />
          <DropZone.Label>Attach files (5 MB limit per file)</DropZone.Label>
          <DropZone.Description>
            Any file type accepted. Files over 5 MB will be rejected.
          </DropZone.Description>
          <DropZone.Trigger>Select Files</DropZone.Trigger>
        </DropZone.Area>
        <DropZone.Input
          multiple
          onSelect={(files) => {
            const rejected = Array.from(files).filter(
              (file) => file.size > 5 * 1024 * 1024,
            );
            setError(
              rejected.length
                ? `Rejected (over 5 MB): ${rejected.map((file) => file.name).join(", ")}`
                : null,
            );
          }}
        />
        {error ? <p className="text-danger m-0 text-[13px]">{error}</p> : null}
      </DropZone>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DropZone className="w-[420px]">
      <DropZone.Area isDisabled>
        <DropZone.Icon />
        <DropZone.Label>File upload unavailable</DropZone.Label>
        <DropZone.Description>
          Uploads are temporarily disabled.
        </DropZone.Description>
        <DropZone.Trigger isDisabled>Select File</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
    </DropZone>
  ),
};

export const MultipleFiles: Story = {
  render: () => <UploadDemo multiple label="Add multiple attachments" />,
};

export const CompactFileList: Story = {
  render: function Demo() {
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
  },
};

export const CustomIcon: Story = {
  render: () => (
    <DropZone className="w-[420px]">
      <DropZone.Area>
        <DropZone.Icon>
          <Icon icon="solar:gallery-outline" />
        </DropZone.Icon>
        <DropZone.Label>Set your profile photo</DropZone.Label>
        <DropZone.Description>
          PNG or JPG under 2 MB. Best at 400 x 400 px.
        </DropZone.Description>
        <DropZone.Trigger>Pick Image</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input accept="image/png,image/jpeg" />
    </DropZone>
  ),
};

function CustomButtons() {
  const { openFilePicker } = useDropZone();
  return (
    <>
      <Button className="mt-2" onPress={openFilePicker}>
        Upload Files
      </Button>
      <Link className="mt-1 cursor-pointer text-sm" onPress={openFilePicker}>
        Browse from your device
      </Link>
    </>
  );
}

export const CustomTriggers: Story = {
  render: () => (
    <DropZone className="w-[480px]">
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Drag files here to get started</DropZone.Label>
        <DropZone.Description>
          PDF, DOCX, or TXT up to 25 MB.
        </DropZone.Description>
        <CustomButtons />
      </DropZone.Area>
      <DropZone.Input multiple />
    </DropZone>
  ),
};
