import { ToggleButton, ToggleButtonGroup } from "@thenamespace/uikit";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
} from "@thenamespace/uikit/icons";

export function WithoutSeparator() {
  return (
    <ToggleButtonGroup selectionMode="multiple">
      <ToggleButton isIconOnly aria-label="Bold" id="bold">
        <Bold />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Italic" id="italic">
        <Italic />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Underline" id="underline">
        <Underline />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Strikethrough" id="strikethrough">
        <Strikethrough />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
