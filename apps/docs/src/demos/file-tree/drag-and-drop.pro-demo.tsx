// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Drag And Drop
import { useTreeData } from "@react-stately/data";
import {
  FileTree,
  useFileTreeDrag,
  type FileTreeItemRenderProps,
} from "@thenamespace/uikit";
import { Collection } from "react-aria-components";

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

export const ProDragAndDropExample = () => <DragAndDropDemo />;
