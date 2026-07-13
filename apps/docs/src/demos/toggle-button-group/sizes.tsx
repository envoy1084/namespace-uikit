import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@thenamespace/uikit/icons";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Small</span>
        <ToggleButtonGroup selectionMode="multiple" size="sm">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Medium (default)</span>
        <ToggleButtonGroup selectionMode="multiple" size="md">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Large</span>
        <ToggleButtonGroup selectionMode="multiple" size="lg">
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
          <ToggleButton
            isIconOnly
            aria-label="Strikethrough"
            id="strikethrough"
          >
            <ToggleButtonGroup.Separator />
            <Strikethrough />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}
