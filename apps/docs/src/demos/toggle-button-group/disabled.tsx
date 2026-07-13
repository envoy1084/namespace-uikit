import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import { Bold, Italic, Underline } from "@thenamespace/uikit/icons";

export function Disabled() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">All buttons disabled</span>
        <ToggleButtonGroup isDisabled selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Individual button disabled</span>
        <ToggleButtonGroup selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <Bold />
          </ToggleButton>
          <ToggleButton isDisabled isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <Italic />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <Underline />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
