import type { ReactNode } from "react";

import { Typography } from "@thenamespace/uikit";

export function SectionLabel({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <Typography.Paragraph
      className={
        inverse
          ? "text-xs tracking-[0.12em] text-[#bcbcbc] uppercase"
          : "text-xs tracking-[0.12em] text-[#6f6f6f] uppercase"
      }
      size="xs"
      weight="bold"
    >
      {children}
    </Typography.Paragraph>
  );
}
