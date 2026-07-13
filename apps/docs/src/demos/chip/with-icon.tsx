import { Chip } from "@thenamespace/uikit";
import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  CircleIcon,
  Clock01Icon,
  Cancel01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>
        <HugeiconsIcon icon={CircleIcon} width={6} />
        <Chip.Label>Information</Chip.Label>
      </Chip>
      <Chip color="success">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} width={12} />
        <Chip.Label>Completed</Chip.Label>
      </Chip>
      <Chip color="warning">
        <HugeiconsIcon icon={Clock01Icon} width={12} />
        <Chip.Label>Pending</Chip.Label>
      </Chip>
      <Chip color="danger">
        <HugeiconsIcon icon={Cancel01Icon} width={12} />
        <Chip.Label>Failed</Chip.Label>
      </Chip>
      <Chip color="accent">
        <Chip.Label>Label</Chip.Label>
        <HugeiconsIcon icon={ArrowDown01Icon} width={12} />
      </Chip>
    </div>
  );
}
