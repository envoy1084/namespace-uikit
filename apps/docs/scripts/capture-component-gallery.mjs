import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";

const DOCS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_DIR = join(DOCS_DIR, "public/assets/component-gallery");
const DEFAULT_PORT = 3210;
const themes = ["light", "dark"];

function option(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function isReachable(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1_000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, process) {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (process.exitCode !== null) {
      throw new Error(`Docs server exited with code ${process.exitCode}`);
    }
    if (await isReachable(url)) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function resolveServer() {
  const configuredUrl =
    option("--base-url") ?? process.env.COMPONENT_GALLERY_BASE_URL;
  if (configuredUrl) {
    return { baseUrl: configuredUrl.replace(/\/$/, "") };
  }

  const runningUrl = "http://localhost:3000";
  if (await isReachable(runningUrl)) return { baseUrl: runningUrl };

  const baseUrl = `http://localhost:${DEFAULT_PORT}`;
  const server = spawn(
    "pnpm",
    ["exec", "next", "dev", "--port", String(DEFAULT_PORT)],
    {
      cwd: DOCS_DIR,
      env: process.env,
      stdio: "inherit",
    },
  );
  await waitForServer(baseUrl, server);

  return { baseUrl, server };
}

const { baseUrl, server } = await resolveServer();
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { height: 594, width: 874 } });
  await page.goto(`${baseUrl}/component-gallery-capture`, {
    waitUntil: "networkidle",
  });
  const componentManifest = await page
    .locator("[data-component-gallery-components]")
    .textContent();
  const availableComponents = JSON.parse(componentManifest ?? "[]");
  const requestedComponent = option("--component");
  const components = requestedComponent
    ? availableComponents.filter(
        (component) => component === requestedComponent,
      )
    : availableComponents;

  if (requestedComponent && components.length === 0) {
    throw new Error(`Unknown gallery component: ${requestedComponent}`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  for (const theme of themes) {
    for (const component of components) {
      const url = new URL("/component-gallery-capture", baseUrl);
      url.searchParams.set("component", component);
      url.searchParams.set("theme", theme);
      await page.goto(url.toString(), { waitUntil: "networkidle" });
      await page.locator('[data-capture-status="ready"]').waitFor({
        state: "visible",
        timeout: 30_000,
      });
      const dataUrl = await page
        .locator("[data-component-gallery-result]")
        .textContent();
      if (!dataUrl) throw new Error(`Capture failed for ${theme}-${component}`);

      const png = Buffer.from(dataUrl.split(",")[1], "base64");
      await writeFile(join(OUTPUT_DIR, `${theme}-${component}.png`), png);
      console.log(`Captured ${theme}-${component}.png`);
    }
  }
} finally {
  await browser.close();
  server?.kill("SIGTERM");
}
