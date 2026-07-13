import { ToggleButton } from "@thenamespace/uikit";
import { FavouriteIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isDisabled>
        <HugeiconsIcon icon={FavouriteIcon} />
        Like
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled>
        <HugeiconsIcon icon={FavouriteIcon} />
        Like
      </ToggleButton>
    </div>
  );
}
