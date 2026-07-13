import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

export interface ComponentResourceLinks {
  reactAria?: string;
  source: string;
  storybook?: string;
  styles?: string;
}

const sourceAliases: Record<string, string> = {
  "text-area": "textarea",
  "text-field": "textfield",
};

function repositoryRoot() {
  const cwd = process.cwd();

  return existsSync(join(cwd, "packages/uikit")) ? cwd : resolve(cwd, "../..");
}

function componentGroup(root: string, component: string) {
  const directory = join(root, "packages/uikit/src/components");

  for (const group of readdirSync(directory)) {
    const groupDirectory = join(directory, group);
    if (!statSync(groupDirectory).isDirectory()) continue;
    if (existsSync(join(groupDirectory, `${component}.tsx`))) return group;
  }
}

function frontmatterValue(source: string, key: string) {
  return source.match(new RegExp(`^  ${key}:\\s*(.+)$`, "m"))?.[1]?.trim();
}

function storybookPath(title: string) {
  return title
    .split("/")
    .map((part) =>
      part
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean)
    .join("-");
}

export function getComponentResourceLinks(
  slug: string,
): ComponentResourceLinks | undefined {
  const root = repositoryRoot();
  const sourceName = sourceAliases[slug] ?? slug;
  const group = componentGroup(root, sourceName);

  if (!group) return;

  const repositoryUrl = (
    process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL ??
    "https://github.com/thenamespace/uikit"
  ).replace(/\/$/, "");
  const storybookUrl = (
    process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "http://localhost:6006"
  ).replace(/\/$/, "");
  const docsFile = join(
    root,
    "apps/docs/content/docs/components",
    `${slug}.mdx`,
  );
  const docsSource = readFileSync(docsFile, "utf8");
  const declaredStyle = frontmatterValue(docsSource, "styles");
  const reactAria = frontmatterValue(docsSource, "rac");
  const localStyle = join(
    root,
    "packages/uikit/src/styles/components",
    `${sourceName}.css`,
  );
  const storyFiles = [
    join(
      root,
      "apps/storybook/src/components",
      group,
      sourceName,
      `${sourceName}.stories.tsx`,
    ),
    join(
      root,
      "apps/storybook/src/components",
      group,
      `${sourceName}.stories.tsx`,
    ),
  ];
  const storyFile = storyFiles.find((file) => existsSync(file));
  let storybook: string | undefined;

  if (storyFile) {
    const title = readFileSync(storyFile, "utf8").match(
      /title:\s*["'](Components\/[^"']+)["']/,
    )?.[1];

    if (title) {
      storybook = `${storybookUrl}/?path=/docs/${storybookPath(title)}--docs`;
    }
  }

  let styles: string | undefined;
  if (existsSync(localStyle)) {
    styles = `${repositoryUrl}/blob/main/packages/uikit/src/styles/components/${sourceName}.css`;
  } else if (declaredStyle) {
    styles = `/source/styles/${declaredStyle}`;
  }

  return {
    reactAria: reactAria
      ? `https://react-aria.adobe.com/${reactAria}`
      : undefined,
    source: `${repositoryUrl}/blob/main/packages/uikit/src/components/${group}/${sourceName}.tsx`,
    storybook,
    styles,
  };
}
