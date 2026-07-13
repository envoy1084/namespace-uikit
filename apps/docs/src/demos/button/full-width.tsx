import { Button } from "@thenamespace/uikit";
import { Plus } from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-3">
      <Button fullWidth>Primary Button</Button>
      <Button fullWidth>
        <Plus />
        With Icon
      </Button>
    </div>
  );
}
