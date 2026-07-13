import type { Meta, StoryObj } from "@storybook/react";

import { useMemo, useState } from "react";

import { useTreeData } from "@react-stately/data";
import { Collection, type Selection } from "react-aria-components";

import { Icon } from "@/icon";

import {
  FileTree,
  useFileTree,
  useFileTreeDrag,
  type FileTreeItemRenderProps,
} from "./index";

const meta = {
  component: FileTree,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/Collections/FileTree",
} satisfies Meta<typeof FileTree>;
export default meta;
type Story = StoryObj<typeof meta>;

const FolderIcon = ({ isExpanded }: FileTreeItemRenderProps) => (
  <Icon icon={isExpanded ? "lucide:folder-open" : "lucide:folder"} />
);
const FileIcon = () => <Icon icon="lucide:file-code-2" />;
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

function StaticTree({
  className = "w-[300px]",
  icons = false,
  reduceMotion,
  showGuideLines,
  size,
}: {
  className?: string;
  icons?: boolean;
  reduceMotion?: boolean;
  showGuideLines?: boolean | "hover";
  size?: "lg" | "md" | "sm";
}) {
  const renderNode = (node: ProjectNode): React.JSX.Element => (
    <FileTree.Item
      icon={icons ? node.children ? FolderIcon : <FileIcon /> : undefined}
      id={node.id}
      key={node.id}
      textValue={node.name}
      title={node.name}
    >
      {node.children?.map(renderNode)}
    </FileTree.Item>
  );
  return (
    <FileTree
      aria-label="Project structure"
      className={className}
      defaultExpandedKeys={["src", "components", "utils"]}
      reduceMotion={reduceMotion}
      showGuideLines={showGuideLines}
      size={size}
    >
      {project.map(renderNode)}
    </FileTree>
  );
}

export const Default: Story = { render: () => <StaticTree /> };
export const WithIcons: Story = { render: () => <StaticTree icons /> };

function MultipleSelectionDemo() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  return (
    <div className="flex flex-col items-center gap-4">
      <FileTree
        aria-label="Selectable file tree"
        className="w-[280px]"
        defaultExpandedKeys={["src", "components"]}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={setSelectedKeys}
      >
        <FileTree.Item id="src" textValue="src" title="src">
          <FileTree.Item
            id="components"
            textValue="components"
            title="components"
          >
            <FileTree.Item
              id="button"
              textValue="button.tsx"
              title="button.tsx"
            />
            <FileTree.Item id="card" textValue="card.tsx" title="card.tsx" />
            <FileTree.Item id="modal" textValue="modal.tsx" title="modal.tsx" />
          </FileTree.Item>
          <FileTree.Item id="utils" textValue="utils" title="utils">
            <FileTree.Item
              id="helpers"
              textValue="helpers.ts"
              title="helpers.ts"
            />
          </FileTree.Item>
        </FileTree.Item>
        <FileTree.Item id="readme" textValue="README.md" title="README.md" />
      </FileTree>
      <p className="text-muted text-sm">
        Selected:{" "}
        {selectedKeys === "all"
          ? "all"
          : [...selectedKeys].join(", ") || "none"}
      </p>
    </div>
  );
}
export const MultipleSelection: Story = {
  render: () => <MultipleSelectionDemo />,
};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div className="flex flex-col gap-2" key={size}>
          <span className="text-muted text-xs">{size}</span>
          <StaticTree className="w-[260px]" icons size={size} />
        </div>
      ))}
    </div>
  ),
};

const renderDynamicNode = (node: ProjectNode): React.JSX.Element => (
  <FileTree.Item id={node.id} textValue={node.name} title={node.name}>
    {node.children ? (
      <Collection items={node.children}>{renderDynamicNode}</Collection>
    ) : null}
  </FileTree.Item>
);
function DynamicCollectionDemo() {
  return (
    <FileTree
      aria-label="Dynamic file tree"
      className="max-h-[380px] w-[300px]"
      defaultExpandedKeys={["src", "components", "utils"]}
      items={project}
    >
      {renderDynamicNode}
    </FileTree>
  );
}
export const DynamicCollection: Story = {
  render: () => <DynamicCollectionDemo />,
};
export const CustomIndicator: Story = {
  render: () => (
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
  ),
};
export const GuideLines: Story = {
  render: () => (
    <div className="flex items-start gap-6">
      {([true, "hover", false] as const).map((value) => (
        <div className="flex flex-col gap-2" key={String(value)}>
          <span className="text-muted text-xs">
            {value === true ? "always" : value === false ? "none" : "hover"}
          </span>
          <StaticTree className="w-[260px]" icons showGuideLines={value} />
        </div>
      ))}
    </div>
  ),
};

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
export const PRFileReview: Story = {
  name: "PR File Review",
  render: () => <PRFileReviewDemo />,
};
export const ReducedMotion: Story = {
  render: () => <StaticTree reduceMotion />,
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
        textValue="thenamespace/uikit"
        title={
          <span className="inline-flex w-full justify-between">
            <span>thenamespace/uikit</span>
            <span className="text-muted text-xs">1664 included</span>
          </span>
        }
      >
        {nodes.map(renderNode)}
      </FileTree.Item>
    </FileTree>
  );
}
export const WithCheckboxes: Story = { render: () => <WithCheckboxesDemo /> };

function DragAndDropDemo() {
  const tree = useTreeData({ initialItems: project });
  const { dragAndDropHooks } = useFileTreeDrag({ tree });
  const renderNode = (node: (typeof tree.items)[number]): React.JSX.Element => {
    const hasChildren = Boolean(node.children?.length);
    return (
      <FileTree.Item
        icon={hasChildren ? FolderIcon : <FileIcon />}
        id={node.key}
        textValue={node.value.name}
        title={node.value.name}
      >
        {hasChildren ? (
          <Collection items={node.children}>{renderNode}</Collection>
        ) : null}
      </FileTree.Item>
    );
  };
  return (
    <FileTree
      aria-label="Draggable file tree"
      className="w-[300px]"
      defaultExpandedKeys={["src", "components", "utils"]}
      dragAndDropHooks={dragAndDropHooks}
      items={tree.items}
      renderEmptyState={() => <div>No files</div>}
      selectionMode="multiple"
    >
      {renderNode}
    </FileTree>
  );
}
export const DragAndDrop: Story = {
  name: "Drag And Drop",
  render: () => <DragAndDropDemo />,
};
