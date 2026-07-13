"use client";

// @demo-title Editable Cells
import { useState } from "react";

import {
  Cancel01Icon,
  PencilEdit01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { DataGrid, type DataGridColumn } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Chip } from "@thenamespace/uikit/chip";
import { Input } from "@thenamespace/uikit/input";
import { ListBox } from "@thenamespace/uikit/list-box";
import { NumberStepper } from "@thenamespace/uikit/number-stepper";
import { Select } from "@thenamespace/uikit/select";
import { Switch } from "@thenamespace/uikit/switch";
import { TextField } from "@thenamespace/uikit/textfield";

const priorityColor = {
  high: "danger",
  low: "default",
  medium: "warning",
} as const;

type Feature = {
  effort: number;
  enabled: boolean;
  id: string;
  priority: "high" | "low" | "medium";
  title: string;
};

const features: Feature[] = [
  {
    effort: 8,
    enabled: true,
    id: "feat-1",
    priority: "high",
    title: "Dark mode",
  },
  {
    effort: 3,
    enabled: true,
    id: "feat-2",
    priority: "medium",
    title: "CSV export",
  },
  {
    effort: 5,
    enabled: false,
    id: "feat-3",
    priority: "low",
    title: "Keyboard shortcuts",
  },
  {
    effort: 13,
    enabled: true,
    id: "feat-4",
    priority: "high",
    title: "Two-factor auth",
  },
  {
    effort: 8,
    enabled: false,
    id: "feat-5",
    priority: "medium",
    title: "Bulk import",
  },
  {
    effort: 5,
    enabled: true,
    id: "feat-6",
    priority: "high",
    title: "Audit log",
  },
  {
    effort: 3,
    enabled: false,
    id: "feat-7",
    priority: "low",
    title: "Webhooks",
  },
  {
    effort: 8,
    enabled: true,
    id: "feat-8",
    priority: "medium",
    title: "Custom branding",
  },
];

const featurePriorities = [
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
] as const;

function EditableTitle({
  onSave,
  value,
}: {
  onSave: (value: string) => void;
  value: string;
}) {
  const [isEditing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const save = () => {
    if (draft.trim()) onSave(draft.trim());
    setEditing(false);
  };
  const cancel = () => {
    setDraft(value);
    setEditing(false);
  };

  return isEditing ? (
    <div className="flex items-center gap-1">
      <TextField
        autoFocus
        aria-label="Edit title"
        value={draft}
        onChange={setDraft}
        onKeyDown={(event) => {
          if (event.key === "Enter") save();
          if (event.key === "Escape") cancel();
        }}
      >
        <Input className="h-7 w-[180px] text-sm" />
      </TextField>
      <Button
        isIconOnly
        aria-label="Save"
        size="sm"
        variant="ghost"
        onPress={save}
      >
        <HugeiconsIcon className="size-3" icon={Tick02Icon} strokeWidth={2} />
      </Button>
      <Button
        isIconOnly
        aria-label="Cancel"
        size="sm"
        variant="ghost"
        onPress={cancel}
      >
        <HugeiconsIcon className="size-3" icon={Cancel01Icon} strokeWidth={2} />
      </Button>
    </div>
  ) : (
    <div className="group/edit flex items-center gap-1.5">
      <span className="text-sm font-medium">{value}</span>
      <Button
        isIconOnly
        aria-label="Edit title"
        className="opacity-0 group-hover/edit:opacity-100"
        size="sm"
        variant="ghost"
        onPress={() => setEditing(true)}
      >
        <HugeiconsIcon
          className="size-3"
          icon={PencilEdit01Icon}
          strokeWidth={2}
        />
      </Button>
    </div>
  );
}

export const ProEditableCellsExample = function Demo() {
  const [data, setData] = useState(features);
  const update = (id: string, values: Partial<Feature>) =>
    setData((current) =>
      current.map((feature) =>
        feature.id === id ? { ...feature, ...values } : feature,
      ),
    );
  const editableColumns: DataGridColumn<Feature>[] = [
    {
      cell: (feature) => (
        <EditableTitle
          value={feature.title}
          onSave={(title) => update(feature.id, { title })}
        />
      ),
      header: "Feature",
      id: "title",
      isRowHeader: true,
      minWidth: 260,
    },
    {
      accessorKey: "priority",
      cell: (feature) => (
        <Select
          aria-label="Priority"
          selectedKey={feature.priority}
          onSelectionChange={(priority) => {
            if (priority)
              update(feature.id, {
                priority: priority as Feature["priority"],
              });
          }}
        >
          <Select.Trigger>
            <Select.Value>
              <Chip
                color={priorityColor[feature.priority]}
                size="sm"
                variant="soft"
              >
                <Chip.Label className="capitalize">
                  {feature.priority}
                </Chip.Label>
              </Chip>
            </Select.Value>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {featurePriorities.map((priority) => (
                <ListBox.Item
                  id={priority.id}
                  key={priority.id}
                  textValue={priority.label}
                >
                  <Chip
                    color={priorityColor[priority.id]}
                    size="sm"
                    variant="soft"
                  >
                    <Chip.Label>{priority.label}</Chip.Label>
                  </Chip>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      ),
      header: "Priority",
      id: "priority",
      minWidth: 150,
    },
    {
      accessorKey: "effort",
      align: "center",
      cell: (feature) => (
        <NumberStepper
          aria-label="Story points"
          maxValue={21}
          minValue={1}
          size="sm"
          value={feature.effort}
          onChange={(effort) => update(feature.id, { effort })}
        >
          <NumberStepper.Group>
            <NumberStepper.DecrementButton />
            <NumberStepper.Value />
            <NumberStepper.IncrementButton />
          </NumberStepper.Group>
        </NumberStepper>
      ),
      header: "Story Points",
      id: "effort",
      minWidth: 120,
    },
    {
      accessorKey: "enabled",
      align: "center",
      cell: (feature) => (
        <Switch
          aria-label="Enabled"
          isSelected={feature.enabled}
          onChange={(enabled) => update(feature.id, { enabled })}
        >
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch.Content>
        </Switch>
      ),
      header: "Enabled",
      id: "enabled",
      minWidth: 100,
    },
  ];
  const enabled = data.filter((feature) => feature.enabled).length;
  const effort = data.reduce((total, feature) => total + feature.effort, 0);

  return (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold">Feature Flags</h2>
        <p className="text-muted text-sm">
          Edit titles, change priorities, adjust story points, and toggle
          features inline.
        </p>
      </div>
      <DataGrid
        aria-label="Feature flags"
        columns={editableColumns}
        data={data}
        getRowId={(feature) => feature.id}
      />
      <div className="text-muted flex items-center gap-4 text-sm">
        <span>
          {enabled} of {data.length} enabled
        </span>
        <span>Total effort: {effort} pts</span>
      </div>
    </div>
  );
};
