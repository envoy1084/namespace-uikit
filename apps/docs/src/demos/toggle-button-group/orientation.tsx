import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Orientation() {
  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Horizontal</span>
        <ToggleButtonGroup orientation="horizontal" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <HugeiconsIcon icon={TextBoldIcon} />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextItalicIcon} />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextUnderlineIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Vertical</span>
        <ToggleButtonGroup orientation="vertical" selectionMode="multiple">
          <ToggleButton isIconOnly aria-label="Bold" id="bold">
            <HugeiconsIcon icon={TextBoldIcon} />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Italic" id="italic">
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextItalicIcon} />
          </ToggleButton>
          <ToggleButton isIconOnly aria-label="Underline" id="underline">
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextUnderlineIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
