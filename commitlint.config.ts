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
  rules: {
    "breaking-change-exclamation-mark": [2, "always"],
    "header-trim": [2, "always"],
    "subject-case": [2, "never", ["sentence-case", "start-case", "pascal-case", "upper-case"]],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
  },
});
