// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title With Checkboxes
import { useState } from "react";

import { FileTree, type FileTreeItemRenderProps } from "@thenamespace/uikit";
import { type Selection } from "react-aria-components";

import { Icon } from "@/demos/icon";

const FolderIcon = ({ isExpanded }: FileTreeItemRenderProps) => (
  <Icon icon={isExpanded ? "lucide:folder-open" : "lucide:folder"} />
);

const project = [
  {
    children: [
      {
        children: [
          { id: "button", name: "button.tsx" },
          { id: "card", name: "card.tsx" },
          { id: "modal", name: "modal.tsx" },
        ],
        id: "components",
        name: "components",
      },
      {
        children: [
          { id: "compose", name: "compose.ts" },
          { id: "cn", name: "cn.ts" },
        ],
        id: "utils",
        name: "utils",
      },
      { id: "index", name: "index.ts" },
    ],
    id: "src",
    name: "src",
  },
  { id: "package", name: "package.json" },
  { id: "tsconfig", name: "tsconfig.json" },
  { id: "readme", name: "README.md" },
];

type ProjectNode = (typeof project)[number] & {
  children?: ProjectNode[];
};

interface IncludedNode extends ProjectNode {
  included?: number;
}

function WithCheckboxesDemo() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(["root"]),
  );
  const nodes: IncludedNode[] = [
    { id: "cursor-check", name: ".cursor", included: 5 },
    { id: "github-check", name: ".github" },
    { id: "husky-check", name: ".husky" },
    { id: "vscode-check", name: ".vscode" },
    {
      id: "apps-check",
      name: "apps",
      included: 812,
      children: [
        { id: "api-check", name: "api", included: 104 },
        { id: "campaigns-check", name: "campaigns", included: 23 },
        {
          id: "docs-check",
          name: "docs",
          included: 248,
          children: [
            { id: "content-check", name: "content", included: 99 },
            { id: "public-check", name: "public" },
            { id: "scripts-check", name: "scripts" },
            { id: "skills-check", name: "skills" },
            { id: "src-check", name: "src", included: 145 },
          ],
        },
      ],
    },
    { id: "packages-check", name: "packages", included: 416 },
  ];
  const renderNode = (node: IncludedNode): React.JSX.Element => (
    <FileTree.Item
      icon={node.children ? FolderIcon : <Icon icon="lucide:folder" />}
      id={node.id}
      key={node.id}
      textValue={node.name}
      title={
        <span className="inline-flex w-full justify-between">
          <span>{node.name}</span>
          {node.included != null ? (
            <span className="text-muted text-xs">{node.included} included</span>
          ) : null}
        </span>
      }
    >
      {node.children?.map((child) => renderNode(child as IncludedNode))}
    </FileTree.Item>
  );
  return (
    <FileTree
      aria-label="Repository file tree"
      className="w-[460px]"
      defaultExpandedKeys={["root", "apps-check", "docs-check"]}
      selectedKeys={selectedKeys}
      selectionBehavior="toggle"
      selectionMode="multiple"
      onSelectionChange={setSelectedKeys}
    >
      <FileTree.Item
        icon={FolderIcon}
        id="root"
        textValue="namespace-inc/namespace.pro"
        title={
          <span className="inline-flex w-full justify-between">
            <span>namespace-inc/namespace.pro</span>
            <span className="text-muted text-xs">1664 included</span>
          </span>
        }
      >
        {nodes.map(renderNode)}
      </FileTree.Item>
    </FileTree>
  );
}

export const DemoWithCheckboxesExample = () => <WithCheckboxesDemo />;
