import { Button, Link, Surface, Typography } from "@thenamespace/uikit";
import {
  ArrowUpRight01Icon,
  GithubIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";
import { NameRegistration } from "ens-components";

import { SectionLabel } from "@/components/home/section-label";

const toolkitScope = ["Names", "Records", "Profiles", "Subnames"] as const;

export function HomeHero() {
  return (
    <section className="mx-2 overflow-hidden rounded-b-3xl bg-[#1f1f1f] text-white sm:mx-4 sm:rounded-b-[2rem]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[670px] lg:grid-cols-[minmax(0,1fr)_minmax(22.5rem,0.82fr)] lg:gap-[4.5rem] lg:px-12 lg:py-14">
        <div className="max-w-[42.5rem]">
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

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <NameRegistration
              messages={{ triggerLabel: "Try name registration" }}
              slots={{
                trigger: (
                  <Button
                    className="min-h-13 w-full rounded-[10px] bg-white text-[#1f1f1f] shadow-none hover:bg-[#f4f4f4] sm:w-auto"
                    size="lg"
                  >
                    Try name registration
                    <HugeiconsIcon
                      aria-hidden
                      icon={ArrowUpRight01Icon}
                      size={18}
                    />
                  </Button>
                ),
              }}
            />
            <Link
              className="inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-[10px] border border-[#535353] bg-transparent px-5 text-[15px] font-semibold text-white no-underline transition-colors hover:border-[#8c8c8c] hover:bg-[#2a2a2a] sm:w-auto"
              href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
              rel="noreferrer"
              target="_blank"
            >
              <HugeiconsIcon aria-hidden icon={GithubIcon} size={18} />
              Read the source
            </Link>
          </div>

          <Typography.Paragraph
            className="mt-6 max-w-[31.25rem] leading-5 text-[#8f8f8f]"
            size="xs"
          >
            The first complete component ships today. The system is designed to
            grow with the rest of ENS.
          </Typography.Paragraph>
        </div>

        <Surface className="w-full max-w-[35rem] overflow-hidden rounded-3xl bg-[#f4f4f4] text-[#1f1f1f] shadow-[0_0_0_1px_rgba(255,255,255,0.16)]">
          <div className="flex min-h-14 items-center justify-between border-b border-[#d7d7d7] px-5">
            <Typography.Paragraph
              className="tracking-[0.1em] uppercase"
              size="xs"
              weight="bold"
            >
              Growing toolkit
            </Typography.Paragraph>
            <span className="rounded-md bg-[#5474f6] px-2 py-1 text-xs font-bold tracking-[0.1em] text-white uppercase">
              ENS v2
            </span>
          </div>
          <img
            alt="Namespace ninja mascot holding a shuriken"
            className="block aspect-[628/500] h-auto w-full object-cover"
            height="500"
            src="/images/namespace-mascot.png"
            width="628"
          />
          <div className="grid grid-cols-2 border-t border-[#d7d7d7] sm:grid-cols-4">
            {toolkitScope.map((item, index) => (
              <Typography.Paragraph
                className={[
                  "border-[#d7d7d7] py-4 text-center text-[#1f1f1f]",
                  index % 2 === 0 ? "border-r" : "",
                  index < 2 ? "border-b sm:border-b-0" : "",
                  index < 3 ? "sm:border-r" : "",
                ].join(" ")}
                key={item}
                size="xs"
                weight="medium"
              >
                {item}
              </Typography.Paragraph>
            ))}
          </div>
        </Surface>
      </div>
    </section>
  );
}
