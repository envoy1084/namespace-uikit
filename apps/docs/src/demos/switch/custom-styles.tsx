"use client";

import { Switch } from "@thenamespace/uikit";
import {
  CheckmarkSquare02Icon,
  PowerServiceIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function CustomStyles() {
  return (
    <Switch aria-label="Power">
      {({ isSelected }) => (
        <Switch.Content>
          <Switch.Control
            className={`h-[31px] w-[51px] bg-blue-500 ${isSelected ? "bg-cyan-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]" : ""}`}
          >
            <Switch.Thumb
              className={`size-[27px] bg-white shadow-sm ${isSelected ? "ms-[22px] shadow-lg" : ""}`}
            >
              <Switch.Icon>
                {isSelected ? (
                  <HugeiconsIcon
                    icon={CheckmarkSquare02Icon}
                    className="size-4 text-cyan-600"
                  />
                ) : (
                  <HugeiconsIcon
                    icon={PowerServiceIcon}
                    className="size-4 text-blue-600"
                  />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Content>
      )}
    </Switch>
  );
}
