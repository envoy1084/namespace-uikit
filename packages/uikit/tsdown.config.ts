import { createTsdownConfig } from "@repo/tsdown-config";

export default createTsdownConfig({
  deps: {
    neverBundle: [
      "@heroui/react",
      "react",
      "react-dom",
      "react/jsx-runtime",
      "tailwindcss",
    ],
  },
  entry: ["src/index.ts"],
  platform: "browser",
});
