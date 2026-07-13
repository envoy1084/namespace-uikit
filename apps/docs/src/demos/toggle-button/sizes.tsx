import { ToggleButton } from "@thenamespace/uikit";
import { FavouriteIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Sizes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <ToggleButton size="sm">
          <HugeiconsIcon icon={FavouriteIcon} />
          Small
        </ToggleButton>
        <ToggleButton size="md">
          <HugeiconsIcon icon={FavouriteIcon} />
          Medium
        </ToggleButton>
        <ToggleButton size="lg">
          <HugeiconsIcon icon={FavouriteIcon} />
          Large
        </ToggleButton>
      </div>
      <div className="flex items-center gap-3">
        <ToggleButton isIconOnly aria-label="Like" size="sm">
          <HugeiconsIcon icon={FavouriteIcon} />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="md">
          <HugeiconsIcon icon={FavouriteIcon} />
        </ToggleButton>
        <ToggleButton isIconOnly aria-label="Like" size="lg">
          <HugeiconsIcon icon={FavouriteIcon} />
        </ToggleButton>
      </div>
    </div>
  );
}
