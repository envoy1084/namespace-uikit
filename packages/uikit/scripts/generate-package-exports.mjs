import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const componentsRoot = path.join(packageRoot, "src/components");
const packageTemplatePath = path.join(packageRoot, "package.template.json");
const packageJsonPath = path.join(packageRoot, "package.json");
const isCheck = process.argv.includes("--check");

const readComponents = async () => {
  return (await readdir(componentsRoot, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name.slice(0, -".tsx".length))
    .toSorted();
};

const packageTemplateSource = await readFile(packageTemplatePath, "utf8");
const packageJson = JSON.parse(packageTemplateSource);
const packageJsonSource = await readFile(packageJsonPath, "utf8").catch(() => "");
const currentPackageJson = packageJsonSource ? JSON.parse(packageJsonSource) : undefined;

// Changesets updates the publish manifest directly. Keep its release version
// when reconstructing the rest of the generated manifest before a build.
if (currentPackageJson?.version) {
  packageJson.version = currentPackageJson.version;
}

const components = await readComponents();
const fixedExports = packageJson.exports;
const requiredFixedExports = [
  ".",
  "./icons",
  "./hooks",
  "./utils",
  "./*",
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
  "./*": fixedExports["./*"],
  "./styles": fixedExports["./styles"],
  "./styles.css": fixedExports["./styles.css"],
  "./package.json": "./package.json",
};

const generatedSource = `${JSON.stringify(packageJson, null, 2)}\n`;

if (isCheck) {
  if (generatedSource !== packageJsonSource) {
    throw new Error("package.json is stale. Run `pnpm generate:package`.");
  }

  console.log(`Verified ${components.length} component exports.`);
} else if (generatedSource === packageJsonSource) {
  console.log(`package.json is up to date (${components.length} components).`);
} else {
  await writeFile(packageJsonPath, generatedSource);
  console.log(`Generated package.json with ${components.length} components.`);
}
