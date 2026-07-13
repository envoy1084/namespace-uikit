import { readFile, readdir, writeFile } from "node:fs/promises";
import { basename, join, relative, sep } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const demosRoot = join(appRoot, "src/demos");
const docsRoot = join(appRoot, "content/docs/components");
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
  const displaySource = source.replace(/^\/\/ @demo-title .+\n/m, "");
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
    `  ${JSON.stringify(demoName)}: { component: ${JSON.stringify(component)}, file: ${JSON.stringify(relativeFile)}, loader: () => import(${JSON.stringify(importPath)}).then((module) => module.${exportName}), source: ${JSON.stringify(displaySource)}, title: ${JSON.stringify(title)} },`,
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeHeading(value) {
  return value.replaceAll(/[^A-Za-z0-9]/g, "").toLowerCase();
}

for (const [component, demos] of Object.entries(catalog)) {
  const docPath = join(docsRoot, `${component}.mdx`);
  let content = await readFile(docPath, "utf8");

  content = content.replace(/<ProExamples[^>]*\/>\s*/g, "");
  for (const demo of demos) {
    content = content.replace(
      new RegExp(
        `\\n### ${escapeRegExp(demo.title)}\\n\\n(?:<!-- PRO_DEMO ${escapeRegExp(demo.name)} -->|\\{/\\* PRO_DEMO ${escapeRegExp(demo.name)} \\*/\\})\\n<ComponentPreview name="${escapeRegExp(demo.name)}" \\/>\\n?`,
        "g",
      ),
      "\n",
    );
  }
  content = content.replace(
    /\n?<!-- PRO_DEMO [^>]+ -->\n<ComponentPreview name="[^"]+" \/>\n?/g,
    "\n",
  );
  content = content.replace(
    /\n?\{\/\* PRO_DEMO [^*]+ \*\/\}\n<ComponentPreview name="[^"]+" \/>\n?/g,
    "\n",
  );

  const pending = [];
  for (const demo of demos) {
    const preview = `{/* PRO_DEMO ${demo.name} */}\n<ComponentPreview name="${demo.name}" />`;
    const matchingHeading = [...content.matchAll(/^(#{2,3}) (.+)$/gm)].find(
      (match) =>
        demo.title !== "Default" &&
        normalizeHeading(match[2] ?? "") === normalizeHeading(demo.title),
    )?.[0];
    const target = new RegExp(
      `^${escapeRegExp(demo.title === "Default" ? "## Usage" : (matchingHeading ?? ""))}$`,
      "m",
    );

    if (matchingHeading || demo.title === "Default") {
      content = content.replace(
        target,
        (heading) => `${heading}\n\n${preview}`,
      );
    } else {
      pending.push(`### ${demo.title}\n\n${preview}`);
    }
  }

  if (pending.length > 0) {
    const insertion = pending.join("\n\n");
    const boundary = /^## (CSS Classes|API Reference)$/m;

    content = boundary.test(content)
      ? content.replace(boundary, `${insertion}\n\n$&`)
      : `${content.trim()}\n\n${insertion}\n`;
  }

  await writeFile(docPath, `${content.replace(/\n{3,}/g, "\n\n").trim()}\n`);
}

console.log(
  `Registered and linked ${registryEntries.length} first-class demos for ${Object.keys(catalog).length} Pro components.`,
);
