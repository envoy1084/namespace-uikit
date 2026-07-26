import { Link, Typography } from "@thenamespace/uikit";
import { GithubIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { InstallCommand } from "@/components/home/install-command";
import { SectionLabel } from "@/components/home/section-label";

export function HomeHero() {
  return (
    <section className="mx-2 overflow-hidden rounded-b-3xl bg-[#1f1f1f] text-white sm:mx-4 sm:rounded-b-[2rem]">
      <div className="mx-auto grid max-w-7xl lg:min-h-[670px] lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]">
        <div className="flex max-w-[47rem] flex-col justify-center px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-14">
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="size-[9px] rounded-sm bg-[#5474f6]" />
            <SectionLabel inverse>Open-source toolkit for ENS v2</SectionLabel>
          </div>

          <Typography.Heading
            className="mt-6 max-w-[41.25rem] text-[clamp(3.2rem,6vw,5.75rem)] leading-[0.94] font-bold tracking-[-0.055em] text-balance text-white"
            level={1}
          >
            Build the ENS layer your product needs.
          </Typography.Heading>
          <Typography.Paragraph className="mt-7 max-w-[38rem] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-[1.55] text-[#d2d2d2]">
            A growing set of React components, hooks, and typed actions for
            names, records, profiles, and the ENS flows still to come.
          </Typography.Paragraph>

          <InstallCommand />

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-white no-underline"
              href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
              rel="noreferrer"
              target="_blank"
            >
              <HugeiconsIcon aria-hidden icon={GithubIcon} size={18} />
              Read the source
            </Link>
            <Typography.Paragraph className="text-[#8f8f8f]" size="xs">
              React 19 · Viem · Wagmi
            </Typography.Paragraph>
          </div>
        </div>

        <div className="flex min-h-[22rem] items-center overflow-hidden bg-[#f4f4f4] lg:min-h-full">
          <img
            alt="Namespace ninja mascot holding a shuriken"
            className="block h-auto w-full object-contain"
            height="500"
            src="/images/namespace-mascot.png"
            width="628"
          />
        </div>
      </div>
    </section>
  );
}
