"use client";

import { Switch } from "@thenamespace/uikit";
import {
  Notification01Icon,
  NotificationOff01Icon,
  CheckmarkSquare02Icon,
  Mic01Icon,
  MicOff01Icon,
  Moon02Icon,
  PowerServiceIcon,
  Sun01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithIcons() {
  const icons = {
    check: {
      off: PowerServiceIcon,
      on: CheckmarkSquare02Icon,
      selectedControlClass: "bg-green-500/80",
    },
    darkMode: {
      off: Moon02Icon,
      on: Sun01Icon,
      selectedControlClass: "",
    },
    microphone: {
      off: Mic01Icon,
      on: MicOff01Icon,
      selectedControlClass: "bg-red-500/80",
    },
    notification: {
      off: NotificationOff01Icon,
      on: Notification01Icon,
      selectedControlClass: "bg-purple-500/80",
    },
    volume: {
      off: VolumeHighIcon,
      on: VolumeOffIcon,
      selectedControlClass: "bg-blue-500/80",
    },
  };

  return (
    <div className="flex gap-3">
      {Object.entries(icons).map(([key, value]) => (
        <Switch key={key} defaultSelected aria-label={key} size="lg">
          {({ isSelected }) => (
            <Switch.Content>
              <Switch.Control
                className={isSelected ? value.selectedControlClass : ""}
              >
                <Switch.Thumb>
                  <Switch.Icon>
                    <HugeiconsIcon
                      className={
                        isSelected
                          ? "size-3 text-inherit opacity-100"
                          : "size-3 text-inherit opacity-70"
                      }
                      icon={isSelected ? value.on : value.off}
                    />
                  </Switch.Icon>
                </Switch.Thumb>
              </Switch.Control>
            </Switch.Content>
          )}
        </Switch>
      ))}
    </div>
  );
}
