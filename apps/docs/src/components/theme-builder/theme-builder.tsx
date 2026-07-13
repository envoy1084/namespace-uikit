"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Button,
  CellSlider,
  CodeBlock,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  highlightCode,
  Input,
  Label,
  SearchField,
  Segment,
  Sheet,
  TextField,
} from "@thenamespace/uikit";
import { Code2, Moon, RotateCcw, SlidersHorizontal, Sun } from "lucide-react";

import { DemoShowcase } from "@/components/demo-showcase";
import { cn } from "@/utils/cn";

import { FontPicker } from "./font-picker";
import {
  colorGroups,
  defaultTheme,
  type ColorToken,
  type ThemeConfig,
  type ThemeMode,
} from "./theme-config";
import {
  colorInputValue,
  colorToOklch,
  generateThemeCss,
  themeStyles,
} from "./theme-utils";

const storageKey = "namespace-theme-builder";

function restoreConfig(value: string): ThemeConfig {
  const saved = JSON.parse(value) as Partial<ThemeConfig> & {
    fontFamily?: string;
  };

  return {
    ...defaultTheme,
    ...saved,
    colors: {
      dark: { ...defaultTheme.colors.dark, ...saved.colors?.dark },
      light: { ...defaultTheme.colors.light, ...saved.colors?.light },
    },
    customFonts: saved.customFonts ?? [],
    font:
      saved.font ??
      (saved.fontFamily
        ? { ...defaultTheme.font, family: saved.fontFamily }
        : defaultTheme.font),
  };
}

function ColorControl({
  mode,
  token,
  value,
  onChange,
}: {
  mode: ThemeMode;
  token: ColorToken;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `${mode}-${token}`;

  return (
    <div className="space-y-1 py-2">
      <ColorPicker
        aria-label={`Choose ${token} color`}
        value={colorInputValue(value)}
        onChange={(color) => onChange(colorToOklch(color.toString("hex")))}
      >
        <ColorPicker.Trigger className="w-full justify-start gap-2">
          <ColorSwatch className="size-6" size="sm" />
          <Label className="grow capitalize">
            {token.replaceAll("-", " ")}
          </Label>
          <span className="text-muted font-mono text-xs">
            {colorInputValue(value).toUpperCase()}
          </span>
        </ColorPicker.Trigger>
        <ColorPicker.Popover className="w-64 gap-3">
          <ColorArea
            aria-label={`${token} color area`}
            className="max-w-full"
            colorSpace="hsb"
            xChannel="saturation"
            yChannel="brightness"
          >
            <ColorArea.Thumb />
          </ColorArea>
          <ColorSlider
            aria-label={`${token} hue`}
            channel="hue"
            className="px-1"
            colorSpace="hsb"
          >
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
          <ColorField aria-label={`${token} color value`}>
            <ColorField.Group variant="secondary">
              <ColorField.Prefix>
                <ColorSwatch className="size-4" size="xs" />
              </ColorField.Prefix>
              <ColorField.Input />
            </ColorField.Group>
          </ColorField>
        </ColorPicker.Popover>
      </ColorPicker>
      <TextField
        aria-label={`${token} CSS value`}
        value={value}
        onChange={onChange}
      >
        <Input
          id={id}
          className="h-8 px-2 font-mono text-[11px]"
          spellCheck={false}
        />
      </TextField>
    </div>
  );
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}) {
  return (
    <Segment
      aria-label="Preview theme"
      selectedKey={mode}
      size="sm"
      onSelectionChange={(key) => onChange(key as ThemeMode)}
    >
      {(["light", "dark"] as const).map((item) => {
        const Icon = item === "light" ? Sun : Moon;

        return (
          <Segment.Item key={item} className="gap-2 capitalize" id={item}>
            <Icon className="size-3.5" />
            {item}
          </Segment.Item>
        );
      })}
    </Segment>
  );
}

function ThemeControlsSheet({
  config,
  isOpen,
  mode,
  query,
  onColorChange,
  onCustomFontsChange,
  onFontChange,
  onNumberChange,
  onOpenChange,
  onQueryChange,
}: {
  config: ThemeConfig;
  isOpen: boolean;
  mode: ThemeMode;
  query: string;
  onColorChange: (token: ColorToken, value: string) => void;
  onCustomFontsChange: (fonts: ThemeConfig["customFonts"]) => void;
  onFontChange: (font: ThemeConfig["font"]) => void;
  onNumberChange: (key: "radius" | "fieldRadius", value: number) => void;
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
}) {
  return (
    <Sheet isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
      <Sheet.Backdrop variant="blur">
        <Sheet.Content className="w-[min(100vw,26rem)]">
          <Sheet.Dialog className="h-full">
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Customize theme</Sheet.Heading>
              <p className="text-muted text-sm">
                Editing the {mode} theme ·{" "}
                {Object.keys(config.colors[mode]).length} color tokens
              </p>
            </Sheet.Header>
            <Sheet.Body className="min-h-0 space-y-7 overflow-y-auto px-4 pb-6">
              <SearchField
                aria-label="Find a token"
                value={query}
                onChange={onQueryChange}
              >
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input
                    className="min-w-0 flex-1"
                    placeholder="Find a color token…"
                  />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>

              {colorGroups.map((group) => {
                const tokens = group.tokens.filter((token) =>
                  token.includes(query.trim().toLowerCase()),
                );

                if (tokens.length === 0) return null;

                return (
                  <section key={group.label}>
                    <h3 className="text-muted border-border mb-1 border-b pb-2 text-xs font-semibold tracking-wider uppercase">
                      {group.label}
                    </h3>
                    <div className="divide-border divide-y">
                      {tokens.map((token) => (
                        <ColorControl
                          key={token}
                          mode={mode}
                          token={token}
                          value={config.colors[mode][token]}
                          onChange={(value) => onColorChange(token, value)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}

              <section className="space-y-5">
                <h3 className="text-muted border-border border-b pb-2 text-xs font-semibold tracking-wider uppercase">
                  Shape & type
                </h3>
                <RangeControl
                  label="Component radius"
                  value={config.radius}
                  onChange={(value) => onNumberChange("radius", value)}
                />
                <RangeControl
                  label="Field radius"
                  value={config.fieldRadius}
                  onChange={(value) => onNumberChange("fieldRadius", value)}
                />
                <div className="space-y-2">
                  <Label>Font family</Label>
                  <FontPicker
                    customFonts={config.customFonts}
                    font={config.font}
                    onChange={onFontChange}
                    onCustomFontsChange={onCustomFontsChange}
                  />
                </div>
              </section>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

function ThemeCodeSheet({
  code,
  highlightedCode,
  isOpen,
  onOpenChange,
}: {
  code: string;
  highlightedCode?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet isOpen={isOpen} placement="right" onOpenChange={onOpenChange}>
      <Sheet.Backdrop variant="blur">
        <Sheet.Content className="w-[min(100vw,48rem)]">
          <Sheet.Dialog className="h-full">
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Theme CSS</Sheet.Heading>
              <p className="text-muted text-sm">
                Paste this into your globals.css file.
              </p>
            </Sheet.Header>
            <Sheet.Body className="min-h-0 p-3 sm:p-5">
              <CodeBlock className="m-0 min-h-full">
                <CodeBlock.Header>
                  <span className="text-muted font-mono text-xs">
                    globals.css
                  </span>
                  <CodeBlock.CopyButton aria-label="Copy CSS" code={code} />
                </CodeBlock.Header>
                <CodeBlock.Code
                  showLineNumbers
                  className="min-h-0 flex-1 text-xs"
                  code={code}
                  highlightedHtml={highlightedCode}
                  language="css"
                />
              </CodeBlock>
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export function ThemeBuilder() {
  const [config, setConfig] = useState<ThemeConfig>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>("light");
  const [query, setQuery] = useState("");
  const [showCustomize, setShowCustomize] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);

    if (saved) {
      try {
        setConfig(restoreConfig(saved));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(config));
  }, [config, ready]);

  const code = useMemo(() => generateThemeCss(config), [config]);
  const previewStyles = useMemo(
    () => themeStyles(config, mode),
    [config, mode],
  );

  useEffect(() => {
    let cancelled = false;
    setHighlightedCode(undefined);
    async function prepareHighlight() {
      const html = await highlightCode(code, { language: "css" });
      if (!cancelled) setHighlightedCode(html);
    }
    void prepareHighlight();

    return () => {
      cancelled = true;
    };
  }, [code]);

  function updateColor(token: ColorToken, value: string) {
    setConfig((current) => ({
      ...current,
      colors: {
        ...current.colors,
        [mode]: { ...current.colors[mode], [token]: value },
      },
    }));
  }

  function updateNumber(key: "radius" | "fieldRadius", value: number) {
    setConfig((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setConfig(structuredClone(defaultTheme));
    window.localStorage.removeItem(storageKey);
  }

  return (
    <div className="bg-background text-foreground flex min-h-[calc(100dvh-4rem)] flex-col">
      <header className="border-border bg-background/90 sticky top-16 z-20 flex min-h-16 items-center justify-between gap-3 border-b px-4 backdrop-blur-xl md:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">Theme builder</h1>
          <p className="text-muted hidden text-xs sm:block">
            Edit every UIKit token and copy production-ready CSS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ModeSwitch mode={mode} onChange={setMode} />
          <Button
            className="gap-2"
            variant={showCustomize ? "primary" : "secondary"}
            onPress={() => setShowCustomize(true)}
          >
            <SlidersHorizontal className="size-4" />
            <span className="hidden sm:inline">Customize</span>
          </Button>
          <Button
            className="hover:bg-default hidden h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium sm:flex"
            variant="tertiary"
            onPress={reset}
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
          <Button
            isIconOnly
            aria-label="View CSS"
            className="sm:hidden"
            variant={showCode ? "primary" : "tertiary"}
            onPress={() => setShowCode(true)}
          >
            <Code2 className="size-4" />
          </Button>
          <Button
            className="hidden sm:flex"
            variant={showCode ? "primary" : "tertiary"}
            onPress={() => setShowCode(true)}
          >
            <Code2 className="size-4" />
            View CSS
          </Button>
        </div>
      </header>

      <div className="min-h-0 flex-1">
        <section className="bg-surface-secondary relative h-[calc(100dvh-8rem)] min-h-[34rem] overflow-hidden p-3 sm:p-6">
          <div
            data-theme={mode}
            style={previewStyles}
            className={cn(
              "bg-background text-foreground border-border h-full min-h-[30rem] overflow-auto rounded-2xl border font-sans shadow-sm",
              mode === "dark" && "dark",
            )}
          >
            <div className="flex h-full justify-center overflow-y-auto px-3">
              <DemoShowcase
                alwaysShowTabs
                className="h-full max-w-none py-3 lg:py-4"
                showPalette={false}
                theme={mode}
                themeVars={previewStyles}
              />
            </div>
          </div>
        </section>
      </div>
      <ThemeControlsSheet
        config={config}
        isOpen={showCustomize}
        mode={mode}
        query={query}
        onColorChange={updateColor}
        onCustomFontsChange={(customFonts) =>
          setConfig((current) => ({ ...current, customFonts }))
        }
        onFontChange={(font) => setConfig((current) => ({ ...current, font }))}
        onNumberChange={updateNumber}
        onOpenChange={setShowCustomize}
        onQueryChange={setQuery}
      />
      <ThemeCodeSheet
        code={code}
        highlightedCode={highlightedCode}
        isOpen={showCode}
        onOpenChange={setShowCode}
      />
    </div>
  );
}

function RangeControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <CellSlider
      aria-label={label}
      className="w-full"
      formatOptions={{ maximumFractionDigits: 2, minimumFractionDigits: 2 }}
      maxValue={2}
      minValue={0}
      step={0.05}
      value={value}
      onChange={(nextValue) => onChange(Number(nextValue))}
    >
      <CellSlider.Track>
        <CellSlider.Fill />
        <CellSlider.Thumb />
        <CellSlider.Label>{label}</CellSlider.Label>
        <CellSlider.Output>{() => `${value.toFixed(2)}rem`}</CellSlider.Output>
      </CellSlider.Track>
    </CellSlider>
  );
}
