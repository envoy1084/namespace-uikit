import {
  Button,
  ButtonGroup,
  Separator,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from "@thenamespace/uikit";
import {
  TextBoldIcon,
  Copy01Icon,
  TextItalicIcon,
  ScissorIcon,
  TextUnderlineIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Attached() {
  return (
    <Toolbar isAttached aria-label="Text formatting">
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
        <Button isIconOnly aria-label="Copy">
          <HugeiconsIcon icon={Copy01Icon} />
        </Button>
        <Button isIconOnly aria-label="Cut">
          <ButtonGroup.Separator />
          <HugeiconsIcon icon={ScissorIcon} />
        </Button>
      </ButtonGroup>
    </Toolbar>
  );
}
