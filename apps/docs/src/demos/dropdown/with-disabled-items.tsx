"use client";

import {
  Button,
  Description,
  Dropdown,
  Header,
  Kbd,
  Label,
  Separator,
} from "@thenamespace/uikit";
import {
  Menu01Icon,
  PencilEdit01Icon,
  AddSquareIcon,
  Delete02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithDisabledItems() {
  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <HugeiconsIcon icon={Menu01Icon} className="outline-none" />
      </Button>
      <Dropdown.Popover className="min-w-[220px]">
        <Dropdown.Menu
          disabledKeys={["delete-file"]}
          onAction={(key) => console.log(`Selected: ${key}`)}
        >
          <Dropdown.Section>
            <Header>Actions</Header>
            <Dropdown.Item id="new-file" textValue="New file">
              <div className="flex h-8 items-start justify-center pt-px">
                <HugeiconsIcon
                  icon={AddSquareIcon}
                  className="text-muted size-4 shrink-0"
                />
              </div>
              <div className="flex flex-col">
                <Label>New file</Label>
                <Description>Create a new file</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>N</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
            <Dropdown.Item id="edit-file" textValue="Edit file">
              <div className="flex h-8 items-start justify-center pt-px">
                <HugeiconsIcon
                  icon={PencilEdit01Icon}
                  className="text-muted size-4 shrink-0"
                />
              </div>
              <div className="flex flex-col">
                <Label>Edit file</Label>
                <Description>Make changes</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Content>E</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
          <Separator />
          <Dropdown.Section>
            <Header>Danger zone</Header>
            <Dropdown.Item
              id="delete-file"
              textValue="Delete file"
              variant="danger"
            >
              <div className="flex h-8 items-start justify-center pt-px">
                <HugeiconsIcon
                  icon={Delete02Icon}
                  className="text-danger size-4 shrink-0"
                />
              </div>
              <div className="flex flex-col">
                <Label>Delete file</Label>
                <Description>Move to trash</Description>
              </div>
              <Kbd className="ms-auto" slot="keyboard" variant="light">
                <Kbd.Abbr keyValue="command" />
                <Kbd.Abbr keyValue="shift" />
                <Kbd.Content>D</Kbd.Content>
              </Kbd>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
