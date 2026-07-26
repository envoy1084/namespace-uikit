import type { Hex } from "viem";

import { motion } from "motion/react";

const Shuriken = new URL("../assets/shuriken.svg", import.meta.url);

export interface TransactionProgressProps {
  blockExplorerUrl?: string | undefined;
  className?: string;
  transactionHash?: Hex | undefined;
}

export function TransactionProgress({
  blockExplorerUrl,
  className,
  transactionHash,
}: TransactionProgressProps) {
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
        className="bg-foreground h-10 w-full overflow-hidden rounded-xl p-1"
      >
        <motion.div
          animate={{ width: ["2rem", "100%", "100%"] }}
          className="bg-background relative h-full rounded-lg"
          initial={{ width: "2rem" }}
          transition={{
            duration: 2.4,
            ease: [0.4, 0, 0.2, 1],
            repeat: Infinity,
            times: [0, 0.8, 1],
          }}
        >
          <motion.img
            alt=""
            animate={{ rotate: 360 }}
            className="absolute top-1/2 right-1 size-6"
            src={Shuriken.href}
            style={{ y: "-50%" }}
            transition={{
              duration: 1.1,
              ease: "linear",
              repeat: Infinity,
            }}
          />
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
