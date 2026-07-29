import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@thenamespace/uikit";
import {
  RedoIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  UndoIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Vertical() {
  return (
    <Toolbar aria-label="Tools" orientation="vertical">
      <ToggleButtonGroup aria-label="Text style" selectionMode="multiple">
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
      <Separator />
      <ButtonGroup variant="tertiary">
        <Button isIconOnly aria-label="Undo">
          <HugeiconsIcon icon={UndoIcon} />
        </Button>
        <Button isIconOnly aria-label="Redo">
          <ButtonGroup.Separator />
          <HugeiconsIcon icon={RedoIcon} />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}
