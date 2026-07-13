import type { MDXComponents } from "mdx/types";

import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";

import { CollapsibleCode } from "@/components/collapsible-code";
import { ComponentPreview } from "@/components/component-preview";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...TabsComponents,
    CollapsibleCode,
    ComponentPreview,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
