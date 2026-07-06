import type { StorybookConfig } from "@storybook/react-vite";

import { dirname, join as pathJoin } from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const storybookConfigDir = dirname(filename);

const config: StorybookConfig = {
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  core: {
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
    enableCrashReports: false,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: [pathJoin(storybookConfigDir, "../public")],
  stories: [
    "./welcome.mdx",
    "./stories/**/*.stories.@(ts|tsx|mdx)",
    "../src/**/*.stories.@(ts|tsx|mdx)",
  ],
};

export default config;
