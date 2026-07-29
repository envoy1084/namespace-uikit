"use client";

// @demo-title Disabled
import { ListView } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

const disabledFiles = [
  { icon: "folder", id: "1", name: "Documents" },
  { icon: "file", id: "2", name: "Budget.xlsx" },
  { icon: "file", id: "3", locked: true, name: "Archived.zip" },
  { icon: "folder", id: "4", name: "Photos" },
  { icon: "file", id: "5", locked: true, name: "Old backup.tar" },
  { icon: "file", id: "6", name: "README.md" },
];

function DisabledItemsDemo() {
  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Files"
        disabledKeys={disabledFiles.filter((item) => item.locked).map((item) => item.id)}
        items={disabledFiles}
        selectionMode="multiple"
      >
        {(item) => (
          <ListView.Item id={item.id} textValue={item.name}>
            <ListView.ItemContent>
              <Icon icon={item.icon === "folder" ? "lucide:folder" : "lucide:file"} />
              <div className="flex min-w-0 flex-col">
                <ListView.Title>{item.name}</ListView.Title>
              </div>
            </ListView.ItemContent>
            {item.locked ? (
              <ListView.ItemAction>
                <Icon className="text-muted size-3.5" icon="lucide:lock" />
              </ListView.ItemAction>
            ) : null}
          </ListView.Item>
        )}
      </ListView>
    </div>
  );
}

export const DemoDisabledExample = () => <DisabledItemsDemo />;
