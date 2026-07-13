import { Button, ButtonGroup } from "@thenamespace/uikit";
import {
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <ButtonGroup fullWidth>
        <Button>First</Button>
        <Button>
          <ButtonGroup.Separator />
          Second
        </Button>
        <Button>
          <ButtonGroup.Separator />
          Third
        </Button>
      </ButtonGroup>
      <ButtonGroup fullWidth>
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
      </ButtonGroup>
    </div>
  );
}
