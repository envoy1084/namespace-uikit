import { getDemo } from "@/demos";

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
    <div className="not-prose border-separator my-6 overflow-hidden rounded-xl border">
      {description ? (
        <p className="border-separator text-muted border-b p-4 text-sm">
          {description}
        </p>
      ) : null}
      <div
        className={`flex w-full p-6 sm:p-10 ${alignment} ${isBgSolid ? "bg-background" : "bg-surface-secondary"}`}
        style={{ minHeight: minHeight ?? "20rem" }}
      >
        <Demo />
      </div>
      {code ? (
        <details className="border-separator border-t">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
            View code
          </summary>
          <pre className="border-separator max-h-[32rem] overflow-auto border-t p-4 text-xs">
            <code>{code}</code>
          </pre>
        </details>
      ) : null}
    </div>
  );
}
