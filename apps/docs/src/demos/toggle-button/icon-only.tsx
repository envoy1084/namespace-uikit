import { ToggleButton } from "@thenamespace/uikit";
import {
  Bookmark01Icon,
  FavouriteIcon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function IconOnly() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="Like">
        <HugeiconsIcon icon={FavouriteIcon} />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Bookmark" variant="ghost">
        <HugeiconsIcon icon={Bookmark01Icon} />
      </ToggleButton>
    </div>
  );
}
