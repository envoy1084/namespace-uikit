import { Heart, HeartFill } from "@gravity-ui/icons";
import { ToggleButton } from "@thenamespace/uikit";

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
