import { Button, Typography } from "@thenamespace/uikit";
import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { NameRenewal } from "ens-components";

import { SectionLabel } from "@/components/home/section-label";

const DEMO_NAME = "enscomponents.eth";

export function RenewalShowcase() {
  return (
    <section
      aria-labelledby="renewal-title"
      className="border-y border-[#dedede] bg-white"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(28rem,1fr)_minmax(16.25rem,0.72fr)] lg:gap-20 lg:px-12 lg:py-30">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-[#d7d7d7] bg-white shadow-sm">
          <NameRenewal defaultLabel={DEMO_NAME} presentation="inline" />
        </div>

        <div className="lg:sticky lg:top-28 lg:pt-6">
          <SectionLabel>Available now</SectionLabel>
          <Typography.Heading
            className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
            id="renewal-title"
            level={2}
          >
            Name renewal.
          </Typography.Heading>
          <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
            Live expiry, flexible duration, token pricing, and renewal.
          </Typography.Paragraph>
          <NameRenewal
            defaultLabel={DEMO_NAME}
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
        </div>
      </div>
    </section>
  );
}
