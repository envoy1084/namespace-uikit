"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Description,
  FieldError,
  Input,
  InputGroup,
  Label,
  ListBox,
  Popover,
  ScrollShadow,
  TextField,
} from "@thenamespace/uikit";
import { ArrowLeft, ChevronDown, Plus, Trash2, Type } from "lucide-react";

import {
  createThemeFont,
  injectThemeFont,
  isValidFontSource,
  type ThemeFont,
} from "./font-utils";
import { fontOptions } from "./theme-config";

export function FontPicker({
  customFonts,
  font,
  onChange,
  onCustomFontsChange,
}: {
  customFonts: ThemeFont[];
  font: ThemeFont;
  onChange: (font: ThemeFont) => void;
  onCustomFontsChange: (fonts: ThemeFont[]) => void;
}) {
  const [mode, setMode] = useState<"fonts" | "source">("fonts");
  const [isOpen, setOpen] = useState(false);
  const [source, setSource] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fonts = useMemo(() => [...fontOptions, ...customFonts], [customFonts]);

  useEffect(() => {
    const cleanups = fonts.map(injectThemeFont);

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [fonts]);

  function addFont() {
    const normalizedSource = source.trim();

    if (!isValidFontSource(normalizedSource)) {
      setError(
        "Use an HTTPS URL from Google Fonts, Fontshare, CDNFonts, or Fontsource.",
      );
      return;
    }

    const nextFont = createThemeFont(normalizedSource);
    if (!nextFont) {
      setError("The font family could not be detected from this URL.");
      return;
    }

    const existing = customFonts.find(
      (item) => item.source === nextFont.source,
    );
    if (existing) {
      setError(`${existing.label} has already been imported.`);
      return;
    }

    const sameIdCount = customFonts.filter((item) =>
      item.id.startsWith(nextFont.id),
    ).length;
    const uniqueFont = sameIdCount
      ? { ...nextFont, id: `${nextFont.id}-${sameIdCount + 1}` }
      : nextFont;

    onCustomFontsChange([...customFonts, uniqueFont]);
    onChange(uniqueFont);
    setSource("");
    setError(null);
    setMode("fonts");
    setOpen(false);
  }

  function removeFont(item: ThemeFont) {
    const remaining = customFonts.filter((fontItem) => fontItem.id !== item.id);
    onCustomFontsChange(remaining);
    if (font.id === item.id) onChange(fontOptions[0]!);
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          setError(null);
          setMode("fonts");
        }
      }}
    >
      <Popover.Trigger
        aria-label={`Font family: ${font.label}`}
        className="w-full"
      >
        <InputGroup className="w-full cursor-pointer">
          <InputGroup.Prefix>
            <Type className="size-4" />
          </InputGroup.Prefix>
          <InputGroup.Input
            readOnly
            className="min-w-0 grow cursor-pointer"
            value={font.label}
          />
          <InputGroup.Suffix className="ml-auto">
            <ChevronDown className="text-muted size-4" />
          </InputGroup.Suffix>
        </InputGroup>
      </Popover.Trigger>
      <Popover.Content
        className="w-[min(22rem,calc(100vw-2rem))]"
        placement="top"
      >
        <Popover.Dialog className="p-3">
          {mode === "fonts" ? (
            <>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">
                  {customFonts.length ? "All fonts" : "Suggested fonts"}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  onPress={() => setMode("source")}
                >
                  Add source
                  <Plus className="size-4" />
                </Button>
              </div>
              <ScrollShadow hideScrollBar className="max-h-64" size={16}>
                <ListBox
                  disallowEmptySelection
                  aria-label="Font family"
                  className="grid grid-cols-3 gap-2 p-0"
                  layout="grid"
                  selectedKeys={new Set([font.id])}
                  selectionMode="single"
                  onSelectionChange={(keys) => {
                    if (keys === "all") return;
                    const selected = fonts.find((item) => keys.has(item.id));

                    if (!selected) return;
                    onChange(selected);
                    setOpen(false);
                  }}
                >
                  {fonts.map((item) => {
                    const isCustom = customFonts.some(
                      (custom) => custom.id === item.id,
                    );

                    return (
                      <ListBox.Item
                        key={item.id}
                        className="group border-separator data-[hovered=true]:bg-default data-[selected=true]:border-foreground relative flex h-24 flex-col items-center justify-center gap-1 rounded-2xl border"
                        id={item.id}
                        style={{ fontFamily: item.family }}
                        textValue={item.label}
                      >
                        <span className="text-xl font-semibold">Ag</span>
                        <span className="text-muted max-w-20 truncate text-[10px]">
                          {item.label}
                        </span>
                        {isCustom ? (
                          <Button
                            isIconOnly
                            aria-label={`Remove ${item.label}`}
                            className="absolute top-1 right-1 size-6 min-h-0 min-w-0 opacity-0 group-data-[hovered=true]:opacity-100"
                            size="sm"
                            variant="ghost"
                            onPress={() => removeFont(item)}
                          >
                            <Trash2 className="text-danger size-3" />
                          </Button>
                        ) : null}
                      </ListBox.Item>
                    );
                  })}
                </ListBox>
              </ScrollShadow>
            </>
          ) : (
            <div className="space-y-3">
              <Button
                size="sm"
                variant="ghost"
                onPress={() => setMode("fonts")}
              >
                <ArrowLeft className="size-4" />
                Suggested fonts
              </Button>
              <TextField
                isInvalid={Boolean(error)}
                value={source}
                onChange={(value) => {
                  setSource(value);
                  setError(null);
                }}
              >
                <Label>Font source URL</Label>
                <Input placeholder="https://fonts.googleapis.com/css2?family=..." />
                <Description>
                  Supports Google Fonts, Fontshare, CDNFonts, and Fontsource
                  URLs.
                </Description>
                {error ? <FieldError>{error}</FieldError> : null}
              </TextField>
              <Button
                className="w-full"
                isDisabled={!source.trim()}
                variant="secondary"
                onPress={addFont}
              >
                Import font
              </Button>
            </div>
          )}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}
