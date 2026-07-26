import { useEffect, useState } from "react";

import { TransactionProgress } from "@thenamespace/ens-components";
import { Button, Surface, Typography } from "@thenamespace/uikit";

const PREVIEW_DURATION_MS = 8_000;

export function TransactionProgressDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timeout = window.setTimeout(
      () => setIsPlaying(false),
      PREVIEW_DURATION_MS,
    );
    return () => window.clearTimeout(timeout);
  }, [isPlaying]);

  return (
    <Surface className="w-full max-w-sm rounded-2xl p-4" variant="secondary">
      <Typography.Heading className="text-base font-semibold" level={2}>
        Transaction loader demo
      </Typography.Heading>
      <Typography.Paragraph className="mt-1" color="muted" size="xs">
        Plays the loader for eight seconds without sending a transaction.
      </Typography.Paragraph>

      {isPlaying ? (
        <TransactionProgress className="mt-4" />
      ) : (
        <Button className="mt-4 w-full" onPress={() => setIsPlaying(true)}>
          Play loader
        </Button>
      )}
    </Surface>
  );
}
