import { ToggleButton } from "@thenamespace/uikit";
import { Heart, HeartFill } from "@thenamespace/uikit/icons";

export function Disabled() {
  return (
    <div className="flex items-center gap-3">
      <ToggleButton isDisabled>
        <Heart />
        Like
      </ToggleButton>
      <ToggleButton defaultSelected isDisabled>
        <HeartFill />
        Like
      </ToggleButton>
    </div>
  );
}
