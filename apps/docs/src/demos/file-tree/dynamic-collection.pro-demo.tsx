"use client";

// @demo-title Dynamic Collection
import { FileTree } from "@thenamespace/uikit";
import { Collection } from "react-aria-components";

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

export const ProDynamicCollectionExample = () => <DynamicCollectionDemo />;
