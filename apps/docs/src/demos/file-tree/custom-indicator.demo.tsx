// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Custom Indicator
import { FileTree, type FileTreeItemRenderProps } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

const FolderIcon = ({ isExpanded }: FileTreeItemRenderProps) => (
  <Icon icon={isExpanded ? "lucide:folder-open" : "lucide:folder"} />
);

const FileIcon = () => <Icon icon="lucide:file-code-2" />;

export const DemoCustomIndicatorExample = () => (
  <FileTree
    aria-label="Custom indicator"
    className="w-[300px]"
    defaultExpandedKeys={["src", "components"]}
  >
    <FileTree.Item icon={FolderIcon} id="src" textValue="src" title="src">
      <FileTree.Indicator>
        <Icon icon="heroicons:play-16-solid" />
      </FileTree.Indicator>
      <FileTree.Item
        icon={FolderIcon}
        id="components"
        textValue="components"
        title="components"
      >
        <FileTree.Indicator>
          <Icon icon="heroicons:play-16-solid" />
        </FileTree.Indicator>
        <FileTree.Item
          icon={<FileIcon />}
          id="button"
          textValue="button.tsx"
          title="button.tsx"
        />
        <FileTree.Item
          icon={<FileIcon />}
          id="card"
          textValue="card.tsx"
          title="card.tsx"
        />
      </FileTree.Item>
      <FileTree.Item
        icon={<FileIcon />}
        id="index"
        textValue="index.ts"
        title="index.ts"
      />
    </FileTree.Item>
    <FileTree.Item
      icon={<Icon icon="lucide:braces" />}
      id="pkg"
      textValue="package.json"
      title="package.json"
    />
    <FileTree.Item
      icon={<Icon icon="lucide:file-text" />}
      id="readme"
      textValue="README.md"
      title="README.md"
    />
  </FileTree>
);
