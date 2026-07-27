import type { ReactNode } from "react";

import { Button, Tooltip } from "@thenamespace/uikit";
import {
  HugeiconsIcon,
  InformationCircleIcon,
} from "@thenamespace/uikit/icons";

export interface AdvancedOptionInfoProps {
  children: ReactNode;
  label: string;
}

export function AdvancedOptionInfo({
  children,
  label,
}: AdvancedOptionInfoProps) {
  return (
    <Tooltip delay={150}>
      <Button
        isIconOnly
        aria-label={`About ${label}`}
        className="text-muted size-5 min-w-5"
        size="sm"
        variant="tertiary"
      >
        <HugeiconsIcon icon={InformationCircleIcon} width={14} />
      </Button>
      <Tooltip.Content className="max-w-64" placement="top" showArrow>
        <Tooltip.Arrow />
        <p>{children}</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
