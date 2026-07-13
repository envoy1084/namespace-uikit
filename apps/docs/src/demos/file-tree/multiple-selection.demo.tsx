// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Multiple Selection
import { useState } from "react";

import { FileTree } from "@thenamespace/uikit";
import { type Selection } from "react-aria-components";

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

export const DemoMultipleSelectionExample = () => <MultipleSelectionDemo />;
