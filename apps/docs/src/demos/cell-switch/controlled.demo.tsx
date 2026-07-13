"use client";

// @demo-title Controlled
import { useState } from "react";

import { CellSwitch } from "@thenamespace/uikit";

function SwitchContents({ label }: { label: string }) {
  return (
    <CellSwitch.Trigger>
      <CellSwitch.Label>{label}</CellSwitch.Label>
      <CellSwitch.Control />
    </CellSwitch.Trigger>
  );
}

export const DemoControlledExample = function Demo() {
  const [selected, setSelected] = useState(true);
  return (
    <div className="flex w-[252px] flex-col gap-2">
      <CellSwitch
        aria-label="Animations"
        isSelected={selected}
        onChange={setSelected}
      >
        <SwitchContents label="Animations" />
      </CellSwitch>
      <p className="text-muted px-1 text-sm">
        Animations: {selected ? "On" : "Off"}
      </p>
    </div>
  );
};
