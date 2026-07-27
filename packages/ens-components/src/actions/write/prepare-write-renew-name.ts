import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";

import { ethRegistrarAbi } from "#/data/abi";
import { isBytes32, isNonZeroAddress, isUint64Duration } from "#/lib/helpers";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareRenewNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REFERRER"
  | "INVALID_REGISTRAR_ADDRESS"
  | "UNSUPPORTED_NAME";

export interface PrepareRenewNameWriteProps {
  /** Account paying for and submitting the renewal. */
  readonly account: Address;
  /** Number of seconds added to the current expiry. */
  readonly duration: bigint;
  /** Label or second-level `.eth` name to normalize and renew. */
  readonly input: string | null | undefined;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token used to pay for renewal. */
  readonly paymentTokenAddress: Address;
  /** Optional bytes32 referral identifier. */
  readonly referrer: Hex;
  /** ENS v2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

type RenewNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "renew",
  readonly [string, bigint, Address, Hex]
>;

export interface PrepareRenewNameWriteMetadata {
  readonly duration: bigint;
  readonly label: string;
  readonly paymentTokenAddress: Address;
  readonly referrer: Hex;
}

export type PreparedRenewNameWrite = PreparedContractWrite<
  RenewNameRequest,
  "renew-name",
  PrepareRenewNameWriteMetadata
>;

export function prepareRenewNameWrite(
  props: PrepareRenewNameWriteProps,
): Result<
  PreparedRenewNameWrite,
  PrepareRenewNameWriteError | ParseNameInputError
> {
  const { account, duration, paymentTokenAddress, referrer, registrarAddress } =
    props;
  if (!isNonZeroAddress(account)) return err("INVALID_ACCOUNT_ADDRESS");
  if (!isUint64Duration(duration)) return err("INVALID_DURATION");
  if (!isNonZeroAddress(paymentTokenAddress)) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }
  if (!isNonZeroAddress(registrarAddress)) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }
  if (!isBytes32(referrer)) return err("INVALID_REFERRER");

  const parsedInput = parseNameInput(props.input);
  if (parsedInput.isErr()) return err(parsedInput.error);
  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  const label = parsedInput.value.label;
  const request = {
    address: registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "renew",
    args: [label, duration, paymentTokenAddress, referrer],
  } as const satisfies RenewNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: registrarAddress,
      value: 0n,
    },
    kind: "renew-name",
    metadata: { duration, label, paymentTokenAddress, referrer },
    request,
  });
}
