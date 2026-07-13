import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const docsRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(docsRoot, "../..");
const assetRoot = join(docsRoot, "public/assets");
const sourceRoots = [
  join(docsRoot, "src"),
  join(docsRoot, "content"),
  join(repoRoot, "apps/storybook/src"),
];
const sourceExtensions = new Set([".js", ".jsx", ".md", ".mdx", ".ts", ".tsx"]);
const retiredMediaHosts =
  /heroui-assets\.nyc3\.cdn\.digitaloceanspaces\.com|img\.heroui\.chat|nextuipro\.nyc3\.cdn\.digitaloceanspaces\.com|flagcdn\.com|google\.com\/s2\/favicons|basemaps\.cartocdn\.com|app\.requestly\.io\/delay/i;
const upstreamBranding = /heroui|nextui/i;
const remoteMedia =
  /https?:\/\/[^\s"'`]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^\s"'`]*)?/gi;

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) results.push(...(await files(path)));
    else if (sourceExtensions.has(extname(entry.name))) results.push(path);
  }

  return results;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

const failures = [];
let referenceCount = 0;

for (const root of sourceRoots) {
  for (const file of await files(root)) {
    const content = await readFile(file, "utf8");
    const label = relative(repoRoot, file);

    if (retiredMediaHosts.test(content))
      failures.push(`${label}: references a retired media CDN`);
    if (
      label.startsWith("apps/storybook/src/") &&
      upstreamBranding.test(content)
    )
      failures.push(`${label}: references upstream product branding`);

    for (const url of content.match(remoteMedia) ?? []) {
      if (!url.includes("invalid-url-to-show-fallback.com"))
        failures.push(`${label}: remote static media ${url}`);
    }

    for (const match of content.matchAll(/\/assets\/[A-Za-z0-9_./-]*/g)) {
      referenceCount += 1;
      const referenced = match[0].slice("/assets/".length);
      const path = extname(referenced)
        ? join(assetRoot, referenced)
        : join(assetRoot, referenced.replace(/[^/]+$/, ""));

      if (!(await exists(path))) failures.push(`${label}: missing ${match[0]}`);
    }
  }
}

if (failures.length > 0)
  throw new Error(
    `Asset verification failed:\n${[...new Set(failures)].join("\n")}`,
  );

console.log(
  `Verified ${referenceCount} local asset references across docs and Storybook.`,
);
