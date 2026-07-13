"use client";

import { useState } from "react";

import { Heart, HeartFill } from "@gravity-ui/icons";
import { ToggleButton } from "@thenamespace/uikit";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
        {({ isSelected: selected }) => (
          <>
            {selected ? <HeartFill /> : <Heart />}
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
