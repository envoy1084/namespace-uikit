import { Button, ButtonGroup } from "@thenamespace/uikit";
import { Globe, Plus, TrashBin } from "@thenamespace/uikit/icons";

export function WithIcons() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">With icons</p>
        <ButtonGroup variant="secondary">
          <Button>
            <Globe />
            Search
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <Plus />
            Add
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <TrashBin />
            Delete
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-muted text-sm">Icon only buttons</p>
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <Globe />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <Plus />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <TrashBin />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
