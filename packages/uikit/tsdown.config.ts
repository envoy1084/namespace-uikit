import { readdirSync } from "node:fs";
import { basename, extname } from "node:path";

import defineReactConfig from "klarity/tsdown/react";

const componentEntries = Object.fromEntries(
  readdirSync("src/components", { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((group) =>
      readdirSync(`src/components/${group.name}`, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
        .map((entry) => {
          const name = basename(entry.name, extname(entry.name));

          return [`components/${name}`, `src/components/${group.name}/${entry.name}`];
        }),
    ),
);

export default defineReactConfig({
  copy: [
    {
      from: "src/styles/components/*.css",
      to: "dist/components",
    },
    {
      from: "src/styles/globals.css",
      rename: "styles.css",
      to: "dist",
    },
  ],
  deps: {
    onlyBundle: [],
  },
  dts: {
    enabled: true,
    sourcemap: true,
  },
  exports: false,
  entry: {
    ...componentEntries,
    hooks: "src/hooks.ts",
    icons: "src/icons.ts",
    index: "src/index.ts",
    utils: "src/utils.ts",
  },
  fixedExtension: true,
  hash: false,
  nodeProtocol: true,
  shims: false,
  target: ["es2022"],
  unbundle: true,
});
