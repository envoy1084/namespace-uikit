"use client";

import type { ActiveProfileRecord } from "#/components/name-profile-editor/editor/record-field";
import type {
  NameProfileEditorCategory,
  NameProfileEditorRecordDefinition,
  NameProfileEditorUploadHandlers,
} from "#/components/name-profile-editor/editor/types";
import type { NameProfileFormValues } from "#/components/name-profile-editor/types";

import { useMemo, useRef, useState } from "react";

import { Button, SearchField, Surface, Typography } from "@thenamespace/uikit";
import { ArrowRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

import {
  nameProfileEditorCatalog,
  nameProfileEditorCategories,
} from "#/components/name-profile-editor/editor/catalog";
import { ProfileMedia } from "#/components/name-profile-editor/editor/profile-media";
import { RecordSection } from "#/components/name-profile-editor/editor/record-section";
import { RecordSidebar } from "#/components/name-profile-editor/editor/record-sidebar";

const mediaKeys = new Set(["avatar", "header"]);

function findDefinition(
  kind: "address" | "text",
  key: string,
): NameProfileEditorRecordDefinition | undefined {
  return nameProfileEditorCatalog.find(
    (record) =>
      record.kind === kind &&
      (kind === "text" ? record.key === key : record.coinType === key),
  );
}

function getContenthashDefinition(
  value: string,
  selectedId: string | null,
): NameProfileEditorRecordDefinition | undefined {
  const codec = value.match(/^([a-z0-9]+):\/\//i)?.[1]?.toLowerCase();
  const id = codec ? `contenthash:${codec}` : selectedId;
  return nameProfileEditorCatalog.find((record) => record.id === id);
}

export function NameProfileEditorForm({
  upload,
}: {
  upload?: NameProfileEditorUploadHandlers;
}) {
  const { control, formState, getValues, setValue } =
    useFormContext<NameProfileFormValues>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<
    Record<NameProfileEditorCategory, HTMLElement | null>
  >({
    addresses: null,
    general: null,
    social: null,
    website: null,
  });
  const [activeCategory, setActiveCategory] =
    useState<NameProfileEditorCategory>("general");
  const [enabledScalars, setEnabledScalars] = useState(
    () =>
      new Set(
        [
          getValues("name").length > 0 ? "name" : "",
          getValues("pubkey.x").length > 0 ? "pubkey" : "",
        ].filter(Boolean),
      ),
  );
  const [selectedContenthashId, setSelectedContenthashId] = useState<
    string | null
  >(() => {
    const codec = getValues("contenthash").match(/^([a-z0-9]+):\/\//i)?.[1];
    return codec ? `contenthash:${codec.toLowerCase()}` : null;
  });
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
      const known = findDefinition("text", key);
      const definition =
        known ??
        ({
          category: "general",
          description: key
            ? `Custom text record: ${key}`
            : "Arbitrary ENS text record.",
          icon: "question",
          id: "custom-text",
          key,
          kind: "text",
          label: key || "Custom",
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
      const definition =
        findDefinition("address", coinType) ??
        ({
          category: "addresses",
          coinType,
          description: `Address record for coin type ${coinType}.`,
          hidden: true,
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

    const contenthash = values.contenthash ?? "";
    if (contenthash.length > 0 || selectedContenthashId !== null) {
      const definition = getContenthashDefinition(
        contenthash,
        selectedContenthashId,
      );
      if (definition) records.push({ definition, id: "contenthash" });
    }

    for (const id of ["name", "pubkey"]) {
      if (!enabledScalars.has(id)) continue;
      const definition = nameProfileEditorCatalog.find(
        (record) => record.id === id,
      );
      if (definition) records.push({ definition, id });
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
    selectedContenthashId,
    textArray.fields,
    values,
  ]);

  const addRecord = (record: NameProfileEditorRecordDefinition) => {
    if (record.kind === "text") {
      textArray.append({ key: record.key ?? "", value: "" });
    } else if (record.kind === "address") {
      addressArray.append({ coinType: record.coinType ?? "", value: "" });
    } else if (record.kind === "contenthash") {
      setSelectedContenthashId(record.id);
      setValue("contenthash", `${record.contenthashCodec ?? "ipfs"}://`, {
        shouldDirty: true,
      });
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
    } else if (record.definition.kind === "contenthash") {
      setValue("contenthash", "", { shouldDirty: true });
      setSelectedContenthashId(null);
    } else {
      if (record.definition.kind === "pubkey") {
        setValue("pubkey", { x: "", y: "" }, { shouldDirty: true });
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

  const selectCategory = (category: NameProfileEditorCategory) => {
    setActiveCategory(category);
    const container = scrollRef.current;
    const section = sectionRefs.current[category];
    if (container && section) {
      container.scrollTo({
        behavior: "smooth",
        top: section.offsetTop - container.offsetTop,
      });
    }
  };

  const avatar =
    values.text?.find((record) => record.key === "avatar")?.value ?? "";
  const header =
    values.text?.find((record) => record.key === "header")?.value ?? "";
  const queryValue = query.trim().toLowerCase();
  const visibleSections = nameProfileEditorCategories.filter((category) =>
    nameProfileEditorCatalog.some(
      (record) =>
        record.category === category.id &&
        (queryValue.length === 0 ||
          [record.label, record.description, record.key].some((value) =>
            value?.toLowerCase().includes(queryValue),
          )),
    ),
  );

  return (
    <Surface className="bg-default @container w-full overflow-hidden rounded-[2rem] p-0">
      <ProfileMedia
        avatar={avatar}
        header={header}
        {...(upload === undefined ? {} : { upload })}
        onAvatarChange={(value) => updateMedia("avatar", value)}
        onHeaderChange={(value) => updateMedia("header", value)}
      />

      <div className="bg-background mx-3 mt-8 mb-3 h-[29rem] rounded-[1.8rem] p-4 @min-[800px]:mx-6 @min-[800px]:mt-20 @min-[800px]:mb-6 @min-[800px]:h-[800px] @min-[800px]:p-7">
        <SearchField
          fullWidth
          aria-label="Search profile records"
          value={query}
          onChange={setQuery}
        >
          <SearchField.Group className="border-default bg-background h-14 w-full rounded-xl border px-4 @min-[800px]:h-20 @min-[800px]:rounded-2xl @min-[800px]:px-5">
            <SearchField.SearchIcon className="text-muted size-6 @min-[800px]:size-8" />
            <SearchField.Input
              className="text-base @min-[800px]:text-xl"
              placeholder="Search"
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>

        <div className="mt-5 flex h-[21.5rem] flex-col gap-4 @min-[400px]:flex-row @min-[800px]:mt-6 @min-[800px]:h-[650px]">
          <RecordSidebar
            activeCategory={activeCategory}
            onChange={selectCategory}
          />
          <div
            ref={scrollRef}
            className="min-h-0 min-w-0 flex-1 [scrollbar-width:thin] [scrollbar-color:#111827_transparent] space-y-7 overflow-y-scroll pr-3"
            onScroll={(event) => {
              const top = event.currentTarget.scrollTop + 24;
              for (const category of nameProfileEditorCategories) {
                const section = sectionRefs.current[category.id];
                if (
                  section &&
                  section.offsetTop - event.currentTarget.offsetTop <= top
                ) {
                  setActiveCategory(category.id);
                }
              }
            }}
          >
            {visibleSections.map((category) => (
              <RecordSection
                key={category.id}
                activeRecords={activeRecords}
                category={category.id}
                definitions={nameProfileEditorCatalog.filter(
                  (record) => record.category === category.id,
                )}
                label={category.label}
                query={query}
                sectionRef={(element) => {
                  sectionRefs.current[category.id] = element;
                }}
                onAdd={addRecord}
                onRemove={removeRecord}
              />
            ))}

            {visibleSections.length === 0 && (
              <Typography.Paragraph
                className="py-20 text-center"
                color="muted"
                size="sm"
              >
                No records match your search.
              </Typography.Paragraph>
            )}

            <div className="pt-4">
              {formState.errors.root?.message && (
                <Typography.Paragraph
                  className="text-danger mx-auto mb-3 text-center"
                  size="xs"
                >
                  {formState.errors.root.message}
                </Typography.Paragraph>
              )}
              <Button
                className="w-full"
                isDisabled={!formState.isDirty || !formState.isValid}
                type="submit"
              >
                Review changes
                <HugeiconsIcon icon={ArrowRight01Icon} size={17} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
