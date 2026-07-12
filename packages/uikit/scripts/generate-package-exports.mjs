import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const componentsRoot = path.join(packageRoot, "src/components");
const packageJsonPath = path.join(packageRoot, "package.json");
const isCheck = process.argv.includes("--check");

const readComponents = async () => {
  const groups = (await readdir(componentsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted();
  const components = (
    await Promise.all(
      groups.map(async (group) => {
        const groupPath = path.join(componentsRoot, group);
        const files = (await readdir(groupPath, { withFileTypes: true }))
          .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
          .map((entry) => entry.name)
          .toSorted();

        return files.map((file) => ({
          group,
          name: file.slice(0, -".tsx".length),
        }));
      }),
    )
  ).flat();
  const names = new Map();

  for (const component of components) {
    const previousGroup = names.get(component.name);

    if (previousGroup) {
      throw new Error(
        `Duplicate component subpath "${component.name}" in ${previousGroup} and ${component.group}`,
      );
    }

    names.set(component.name, component.group);
  }

  return components.toSorted((left, right) =>
    left.name.localeCompare(right.name),
  );
};

const componentExport = ({ group, name }) => ({
  "@thenamespace/source": {
    types: `./src/components/${group}/${name}.tsx`,
    import: `./src/components/${group}/${name}.tsx`,
  },
  types: `./dist/components/${name}.d.mts`,
  import: `./dist/components/${name}.mjs`,
});

const packageJsonSource = await readFile(packageJsonPath, "utf8");
const packageJson = JSON.parse(packageJsonSource);
const components = await readComponents();
const fixedExports = packageJson.exports;
const requiredFixedExports = [
  ".",
  "./icons",
  "./hooks",
  "./utils",
  "./styles",
  "./styles.css",
];

for (const exportPath of requiredFixedExports) {
  if (!fixedExports?.[exportPath]) {
    throw new Error(`Missing fixed package export: ${exportPath}`);
  }
}

packageJson.exports = {
  ".": fixedExports["."],
  "./icons": fixedExports["./icons"],
  "./hooks": fixedExports["./hooks"],
  "./utils": fixedExports["./utils"],
  ...Object.fromEntries(
    components.map((component) => [
      `./${component.name}`,
      componentExport(component),
    ]),
  ),
  "./*": {
    types: "./dist/components/*.d.mts",
    import: "./dist/components/*.mjs",
  },
  "./styles": fixedExports["./styles"],
  "./styles.css": fixedExports["./styles.css"],
  "./package.json": "./package.json",
};

const generatedSource = `${JSON.stringify(packageJson, null, 2)}\n`;

if (isCheck) {
  if (generatedSource !== packageJsonSource) {
    throw new Error(
      "package.json component exports are stale. Run `pnpm generate:exports`.",
    );
  }

  console.log(`Verified ${components.length} component exports.`);
} else if (generatedSource === packageJsonSource) {
  console.log(`Component exports are up to date (${components.length}).`);
} else {
  await writeFile(packageJsonPath, generatedSource);
  console.log(`Generated ${components.length} component exports.`);
}
