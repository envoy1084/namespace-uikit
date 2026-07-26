import { Typography } from "@thenamespace/uikit";

import { InstallCommand } from "@/components/home/install-command";
import { SectionLabel } from "@/components/home/section-label";

export function HomeHero() {
  return (
    <section className="mx-2 overflow-hidden rounded-b-3xl bg-[#1f1f1f] text-white sm:mx-4 sm:rounded-b-[2rem]">
      <div className="mx-auto grid max-w-7xl lg:min-h-[670px] lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
        <div className="flex max-w-[47rem] flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-14">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="size-[9px] rounded-sm bg-[#5474f6]" />
            <SectionLabel inverse>ENS v2 for React</SectionLabel>
          </div>

          <Typography.Heading
            className="mt-6 max-w-[41.25rem] text-[clamp(3.2rem,6vw,5.75rem)] leading-[0.94] font-bold tracking-[-0.055em] text-balance text-white"
            level={1}
          >
            Build the ENS layer your product needs.
          </Typography.Heading>
          <Typography.Paragraph className="mt-7 max-w-[38rem] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-[#d2d2d2]">
            Components, hooks, and typed actions for building ENS apps.
          </Typography.Paragraph>

          <InstallCommand />
        </div>

        <div className="flex min-h-[22rem] items-center overflow-hidden bg-[#f4f4f4] lg:min-h-full">
          <img
            alt="Namespace ninja mascot illustration"
            className="block h-full max-h-[44rem] w-full object-contain object-center"
            height="1029"
            src="/images/namespace-hero.svg"
            width="1134"
          />
        </div>
      </div>
    </section>
  );
}
