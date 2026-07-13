import { Button, ButtonGroup } from "@thenamespace/uikit";
import {
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Orientation() {
  return (
    <div className="flex items-start gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Horizontal</span>
        <ButtonGroup orientation="horizontal" variant="tertiary">
          <Button isIconOnly>
            <HugeiconsIcon icon={TextAlignLeftIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignCenterIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignRightIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignJustifyCenterIcon} />
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted text-sm">Vertical</span>
        <ButtonGroup orientation="vertical" variant="tertiary">
          <Button isIconOnly>
            <HugeiconsIcon icon={TextAlignLeftIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignCenterIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignRightIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignJustifyCenterIcon} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
