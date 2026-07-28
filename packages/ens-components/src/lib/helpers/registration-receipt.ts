import { isAddressEqual, parseEventLogs, type Address, type TransactionReceipt } from "viem";

import { ethRegistrarAbi } from "#/data/abi";

export interface ParseRegistrationReceiptParameters {
  fallbackAmount: bigint;
  fallbackDuration: bigint;
  fallbackLabel: string;
  receipt: TransactionReceipt;
  registrarAddress: Address;
}

export interface ParsedRegistrationReceipt {
  amount: bigint;
  duration: bigint;
  label: string;
  tokenId?: bigint;
}

export function parseRegistrationReceipt({
  fallbackAmount,
  fallbackDuration,
  fallbackLabel,
  receipt,
  registrarAddress,
}: ParseRegistrationReceiptParameters): ParsedRegistrationReceipt {
  const registrationEvent = (() => {
    try {
      return parseEventLogs({
        abi: ethRegistrarAbi,
        eventName: "NameRegistered",
        logs: receipt.logs.filter((log) => isAddressEqual(log.address, registrarAddress)),
        strict: true,
      })[0];
    } catch {
      return undefined;
    }
  })();
  const duration = registrationEvent?.args.duration ?? fallbackDuration;
  const amount =
    registrationEvent === undefined
      ? fallbackAmount
      : registrationEvent.args.base + registrationEvent.args.premium;

  return {
    amount,
    duration,
    label: registrationEvent?.args.label ?? fallbackLabel,
    ...(registrationEvent === undefined ? {} : { tokenId: registrationEvent.args.tokenId }),
  };
}
