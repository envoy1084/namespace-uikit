"use client";

// @demo-title PR File Review
import { useMemo, useState } from "react";

import {
  FileTree,
  useFileTree,
  type FileTreeItemRenderProps,
} from "@thenamespace/uikit";
import { Collection } from "react-aria-components";

import { Icon } from "@/demos/icon";

const FolderIcon = ({ isExpanded }: FileTreeItemRenderProps) => (
  <Icon icon={isExpanded ? "lucide:folder-open" : "lucide:folder"} />
);

const FileIcon = () => <Icon icon="lucide:file-code-2" />;

interface ReviewNode {
  children?: ReviewNode[];
  ext?: string;
  id: string;
  name: string;
}

const reviewTree: ReviewNode[] = [
  {
    id: "apps",
    name: "apps",
    children: [
      {
        id: "api",
        name: "api",
        children: [
          {
            id: "api-src",
            name: "src",
            children: [
              { id: "routes", name: "routes.ts", ext: ".ts" },
              { id: "auth", name: "auth.ts", ext: ".ts" },
              { id: "openapi", name: "openapi.ts", ext: ".ts" },
            ],
          },
        ],
      },
      {
        id: "frontend",
        name: "frontend/src",
        children: [
          { id: "sidebar", name: "dashboard-sidebar.tsx", ext: ".tsx" },
          { id: "editor", name: "team-name-editor.tsx", ext: ".tsx" },
        ],
      },
    ],
  },
  { id: "readme-review", name: "README.md", ext: ".md" },
];

function PRFileReviewDemo() {
  const { expandableKeys, filterTree, leaves } = useFileTree({
    items: reviewTree,
  });
  const extensions = useMemo(
    () =>
      [...new Set(leaves.map((leaf) => leaf.ext).filter(Boolean))] as string[],
    [leaves],
  );
  const [query, setQuery] = useState("");
  const [enabled] = useState(new Set(extensions));
  const filtered = useMemo(
    () =>
      filterTree(
        (node) =>
          (!node.ext || enabled.has(node.ext)) &&
          node.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [enabled, filterTree, query],
  );
  const renderNode = (node: ReviewNode): React.JSX.Element => (
    <FileTree.Item
      icon={node.children ? FolderIcon : <FileIcon />}
      id={node.id}
      textValue={node.name}
      title={node.name}
    >
      {node.children ? (
        <Collection items={node.children}>{renderNode}</Collection>
      ) : null}
    </FileTree.Item>
  );
  return (
    <div className="flex w-[310px] flex-col gap-3">
      <label className="bg-default flex items-center gap-2 rounded-lg px-3 py-2 text-sm">
        <Icon icon="lucide:search" />
        <input
          className="w-full bg-transparent outline-none"
          placeholder="Filter files..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <FileTree
        aria-label="PR changed files"
        defaultExpandedKeys={expandableKeys}
        items={filtered}
        showGuideLines="hover"
      >
        {renderNode}
      </FileTree>
    </div>
  );
}

export const DemoPRFileReviewExample = () => <PRFileReviewDemo />;
