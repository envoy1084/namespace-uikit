"use client";

import { useState } from "react";

import { ToggleButton } from "@thenamespace/uikit";
import { FavouriteIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
        {({ isSelected: selected }) => (
          <>
            {selected ? (
              <HugeiconsIcon icon={FavouriteIcon} />
            ) : (
              <HugeiconsIcon icon={FavouriteIcon} />
            )}
            {selected ? "Liked" : "Like"}
          </>
        )}
      </ToggleButton>
      <p className="text-muted text-sm">
        Status:{" "}
        <span className="font-medium">
          {isSelected ? "Selected" : "Not selected"}
        </span>
      </p>
    </div>
  );
}
