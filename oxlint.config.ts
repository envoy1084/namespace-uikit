import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["**/.next/**", "**/.source/**", "**/next-env.d.ts"],
  categories: {
    correctness: "error",
    perf: "error",
    suspicious: "error",
  },
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "oxc",
    "import",
    "jsdoc",
    "node",
    "promise",
  ],
});
