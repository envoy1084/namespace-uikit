import { Surface, Typography } from "@thenamespace/uikit";
import { NameRegistration } from "ens-components";

import { SectionLabel } from "@/components/home/section-label";

const features = [
  "Inline or dialog",
  "Custom slots and messages",
  "Lifecycle callbacks",
] as const;

export function RegistrationShowcase() {
  return (
    <section
      aria-labelledby="registration-title"
      className="mx-auto grid max-w-7xl scroll-mt-24 items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(16.25rem,0.72fr)_minmax(28rem,1fr)] lg:gap-20 lg:px-12 lg:py-30"
      id="playground"
    >
      <div className="lg:sticky lg:top-28 lg:pt-6">
        <SectionLabel>Available now · Component 01</SectionLabel>
        <Typography.Heading
          className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.05em] text-balance"
          id="registration-title"
          level={2}
        >
          Name registration, end to end.
        </Typography.Heading>
        <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
          Availability, pricing, commitment timing, payment approval, and
          registration—composed into one production-ready flow.
        </Typography.Paragraph>
        <div className="mt-9 flex flex-col gap-2 border-t border-[#bcbcbc] pt-5">
          {features.map((item) => (
            <Typography.Paragraph
              className="flex items-center gap-2.5 text-[#4b4b4b]"
              key={item}
              size="xs"
              weight="medium"
            >
              <span aria-hidden className="size-2 rounded-full bg-[#5474f6]" />
              {item}
            </Typography.Paragraph>
          ))}
        </div>
      </div>

      <Surface className="flex flex-col items-center rounded-[1.875rem] bg-white p-2.5 shadow-[0_0_0_1px_#dedede] max-sm:-mx-2.5 max-sm:rounded-3xl max-sm:p-1.5">
        <div className="flex min-h-12 w-full items-center justify-between px-3 sm:px-4">
          <Typography.Paragraph
            className="flex items-center gap-2 tracking-[0.08em] text-[#6f6f6f] uppercase"
            size="xs"
            weight="bold"
          >
            <span
              aria-hidden
              className="size-[7px] rounded-full bg-[#5474f6]"
            />
            Live on Sepolia
          </Typography.Paragraph>
          <Typography.Code className="hidden rounded-md bg-[#f4f4f4] px-2 py-1 text-[10px] font-medium text-[#555] sm:block">
            presentation=&quot;inline&quot;
          </Typography.Code>
        </div>
        <NameRegistration presentation="inline" />
      </Surface>
    </section>
  );
}
