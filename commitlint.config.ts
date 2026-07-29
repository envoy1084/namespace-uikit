import { defineCommitlintConfig } from "klarity/commitlint";

const commitScopes = [
  "apps",
  "ci",
  "commitlint",
  "deps",
  "docs",
  "hooks",
  "internal",
  "nx",
  "oxc",
  "packages",
  "release",
  "root",
  "sdk",
  "tsconfig",
  "tsdown",
] as const;

export default defineCommitlintConfig({
  scopes: commitScopes,
});
