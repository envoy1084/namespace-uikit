import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const repoRoot = join(appRoot, "../..");
const componentDirectory = join(appRoot, "content/docs/components");
const packageJson = JSON.parse(
  await readFile(join(repoRoot, "packages/uikit/package.json"), "utf8"),
);
const groupTitles = {
  ai: "AI",
  buttons: "Buttons",
  charts: "Charts",
  collections: "Collections",
  colors: "Colors",
  "data-display": "Data Display",
  "date-and-time": "Date and Time",
  feedback: "Feedback",
  forms: "Forms",
  layout: "Layout",
  navigation: "Navigation",
  overlays: "Overlays",
  typography: "Typography",
  utilities: "Utilities",
};
const groups = new Map(Object.keys(groupTitles).map((group) => [group, []]));
const docs = (await readdir(componentDirectory))
  .filter((file) => file.endsWith(".mdx") && file !== "index.mdx")
  .map((file) => file.replace(/\.mdx$/, ""));

for (const slug of docs) {
  const source =
    packageJson.exports[`./${slug}`]?.["@thenamespace/source"]?.import ?? "";
  const group = source.match(/src\/components\/([^/]+)\//)?.[1] ?? "utilities";

  (groups.get(group) ?? groups.get("utilities")).push(slug);
}

const pages = ["index"];

for (const [group, slugs] of groups) {
  if (slugs.length === 0) continue;

  pages.push(`---${groupTitles[group]}---`, ...slugs.toSorted());
}

await writeFile(
  join(componentDirectory, "meta.json"),
  `${JSON.stringify({ description: "Namespace UIKit React components", pages, title: "Components" }, null, 2)}\n`,
);

console.log(
  `Organized ${docs.length} component pages into ${groups.size} functional groups.`,
);
