import type { RegistrationSuccessDetails } from "#/components/register-name/steps/registration-process/registration-success";

import { parseEventLogs, type Address, type TransactionReceipt } from "viem";

import { ethRegistrarAbi } from "#/data/abi";

export interface GetRegistrationDetailsProps {
  decimals: number;
  fallbackAmount: bigint;
  fallbackDuration: bigint;
  fallbackLabel: string;
  paymentTokenIcon: string;
  paymentTokenSymbol: string;
  receipt: TransactionReceipt;
  registeredAt: number;
  registrarAddress: Address;
}

export interface ConfirmedRegistrationDetails {
  amount: bigint;
  details: RegistrationSuccessDetails;
  duration: bigint;
  tokenId?: bigint;
}

export type PaymentActionStatus =
  | "approving"
  | "confirming-approval"
  | "confirming-registration"
  | "idle"
  | "refreshing"
  | "registering"
  | "switching";

export function parseStoredDuration(value: string | undefined) {
  if (value === undefined) return 0n;

  try {
    return BigInt(value);
  } catch {
    return 0n;
  }
}

export function getRegistrationDetails({
  decimals,
  fallbackAmount,
  fallbackDuration,
  fallbackLabel,
  paymentTokenIcon,
  paymentTokenSymbol,
  receipt,
  registeredAt,
  registrarAddress,
}: GetRegistrationDetailsProps): ConfirmedRegistrationDetails {
  const registrationEvent = (() => {
    try {
      return parseEventLogs({
        abi: ethRegistrarAbi,
        eventName: "NameRegistered",
        logs: receipt.logs.filter(
          (log) => log.address.toLowerCase() === registrarAddress.toLowerCase(),
        ),
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
  const label = registrationEvent?.args.label ?? fallbackLabel;

  return {
    amount,
    details: {
      amount,
      decimals,
      duration,
      expiresAt: registeredAt + Number(duration) * 1_000,
      name: `${label}.eth`,
      paymentTokenIcon,
      paymentTokenSymbol,
    },
    duration,
    ...(registrationEvent === undefined
      ? {}
      : { tokenId: registrationEvent.args.tokenId }),
  };
}
