import { Chip } from "@thenamespace/uikit";
import {
  UnavailableIcon,
  CheckmarkSquare02Icon,
  CircleIcon,
  InformationCircleIcon,
  Alert01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="primary">
          <HugeiconsIcon icon={CircleIcon} width={6} />
          <Chip.Label>Default</Chip.Label>
        </Chip>
        <Chip color="success" variant="primary">
          <HugeiconsIcon icon={CircleIcon} width={6} />
          <Chip.Label>Active</Chip.Label>
        </Chip>
        <Chip color="warning" variant="primary">
          <HugeiconsIcon icon={CircleIcon} width={6} />
          <Chip.Label>Pending</Chip.Label>
        </Chip>
        <Chip color="danger" variant="primary">
          <HugeiconsIcon icon={CircleIcon} width={6} />
          <Chip.Label>Inactive</Chip.Label>
        </Chip>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Chip>
          <HugeiconsIcon icon={InformationCircleIcon} width={12} />
          <Chip.Label>New Feature</Chip.Label>
        </Chip>
        <Chip color="success">
          <HugeiconsIcon icon={CheckmarkSquare02Icon} width={12} />
          <Chip.Label>Available</Chip.Label>
        </Chip>
        <Chip color="warning">
          <HugeiconsIcon icon={Alert01Icon} width={12} />
          <Chip.Label>Beta</Chip.Label>
        </Chip>
        <Chip color="danger">
          <HugeiconsIcon icon={UnavailableIcon} width={12} />
          <Chip.Label>Deprecated</Chip.Label>
        </Chip>
      </div>
    </div>
  );
}
