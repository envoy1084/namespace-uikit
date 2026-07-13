"use client";

import { useState } from "react";

import { Button } from "@thenamespace/uikit";

export function ComponentPreviewCode({ code }: { code: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-separator relative rounded-b-xl border bg-transparent">
      <div
        className={`${expanded ? "pb-10" : "mask-to-bottom max-h-[150px] overflow-hidden"} relative`}
      >
        <pre className="docs-code-block m-0 max-h-[34rem] overflow-auto rounded-none border-none p-4 text-xs shadow-none">
          <code>
            {expanded ? code : code.split("\n").slice(0, 5).join("\n")}
          </code>
        </pre>
      </div>
      <Button
        className="bg-surface absolute right-1/2 bottom-2 translate-x-1/2 text-xs shadow-sm shadow-black/5"
        size="sm"
        type="button"
        variant="tertiary"
        onPress={() => setExpanded((value) => !value)}
      >
        {expanded ? "Collapse code" : "Expand code"}
      </Button>
    </div>
  );
}
