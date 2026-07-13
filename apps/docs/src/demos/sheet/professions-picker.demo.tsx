"use client";

// @demo-title Professions Picker
import { useMemo, useState } from "react";

import { SmileIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { EmptyState } from "@thenamespace/uikit/empty-state";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { ListBox } from "@thenamespace/uikit/list-box";
import { SearchField } from "@thenamespace/uikit/search-field";
import { ListLayout, Virtualizer } from "react-aria-components/Virtualizer";

import { occupations } from "./occupations";

const snapPoints = ["148px", "355px", 1];

function ProfessionsPickerDemo() {
  const occupationSnapPoints = ["355px", 1];
  const [activeSnapPoint, setActiveSnapPoint] = useState<
    number | string | null
  >(occupationSnapPoints[0]!);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const values = occupations.map((name, id) => ({ id, name }));

    if (!query) return values;

    const normalizedQuery = query.toLowerCase();

    return values.filter((occupation) =>
      occupation.name.toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Sheet
        activeSnapPoint={activeSnapPoint}
        isOpen={isOpen}
        snapPoints={occupationSnapPoints}
        onActiveSnapPointChange={setActiveSnapPoint}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) setQuery("");
        }}
      >
        <Sheet.Trigger>
          <Button variant="secondary">Choose Occupation</Button>
        </Sheet.Trigger>
        <Sheet.Backdrop>
          <Sheet.Content className="mx-auto max-h-[95vh] max-w-[420px]">
            <Sheet.Dialog>
              <Sheet.Handle />
              <Sheet.Body className="flex min-h-0 flex-col gap-0 overflow-hidden p-0">
                <div className="px-4 pt-1 pb-2">
                  <SearchField
                    aria-label="Search occupations"
                    value={query}
                    variant="secondary"
                    onChange={setQuery}
                  >
                    <SearchField.Group>
                      <SearchField.SearchIcon />
                      <SearchField.Input placeholder="Search" />
                      <SearchField.ClearButton />
                    </SearchField.Group>
                  </SearchField>
                </div>
                {filtered.length === 0 ? (
                  <EmptyState className="flex min-h-32 flex-1 flex-col items-center justify-center gap-2">
                    <HugeiconsIcon
                      aria-hidden
                      className="text-muted size-5"
                      icon={SmileIcon}
                    />
                    <p className="text-muted text-sm">No occupations found.</p>
                  </EmptyState>
                ) : (
                  <Virtualizer
                    layout={ListLayout}
                    layoutOptions={{ padding: 12, rowHeight: 36 }}
                  >
                    <ListBox
                      aria-label="Occupations"
                      className="min-h-0 flex-1 overflow-y-auto p-0"
                      items={filtered}
                      selectionMode="single"
                      onAction={(key) => {
                        const occupation = occupations[Number(key)];

                        if (occupation) {
                          setSelected(occupation);
                          setIsOpen(false);
                        }
                      }}
                    >
                      {(occupation) => (
                        <ListBox.Item
                          id={occupation.id}
                          textValue={occupation.name}
                        >
                          <Label>{occupation.name}</Label>
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </Virtualizer>
                )}
              </Sheet.Body>
            </Sheet.Dialog>
          </Sheet.Content>
        </Sheet.Backdrop>
      </Sheet>
      <p className="text-muted text-sm">
        Selected:{" "}
        <span className="text-foreground font-medium">{selected}</span>
      </p>
    </div>
  );
}

export const DemoProfessionsPickerExample = () => <ProfessionsPickerDemo />;
