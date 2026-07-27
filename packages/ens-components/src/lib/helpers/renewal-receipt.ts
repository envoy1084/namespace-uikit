import {
  isAddressEqual,
  parseEventLogs,
  type Address,
  type TransactionReceipt,
} from "viem";

import { ethRegistrarAbi } from "#/data/abi";

export interface ParseRenewalReceiptProps {
  fallbackAmount: bigint;
  fallbackCurrentExpiry: bigint;
  fallbackDuration: bigint;
  fallbackLabel: string;
  receipt: TransactionReceipt;
  registrarAddress: Address;
}

export interface ParsedRenewalReceipt {
  amount: bigint;
  duration: bigint;
  label: string;
  newExpiry: bigint;
  tokenId?: bigint;
}

export function parseRenewalReceipt({
  fallbackAmount,
  fallbackCurrentExpiry,
  fallbackDuration,
  fallbackLabel,
  receipt,
  registrarAddress,
}: ParseRenewalReceiptProps): ParsedRenewalReceipt {
  const renewalEvent = (() => {
    try {
      return parseEventLogs({
        abi: ethRegistrarAbi,
        eventName: "NameRenewed",
        logs: receipt.logs.filter((log) =>
          isAddressEqual(log.address, registrarAddress),
        ),
        strict: true,
      })[0];
    } catch {
      return undefined;
    }
  })();

  return {
    amount: renewalEvent?.args.amount ?? fallbackAmount,
    duration: renewalEvent?.args.duration ?? fallbackDuration,
    label: renewalEvent?.args.label ?? fallbackLabel,
    newExpiry:
      renewalEvent?.args.newExpiry ?? fallbackCurrentExpiry + fallbackDuration,
    ...(renewalEvent === undefined
      ? {}
      : { tokenId: renewalEvent.args.tokenId }),
  };
}
