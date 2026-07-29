import { Surface, Typography } from "@thenamespace/uikit";
import { TransactionProgress } from "ens-components";

import { SectionLabel } from "./section-label";

export function TransactionProgressShowcase() {
  return (
    <section
      aria-labelledby="transaction-progress-title"
      className="scroll-mt-24 border-t border-[#dedede] bg-white"
      id="transaction-progress"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(28rem,1fr)] lg:gap-20 lg:px-12 lg:py-30">
        <div>
          <SectionLabel>Available now</SectionLabel>
          <Typography.Heading
            className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
            id="transaction-progress-title"
            level={2}
          >
            Transaction progress.
          </Typography.Heading>
          <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
            A stable confirmation state for ENS writes and wallet batches.
          </Typography.Paragraph>
        </div>

        <Surface className="mx-auto w-full max-w-md p-6" variant="secondary">
          <TransactionProgress chainId={11_155_111} />
        </Surface>
      </div>
    </section>
  );
}
