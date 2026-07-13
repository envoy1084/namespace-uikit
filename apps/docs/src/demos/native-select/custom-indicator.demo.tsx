"use client";

// @demo-title Custom Indicator
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { NativeSelect } from "@thenamespace/uikit";
import { Label } from "@thenamespace/uikit/label";

export const DemoCustomIndicatorExample = () => (
  <div className="w-[220px]">
    <NativeSelect fullWidth>
      <Label>Priority</Label>
      <NativeSelect.Trigger name="priority">
        {["Select priority", "Low", "Medium", "High", "Critical"].map(
          (label, index) => (
            <NativeSelect.Option
              key={label}
              value={index ? label.toLowerCase() : ""}
            >
              {label}
            </NativeSelect.Option>
          ),
        )}
        <NativeSelect.Indicator>
          <HugeiconsIcon icon={UnfoldMoreIcon} />
        </NativeSelect.Indicator>
      </NativeSelect.Trigger>
    </NativeSelect>
  </div>
);
