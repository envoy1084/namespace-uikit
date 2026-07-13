"use client";

import type { Key } from "@thenamespace/uikit";

import { useState } from "react";

import {
  Autocomplete,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Description,
  EmptyState,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@thenamespace/uikit";

export function UserSelection() {
  const users = [
    {
      avatarUrl: "/assets/avatars/blue.jpg",
      email: "bob@namespace.ninja",
      fallback: "B",
      id: "1",
      name: "Bob",
    },
    {
      avatarUrl: "/assets/avatars/green.jpg",
      email: "fred@namespace.ninja",
      fallback: "F",
      id: "2",
      name: "Fred",
    },
    {
      avatarUrl: "/assets/avatars/purple.jpg",
      email: "martha@namespace.ninja",
      fallback: "M",
      id: "3",
      name: "Martha",
    },
    {
      avatarUrl: "/assets/avatars/red.jpg",
      email: "john@namespace.ninja",
      fallback: "J",
      id: "4",
      name: "John",
    },
    {
      avatarUrl: "/assets/avatars/orange.jpg",
      email: "jane@namespace.ninja",
      fallback: "J",
      id: "5",
      name: "Jane",
    },
  ];

  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <Autocomplete
      className="w-[256px]"
      placeholder="Select a user"
      selectionMode="single"
      value={selectedKey}
      onChange={setSelectedKey}
    >
      <Label>User</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value>
          {({ defaultChildren, isPlaceholder, state }) => {
            if (isPlaceholder || state.selectedItems.length === 0) {
              return defaultChildren;
            }

            const selectedItems = state.selectedItems;

            if (selectedItems.length > 1) {
              return `${selectedItems.length} users selected`;
            }

            const selectedItem = users.find(
              (user) => user.id === selectedItems[0]?.key,
            );

            if (!selectedItem) {
              return defaultChildren;
            }

            return (
              <div className="flex items-center gap-2">
                <Avatar className="size-4" size="sm">
                  <AvatarImage src={selectedItem.avatarUrl} />
                  <AvatarFallback>{selectedItem.fallback}</AvatarFallback>
                </Avatar>
                <span>{selectedItem.name}</span>
              </div>
            );
          }}
        </Autocomplete.Value>
        <Autocomplete.ClearButton />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter filter={contains}>
          <SearchField autoFocus name="search" variant="secondary">
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input placeholder="Search users..." />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>
          <ListBox
            renderEmptyState={() => <EmptyState>No results found</EmptyState>}
          >
            {users.map((user) => (
              <ListBox.Item key={user.id} id={user.id} textValue={user.name}>
                <Avatar size="sm">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>{user.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Label>{user.name}</Label>
                  <Description>{user.email}</Description>
                </div>
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
