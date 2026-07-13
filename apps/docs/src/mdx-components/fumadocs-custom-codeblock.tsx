"use client";

import type { CodeBlockProps } from "fumadocs-ui/components/codeblock";

import type { ComponentProps, RefObject } from "react";
import { useRef } from "react";

import { CodeBlock } from "fumadocs-ui/components/codeblock";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { Check, Copy } from "lucide-react";

import { cn } from "@/utils/cn";

export function FumadocsCustomCodeblock({
  allowCopy = true,
  children,
  code,
  ...props
}: { children: React.ReactNode; code?: string } & CodeBlockProps) {
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <CodeBlock
      {...props}
      allowCopy={allowCopy}
      // fumadocs accepts a ref here even though its public type omits it.
      // @ts-expect-error fumadocs viewport ref type
      viewportProps={{ ref: areaRef }}
      Actions={(actionsProps) => (
        <div
          {...actionsProps}
          className={cn("z-1! empty:hidden", actionsProps.className)}
        >
          {allowCopy ? <CopyButton code={code} containerRef={areaRef} /> : null}
        </div>
      )}
    >
      {children}
    </CodeBlock>
  );
}

function CopyButton({
  className,
  code,
  containerRef,
  ...props
}: ComponentProps<"button"> & {
  code?: string;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const [checked, onClick] = useCopyButton(() => {
    if (code) {
      void navigator.clipboard.writeText(code);
      return;
    }

    const pre = containerRef.current?.querySelector("pre");
    if (!pre) return;

    const clone = pre.cloneNode(true) as HTMLElement;
    clone.querySelectorAll(".nd-copy-ignore").forEach((node) => {
      node.replaceWith("\n");
    });
    void navigator.clipboard.writeText(clone.textContent ?? "");
  });

  const Icon = checked ? Check : Copy;

  return (
    <button
      {...props}
      aria-label={checked ? "Copied text" : "Copy text"}
      className={cn(
        "text-muted hover:bg-default -mt-0.5 flex size-8 items-center justify-center rounded-lg transition-colors",
        className,
      )}
      data-checked={checked || undefined}
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}
