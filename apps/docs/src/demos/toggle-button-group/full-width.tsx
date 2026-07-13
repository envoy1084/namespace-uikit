import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-full max-w-md space-y-3">
      <ToggleButtonGroup fullWidth selectionMode="multiple">
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
        <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextStrikethroughIcon} />
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup fullWidth selectionMode="single">
        <ToggleButton id="left">
          <HugeiconsIcon icon={TextAlignLeftIcon} />
          Left
        </ToggleButton>
        <ToggleButton id="center">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextAlignCenterIcon} />
          Center
        </ToggleButton>
        <ToggleButton id="right">
          <ToggleButtonGroup.Separator />
          <HugeiconsIcon icon={TextAlignRightIcon} />
          Right
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
