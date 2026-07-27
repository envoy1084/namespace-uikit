import type { ReactNode } from "react";

import { Tooltip } from "@thenamespace/uikit";
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
      <Tooltip.Trigger
        aria-label={`About ${label}`}
        className="text-muted inline-flex size-4 shrink-0 cursor-help items-center justify-center"
      >
        <HugeiconsIcon icon={InformationCircleIcon} height={12} width={12} />
      </Tooltip.Trigger>
      <Tooltip.Content
        className="w-64 max-w-[calc(100vw-2rem)] break-normal! wrap-normal! whitespace-normal!"
        placement="top"
        showArrow
      >
        <Tooltip.Arrow />
        <p className="break-normal wrap-normal whitespace-normal">{children}</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
