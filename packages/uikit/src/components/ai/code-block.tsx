"use client";

import type { ComponentPropsWithRef, ReactElement, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { Button, cn } from "@heroui/react";
import { codeToHtml } from "shiki";

const Context = createContext(true);
const part = (base: string, className: unknown): string =>
  cn(base, typeof className === "string" ? className : undefined) ?? base;

export async function highlightCode(
  code: string,
  {
    darkTheme = "github-dark",
    language = "plaintext",
    theme = "github-light",
  }: {
    darkTheme?: string;
    language?: string;
    theme?: string;
  } = {},
): Promise<string> {
  return codeToHtml(code, {
    defaultColor: false,
    lang: language,
    themes: { dark: darkTheme, light: theme },
  });
}
export interface CodeBlockRootProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
}
export function CodeBlockRoot({
  children,
  className,
  ...props
}: CodeBlockRootProps): ReactElement {
  return (
    <Context value>
      <div
        className={part("code-block", className)}
        data-slot="code-block"
        {...props}
      >
        {children}
      </div>
    </Context>
  );
}
export interface CodeBlockHeaderProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
}
export function CodeBlockHeader({
  children,
  className,
  ...props
}: CodeBlockHeaderProps): ReactElement {
  useContext(Context);
  return (
    <div
      className={part("code-block__header", className)}
      data-slot="code-block-header"
      {...props}
    >
      {children}
    </div>
  );
}
export interface CodeBlockCodeProps extends ComponentPropsWithRef<"div"> {
  code: string;
  darkTheme?: string;
  highlightedHtml?: string;
  language?: string;
  showLineNumbers?: boolean;
  theme?: string;
}
export function CodeBlockCode({
  className,
  code,
  darkTheme,
  highlightedHtml,
  language = "plaintext",
  showLineNumbers = false,
  theme,
  ...props
}: CodeBlockCodeProps): ReactElement {
  useContext(Context);
  const light = theme ?? "github-light";
  const dark = darkTheme ?? (theme ? undefined : "github-dark");
  const key = `${language}:${light}:${dark ?? "none"}:${code}`;
  const [highlighted, setHighlighted] = useState<{
    html: string;
    key: string;
  } | null>(highlightedHtml ? { html: highlightedHtml, key } : null);
  useEffect(() => {
    if (highlightedHtml) {
      setHighlighted({ html: highlightedHtml, key });
      return;
    }

    let cancelled = false;
    async function highlight() {
      if (!code) {
        if (!cancelled)
          setHighlighted({ html: "<pre><code></code></pre>", key });
        return;
      }
      try {
        const html = dark
          ? await highlightCode(code, {
              darkTheme: dark,
              language,
              theme: light,
            })
          : await codeToHtml(code, { lang: language, theme: light });
        if (!cancelled) setHighlighted({ html, key });
      } catch {
        if (!cancelled) setHighlighted(null);
      }
    }
    void highlight();
    return () => {
      cancelled = true;
    };
  }, [code, dark, highlightedHtml, key, language, light]);
  const codeClass = part("code-block__code", className);
  return highlighted?.key === key ? (
    <div
      className={codeClass}
      dangerouslySetInnerHTML={{ __html: highlighted.html }}
      data-line-numbers={showLineNumbers || undefined}
      data-slot="code-block-code"
      {...props}
    />
  ) : (
    <div
      className={codeClass}
      data-line-numbers={showLineNumbers || undefined}
      data-slot="code-block-code"
      {...props}
    >
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
const CopyIcon = (): ReactElement => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <rect
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      width="13"
      x="8"
      y="8"
    />
    <path
      d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);
const CheckIcon = (): ReactElement => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path
      d="m5 12 4 4L19 6"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
export interface CodeBlockCopyButtonProps {
  "aria-label"?: string;
  className?: string;
  code: string;
}
export function CodeBlockCopyButton({
  "aria-label": ariaLabel = "Copy code",
  className,
  code,
}: CodeBlockCopyButtonProps): ReactElement {
  useContext(Context);
  const [copied, setCopied] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setCopied(false);
        timeout.current = null;
      }, 2000);
    } catch {
      /* Clipboard permission can be unavailable in embedded previews. */
    }
  };
  return (
    <Button
      isIconOnly
      aria-label={ariaLabel}
      className={part("code-block__copy-button", className)}
      data-copied={copied || undefined}
      data-slot="code-block-copy-button"
      size="sm"
      variant="ghost"
      onPress={copy}
    >
      <span
        className="code-block__copy-button-icon"
        data-slot="code-block-copy-button-icon-motion"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </span>
    </Button>
  );
}
type CodeBlockComponent = typeof CodeBlockRoot & {
  Code: typeof CodeBlockCode;
  CopyButton: typeof CodeBlockCopyButton;
  Header: typeof CodeBlockHeader;
  Root: typeof CodeBlockRoot;
};
export const CodeBlock: CodeBlockComponent = Object.assign(CodeBlockRoot, {
  Code: CodeBlockCode,
  CopyButton: CodeBlockCopyButton,
  Header: CodeBlockHeader,
  Root: CodeBlockRoot,
});
