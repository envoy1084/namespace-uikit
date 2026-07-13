"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Button,
  CodeBlock,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  Input,
  Label,
  ListBox,
  SearchField,
  Segment,
  Select,
  Sheet,
  Slider,
  TextField,
} from "@thenamespace/uikit";
import { Code2, Moon, RotateCcw, Sun } from "lucide-react";

import { DemoComponents } from "@/components/demo";
import { cn } from "@/utils/cn";

import {
  colorGroups,
  defaultTheme,
  fontOptions,
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
  const saved = JSON.parse(value) as Partial<ThemeConfig>;

  return {
    ...defaultTheme,
    ...saved,
    colors: {
      dark: { ...defaultTheme.colors.dark, ...saved.colors?.dark },
      light: { ...defaultTheme.colors.light, ...saved.colors?.light },
    },
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
    <div className="group grid grid-cols-[1fr_2.5rem_8.5rem] items-center gap-2 py-2">
      <label className="min-w-0" htmlFor={id}>
        <span className="block truncate text-sm font-medium capitalize">
          {token.replaceAll("-", " ")}
        </span>
        <span className="text-muted block truncate font-mono text-[11px]">
          --{token}
        </span>
      </label>
      <ColorPicker
        aria-label={`Choose ${token} color`}
        value={colorInputValue(value)}
        onChange={(color) => onChange(colorToOklch(color.toString("hex")))}
      >
        <ColorPicker.Trigger className="size-10 justify-center p-0">
          <ColorSwatch size="sm" />
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
                <ColorSwatch size="xs" />
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
          className="h-10 px-2 font-mono text-[11px]"
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

function ThemeCodeSheet({
  code,
  isOpen,
  onOpenChange,
}: {
  code: string;
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
  const [mobileView, setMobileView] = useState<"preview" | "tokens">("preview");
  const [query, setQuery] = useState("");
  const [showCode, setShowCode] = useState(false);
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
            onPress={() => {
              setMobileView("preview");
              setShowCode((visible) => !visible);
            }}
          >
            <Code2 className="size-4" />
          </Button>
          <Button
            className="hidden sm:flex"
            variant={showCode ? "primary" : "tertiary"}
            onPress={() => setShowCode((visible) => !visible)}
          >
            <Code2 className="size-4" />
            View CSS
          </Button>
        </div>
      </header>

      <div className="border-border bg-background border-b p-2 lg:hidden">
        <Segment
          aria-label="Theme builder view"
          className="w-full"
          selectedKey={mobileView}
          onSelectionChange={(key) =>
            setMobileView(key as "preview" | "tokens")
          }
        >
          <Segment.Item className="flex-1" id="preview">
            Preview
          </Segment.Item>
          <Segment.Item className="flex-1" id="tokens">
            Customize
          </Segment.Item>
        </Segment>
      </div>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[23rem_minmax(0,1fr)]">
        <aside
          className={cn(
            "border-border bg-background order-2 border-t lg:order-1 lg:block lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:border-t-0 lg:border-r",
            mobileView === "preview" && "hidden",
          )}
        >
          <div className="space-y-7 p-4 md:p-5">
            <section>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold capitalize">
                    {mode} colors
                  </h2>
                  <p className="text-muted text-xs">
                    Changes apply to the {mode} selector.
                  </p>
                </div>
                <span className="bg-default text-muted rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide uppercase">
                  {Object.keys(config.colors[mode]).length} tokens
                </span>
              </div>
              <SearchField
                aria-label="Find a token"
                value={query}
                onChange={setQuery}
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
            </section>

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
                        onChange={(value) => updateColor(token, value)}
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
                onChange={(value) => updateNumber("radius", value)}
              />
              <RangeControl
                label="Field radius"
                value={config.fieldRadius}
                onChange={(value) => updateNumber("fieldRadius", value)}
              />
              <div className="space-y-2">
                <Select
                  aria-label="Font family"
                  className="w-full"
                  selectedKey={
                    fontOptions.some(
                      (option) => option.value === config.fontFamily,
                    )
                      ? config.fontFamily
                      : "custom"
                  }
                  onSelectionChange={(key) => {
                    if (key !== null && key !== "custom") {
                      setConfig((current) => ({
                        ...current,
                        fontFamily: String(key),
                      }));
                    }
                  }}
                >
                  <Label>Font family</Label>
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {fontOptions.map((option) => (
                        <ListBox.Item
                          key={option.label}
                          id={option.value}
                          textValue={option.label}
                        >
                          {option.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                      <ListBox.Item id="custom" textValue="Custom">
                        Custom
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
                <TextField
                  aria-label="CSS font family value"
                  value={config.fontFamily}
                  onChange={(value) =>
                    setConfig((current) => ({
                      ...current,
                      fontFamily: value,
                    }))
                  }
                >
                  <Input className="font-mono text-xs" />
                </TextField>
              </div>
            </section>
          </div>
        </aside>

        <section
          className={cn(
            "bg-surface-secondary relative order-1 min-h-[34rem] overflow-hidden p-3 sm:p-6 lg:order-2 lg:block lg:h-[calc(100dvh-8rem)]",
            mobileView === "tokens" && "hidden",
          )}
        >
          <div
            data-theme={mode}
            style={previewStyles}
            className={cn(
              "bg-background text-foreground border-border h-full min-h-[30rem] overflow-auto rounded-2xl border font-sans shadow-sm",
              mode === "dark" && "dark",
            )}
          >
            <div className="border-border bg-surface/80 sticky top-0 z-10 flex items-center justify-between border-b px-5 py-3 backdrop-blur">
              <div>
                <p className="text-sm font-semibold">Component preview</p>
                <p className="text-muted text-xs">
                  The same live component set used on the home page.
                </p>
              </div>
              <div className="flex gap-1.5">
                <span className="bg-danger size-2.5 rounded-full" />
                <span className="bg-warning size-2.5 rounded-full" />
                <span className="bg-success size-2.5 rounded-full" />
              </div>
            </div>
            <div className="flex min-h-[calc(100%-61px)] justify-center overflow-x-auto px-4 py-10">
              <div className="my-auto">
                <DemoComponents />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ThemeCodeSheet
        code={code}
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
    <Slider
      aria-label={label}
      className="w-full"
      maxValue={2}
      minValue={0}
      step={0.05}
      value={value}
      onChange={(nextValue) => onChange(Number(nextValue))}
    >
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="bg-default rounded-md px-2 py-1 font-mono text-xs">
          {value.toFixed(2)}rem
        </span>
      </div>
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}
