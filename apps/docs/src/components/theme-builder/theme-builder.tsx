"use client";

import type { ChangeEvent } from "react";
import { useEffect, useMemo, useState } from "react";

import {
  Check,
  Code2,
  Copy,
  Moon,
  RotateCcw,
  Search,
  Sun,
  X,
} from "lucide-react";

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
    <div className="group grid grid-cols-[1fr_9rem] items-center gap-3 py-2">
      <label className="min-w-0" htmlFor={id}>
        <span className="block truncate text-sm font-medium capitalize">
          {token.replaceAll("-", " ")}
        </span>
        <span className="text-muted block truncate font-mono text-[11px]">
          --{token}
        </span>
      </label>
      <div className="border-border bg-field-background focus-within:border-focus flex h-9 min-w-0 items-center rounded-[var(--field-radius)] border p-1 transition-colors">
        <input
          aria-label={`Choose ${token} color`}
          className="size-7 shrink-0 cursor-pointer appearance-none overflow-hidden rounded-md border-0 bg-transparent p-0 [&::-moz-color-swatch]:border-0 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-0 [&::-webkit-color-swatch-wrapper]:p-0"
          type="color"
          value={colorInputValue(value)}
          onChange={(event) => onChange(colorToOklch(event.target.value))}
        />
        <input
          id={id}
          spellCheck={false}
          className="text-field-foreground min-w-0 flex-1 bg-transparent px-2 font-mono text-[11px] outline-none"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
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
    <div
      className="bg-default flex rounded-full p-1"
      role="group"
      aria-label="Preview theme"
    >
      {(["light", "dark"] as const).map((item) => {
        const Icon = item === "light" ? Sun : Moon;

        return (
          <button
            key={item}
            aria-pressed={mode === item}
            className={cn(
              "flex h-8 items-center gap-2 rounded-full px-3 text-sm font-medium capitalize transition-colors",
              mode === item
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted hover:text-foreground",
            )}
            type="button"
            onClick={() => onChange(item)}
          >
            <Icon className="size-3.5" />
            {item}
          </button>
        );
      })}
    </div>
  );
}

function CodePanel({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="border-border bg-background absolute inset-0 z-30 flex flex-col border-l lg:inset-y-0 lg:left-auto lg:w-[min(46rem,56%)]">
      <div className="border-border flex h-14 shrink-0 items-center justify-between border-b px-4">
        <div>
          <p className="text-sm font-semibold">globals.css</p>
          <p className="text-muted text-xs">
            Paste this after your UIKit import.
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="hover:bg-default flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium"
            type="button"
            onClick={copy}
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
            {copied ? "Copied" : "Copy CSS"}
          </button>
          <button
            aria-label="Close code panel"
            className="hover:bg-default grid size-9 place-items-center rounded-lg"
            type="button"
            onClick={onClose}
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
      <pre className="bg-surface-secondary min-h-0 flex-1 overflow-auto p-5 text-[12px] leading-6">
        <code className="grid font-mono">
          {code.split("\n").map((line, index) => (
            <span
              key={`${index}-${line}`}
              className="grid grid-cols-[2.5rem_1fr]"
            >
              <span className="text-muted text-right select-none">
                {index + 1}
              </span>
              <span className="pl-4 whitespace-pre">{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function ThemeBuilder() {
  const [config, setConfig] = useState<ThemeConfig>(defaultTheme);
  const [mode, setMode] = useState<ThemeMode>("light");
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

  function updateNumber(
    key: "radius" | "fieldRadius",
    event: ChangeEvent<HTMLInputElement>,
  ) {
    setConfig((current) => ({ ...current, [key]: Number(event.target.value) }));
  }

  function reset() {
    setConfig(structuredClone(defaultTheme));
    window.localStorage.removeItem(storageKey);
  }

  return (
    <main className="bg-background text-foreground flex min-h-[calc(100dvh-4rem)] flex-col">
      <header className="border-border bg-background/90 sticky top-16 z-20 flex min-h-16 items-center justify-between gap-3 border-b px-4 backdrop-blur-xl md:px-6">
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold">Theme builder</h1>
          <p className="text-muted hidden text-xs sm:block">
            Edit every UIKit token and copy production-ready CSS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ModeSwitch mode={mode} onChange={setMode} />
          <button
            className="hover:bg-default hidden h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium sm:flex"
            type="button"
            onClick={reset}
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
          <button
            className={cn(
              "flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium",
              showCode
                ? "bg-accent text-accent-foreground"
                : "bg-default hover:bg-default/80",
            )}
            type="button"
            onClick={() => setShowCode((visible) => !visible)}
          >
            <Code2 className="size-4" />
            <span className="hidden sm:inline">View CSS</span>
          </button>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[23rem_minmax(0,1fr)]">
        <aside className="border-border bg-background order-2 border-t lg:order-1 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:border-t-0 lg:border-r">
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
              <label className="border-border bg-field-background focus-within:border-focus flex h-10 items-center gap-2 rounded-[var(--field-radius)] border px-3">
                <Search className="text-muted size-4" />
                <span className="sr-only">Find a token</span>
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  placeholder="Find a color token…"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </label>
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
                onChange={(event) => updateNumber("radius", event)}
              />
              <RangeControl
                label="Field radius"
                value={config.fieldRadius}
                onChange={(event) => updateNumber("fieldRadius", event)}
              />
              <label className="block space-y-2">
                <span className="text-sm font-medium">Font family</span>
                <select
                  className="border-border bg-field-background focus:border-focus h-10 w-full rounded-[var(--field-radius)] border px-3 text-sm outline-none"
                  value={
                    fontOptions.some(
                      (option) => option.value === config.fontFamily,
                    )
                      ? config.fontFamily
                      : "custom"
                  }
                  onChange={(event) => {
                    if (event.target.value !== "custom") {
                      setConfig((current) => ({
                        ...current,
                        fontFamily: event.target.value,
                      }));
                    }
                  }}
                >
                  {fontOptions.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  <option value="custom">Custom</option>
                </select>
                <input
                  aria-label="CSS font family value"
                  className="border-border bg-field-background focus:border-focus h-10 w-full rounded-[var(--field-radius)] border px-3 font-mono text-xs outline-none"
                  value={config.fontFamily}
                  onChange={(event) =>
                    setConfig((current) => ({
                      ...current,
                      fontFamily: event.target.value,
                    }))
                  }
                />
              </label>
            </section>
          </div>
        </aside>

        <section className="bg-surface-secondary relative order-1 min-h-[34rem] overflow-hidden p-3 sm:p-6 lg:order-2 lg:h-[calc(100dvh-8rem)]">
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
          {showCode && (
            <CodePanel code={code} onClose={() => setShowCode(false)} />
          )}
        </section>
      </div>
    </main>
  );
}

function RangeControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="flex items-center justify-between text-sm font-medium">
        {label}
        <span className="bg-default rounded-md px-2 py-1 font-mono text-xs">
          {value.toFixed(2)}rem
        </span>
      </span>
      <input
        className="accent-accent h-2 w-full cursor-pointer"
        max="2"
        min="0"
        step="0.05"
        type="range"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
