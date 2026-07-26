import { Surface, Typography } from "@thenamespace/uikit";

import { SectionLabel } from "@/components/home/section-label";

const toolkitLayers = [
  {
    label: "Components",
    description:
      "Complete ENS flows with the difficult states already handled.",
  },
  {
    label: "Hooks",
    description: "Query-ready React primitives for names, prices, and status.",
  },
  {
    label: "Actions",
    description: "Typed contract calls for products that need full control.",
  },
] as const;

export function ToolkitOverview() {
  return (
    <section
      aria-labelledby="toolkit-title"
      className="bg-[#1f1f1f] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(15rem,0.7fr)_minmax(0,1.3fr)] lg:gap-[4.5rem] lg:px-12 lg:py-28">
        <div>
          <div className="flex items-center gap-2.5">
            <span aria-hidden className="size-[9px] rounded-sm bg-[#5474f6]" />
            <SectionLabel inverse>What this provides</SectionLabel>
          </div>
          <Typography.Heading
            className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[0.98] font-bold tracking-[-0.05em] text-balance text-white"
            id="toolkit-title"
            level={2}
          >
            One toolkit. Three levels of control.
          </Typography.Heading>
        </div>

        <div className="border-t border-[#4b4b4b]">
          {toolkitLayers.map((layer) => (
            <Surface
              className="grid gap-2 rounded-none border-0 border-b border-[#4b4b4b] bg-transparent px-0 py-6 text-white shadow-none sm:grid-cols-[minmax(8rem,0.42fr)_1fr] sm:gap-8"
              key={layer.label}
            >
              <Typography.Heading
                className="flex items-center gap-3 text-[19px] tracking-[-0.02em] text-white"
                level={3}
              >
                <span aria-hidden className="size-2 rounded-sm bg-[#5474f6]" />
                {layer.label}
              </Typography.Heading>
              <Typography.Paragraph className="max-w-lg leading-6 text-[#bcbcbc]">
                {layer.description}
              </Typography.Paragraph>
            </Surface>
          ))}
        </div>
      </div>
    </section>
  );
}
