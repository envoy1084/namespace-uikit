import { Surface, Typography } from "@thenamespace/uikit";

import { SectionLabel } from "@/components/home/section-label";

const publicExports = [
  "NameRegistration",
  "useNameAvailability",
  "getNamePrice",
  "commitName",
  "registerName",
] as const;

export function PackageExportStrip() {
  return (
    <Surface
      aria-label="Selected package exports"
      className="flex min-h-[74px] items-center gap-9 overflow-x-auto rounded-none border-y border-[#363636] bg-[#1f1f1f] px-5 text-white shadow-none sm:px-8 lg:px-[max(3rem,calc((100vw-1184px)/2))]"
    >
      <SectionLabel inverse>Inside the package</SectionLabel>
      <div className="flex items-center gap-7 whitespace-nowrap">
        {publicExports.map((item) => (
          <div className="flex items-center gap-7" key={item}>
            <span aria-hidden className="text-[#5474f6]">
              ✦
            </span>
            <Typography.Code className="bg-transparent p-0 font-sans text-sm font-medium text-white">
              {item}
            </Typography.Code>
          </div>
        ))}
      </div>
    </Surface>
  );
}
