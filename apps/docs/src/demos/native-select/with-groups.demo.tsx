"use client";

// @demo-title With Groups
import { NativeSelect } from "@thenamespace/uikit";

export const DemoWithGroupsExample = () => (
  <div className="w-[220px]">
    <NativeSelect>
      <NativeSelect.Trigger>
        <NativeSelect.Option value="">Select department</NativeSelect.Option>
        {[
          ["Engineering", ["Frontend", "Backend", "DevOps"]],
          ["Sales", ["Sales Rep", "Account Manager", "Sales Director"]],
          [
            "Operations",
            ["Customer Support", "Product Manager", "Operations Manager"],
          ],
        ].map(([group, options]) => (
          <NativeSelect.OptGroup key={group as string} label={group as string}>
            {(options as string[]).map((option) => (
              <NativeSelect.Option
                key={option}
                value={option.toLowerCase().replaceAll(" ", "-")}
              >
                {option}
              </NativeSelect.Option>
            ))}
          </NativeSelect.OptGroup>
        ))}
        <NativeSelect.Indicator />
      </NativeSelect.Trigger>
    </NativeSelect>
  </div>
);
