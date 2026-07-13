import { ComponentPreviewCode } from "@/components/component-preview-code";
import { getDemo } from "@/demos";
import { cn } from "@/utils/cn";

interface ComponentPreviewProps {
  align?: "center" | "end" | "start";
  description?: string;
  hideCode?: boolean;
  isBgSolid?: boolean;
  minHeight?: string;
  name: string;
}

export async function ComponentPreview({
  align = "center",
  description,
  hideCode = false,
  isBgSolid = false,
  minHeight,
  name,
}: ComponentPreviewProps) {
  const demo = getDemo(name);

  if (!demo) {
    return (
      <p className="border-danger my-4 rounded-xl border p-4">
        Unknown demo: {name}
      </p>
    );
  }

  const Demo = await demo.loader();
  const code = hideCode ? undefined : demo.source;
  const alignment = {
    center: "items-center justify-center",
    end: "items-end justify-end",
    start: "items-start justify-start",
  }[align];

  return (
    <div
      className="component-preview-container group relative my-4 w-full"
      data-name={name}
    >
      {description ? (
        <p className="text-muted-foreground mb-2 text-sm">{description}</p>
      ) : null}
      <div
        className={cn(
          "preview not-prose border-separator relative flex min-h-[350px] w-full overflow-hidden rounded-t-xl border-t border-r border-l p-4 sm:p-10",
          isBgSolid && "bg-background",
          alignment,
        )}
      >
        <div
          className="flex w-full items-center justify-center"
          style={{ minHeight }}
        >
          <Demo />
        </div>
      </div>
      {code ? <ComponentPreviewCode code={code} /> : null}
    </div>
  );
}
