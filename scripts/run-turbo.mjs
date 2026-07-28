import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

import klarity from "klarity/turbo" with { type: "json" };

const config = structuredClone(klarity);

// Turbo does not accept negated globs in globalDependencies. Klarity excludes
// local env files; this repository already ignores every *.local file instead.
config.globalDependencies = config.globalDependencies.filter(
  (dependency) => !dependency.startsWith("!"),
);
config.tasks.build.outputs.push("storybook-static/**");

mkdirSync(".turbo", { recursive: true });
writeFileSync(".turbo/klarity.json", `${JSON.stringify(config, null, 2)}\n`);

const result = spawnSync(
  "pnpm",
  ["exec", "turbo", "--root-turbo-json=.turbo/klarity.json", ...process.argv.slice(2)],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);
