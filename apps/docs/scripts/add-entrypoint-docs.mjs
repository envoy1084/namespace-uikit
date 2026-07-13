import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const appRoot = new URL("..", import.meta.url).pathname;
const componentDirectory = join(appRoot, "content/docs/components");
const pages = {
  "calendar-year-picker": [
    "Calendar Year Picker",
    "Year-selection parts shared by Calendar and RangeCalendar.",
    "calendar",
  ],
  "color-input-group": [
    "Color Input Group",
    "Input-group primitives used to compose color fields and pickers.",
    "color-field",
  ],
  "date-input-group": [
    "Date Input Group",
    "Input-group primitives shared by date and time fields.",
    "date-field",
  ],
  header: [
    "Header",
    "An accessible heading primitive for collection sections.",
    "list-box",
  ],
  "list-box-item": [
    "List Box Item",
    "Composable item primitives for ListBox.",
    "list-box",
  ],
  "list-box-section": [
    "List Box Section",
    "Section primitives for grouping ListBox items.",
    "list-box",
  ],
  menu: [
    "Menu",
    "Accessible menu primitives used by Dropdown and context menus.",
    "dropdown",
  ],
  "menu-item": [
    "Menu Item",
    "Interactive item primitives for Menu.",
    "dropdown",
  ],
  "menu-section": [
    "Menu Section",
    "Section primitives for grouping Menu items.",
    "dropdown",
  ],
  rac: [
    "React Aria utilities",
    "React Aria types and helpers re-exported for advanced component composition.",
    "index",
  ],
  radio: [
    "Radio",
    "The individual selection control used inside RadioGroup.",
    "radio-group",
  ],
  "switch-group": [
    "Switch Group",
    "A labelled group of related Switch controls.",
    "switch",
  ],
  tag: [
    "Tag",
    "The individual removable or selectable item used by TagGroup.",
    "tag-group",
  ],
  textarea: ["Text Area", "A multiline text input primitive.", "text-area"],
  textfield: [
    "Text Field",
    "A field container for text inputs and text areas.",
    "text-field",
  ],
};

for (const [slug, [title, description, related]] of Object.entries(pages)) {
  const identifier = title.replaceAll(/[^A-Za-z0-9_$]/g, "");
  const relatedLine =
    related === "index"
      ? ""
      : `\nSee [${related}](./${related}) for complete composition examples and API guidance.\n`;
  const content = `---\ntitle: ${title}\ndescription: ${description}\n---\n\nImport this public entry point directly when composing lower-level UIKit parts.\n\n\`\`\`tsx\nimport * as ${identifier} from "@thenamespace/uikit/${slug}";\n\`\`\`\n${relatedLine}\nThis entry point is also re-exported from \`@thenamespace/uikit\`. Direct imports make the dependency explicit and provide a stable location for advanced customization.\n`;

  await writeFile(join(componentDirectory, `${slug}.mdx`), content);
}

const metaPath = join(componentDirectory, "meta.json");
const meta = JSON.parse(await readFile(metaPath, "utf8"));

meta.pages = [...new Set([...meta.pages, ...Object.keys(pages)])].toSorted();
meta.pages = ["index", ...meta.pages.filter((page) => page !== "index")];

await writeFile(metaPath, `${JSON.stringify(meta, null, 2)}\n`);

console.log(`Added ${Object.keys(pages).length} public entry-point pages.`);
