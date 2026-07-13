import { ToggleButton } from "@thenamespace/uikit";
import { FavouriteIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function Basic() {
  return (
    <ToggleButton>
      <HugeiconsIcon icon={FavouriteIcon} />
      Like
    </ToggleButton>
  );
}
