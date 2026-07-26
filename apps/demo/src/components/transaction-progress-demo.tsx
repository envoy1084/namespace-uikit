import { useEffect, useState } from "react";

import { TransactionProgress } from "@thenamespace/ens-components";
import { Button, Surface, Typography } from "@thenamespace/uikit";
import { zeroHash } from "viem";

const PREVIEW_CONFIRMATION_MS = 5_000;
const PREVIEW_DURATION_MS = 6_000;

export function TransactionProgressDemo() {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const confirmationTimeout = window.setTimeout(
      () => setIsConfirmed(true),
      PREVIEW_CONFIRMATION_MS,
    );
    const resetTimeout = window.setTimeout(
      () => setIsPlaying(false),
      PREVIEW_DURATION_MS,
    );
    return () => {
      window.clearTimeout(confirmationTimeout);
      window.clearTimeout(resetTimeout);
    };
  }, [isPlaying]);

  const playLoader = () => {
    setIsConfirmed(false);
    setIsPlaying(true);
  };

  return (
    <Surface className="w-full max-w-sm rounded-2xl p-4" variant="secondary">
      <Typography.Heading className="text-base font-semibold" level={2}>
        Transaction loader demo
      </Typography.Heading>
      <Typography.Paragraph className="mt-1" color="muted" size="xs">
        Simulates a Sepolia transaction confirming early after five seconds.
      </Typography.Paragraph>

      {isPlaying ? (
        <TransactionProgress
          chainId={11_155_111}
          className="mt-4"
          isConfirmed={isConfirmed}
          transactionHash={zeroHash}
        />
      ) : (
        <Button className="mt-4 w-full" onPress={playLoader}>
          Play loader
        </Button>
      )}
    </Surface>
  );
}
