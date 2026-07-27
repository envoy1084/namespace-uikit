"use client";

import type { ActiveProfileRecord } from "#/components/name-profile-editor/editor/record-field";
import type {
  NameProfileEditorCategory,
  NameProfileEditorRecordDefinition,
  NameProfileEditorUploadHandlers,
} from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import { useMemo, useState } from "react";

import { Button, SearchField, Surface, Typography } from "@thenamespace/uikit";
import { ArrowRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import { nameProfileEditorCatalog } from "#/components/name-profile-editor/editor/catalog";
import { ProfileMedia } from "#/components/name-profile-editor/editor/profile-media";
import { RecordField } from "#/components/name-profile-editor/editor/record-field";
import { RecordLibrary } from "#/components/name-profile-editor/editor/record-library";
import { RecordSidebar } from "#/components/name-profile-editor/editor/record-sidebar";

const mediaKeys = new Set(["avatar", "header"]);

function recordMatchesQuery(
  record: NameProfileEditorRecordDefinition,
  query: string,
): boolean {
  const search = query.trim().toLowerCase();
  if (search.length === 0) return true;
  return [record.label, record.description, record.key, record.coinType].some(
    (value) => value?.toLowerCase().includes(search),
  );
}

function getDefinition(
  kind: "address" | "text",
  key: string,
): NameProfileEditorRecordDefinition | undefined {
  return nameProfileEditorCatalog.find(
    (record) =>
      record.kind === kind &&
      (kind === "text" ? record.key === key : record.coinType === key),
  );
}

export function NameProfileEditorForm({
  name,
  upload,
}: {
  name: string;
  upload?: NameProfileEditorUploadHandlers;
}) {
  const { control, formState, getValues, setValue } =
    useFormContext<NameProfileFormValues>();
  const [activeCategory, setActiveCategory] =
    useState<NameProfileEditorCategory>("general");
  const [enabledScalars, setEnabledScalars] = useState(
    () =>
      new Set(
        [
          getValues("contenthash").length > 0 ? "contenthash" : "",
          getValues("name").length > 0 ? "name" : "",
          getValues("pubkey.x").length > 0 ? "pubkey" : "",
        ].filter(Boolean),
      ),
  );
  const [query, setQuery] = useState("");

  const abiArray = useFieldArray({ control, name: "abi" });
  const addressArray = useFieldArray({ control, name: "addresses" });
  const dataArray = useFieldArray({ control, name: "data" });
  const interfaceArray = useFieldArray({ control, name: "interfaces" });
  const textArray = useFieldArray({ control, name: "text" });
  const values = useWatch({ control });

  const activeRecords = useMemo<ActiveProfileRecord[]>(() => {
    const records: ActiveProfileRecord[] = [];

    values.text?.forEach((value, index) => {
      const key = value.key ?? "";
      if (mediaKeys.has(key)) return;
      const known = getDefinition("text", key);
      const definition =
        known ??
        ({
          category: "advanced",
          description: key
            ? `Custom text record: ${key}`
            : "Arbitrary ENS text record.",
          icon: "text",
          id: "custom-text",
          key,
          kind: "text",
          label: key || "Custom text",
          placeholder: "Record value",
        } satisfies NameProfileEditorRecordDefinition);
      records.push({
        definition,
        id: textArray.fields[index]?.id ?? `text-${index}`,
        index,
      });
    });

    values.addresses?.forEach((value, index) => {
      const coinType = value.coinType ?? "";
      const known = getDefinition("address", coinType);
      const definition =
        known ??
        ({
          category: "addresses",
          coinType,
          description: `Address record for coin type ${coinType}.`,
          icon: "eth",
          id: `address:${coinType}`,
          kind: "address",
          label: `Coin type ${coinType}`,
          placeholder: "Address",
        } satisfies NameProfileEditorRecordDefinition);
      records.push({
        definition,
        id: addressArray.fields[index]?.id ?? `address-${index}`,
        index,
      });
    });

    if (enabledScalars.has("contenthash")) {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "contenthash",
      );
      if (definition) records.push({ definition, id: "contenthash" });
    }
    if (enabledScalars.has("name")) {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "name",
      );
      if (definition) records.push({ definition, id: "name" });
    }
    if (enabledScalars.has("pubkey")) {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "pubkey",
      );
      if (definition) records.push({ definition, id: "pubkey" });
    }

    values.data?.forEach((_, index) => {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "data",
      );
      if (definition)
        records.push({
          definition,
          id: dataArray.fields[index]?.id ?? `data-${index}`,
          index,
        });
    });
    values.abi?.forEach((_, index) => {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "abi",
      );
      if (definition)
        records.push({
          definition,
          id: abiArray.fields[index]?.id ?? `abi-${index}`,
          index,
        });
    });
    values.interfaces?.forEach((_, index) => {
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === "interface",
      );
      if (definition)
        records.push({
          definition,
          id: interfaceArray.fields[index]?.id ?? `interface-${index}`,
          index,
        });
    });

    return records;
  }, [
    abiArray.fields,
    addressArray.fields,
    dataArray.fields,
    enabledScalars,
    interfaceArray.fields,
    textArray.fields,
    values,
  ]);

  const counts = useMemo(() => {
    const next: Record<NameProfileEditorCategory, number> = {
      addresses: 0,
      advanced: 0,
      general: 0,
      social: 0,
      website: 0,
    };
    for (const record of activeRecords) next[record.definition.category] += 1;
    return next;
  }, [activeRecords]);

  const visibleRecords = activeRecords.filter(
    (record) =>
      record.definition.category === activeCategory &&
      recordMatchesQuery(record.definition, query),
  );
  const availableRecords = nameProfileEditorCatalog.filter((record) => {
    if (record.category !== activeCategory) return false;
    if (!recordMatchesQuery(record, query)) return false;
    if (["abi", "custom-text", "data", "interface"].includes(record.id)) {
      return true;
    }
    return !activeRecords.some((active) => active.definition.id === record.id);
  });

  const addRecord = (record: NameProfileEditorRecordDefinition) => {
    if (record.kind === "text") {
      textArray.append({ key: record.key ?? "", value: "" });
    } else if (record.kind === "address") {
      addressArray.append({ coinType: record.coinType ?? "", value: "" });
    } else if (record.kind === "data") {
      dataArray.append({ key: "", value: "0x" });
    } else if (record.kind === "abi") {
      abiArray.append({ contentType: "1", value: "0x" });
    } else if (record.kind === "interface") {
      interfaceArray.append({ implementer: "", interfaceId: "" });
    } else {
      setEnabledScalars((current) => new Set(current).add(record.id));
    }
  };

  const removeRecord = (record: ActiveProfileRecord) => {
    const index = record.index;
    if (record.definition.kind === "text" && index !== undefined) {
      textArray.remove(index);
    } else if (record.definition.kind === "address" && index !== undefined) {
      addressArray.remove(index);
    } else if (record.definition.kind === "data" && index !== undefined) {
      dataArray.remove(index);
    } else if (record.definition.kind === "abi" && index !== undefined) {
      abiArray.remove(index);
    } else if (record.definition.kind === "interface" && index !== undefined) {
      interfaceArray.remove(index);
    } else {
      if (record.definition.kind === "pubkey") {
        setValue("pubkey", { x: "", y: "" }, { shouldDirty: true });
      } else if (record.definition.kind === "contenthash") {
        setValue("contenthash", "", { shouldDirty: true });
      } else if (record.definition.kind === "name") {
        setValue("name", "", { shouldDirty: true });
      }
      setEnabledScalars((current) => {
        const next = new Set(current);
        next.delete(record.definition.id);
        return next;
      });
    }
  };

  const updateMedia = (key: "avatar" | "header", value: string) => {
    const index = getValues("text").findIndex((record) => record.key === key);
    if (index >= 0) {
      if (value.length === 0) textArray.remove(index);
      else
        setValue(`text.${index}.value`, value, {
          shouldDirty: true,
          shouldValidate: true,
        });
    } else if (value.length > 0) {
      textArray.append({ key, value });
    }
  };

  const avatar =
    values.text?.find((record) => record.key === "avatar")?.value ?? "";
  const header =
    values.text?.find((record) => record.key === "header")?.value ?? "";

  return (
    <Surface className="border-default overflow-hidden rounded-3xl border">
      <ProfileMedia
        avatar={avatar}
        header={header}
        name={name}
        {...(upload === undefined ? {} : { upload })}
        onAvatarChange={(value) => updateMedia("avatar", value)}
        onHeaderChange={(value) => updateMedia("header", value)}
      />

      <div className="border-default bg-background m-3 rounded-2xl border p-3 sm:m-5 sm:p-5">
        <SearchField
          fullWidth
          aria-label="Search profile records"
          value={query}
          onChange={setQuery}
        >
          <SearchField.Group className="w-full">
            <SearchField.SearchIcon />
            <SearchField.Input placeholder="Search records" />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <div className="mt-5 flex flex-col gap-5 md:flex-row">
          <RecordSidebar
            activeCategory={activeCategory}
            counts={counts}
            onChange={setActiveCategory}
          />
          <div className="min-w-0 flex-1 space-y-5">
            {visibleRecords.length > 0 && (
              <section aria-label="Selected records" className="space-y-3">
                {visibleRecords.map((record) => (
                  <RecordField
                    key={record.id}
                    record={record}
                    onRemove={removeRecord}
                  />
                ))}
              </section>
            )}
            <RecordLibrary records={availableRecords} onAdd={addRecord} />
            {visibleRecords.length === 0 && availableRecords.length === 0 && (
              <Typography.Paragraph
                className="py-12 text-center"
                color="muted"
                size="sm"
              >
                No records match your search.
              </Typography.Paragraph>
            )}
          </div>
        </div>

        {formState.errors.root?.message && (
          <Typography.Paragraph
            className="text-danger mx-auto mt-4 text-center"
            size="xs"
          >
            {formState.errors.root.message}
          </Typography.Paragraph>
        )}
        <Button
          className="mt-6 w-full"
          isDisabled={!formState.isDirty || !formState.isValid}
          type="submit"
        >
          Review changes
          <HugeiconsIcon icon={ArrowRight01Icon} size={17} />
        </Button>
      </div>
    </Surface>
  );
}
