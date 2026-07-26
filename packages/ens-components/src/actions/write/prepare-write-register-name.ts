import type { PreparedContractWrite } from "#/actions/write/contract-writes";
import type { EnsNetwork } from "#/data";
import type { ParseNameInputError } from "#/lib/parse-name-input";

import { err, ok, type Result } from "neverthrow";
import {
  encodeFunctionData,
  isAddress,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";

import { ethRegistrarAbi } from "#/data/abi";
import {
  makeNameCommitment,
  type MakeNameCommitmentError,
  type MakeNameCommitmentProps,
} from "#/lib/make-name-commitment";

export type PrepareRegisterNameWriteError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export interface PrepareRegisterNameWriteProps extends MakeNameCommitmentProps {
  /** Account that pays for and submits the registration. */
  readonly account: Address;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token used to pay for registration. */
  readonly paymentTokenAddress: Address;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

type RegisterNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "register",
  readonly [string, Address, Hex, Address, Address, bigint, Address, Hex]
>;

export interface PrepareRegisterNameWriteMetadata {
  readonly label: string;
}

export type PreparedRegisterNameWrite = PreparedContractWrite<
  RegisterNameRequest,
  "register-name",
  PrepareRegisterNameWriteMetadata
>;

/** Validates and prepares the ENS v2 name registration write. */
export function prepareRegisterNameWrite(
  props: PrepareRegisterNameWriteProps,
): Result<
  PreparedRegisterNameWrite,
  PrepareRegisterNameWriteError | ParseNameInputError
> {
  const {
    account,
    duration,
    owner,
    paymentTokenAddress,
    referrer,
    registrarAddress,
    resolverAddress,
    secret,
    subregistryAddress,
  } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress) || paymentTokenAddress === zeroAddress) {
    return err("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const commitment = makeNameCommitment(props);

  if (commitment.isErr()) return err(commitment.error);

  const request = {
    address: registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "register",
    args: [
      commitment.value.label,
      owner,
      secret,
      subregistryAddress,
      resolverAddress,
      duration,
      paymentTokenAddress,
      referrer,
    ],
  } as const satisfies RegisterNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: registrarAddress,
      value: 0n,
    },
    kind: "register-name",
    metadata: { label: commitment.value.label },
    request,
  });
}
