import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithoutSeparator() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="Bold" id="bold">
        <HugeiconsIcon icon={TextBoldIcon} />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" id="italic">
        <HugeiconsIcon icon={TextItalicIcon} />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" id="underline">
        <HugeiconsIcon icon={TextUnderlineIcon} />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
        <HugeiconsIcon icon={TextStrikethroughIcon} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
