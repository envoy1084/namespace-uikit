"use client";

// @demo-title Reduced Motion
import { FileTree, type FileTreeItemRenderProps } from "@thenamespace/uikit";

import { Icon } from "@/demos/pro-icon";

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

export const ProReducedMotionExample = () => <StaticTree reduceMotion />;
