import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Small</span>
        <ToggleButtonGroup selectionMode="multiple" size="sm">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextStrikethroughIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Medium (default)</span>
        <ToggleButtonGroup selectionMode="multiple" size="md">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextStrikethroughIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Large</span>
        <ToggleButtonGroup selectionMode="multiple" size="lg">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <HugeiconsIcon icon={TextStrikethroughIcon} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
