import { Typography } from "@thenamespace/uikit";

import { InstallCommand } from "@/components/home/install-command";
import { SectionLabel } from "@/components/home/section-label";

export function HomeHero() {
  return (
    <section className="mx-2 overflow-hidden rounded-b-3xl bg-white text-[#1f1f1f] sm:mx-4 sm:rounded-b-[2rem]">
      <div className="mx-auto grid max-w-7xl lg:min-h-[680px] lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]">
        <div className="z-10 flex max-w-[44rem] flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-14 lg:pr-0">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="size-[9px] rounded-sm bg-[#5474f6]" />
            <SectionLabel>ENS v2 for React</SectionLabel>
          </div>

          <Typography.Heading
            className="mt-6 max-w-[41.25rem] text-[clamp(3.2rem,6vw,5.75rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-[#1f1f1f]"
            level={1}
          >
            ENS integration, ready to ship.
          </Typography.Heading>
          <Typography.Paragraph className="mt-7 max-w-[34rem] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-[#5f5f5f]">
            Production-ready React components, hooks, and typed actions for ENS
            v2.
          </Typography.Paragraph>

          <InstallCommand />
        </div>

        <div className="relative flex min-h-[24rem] items-center overflow-hidden lg:min-h-full">
          <img
            alt="Namespace ninja mascot illustration"
            className="block h-full max-h-[46rem] w-full object-contain object-center lg:scale-110"
            height="1029"
            src="/images/namespace-hero.svg"
            width="1134"
          />
        </div>
      </div>
    </section>
  );
}
