import type { CodeBlockProps } from "fumadocs-ui/components/codeblock";

import { highlight } from "fumadocs-core/highlight";
import * as Base from "fumadocs-ui/components/codeblock";

import { CodeBlockClient } from "@/components/codeblock-client";

export async function CodeBlock({
  className,
  code,
  collapsible,
  isIsolated = false,
  lang,
  showLineNumbers,
  title,
  ...props
}: {
  code: string;
  lang: string;
  isIsolated?: boolean;
  showLineNumbers?: boolean;
  title?: string;
  collapsible?: boolean;
} & CodeBlockProps) {
  const trimmedCode = code.trim();
  let rendered: React.ReactNode;
  let renderedPreview: React.ReactNode;

  try {
    if (!trimmedCode) {
      rendered = (
        <Base.Pre>
          <code />
        </Base.Pre>
      );
    } else {
      const lines = trimmedCode.split("\n");

      if (lines.length > 10) {
        renderedPreview = await highlight(lines.slice(0, 5).join("\n"), {
          components: { pre: (preProps) => <Base.Pre {...preProps} /> },
          lang: lang || "text",
        });
      }

      rendered = await highlight(trimmedCode, {
        components: { pre: (preProps) => <Base.Pre {...preProps} /> },
        lang: lang || "text",
      });
    }
  } catch (error) {
    console.error("Syntax highlighting error:", error);
    rendered = (
      <Base.Pre>
        <code>{code}</code>
      </Base.Pre>
    );
  }

  return (
    <CodeBlockClient
      className={className}
      code={trimmedCode}
      collapsible={collapsible}
      isIsolated={isIsolated}
      preview={renderedPreview}
      showLineNumbers={showLineNumbers}
      title={title}
      {...props}
    >
      {rendered}
    </CodeBlockClient>
  );
}
