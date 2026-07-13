import { ToggleButton } from "@thenamespace/uikit";
import { Bookmark, Heart } from "@thenamespace/uikit/icons";

export function IconOnly() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isIconOnly aria-label="Like">
        <Heart />
      </ToggleButton>
      <ToggleButton isIconOnly aria-label="Bookmark" variant="ghost">
        <Bookmark />
      </ToggleButton>
    </div>
  );
}
