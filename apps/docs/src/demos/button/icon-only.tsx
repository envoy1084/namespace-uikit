import { Button } from "@thenamespace/uikit";
import {
  MoreHorizontalIcon,
  Settings01Icon,
  Delete02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function IconOnly() {
  return (
    <div className="flex gap-3">
      <Button isIconOnly variant="tertiary">
        <HugeiconsIcon icon={MoreHorizontalIcon} />
      </Button>
      <Button isIconOnly variant="secondary">
        <HugeiconsIcon icon={Settings01Icon} />
      </Button>
      <Button isIconOnly variant="danger">
        <HugeiconsIcon icon={Delete02Icon} />
      </Button>
    </div>
  );
}
