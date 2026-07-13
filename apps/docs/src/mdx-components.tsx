import type { MDXComponents } from "mdx/types";

import * as TabsComponents from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultComponents,
    ...TabsComponents,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
