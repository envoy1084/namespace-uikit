import { Button } from "@thenamespace/uikit";
import {
  Mail01Icon,
  Globe02Icon,
  Add01Icon,
  Delete02Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <HugeiconsIcon icon={Globe02Icon} />
        Search
      </Button>
      <Button variant="secondary">
        <HugeiconsIcon icon={Add01Icon} />
        Add Member
      </Button>
      <Button variant="tertiary">
        <HugeiconsIcon icon={Mail01Icon} />
        Email
      </Button>
      <Button variant="danger">
        <HugeiconsIcon icon={Delete02Icon} />
        Delete
      </Button>
    </div>
  );
}
