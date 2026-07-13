import { Button, ButtonGroup } from "@thenamespace/uikit";
import {
  Globe02Icon,
  Add01Icon,
  Delete02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithIcons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">With icons</p>
        <ButtonGroup variant="secondary">
          <Button>
            <HugeiconsIcon icon={Globe02Icon} />
            Search
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={Add01Icon} />
            Add
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={Delete02Icon} />
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">Icon only buttons</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <HugeiconsIcon icon={Globe02Icon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={Add01Icon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={Delete02Icon} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
