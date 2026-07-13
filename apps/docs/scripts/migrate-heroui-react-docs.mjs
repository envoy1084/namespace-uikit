import {
  access,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { basename, dirname, join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");
const upstreamRoot = join(repoRoot, ".repos/heroui/apps/docs");
const upstreamComponents = join(
  upstreamRoot,
  "content/docs/en/react/components",
);
const upstreamDemos = join(upstreamRoot, "src/demos/en");
const outputComponents = join(appRoot, "content/docs/components");
const outputDemos = join(appRoot, "src/demos");
const outputPublic = join(appRoot, "public");
const assets = new Map();

function localAsset(url, path) {
  const publicPath = `/assets/${path}`;

  assets.set(publicPath, url);

  return publicPath;
}

async function files(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) results.push(...(await files(path, extension)));
    else if (entry.name.endsWith(extension)) results.push(path);
  }

  return results;
}

function adaptMdx(source) {
  return source
    .replace(/^image:\s*https:\/\/heroui-assets[^\n]*\n/gm, "")
    .replace(/^icon:\s*[^\n]*\n/gm, "")
    .replace(/^github:\s*\n(?:\s+[^\n]+\n)*/gm, "")
    .replace(/<Related(?:Components|Showcases)[^>]*\/>/g, "")
    .replace(
      /https:\/\/heroui-assets\.nyc3\.cdn\.digitaloceanspaces\.com\/([^"']+)/g,
      (url, path) => localAsset(url, path),
    )
    .replace(
      /https:\/\/github\.com\/heroui-inc\/heroui\/blob\/v3\/packages\/styles\/components\//g,
      "https://github.com/thenamespace/uikit/blob/main/packages/uikit/src/styles/components/",
    )
    .replace(/@heroui\/react/g, "@thenamespace/uikit")
    .replace(/@heroui\/styles/g, "@thenamespace/uikit/styles")
    .replace(/\/docs\/react\/components\//g, "/docs/components/")
    .replace(
      /https:\/\/v3\.heroui\.com\/docs\/react\/components\//g,
      "/docs/components/",
    )
    .replace(
      /https:\/\/heroui\.com\/docs\/react\/components\//g,
      "/docs/components/",
    )
    .replace(/HeroUI v3/g, "Namespace UIKit")
    .replace(/HeroUI/g, "Namespace UIKit")
    .replace(/heroui/g, "namespace");
}

function adaptDemo(source) {
  return source
    .replace(/@heroui\/react/g, "@thenamespace/uikit")
    .replace(/@heroui\/styles/g, "@thenamespace/uikit/styles")
    .replace(
      /https:\/\/img\.heroui\.chat\/image\/avatar\?w=400&h=400&u=(\d+)/g,
      (url, id) => localAsset(url, `generated/avatar-${id}.jpg`),
    )
    .replace(
      /https:\/\/heroui-assets\.nyc3\.cdn\.digitaloceanspaces\.com\/([^"']+)/g,
      (url, path) => localAsset(url, path),
    )
    .replace(/heroui\.com/g, "namespace.ninja")
    .replace(/heroui/g, "namespace")
    .replace(/<EmptyState\s*\/>/g, "<EmptyState>Nothing found.</EmptyState>")
    .replace(/HeroUI/g, "Namespace UIKit");
}

await rm(outputComponents, { force: true, recursive: true });
await rm(outputDemos, { force: true, recursive: true });
await mkdir(outputComponents, { recursive: true });
await mkdir(outputDemos, { recursive: true });

const componentFiles = await files(upstreamComponents, ".mdx");
const demoNames = new Set();
const componentNames = [];

for (const sourcePath of componentFiles) {
  if (basename(sourcePath) === "index.mdx") continue;

  const source = await readFile(sourcePath, "utf8");

  for (const match of source.matchAll(
    /<ComponentPreview\s+name=["']([^"']+)["']/g,
  )) {
    demoNames.add(match[1]);
  }

  const name = basename(sourcePath);

  componentNames.push(name.replace(/\.mdx$/, ""));
  await writeFile(join(outputComponents, name), adaptMdx(source));
}

const upstreamRegistry = await readFile(
  join(upstreamDemos, "index.ts"),
  "utf8",
);
const registryEntries = [];

for (const name of [...demoNames].toSorted()) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = upstreamRegistry.match(
    new RegExp(`"${escapedName}": \\{([\\s\\S]*?)\\n  \\},`),
  )?.[1];

  if (!block) throw new Error(`Unable to resolve demo registry entry: ${name}`);

  const importPath = block.match(/import\("\.\/([^"']+)"\)/)?.[1];
  const exportName = block.match(/\(m\) => m\.([A-Za-z0-9_$]+)/)?.[1];
  const filePath = block.match(/file: "en\/([^"']+)"/)?.[1];

  if (!importPath || !exportName || !filePath) {
    throw new Error(`Incomplete demo registry entry: ${name}`);
  }
  const sourcePath = join(upstreamDemos, filePath);
  const outputPath = join(outputDemos, filePath);
  const loaderSourcePath = join(upstreamDemos, `${importPath}.tsx`);
  const loaderOutputPath = join(outputDemos, `${importPath}.tsx`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, adaptDemo(await readFile(sourcePath, "utf8")));
  if (loaderSourcePath !== sourcePath) {
    await mkdir(dirname(loaderOutputPath), { recursive: true });
    await writeFile(
      loaderOutputPath,
      adaptDemo(await readFile(loaderSourcePath, "utf8")),
    );
  }
  registryEntries.push(
    `  ${JSON.stringify(name)}: {loader: () => import(${JSON.stringify(`./${importPath}`)}).then((module) => module.${exportName}), file: ${JSON.stringify(filePath)}},`,
  );
}

await writeFile(
  join(outputDemos, "index.ts"),
  `import type {ComponentType} from "react";\n\nexport interface Demo {\n  file: string;\n  loader: () => Promise<ComponentType>;\n}\n\nexport const demos: Record<string, Demo> = {\n${registryEntries.join("\n")}\n};\n\nexport function getDemo(name: string) {\n  return demos[name];\n}\n`,
);

await writeFile(
  join(outputComponents, "meta.json"),
  `${JSON.stringify({ description: "Namespace UIKit React components", pages: ["index", ...componentNames.toSorted()], title: "Components" }, null, 2)}\n`,
);

await writeFile(
  join(outputComponents, "index.mdx"),
  `---\ntitle: Components\ndescription: React components exported by Namespace UIKit.\n---\n\nBrowse the complete Namespace UIKit component API. Every page includes practical examples, composition guidance, accessibility behavior, and styling details.\n`,
);

for (const [publicPath, url] of assets) {
  const outputPath = join(outputPublic, publicPath);

  try {
    await access(outputPath);
    continue;
  } catch {
    // Download missing retained assets below.
  }

  const response = await fetch(url);

  if (!response.ok)
    throw new Error(`Unable to download ${url}: ${response.status}`);

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
}

console.log(
  `Migrated ${componentNames.length} component pages, ${registryEntries.length} referenced demos, and ${assets.size} local assets.`,
);
