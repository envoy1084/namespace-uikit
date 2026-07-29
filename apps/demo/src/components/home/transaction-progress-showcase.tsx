"use client";

import { useEffect, useState } from "react";

import { Button, Typography } from "@thenamespace/uikit";
import { HugeiconsIcon, ReloadIcon } from "@thenamespace/uikit/icons";
import { TransactionProgress } from "ens-components";

const DEMO_CONFIRMATION_DURATION_MS = 10_000;
const DEMO_COMPLETION_ANIMATION_DURATION_MS = 400;
const DEMO_COMPLETED_STATE_DURATION_MS = 2_000;

export function TransactionProgressShowcase() {
  const [run, setRun] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    setIsConfirmed(false);

    let restartTimeout: number | undefined;
    const confirmationTimeout = window.setTimeout(() => {
      setIsConfirmed(true);

      restartTimeout = window.setTimeout(() => {
        setIsConfirmed(false);
        setRun((currentRun) => currentRun + 1);
      }, DEMO_COMPLETION_ANIMATION_DURATION_MS + DEMO_COMPLETED_STATE_DURATION_MS);
    }, DEMO_CONFIRMATION_DURATION_MS);

    return () => {
      window.clearTimeout(confirmationTimeout);
      if (restartTimeout !== undefined) window.clearTimeout(restartTimeout);
    };
  }, [run]);

  return (
    <section
      aria-labelledby="transaction-progress-title"
      className="scroll-mt-24 border-t border-[#dedede] bg-white"
      id="transaction-progress"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(18rem,0.72fr)_minmax(28rem,1fr)] lg:gap-20 lg:px-12 lg:py-30">
        <div>
          <Typography.Heading
            className="text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
            id="transaction-progress-title"
            level={2}
          >
            Transaction progress.
          </Typography.Heading>
          <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
            A stable confirmation state for ENS writes and wallet batches.
          </Typography.Paragraph>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center gap-3">
          <div className="min-w-0 flex-1">
            <TransactionProgress key={run} chainId={11_155_111} isConfirmed={isConfirmed} />
          </div>
          <Button
            isIconOnly
            aria-label="Restart transaction progress"
            className="size-9 min-w-9 shrink-0 rounded-xl"
            size="sm"
            variant="secondary"
            onPress={() => {
              setIsConfirmed(false);
              setRun((currentRun) => currentRun + 1);
            }}
          >
            <HugeiconsIcon aria-hidden="true" className="size-4" icon={ReloadIcon} />
          </Button>
        </div>
      </div>
    </section>
  );
}
