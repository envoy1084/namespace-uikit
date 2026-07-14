import type { MDXComponents } from "mdx/types";

import type { ReactNode } from "react";

import { Pre } from "fumadocs-ui/components/codeblock";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";

import { CollapsibleCode } from "@/components/collapsible-code";
import {
  ColorSectionFormField,
  ColorSectionPrimitive,
  ColorSectionSideBySide,
  ColorSectionStacked,
} from "@/components/color-section";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentsCategory } from "@/components/components-category";
import { DocsImage } from "@/components/docs-image";
import { SiteUrlCode } from "@/components/site-url-code";
import { FumadocsCustomCodeblock as CodeBlock } from "@/mdx-components/fumadocs-custom-codeblock";
import { cn } from "@/utils/cn";

const MAX_LINES_FOR_LINE_NUMBERS = 20;

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node.props as { children?: ReactNode }).children);
  }

  return "";
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...TabsComponents,
    CodeBlock,
    CollapsibleCode,
    ColorSectionFormField,
    ColorSectionPrimitive,
    ColorSectionSideBySide,
    ColorSectionStacked,
    ComponentPreview,
    ComponentsCategory,
    DocsImage,
    SiteUrlCode,
    Pre,
    pre: ({ children, ref: _ref, ...props }) => {
      const lineCount = extractText(children).split("\n").length;
      const className = cn(
        "mdx-code-block",
        lineCount > MAX_LINES_FOR_LINE_NUMBERS
          ? "docs-code-block-line-numbers"
          : undefined,
        props.className,
      );

      return (
        <CodeBlock {...props} className={className}>
          <Pre>{children}</Pre>
        </CodeBlock>
      );
    },
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
