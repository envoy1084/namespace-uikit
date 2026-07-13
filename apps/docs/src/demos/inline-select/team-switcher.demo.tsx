// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Team Switcher
import { useState } from "react";

import { InlineSelect } from "@thenamespace/uikit";
import { Building03Icon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";
import { ListBox } from "@thenamespace/uikit/list-box";

const teams = [
  {
    color: "bg-violet-700",
    id: "northwind-labs",
    letter: "N",
    name: "Northwind Labs",
  },
  { color: "bg-blue-600", id: "acme-corp", letter: "A", name: "Acme Corp" },
  {
    color: "bg-amber-600",
    id: "maple-studio",
    letter: "M",
    name: "Maple Studio",
  },
];

function TeamIcon({ color, letter }: { color: string; letter: string }) {
  return (
    <div
      className={`${color} flex size-5 shrink-0 items-center justify-center rounded`}
    >
      <span className="text-[10px] font-bold text-white">{letter}</span>
    </div>
  );
}

export const DemoTeamSwitcherExample = function Demo() {
  const [value, setValue] = useState("northwind-labs");
  const selected = teams.find((team) => team.id === value) ?? teams[0];
  return (
    <div className="flex items-center gap-2.5">
      <HugeiconsIcon icon={Building03Icon} size={24} />
      <span className="text-border text-lg font-light">/</span>
      <InlineSelect aria-label="Team" value={value} onChange={setValue}>
        <InlineSelect.Trigger className="gap-2">
          <TeamIcon color={selected.color} letter={selected.letter} />
          <span className="text-sm font-medium">{selected.name}</span>
          <InlineSelect.Indicator />
        </InlineSelect.Trigger>
        <InlineSelect.Popover className="w-[200px]">
          <ListBox>
            {teams.map((team) => (
              <ListBox.Item id={team.id} key={team.id} textValue={team.name}>
                <TeamIcon color={team.color} letter={team.letter} />
                {team.name}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            ))}
          </ListBox>
        </InlineSelect.Popover>
      </InlineSelect>
    </div>
  );
};
