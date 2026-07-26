import type { Hex } from "viem";

import type { ReactNode } from "react";

import { motion } from "motion/react";

const Shuriken = new URL("../assets/shuriken.svg", import.meta.url);

const CHAIN_CONFIRMATION_DURATION_MS: Readonly<Record<number, number>> = {
  1: 16_000,
  11_155_111: 16_000,
};

const DEFAULT_CONFIRMATION_DURATION_MS = 16_000;
export const TRANSACTION_PROGRESS_COMPLETION_DURATION_MS = 400;

export interface TransactionProgressProps {
  blockExplorerUrl?: string | undefined;
  chainId: number;
  className?: string;
  icon?: ReactNode;
  isConfirmed?: boolean;
  transactionHash?: Hex | undefined;
}

export function TransactionProgress({
  blockExplorerUrl,
  chainId,
  className,
  icon,
  isConfirmed = false,
  transactionHash,
}: TransactionProgressProps) {
  const confirmationDuration =
    CHAIN_CONFIRMATION_DURATION_MS[chainId] ?? DEFAULT_CONFIRMATION_DURATION_MS;
  const transactionUrl =
    blockExplorerUrl === undefined || transactionHash === undefined
      ? undefined
      : `${blockExplorerUrl.replace(/\/$/, "")}/tx/${transactionHash}`;

  return (
    <div
      aria-live="polite"
      className={`flex flex-col items-center gap-2 ${className ?? ""}`}
      role="status"
    >
      <div
        aria-label="Transaction confirmation in progress"
        className="bg-foreground h-9 w-full overflow-hidden rounded-xl p-1"
      >
        <motion.div
          animate={{ width: isConfirmed ? "100%" : "99%" }}
          className="bg-background relative h-full rounded-lg"
          initial={{ width: "2rem" }}
          transition={{
            duration: isConfirmed
              ? TRANSACTION_PROGRESS_COMPLETION_DURATION_MS / 1_000
              : confirmationDuration / 1_000,
            ease: isConfirmed ? [0.16, 1, 0.3, 1] : "linear",
          }}
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            className="absolute top-1/2 right-1 flex size-6 items-center justify-center [&>img]:size-full [&>svg]:size-full"
            style={{ y: "-50%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {icon === undefined ? <img alt="" src={Shuriken.href} /> : icon}
          </motion.span>
        </motion.div>
      </div>
      {transactionUrl === undefined ? null : (
        <a
          className="text-foreground text-xs underline underline-offset-4"
          href={transactionUrl}
          rel="noreferrer"
          target="_blank"
        >
          Check on Etherscan
        </a>
      )}
    </div>
  );
}
