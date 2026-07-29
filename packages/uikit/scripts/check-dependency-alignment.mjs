import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));
const workspaceSource = await readFile(path.join(workspaceRoot, "pnpm-workspace.yaml"), "utf8");

const catalog = Object.fromEntries(
  [...workspaceSource.matchAll(/^ {2}"?([^":]+)"?: "([^"]+)"$/gm)].map((match) => [
    match[1],
    match[2],
  ]),
);
const alignedPackages = [
  "@heroui/react",
  "@heroui/styles",
  "@internationalized/date",
  "@react-stately/data",
  "@react-types/shared",
  "react-aria-components",
  "react-stately",
];

for (const name of alignedPackages) {
  if (!catalog[name]) {
    throw new Error(`Missing workspace catalog version for ${name}.`);
  }

  if (packageJson.peerDependencies?.[name] !== "catalog:") {
    throw new Error(`${name} must be a catalog-backed peer dependency.`);
  }

  if (packageJson.devDependencies?.[name] !== "catalog:") {
    throw new Error(`${name} must use the same catalog version for development.`);
  }
}

if (catalog["@react-stately/data"] !== "3.15.1") {
  throw new Error(
    "@react-stately/data must stay on 3.15.1 while HeroUI 3.2.1 uses React Aria 1.18.0.",
  );
}

if (catalog["react-stately"] !== "3.47.0") {
  throw new Error("react-stately must stay aligned with React Aria Components 1.18.0.");
}

console.log(`Verified ${alignedPackages.length} shared UI dependency versions.`);
