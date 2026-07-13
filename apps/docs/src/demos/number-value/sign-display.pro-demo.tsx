"use client";

// @demo-title Sign Display
import { NumberValue } from "@thenamespace/uikit";

export const ProSignDisplayExample = () => (
  <div className="flex flex-col gap-3 rounded-2xl p-6">
    {(["auto", "always", "exceptZero", "never"] as const).map((signDisplay) => (
      <div className="flex items-baseline gap-4" key={signDisplay}>
        <span className="text-muted w-24 text-xs">{signDisplay}</span>
        <div className="flex gap-4">
          {[42, 0, -42].map((value) => (
            <NumberValue
              className="text-foreground font-semibold"
              key={value}
              signDisplay={signDisplay}
              value={value}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);
