"use client";

import { useMemo, useState } from "react";

import type { Key } from "@thenamespace/uikit";
import { Description, ErrorMessage, Label, Tag, TagGroup } from "@thenamespace/uikit";

export function TagGroupWithErrorMessage() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());

  const isInvalid = useMemo(() => Array.from(selected).length === 0, [selected]);

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={(keys) => setSelected(keys)}
    >
      <Label>Amenities</Label>
      <TagGroup.List>
        <Tag id="laundry">Laundry</Tag>
        <Tag id="fitness">Fitness center</Tag>
        <Tag id="parking">Parking</Tag>
        <Tag id="pool">Swimming pool</Tag>
        <Tag id="breakfast">Breakfast</Tag>
      </TagGroup.List>
      <Description>
        {isInvalid
          ? "Select at least one category"
          : `Selected: ${Array.from(selected).join(", ")}`}
      </Description>
      <ErrorMessage>{Boolean(isInvalid) && <>Please select at least one category</>}</ErrorMessage>
    </TagGroup>
  );
}
