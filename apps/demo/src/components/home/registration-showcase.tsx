import { Button, Typography } from "@thenamespace/uikit";
import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
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
        <NameRegistration
          messages={{ triggerLabel: "Open dialog demo" }}
          slots={{
            trigger: (
              <Button className="mt-7" size="lg">
                Open dialog demo
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowUpRight01Icon}
                  size={18}
                />
              </Button>
            ),
          }}
        />
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

      <div className="mx-auto w-full max-w-md rounded-3xl border border-[#d7d7d7] bg-white shadow-sm">
        <NameRegistration presentation="inline" />
      </div>
    </section>
  );
}
