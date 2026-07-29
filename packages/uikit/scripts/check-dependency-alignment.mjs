import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
const workspaceSource = await readFile(path.join(workspaceRoot, "pnpm-workspace.yaml"), "utf8");

function readSection(name) {
  const section = workspaceSource.match(new RegExp(`^${name}:\\n((?: {2}.*\\n)*)`, "m"))?.[1] ?? "";
  return Object.fromEntries(
    [...section.matchAll(/^ {2}"?([^":]+)"?: "([^"]+)"$/gm)].map((match) => [match[1], match[2]]),
  );
}

const catalog = readSection("catalog");
const overrides = readSection("overrides");
const expectedCatalog = {
  "@heroui/react": "3.2.2",
  "@heroui/styles": "3.2.2",
  "@internationalized/date": "3.12.2",
  "@react-stately/data": "3.16.1",
  "@react-types/shared": "3.36.0",
  "react-aria-components": "1.19.0",
  "react-stately": "3.48.0",
};
const expectedOverrides = {
  "@adobe/react-spectrum": "3.47.2",
  "@react-types/shared": "3.36.0",
  "react-aria": "3.50.0",
  "react-aria-components": "1.19.0",
  "react-stately": "3.48.0",
};

for (const [name, version] of Object.entries(expectedCatalog)) {
  if (catalog[name] !== version) {
    throw new Error(`${name} must use ${version} from the aligned HeroUI dependency family.`);
  }
  if (packageJson.peerDependencies?.[name] !== "catalog:") {
    throw new Error(`${name} must be a catalog-backed peer dependency.`);
  }
  if (packageJson.devDependencies?.[name] !== "catalog:") {
    throw new Error(`${name} must use the same catalog version for development.`);
  }
}

for (const [name, version] of Object.entries(expectedOverrides)) {
  if (overrides[name] !== version) {
    throw new Error(`${name} must be overridden to ${version} to prevent duplicate UI runtimes.`);
  }
}

console.log(`Verified ${Object.keys(expectedCatalog).length} shared UI dependency versions.`);
