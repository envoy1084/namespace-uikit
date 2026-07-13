import { CloseButton } from "@thenamespace/uikit";
import {
  CancelCircleIcon,
  Cancel01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithCustomIcon() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <HugeiconsIcon icon={CancelCircleIcon} />
        </CloseButton>
        <span className="text-muted text-xs">Custom Icon</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CloseButton>
          <HugeiconsIcon icon={Cancel01Icon} />
        </CloseButton>
        <span className="text-muted text-xs">Alternative Icon</span>
      </div>
    </div>
  );
}
