"use client";

// @demo-title Disabled
import { ListView } from "@thenamespace/uikit";

import { Icon } from "@/demos/icon";

const files = [
  { icon: "folder", id: "1", name: "Documents", updated: "2 days ago" },
  { icon: "folder", id: "2", name: "Photos", updated: "1 week ago" },
  { icon: "file", id: "3", name: "README.md", updated: "3 hours ago" },
  { icon: "file", id: "4", name: "package.json", updated: "Yesterday" },
  { icon: "folder", id: "5", name: "src", updated: "Just now" },
  { icon: "file", id: "6", name: ".gitignore", updated: "2 weeks ago" },
];

const disabledFiles = [
  { ...files[0], locked: false },
  { ...files[1], locked: false },
  { ...files[2], locked: true },
  { ...files[3], locked: false },
  { ...files[4], locked: true },
  { ...files[5], locked: false },
];

function DisabledItemsDemo() {
  return (
    <div className="w-full max-w-md">
      <ListView
        aria-label="Files"
        disabledKeys={disabledFiles
          .filter((item) => item.locked)
          .map((item) => item.id)}
        items={disabledFiles}
        selectionMode="multiple"
      >
        {(item) => (
          <ListView.Item id={item.id} textValue={item.name}>
            <ListView.ItemContent>
              <Icon
                icon={item.icon === "folder" ? "lucide:folder" : "lucide:file"}
              />
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
