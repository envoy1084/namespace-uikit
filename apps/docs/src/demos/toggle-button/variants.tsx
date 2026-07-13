import { ToggleButton } from "@thenamespace/uikit";
import { FavouriteIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Variants() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton>
        <HugeiconsIcon icon={FavouriteIcon} />
        Default
      </ToggleButton>
      <ToggleButton variant="ghost">
        <HugeiconsIcon icon={FavouriteIcon} />
        Ghost
      </ToggleButton>
    </div>
  );
}
