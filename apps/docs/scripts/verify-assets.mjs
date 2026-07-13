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
const packagedTextExtensions = new Set([
  ".css",
  ".geojson",
  ".json",
  ".md",
  ".svg",
  ".txt",
]);
const retiredMediaHosts =
  /heroui-assets\.nyc3\.cdn\.digitaloceanspaces\.com|img\.heroui\.chat|nextuipro\.nyc3\.cdn\.digitaloceanspaces\.com|flagcdn\.com|google\.com\/s2\/favicons|basemaps\.cartocdn\.com|app\.requestly\.io\/delay/i;
const upstreamBranding = /heroui|nextui/i;
const premiumPath = /(?:^|[/_.-])(?:premium|pro)(?=$|[/_.-])/i;
const remoteMedia =
  /https?:\/\/[^\s"'`]+\.(?:avif|geojson|gif|jpe?g|json|mp4|pbf|png|svg|webm|webp|woff2?)(?:\?[^\s"'`]*)?/gi;
const remotePackagedDependency = /https?:\/\/(?!www\.w3\.org\/)[^\s"'`)]+/gi;

async function files(directory, extensions = sourceExtensions) {
  const entries = await readdir(directory, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) results.push(...(await files(path, extensions)));
    else if (extensions.has(extname(entry.name))) results.push(path);
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

async function verifyLocalReferences(content, label) {
  for (const match of content.matchAll(/\/assets\/[A-Za-z0-9_./-]*/g)) {
    referenceCount += 1;
    const referenced = match[0].slice("/assets/".length);
    const path = extname(referenced)
      ? join(assetRoot, referenced)
      : join(assetRoot, referenced.replace(/[^/]+$/, ""));

    if (!(await exists(path))) failures.push(`${label}: missing ${match[0]}`);
  }
}

for (const root of sourceRoots) {
  for (const file of await files(root)) {
    const content = await readFile(file, "utf8");
    const label = relative(repoRoot, file);

    if (premiumPath.test(label))
      failures.push(`${label}: premium naming remains in a public path`);
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

    await verifyLocalReferences(content, label);
  }
}

for (const file of await files(assetRoot, packagedTextExtensions)) {
  const content = await readFile(file, "utf8");
  const label = relative(repoRoot, file);

  if (premiumPath.test(label))
    failures.push(`${label}: premium naming remains in a packaged asset path`);

  for (const url of content.match(remotePackagedDependency) ?? [])
    failures.push(`${label}: remote dependency inside packaged asset ${url}`);

  await verifyLocalReferences(content, label);
}

if (failures.length > 0)
  throw new Error(
    `Asset verification failed:\n${[...new Set(failures)].join("\n")}`,
  );

console.log(
  `Verified ${referenceCount} local asset references across docs and Storybook.`,
);
