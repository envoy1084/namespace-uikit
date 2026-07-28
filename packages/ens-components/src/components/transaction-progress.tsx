import type { Address, Hex } from "viem";

import type { ReactNode } from "react";

import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { motion, useReducedMotion } from "motion/react";

const Shuriken = new URL("../assets/shuriken.svg", import.meta.url);

const CHAIN_CONFIRMATION_DURATION_MS: Readonly<Record<number, number>> = {
  1: 16_000,
  11_155_111: 16_000,
};

const DEFAULT_CONFIRMATION_DURATION_MS = 16_000;
export const TRANSACTION_PROGRESS_COMPLETION_DURATION_MS = 400;

export interface TransactionProgressProps {
  account?: Address | undefined;
  blockExplorerUrl?: string | undefined;
  chainId: number;
  className?: string;
  icon?: ReactNode;
  isConfirmed?: boolean;
  label?: string;
  linkLabel?: string;
  transactionHash?: Hex | undefined;
}

export function TransactionProgress({
  account,
  blockExplorerUrl,
  chainId,
  className,
  icon,
  isConfirmed = false,
  label = "Transaction confirmation in progress",
  linkLabel = "Check on Etherscan",
  transactionHash,
}: TransactionProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const confirmationDuration =
    CHAIN_CONFIRMATION_DURATION_MS[chainId] ?? DEFAULT_CONFIRMATION_DURATION_MS;
  const explorerUrl = blockExplorerUrl?.replace(/\/$/, "");
  const transactionUrl =
    explorerUrl === undefined
      ? undefined
      : transactionHash === undefined
        ? account === undefined
          ? undefined
          : `${explorerUrl}/address/${account}`
        : `${explorerUrl}/tx/${transactionHash}`;

  return (
    <div
      aria-live="polite"
      className={`flex flex-col items-center gap-2 ${className ?? ""}`}
      role="status"
    >
      <div
        aria-label={label}
        className="bg-foreground h-9 w-full overflow-hidden rounded-xl p-1"
        role="progressbar"
      >
        <motion.div
          animate={{ width: isConfirmed ? "100%" : "99%" }}
          className="bg-background relative h-full rounded-lg"
          initial={{ width: shouldReduceMotion ? "99%" : "2rem" }}
          transition={{
            duration: shouldReduceMotion
              ? 0
              : isConfirmed
                ? TRANSACTION_PROGRESS_COMPLETION_DURATION_MS / 1_000
                : confirmationDuration / 1_000,
            ease: isConfirmed ? [0.16, 1, 0.3, 1] : "linear",
          }}
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
            className="absolute top-1/2 right-1 flex size-6 items-center justify-center [&>img]:size-full [&>svg]:size-full"
            style={{ y: "-50%" }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: shouldReduceMotion ? 0 : Infinity,
            }}
          >
            {icon === undefined ? <img alt="" src={Shuriken.href} /> : icon}
          </motion.span>
        </motion.div>
      </div>
      {transactionUrl === undefined ? null : (
        <a
          className="text-foreground inline-flex items-center gap-1 text-xs underline underline-offset-4"
          href={transactionUrl}
          rel="noreferrer"
          target="_blank"
        >
          {linkLabel}
          <HugeiconsIcon
            aria-hidden="true"
            className="size-3.5"
            icon={ArrowUpRight01Icon}
          />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}
