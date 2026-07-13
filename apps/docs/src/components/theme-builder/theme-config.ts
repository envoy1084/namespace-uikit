import type { ThemeFont } from "./font-utils";

export const colorGroups = [
  {
    label: "Brand & status",
    tokens: [
      "accent",
      "accent-foreground",
      "accent-soft-foreground",
      "focus",
      "success",
      "success-foreground",
      "warning",
      "warning-foreground",
      "danger",
      "danger-foreground",
    ],
  },
  {
    label: "Chart palette",
    tokens: [
      "chart-base",
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
    ],
  },
  {
    label: "Foundations",
    tokens: [
      "background",
      "foreground",
      "muted",
      "border",
      "separator",
      "scrollbar",
    ],
  },
  {
    label: "Surfaces",
    tokens: [
      "surface",
      "surface-foreground",
      "surface-secondary",
      "surface-secondary-foreground",
      "surface-tertiary",
      "surface-tertiary-foreground",
      "overlay",
      "overlay-foreground",
      "segment",
      "segment-foreground",
      "default",
      "default-foreground",
    ],
  },
  {
    label: "Fields",
    tokens: [
      "field-background",
      "field-border",
      "field-foreground",
      "field-placeholder",
    ],
  },
] as const;

export type ColorToken = (typeof colorGroups)[number]["tokens"][number];
export type ThemeMode = "light" | "dark";
export type ThemeColors = Record<ColorToken, string>;

export type ThemeConfig = {
  colors: Record<ThemeMode, ThemeColors>;
  customFonts: ThemeFont[];
  fieldRadius: number;
  font: ThemeFont;
  radius: number;
};

const sharedColors = {
  "chart-base": "oklch(62.04% 0.195 253.83)",
} as const;

export const defaultTheme: ThemeConfig = {
  colors: {
    light: {
      accent: "oklch(23.929% 0.00003 271.152)",
      "accent-foreground": "oklch(99.11% 0 0)",
      "accent-soft-foreground": "oklch(0 0 0)",
      background: "oklch(97.02% 0 0)",
      border: "oklch(90% 0 0)",
      "chart-base": sharedColors["chart-base"],
      "chart-1": "oklch(38.04% 0.195 253.83)",
      "chart-2": "oklch(50.04% 0.195 253.83)",
      "chart-3": sharedColors["chart-base"],
      "chart-4": "oklch(74.04% 0.195 253.83)",
      "chart-5": "oklch(86.04% 0.195 253.83)",
      danger: "oklch(0.573 0.2249 21.97)",
      "danger-foreground": "oklch(98% 0.02 21.97)",
      default: "oklch(94% 0 0)",
      "default-foreground": "oklch(21.03% 0.0059 0)",
      "field-background": "oklch(100% 0 0)",
      "field-border": "transparent",
      "field-foreground": "oklch(21.03% 0 0)",
      "field-placeholder": "oklch(55.17% 0 0)",
      focus: "oklch(0 0 0)",
      foreground: "oklch(21.03% 0 0)",
      muted: "oklch(55.17% 0 0)",
      overlay: "oklch(100% 0 0)",
      "overlay-foreground": "oklch(21.03% 0 0)",
      scrollbar: "oklch(87.1% 0 0)",
      segment: "oklch(100% 0 0)",
      "segment-foreground": "oklch(21.03% 0 0)",
      separator: "oklch(92% 0 0)",
      success: "oklch(0.6277 0.1604 153.06)",
      "success-foreground": "oklch(98% 0.016 153.06)",
      surface: "oklch(100% 0 0)",
      "surface-foreground": "oklch(21.03% 0 0)",
      "surface-secondary": "oklch(95.24% 0 0)",
      "surface-secondary-foreground": "oklch(21.03% 0 0)",
      "surface-tertiary": "oklch(93.73% 0 0)",
      "surface-tertiary-foreground": "oklch(21.03% 0 0)",
      warning: "oklch(0.8446 0.1525 80.6)",
      "warning-foreground": "oklch(15% 0.0457 80.6)",
    },
    dark: {
      accent: "oklch(0.9848 0 0)",
      "accent-foreground": "oklch(15% 0 0)",
      "accent-soft-foreground": "oklch(0.9848 0 0)",
      background: "oklch(12% 0 0)",
      border: "oklch(28% 0 0)",
      "chart-base": sharedColors["chart-base"],
      "chart-1": "oklch(38.04% 0.195 253.83)",
      "chart-2": "oklch(50.04% 0.195 253.83)",
      "chart-3": sharedColors["chart-base"],
      "chart-4": "oklch(74.04% 0.195 253.83)",
      "chart-5": "oklch(86.04% 0.195 253.83)",
      danger: "oklch(0.7044 0.1872 23.19)",
      "danger-foreground": "oklch(15% 0.05 23.19)",
      default: "oklch(27.4% 0 0)",
      "default-foreground": "oklch(99.11% 0 0)",
      "field-background": "oklch(21.03% 0 0)",
      "field-border": "transparent",
      "field-foreground": "oklch(99.11% 0 0)",
      "field-placeholder": "oklch(70.5% 0 0)",
      focus: "oklch(0.9848 0 0)",
      foreground: "oklch(99.11% 0 0)",
      muted: "oklch(70.5% 0 0)",
      overlay: "oklch(21.03% 0 0)",
      "overlay-foreground": "oklch(99.11% 0 0)",
      scrollbar: "oklch(70.5% 0 0)",
      segment: "oklch(39.64% 0 0)",
      "segment-foreground": "oklch(99.11% 0 0)",
      separator: "oklch(25% 0 0)",
      success: "oklch(0.6514 0.1321 156.22)",
      "success-foreground": "oklch(15% 0.0396 156.22)",
      surface: "oklch(21.03% 0 0)",
      "surface-foreground": "oklch(99.11% 0 0)",
      "surface-secondary": "oklch(25.7% 0 0)",
      "surface-secondary-foreground": "oklch(99.11% 0 0)",
      "surface-tertiary": "oklch(27.21% 0 0)",
      "surface-tertiary-foreground": "oklch(99.11% 0 0)",
      warning: "oklch(0.8803 0.1348 86.06)",
      "warning-foreground": "oklch(15% 0.0404 86.06)",
    },
  },
  customFonts: [],
  fieldRadius: 0.6,
  font: {
    family: '"Inter", ui-sans-serif, system-ui, sans-serif',
    id: "inter",
    label: "Inter",
    source:
      "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
  radius: 0.4,
};

export const fontOptions: ThemeFont[] = [
  {
    family: '"Inter", ui-sans-serif, system-ui, sans-serif',
    id: "inter",
    label: "Inter",
    source:
      "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
  {
    family: '"Figtree", ui-sans-serif, system-ui, sans-serif',
    id: "figtree",
    label: "Figtree",
    source:
      "https://fonts.googleapis.com/css2?family=Figtree:wght@300..900&display=swap",
  },
  {
    family: '"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif',
    id: "hanken-grotesk",
    label: "Hanken Grotesk",
    source:
      "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@100..900&display=swap",
  },
  {
    family: '"Geist", ui-sans-serif, system-ui, sans-serif',
    id: "geist",
    label: "Geist",
    source:
      "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
  },
  {
    family: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    id: "dm-sans",
    label: "DM Sans",
    source:
      "https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..900&display=swap",
  },
  {
    family: '"Public Sans", ui-sans-serif, system-ui, sans-serif',
    id: "public-sans",
    label: "Public Sans",
    source:
      "https://fonts.googleapis.com/css2?family=Public+Sans:wght@100..900&display=swap",
  },
  {
    family: '"Fraunces", ui-serif, Georgia, serif',
    id: "fraunces",
    label: "Fraunces",
    source:
      "https://fonts.googleapis.com/css2?family=Fraunces:wght@100..900&display=swap",
  },
  {
    family: '"IBM Plex Mono", ui-monospace, monospace',
    id: "ibm-plex-mono",
    label: "IBM Plex Mono",
    source:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap",
  },
];
