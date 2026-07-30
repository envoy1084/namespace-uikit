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

function findStoryFile(root: string, component: string) {
  const directory = join(root, "apps/storybook/src/components");

  for (const group of readdirSync(directory)) {
    const groupDirectory = join(directory, group);
    if (!statSync(groupDirectory).isDirectory()) continue;

    const candidates = [
      join(groupDirectory, component, `${component}.stories.tsx`),
      join(groupDirectory, `${component}.stories.tsx`),
    ];
    const storyFile = candidates.find((file) => existsSync(file));

    if (storyFile) return storyFile;
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

export function getComponentResourceLinks(slug: string): ComponentResourceLinks | undefined {
  const root = repositoryRoot();
  const sourceName = sourceAliases[slug] ?? slug;
  const sourceFile = join(root, "packages/uikit/src/components", `${sourceName}.tsx`);

  if (!existsSync(sourceFile)) return;

  const repositoryUrl = (
    process.env.NEXT_PUBLIC_GITHUB_REPOSITORY_URL ?? "https://github.com/thenamespace/uikit"
  ).replace(/\/$/, "");
  const storybookUrl = (process.env.NEXT_PUBLIC_STORYBOOK_URL ?? "http://localhost:6006").replace(
    /\/$/,
    "",
  );
  const docsFile = join(root, "apps/docs/content/docs/components", `${slug}.mdx`);
  const docsSource = readFileSync(docsFile, "utf8");
  const reactAria = frontmatterValue(docsSource, "rac");
  const localStyle = join(root, "packages/uikit/src/styles/components", `${sourceName}.css`);
  const storyFile = findStoryFile(root, sourceName);
  let storybook: string | undefined;

  if (storyFile) {
    const title = readFileSync(storyFile, "utf8").match(
      /title:\s*["'](Components\/[^"']+)["']/,
    )?.[1];

    if (title) {
      storybook = `${storybookUrl}/?path=/docs/${storybookPath(title)}--docs`;
    }
  }

  const styles = existsSync(localStyle)
    ? `${repositoryUrl}/blob/main/packages/uikit/src/styles/components/${sourceName}.css`
    : undefined;

  return {
    reactAria: reactAria ? `https://react-aria.adobe.com/${reactAria}` : undefined,
    source: `${repositoryUrl}/blob/main/packages/uikit/src/components/${sourceName}.tsx`,
    storybook,
    styles,
  };
}
