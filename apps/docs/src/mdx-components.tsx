import type { MDXComponents } from "mdx/types";

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
import { ProExamples } from "@/components/pro-examples";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...TabsComponents,
    CollapsibleCode,
    ColorSectionFormField,
    ColorSectionPrimitive,
    ColorSectionSideBySide,
    ColorSectionStacked,
    ComponentPreview,
    ComponentsCategory,
    DocsImage,
    ProExamples,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
