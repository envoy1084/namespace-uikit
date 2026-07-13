"use client";

import { Check } from "@gravity-ui/icons";
import {
  Avatar,
  Description,
  Label,
  ListBox,
  Surface,
} from "@thenamespace/uikit";

export function CustomCheckIcon() {
  return (
    <Surface className="shadow-surface w-[256px] rounded-3xl">
      <ListBox aria-label="Users" selectionMode="multiple">
        <ListBox.Item id="1" textValue="Bob">
          <Avatar size="sm">
            <Avatar.Image alt="Bob" src="/assets/avatars/blue.jpg" />
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Bob</Label>
            <Description>bob@namespace.ninja</Description>
          </div>
          <ListBox.ItemIndicator>
            {({ isSelected }) =>
              isSelected ? (
                <Check className="text-accent-soft-foreground size-4" />
              ) : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="2" textValue="Fred">
          <Avatar size="sm">
            <Avatar.Image alt="Fred" src="/assets/avatars/green.jpg" />
            <Avatar.Fallback>F</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Fred</Label>
            <Description>fred@namespace.ninja</Description>
          </div>
          <ListBox.ItemIndicator>
            {({ isSelected }) =>
              isSelected ? (
                <Check className="text-accent-soft-foreground size-4" />
              ) : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
        <ListBox.Item id="3" textValue="Martha">
          <Avatar size="sm">
            <Avatar.Image alt="Martha" src="/assets/avatars/purple.jpg" />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <div className="flex flex-col">
            <Label>Martha</Label>
            <Description>martha@namespace.ninja</Description>
          </div>
          <ListBox.ItemIndicator>
            {({ isSelected }) =>
              isSelected ? (
                <Check className="text-accent-soft-foreground size-4" />
              ) : null
            }
          </ListBox.ItemIndicator>
        </ListBox.Item>
      </ListBox>
    </Surface>
  );
}
