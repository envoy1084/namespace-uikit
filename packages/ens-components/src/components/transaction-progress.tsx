import type { Hex } from "viem";

const Shuriken = new URL("../assets/shuriken.svg", import.meta.url);

export interface TransactionProgressProps {
  blockExplorerUrl?: string | undefined;
  className?: string;
  transactionHash: Hex;
}

export function TransactionProgress({
  blockExplorerUrl,
  className,
  transactionHash,
}: TransactionProgressProps) {
  const transactionUrl =
    blockExplorerUrl === undefined
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
        <div className="ens-transaction-progress-bar bg-background relative h-full rounded-lg">
          <img
            alt=""
            className="ens-transaction-progress-shuriken absolute top-1/2 right-1 size-6 -translate-y-1/2"
            src={Shuriken.href}
          />
        </div>
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
