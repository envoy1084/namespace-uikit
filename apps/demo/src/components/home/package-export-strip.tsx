import { Surface, Typography } from "@thenamespace/uikit";

import { SectionLabel } from "@/components/home/section-label";

const packageAreas = [
  { isAvailable: true, label: "Name registration" },
  { isAvailable: false, label: "Profile update" },
  { isAvailable: false, label: "Name card" },
  { isAvailable: true, label: "Actions" },
  { isAvailable: true, label: "Hooks" },
] as const;

export function PackageExportStrip() {
  return (
    <Surface
      aria-label="Selected package exports"
      className="flex min-h-[74px] items-center gap-9 overflow-x-auto rounded-none border-y border-[#363636] bg-[#1f1f1f] px-5 text-white shadow-none sm:px-8 lg:px-[max(3rem,calc((100vw-1184px)/2))]"
    >
      <SectionLabel inverse>Inside the package</SectionLabel>
      <div className="flex items-center gap-7 whitespace-nowrap">
        {packageAreas.map((item) => (
          <div
            aria-label={
              item.isAvailable ? item.label : `${item.label}, coming soon`
            }
            className="flex items-center gap-7"
            key={item.label}
          >
            <span
              aria-hidden
              className={item.isAvailable ? "text-[#5474f6]" : "text-[#4b4b4b]"}
            >
              ✦
            </span>
            <Typography.Paragraph
              className={item.isAvailable ? "text-white" : "text-[#6f6f6f]"}
              size="sm"
              weight="medium"
            >
              {item.label}
            </Typography.Paragraph>
          </div>
        ))}
      </div>
    </Surface>
  );
}
