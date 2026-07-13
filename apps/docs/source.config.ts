import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    remarkNpmOptions: {
      persist: {
        id: "package-manager",
      },
    },
  },
});
