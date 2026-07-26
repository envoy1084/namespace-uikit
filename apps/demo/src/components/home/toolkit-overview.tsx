import { Surface, Typography } from "@thenamespace/uikit";

const toolkitLayers = [
  {
    label: "Components",
    description: "Complete product flows.",
  },
  {
    label: "Hooks",
    description: "Query-ready React state.",
  },
  {
    label: "Actions",
    description: "Typed contract calls.",
  },
] as const;

export function ToolkitOverview() {
  return (
    <section
      aria-labelledby="toolkit-title"
      className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20"
    >
      <Typography.Heading
        className="text-2xl tracking-[-0.03em]"
        id="toolkit-title"
        level={2}
      >
        Use what you need.
      </Typography.Heading>
      <div className="mt-5 grid border-t border-[#bcbcbc] md:grid-cols-3">
        {toolkitLayers.map((layer) => (
          <Surface
            className="rounded-none border-0 border-b border-[#bcbcbc] bg-transparent px-0 py-5 shadow-none md:border-r md:px-6 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            key={layer.label}
          >
            <Typography.Heading
              className="text-[19px] tracking-[-0.02em]"
              level={3}
            >
              {layer.label}
            </Typography.Heading>
            <Typography.Paragraph className="mt-1 text-[#666]" size="sm">
              {layer.description}
            </Typography.Paragraph>
          </Surface>
        ))}
      </div>
    </section>
  );
}
