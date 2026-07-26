import { useState } from "react";

import { TransactionProgress } from "@thenamespace/ens-components";
import { Button, Surface, Typography } from "@thenamespace/uikit";
import { zeroAddress, type Hex } from "viem";
import { useConnection, usePublicClient, useWalletClient } from "wagmi";

type TransactionStatus = "confirming" | "idle" | "signing";

export function TransactionProgressDemo() {
  const connection = useConnection();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<TransactionStatus>("idle");
  const [transactionHash, setTransactionHash] = useState<Hex>();

  const sendTestTransaction = async () => {
    setError(undefined);
    setTransactionHash(undefined);

    if (
      connection.address === undefined ||
      walletClient === undefined ||
      publicClient === undefined
    ) {
      setError("Connect a wallet before sending a test transaction.");
      return;
    }

    setStatus("signing");

    try {
      const hash = await walletClient.sendTransaction({
        account: connection.address,
        chain: walletClient.chain,
        to: zeroAddress,
        value: 0n,
      });

      setTransactionHash(hash);
      setStatus("confirming");

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      if (receipt.status !== "success") {
        throw new Error("Transaction reverted.");
      }

      setStatus("idle");
      setTransactionHash(undefined);
    } catch {
      setError("The test transaction was rejected or failed.");
      setStatus("idle");
      setTransactionHash(undefined);
    }
  };

  return (
    <Surface className="w-full max-w-sm rounded-2xl p-4" variant="secondary">
      <Typography.Heading className="text-base font-semibold" level={2}>
        Transaction loader demo
      </Typography.Heading>
      <Typography.Paragraph className="mt-1" color="muted" size="xs">
        Sends a zero-value transaction to the zero address. It still consumes
        network gas.
      </Typography.Paragraph>

      {status === "confirming" && transactionHash !== undefined ? (
        <TransactionProgress
          blockExplorerUrl={walletClient?.chain?.blockExplorers?.default.url}
          className="mt-4"
          transactionHash={transactionHash}
        />
      ) : (
        <Button
          className="mt-4 w-full"
          isDisabled={connection.address === undefined}
          isPending={status === "signing"}
          onPress={sendTestTransaction}
        >
          {connection.address === undefined
            ? "Connect wallet to test"
            : status === "signing"
              ? "Confirm in wallet"
              : "Send test transaction"}
        </Button>
      )}

      {error === undefined ? null : (
        <Typography.Paragraph
          className="text-danger mt-2 text-center"
          role="alert"
          size="xs"
        >
          {error}
        </Typography.Paragraph>
      )}
    </Surface>
  );
}
