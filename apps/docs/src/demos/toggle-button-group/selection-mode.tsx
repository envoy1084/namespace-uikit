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

export function SelectionMode() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Single selection</span>
        <ToggleButtonGroup
          defaultSelectedKeys={["center"]}
          selectionMode="single"
        >
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
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Multiple selection</span>
        <ToggleButtonGroup
          defaultSelectedKeys={["bold", "underline"]}
          selectionMode="multiple"
        >
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
