"use client";

import type { Key } from "@thenamespace/uikit";

import { useMemo, useState } from "react";

import {
  Description,
  ErrorMessage,
  Label,
  Tag,
  TagGroup,
} from "@thenamespace/uikit";

export function ErrorMessageBasic() {
  const [selected, setSelected] = useState<Iterable<Key>>(new Set());
  const isInvalid = useMemo(
    () => Array.from(selected).length === 0,
    [selected],
  );

  return (
    <TagGroup
      selectedKeys={selected}
      selectionMode="multiple"
      onSelectionChange={(keys) => setSelected(keys)}
    >
      <Label>Required Categories</Label>
      <TagGroup.List>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
      </TagGroup.List>
      <Description>Select at least one category</Description>
      <ErrorMessage>
        {!!isInvalid && <>Please select at least one category</>}
      </ErrorMessage>
    </TagGroup>
  );
}
