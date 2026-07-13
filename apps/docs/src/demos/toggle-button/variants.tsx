import { ToggleButton } from "@thenamespace/uikit";
import { Heart } from "@thenamespace/uikit/icons";

export function Variants() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton>
        <Heart />
        Default
      </ToggleButton>
      <ToggleButton variant="ghost">
        <Heart />
        Ghost
      </ToggleButton>
    </div>
  );
}
