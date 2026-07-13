import { Button } from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Button fullWidth>Primary Button</Button>
      <Button fullWidth>
        <HugeiconsIcon icon={Add01Icon} />
        With Icon
      </Button>
    </div>
  );
}
