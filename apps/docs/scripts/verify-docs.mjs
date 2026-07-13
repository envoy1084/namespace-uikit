import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) results.push(...(await files(path)));
    else results.push(path);
  }

  return results;
}

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

const packageJson = JSON.parse(
  await readFile(join(repoRoot, "packages/uikit/package.json"), "utf8"),
);
const componentDirectory = join(appRoot, "content/docs/components");
const componentDocs = new Set(
  (await readdir(componentDirectory))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, "")),
);
const ignoredExports = new Set([
  "hooks",
  "icons",
  "package.json",
  "styles",
  "styles.css",
  "utils",
]);
const componentExports = Object.keys(packageJson.exports)
  .filter((path) => path.startsWith("./") && !path.includes("*"))
  .map((path) => path.slice(2))
  .filter((path) => !ignoredExports.has(path));
const missingDocs = componentExports.filter((name) => !componentDocs.has(name));

invariant(
  missingDocs.length === 0,
  `Missing component documentation: ${missingDocs.join(", ")}`,
);

const gettingStartedPages = [
  "index.mdx",
  "(overview)/quick-start.mdx",
  "(overview)/design-principles.mdx",
  "(overview)/frameworks.mdx",
  "(handbook)/colors.mdx",
  "(handbook)/theming.mdx",
  "(handbook)/dark-mode.mdx",
  "(handbook)/styling.mdx",
  "(handbook)/animation.mdx",
  "(handbook)/composition.mdx",
  "(ui-for-agents)/llms-txt.mdx",
];

for (const page of gettingStartedPages) {
  invariant(
    (await files(join(appRoot, "content/docs/getting-started"))).some((file) =>
      file.endsWith(page),
    ),
    `Missing Getting Started page: ${page}`,
  );
}

const componentIndex = await readFile(
  join(componentDirectory, "index.mdx"),
  "utf8",
);
invariant(
  componentIndex.includes("<ComponentsCategory"),
  "Missing all-components overview",
);

const todo = await readFile(join(repoRoot, "TODO.md"), "utf8");
const advancedComponents = [
  ...new Set(
    [
      ...todo.matchAll(
        /https:\/\/heroui\.pro\/docs\/react\/components\/([a-z0-9-]+)/g,
      ),
    ].map((match) => match[1]),
  ),
];
const missingAdvancedDocs = advancedComponents.filter(
  (name) => !componentDocs.has(name),
);
let demoCount = 0;

invariant(
  missingAdvancedDocs.length === 0,
  `Missing advanced documentation: ${missingAdvancedDocs.join(", ")}`,
);

for (const name of advancedComponents) {
  const content = await readFile(
    join(componentDirectory, `${name}.mdx`),
    "utf8",
  );

  invariant(
    content.includes("<ComponentPreview"),
    `Component documentation does not use first-class component previews: ${name}`,
  );

  const demoDirectory = join(appRoot, "src/demos", name);
  const demoFiles = (await readdir(demoDirectory)).filter((file) =>
    file.endsWith(".demo.tsx"),
  );

  invariant(demoFiles.length > 0, `Missing first-class demos: ${name}`);

  for (const demoFile of demoFiles) {
    const demo = await readFile(join(demoDirectory, demoFile), "utf8");

    invariant(
      demo.includes("// @demo-title ") &&
        /^export const [A-Za-z0-9_$]+Example\s*=/m.test(demo),
      `Incomplete demo: ${name}/${demoFile}`,
    );
    invariant(
      !/storybook|pro-story/i.test(demo),
      `Storybook reference remains in demo: ${name}/${demoFile}`,
    );
    invariant(
      content.includes(
        `<ComponentPreview name="${name}-${demoFile.replace(/\.demo\.tsx$/, "")}" />`,
      ),
      `Demo is not linked from documentation: ${name}/${demoFile}`,
    );
  }
  demoCount += demoFiles.length;
}

const applicationFiles = await files(join(appRoot, "src"));
const contentFiles = await files(join(appRoot, "content"));
const scannedFiles = [...applicationFiles, ...contentFiles];
const forbiddenRuntimeText =
  /heroui|nextui|heroui-assets|img\.heroui|namespace-assets/i;

for (const file of scannedFiles) {
  const content = await readFile(file, "utf8");

  invariant(
    !forbiddenRuntimeText.test(content),
    `Forbidden branding or hosted asset in ${relative(appRoot, file)}`,
  );
}

const routeFiles = await files(join(appRoot, "src/app"));
const routePaths = routeFiles.map((file) =>
  relative(join(appRoot, "src/app"), file),
);
const forbiddenRoute =
  /(^|\/)(native|releases?|migration|themes?|mcp|oauth|openid|jwks|skills?|install|blog|showcase)(\/|$)/i;

for (const route of routePaths) {
  invariant(!forbiddenRoute.test(route), `Forbidden route remains: ${route}`);
}

const requiredRoutes = [
  "docs.mdx/route.ts",
  "llms-full.txt/route.ts",
  "llms.mdx/[...slug]/route.ts",
  "llms.txt/route.ts",
];

for (const route of requiredRoutes) {
  invariant(routePaths.includes(route), `Missing AI route: ${route}`);
}

console.log(
  `Verified ${componentExports.length} public component entry points, ${advancedComponents.length} advanced pages with ${demoCount} first-class demos, ${componentDocs.size} component docs, and ${requiredRoutes.length} AI routes.`,
);
