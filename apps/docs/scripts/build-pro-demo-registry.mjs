import { readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const demosRoot = join(appRoot, "src/demos");
const registryPath = join(demosRoot, "index.ts");
const GENERATED_START = "  // GENERATED_PRO_DEMOS_START";
const GENERATED_END = "  // GENERATED_PRO_DEMOS_END";

async function findDemoFiles(directory) {
  const files = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) files.push(...(await findDemoFiles(path)));
    else if (entry.name.endsWith(".pro-demo.tsx")) files.push(path);
  }

  return files;
}

const registryEntries = [];
const catalog = {};

for (const filePath of (await findDemoFiles(demosRoot)).toSorted()) {
  const source = await readFile(filePath, "utf8");
  const relativeFile = relative(demosRoot, filePath).split(sep).join("/");
  const [component] = relativeFile.split("/");
  const story = basename(filePath, ".pro-demo.tsx");
  const demoName = `${component}-${story}`;
  const exportName = source.match(
    /^export const (Pro[A-Za-z0-9_$]+Example)\s*=/m,
  )?.[1];
  const title = source.match(/^\/\/ @demo-title (.+)$/m)?.[1];

  if (!component || !exportName || !title) {
    throw new Error(`Incomplete Pro demo metadata: ${relativeFile}`);
  }

  const importPath = `./${relativeFile.replace(/\.tsx$/, "")}`;

  registryEntries.push(
    `  ${JSON.stringify(demoName)}: { component: ${JSON.stringify(component)}, file: ${JSON.stringify(relativeFile)}, loader: () => import(${JSON.stringify(importPath)}).then((module) => module.${exportName}), source: ${JSON.stringify(source)}, title: ${JSON.stringify(title)} },`,
  );
  (catalog[component] ??= []).push({ name: demoName, title });
}

let registry = await readFile(registryPath, "utf8");
registry = registry.replace(
  new RegExp(`${GENERATED_START}[\\s\\S]*?${GENERATED_END}\\n?`, "g"),
  "",
);
registry = registry.replace(
  /export interface Demo \{([\s\S]*?)\n\}/,
  (_match, body) =>
    `export interface Demo {${body.replace(/\n  component\?: string;|\n  title\?: string;/g, "")}\n  component?: string;\n  title?: string;\n}`,
);
registry = registry.replace(
  /\n\};\n\nexport function getDemo/,
  `\n${GENERATED_START}\n${registryEntries.join("\n")}\n${GENERATED_END}\n};\n\nexport function getDemo`,
);

await writeFile(registryPath, registry);
await writeFile(
  join(demosRoot, "pro-catalog.ts"),
  `export const proDemoCatalog: Record<string, { name: string; title: string }[]> = ${JSON.stringify(catalog, null, 2)};\n`,
);

console.log(
  `Registered ${registryEntries.length} first-class demos for ${Object.keys(catalog).length} Pro components.`,
);
