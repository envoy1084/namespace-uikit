import type { PreparedContractWrite } from "#/actions/contract-calls";
import type { EnsNetwork } from "#/data";

import { err, ok, type Result } from "neverthrow";
import {
  encodeAbiParameters,
  encodeFunctionData,
  isAddress,
  isHex,
  keccak256,
  size,
  zeroAddress,
  type Address,
  type ContractFunctionParameters,
  type Hex,
} from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/actions/parse-name-input";
import { ethRegistrarAbi } from "#/data/abi";

const MAX_UINT64 = (1n << 64n) - 1n;

export type PrepareCommitNameError =
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export type MakeNameCommitmentError =
  | "INVALID_DURATION"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_REFERRER"
  | "INVALID_RESOLVER_ADDRESS"
  | "INVALID_SECRET"
  | "INVALID_SUBREGISTRY_ADDRESS"
  | "LABEL_TOO_SHORT"
  | "UNSUPPORTED_NAME";

export interface MakeNameCommitmentProps {
  /** Registration duration in seconds. */
  readonly duration: bigint;
  /** Label or ENS name to normalize and commit. */
  readonly input: string | null | undefined;
  /** Address that will own the registered name. */
  readonly owner: Address;
  /** Referrer identifier committed with the registration parameters. */
  readonly referrer: Hex;
  /** Initial resolver address, or the zero address. */
  readonly resolverAddress: Address;
  /** Random 32-byte secret used to protect the registration. */
  readonly secret: Hex;
  /** Initial subregistry address, or the zero address. */
  readonly subregistryAddress: Address;
}

export type MakeNameCommitmentResult = {
  readonly commitment: Hex;
  readonly label: string;
};

export interface PrepareCommitNameProps {
  /** Account that submits the commitment transaction. */
  readonly account: Address;
  /** Registration duration in seconds. */
  readonly duration: bigint;
  /** Label or ENS name to normalize and commit. */
  readonly input: string | null | undefined;
  /** Network associated with the supplied registrar address. */
  readonly network: EnsNetwork;
  /** Address that will own the registered name. */
  readonly owner: Address;
  /** Referrer identifier committed with the registration parameters. */
  readonly referrer: Hex;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
  /** Initial resolver address, or the zero address. */
  readonly resolverAddress: Address;
  /** Random 32-byte secret used to protect the registration. */
  readonly secret: Hex;
  /** Initial subregistry address, or the zero address. */
  readonly subregistryAddress: Address;
}

type CommitNameRequest = ContractFunctionParameters<
  typeof ethRegistrarAbi,
  "nonpayable",
  "commit",
  readonly [Hex]
>;

export interface PrepareCommitNameMetadata {
  /** Commitment submitted by the prepared registrar call. */
  readonly commitment: Hex;
  /** Normalized second-level label bound to the commitment. */
  readonly label: string;
}

export type PreparedCommitName = PreparedContractWrite<
  CommitNameRequest,
  "commit-name",
  PrepareCommitNameMetadata
>;

function isBytes32(value: Hex): boolean {
  return isHex(value) && size(value) === 32;
}

/**
 * Builds the commitment hash used by the ENSv2 ETHRegistrar.
 *
 * This is equivalent to the registrar's `makeCommitment` function and can be
 * used to identify a locally stored commitment without making a contract call.
 */
export function makeNameCommitment(
  props: MakeNameCommitmentProps,
): Result<
  MakeNameCommitmentResult,
  MakeNameCommitmentError | ParseNameInputError
> {
  const {
    duration,
    input,
    owner,
    referrer,
    resolverAddress,
    secret,
    subregistryAddress,
  } = props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return err(parsedInput.error);
  }

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return err("UNSUPPORTED_NAME");
  }

  if ([...parsedInput.value.label].length < 3) {
    return err("LABEL_TOO_SHORT");
  }

  if (!isAddress(owner) || owner === zeroAddress) {
    return err("INVALID_OWNER_ADDRESS");
  }

  if (!isAddress(resolverAddress)) {
    return err("INVALID_RESOLVER_ADDRESS");
  }

  if (!isAddress(subregistryAddress)) {
    return err("INVALID_SUBREGISTRY_ADDRESS");
  }

  if (duration <= 0n || duration > MAX_UINT64) {
    return err("INVALID_DURATION");
  }

  if (!isBytes32(secret)) {
    return err("INVALID_SECRET");
  }

  if (!isBytes32(referrer)) {
    return err("INVALID_REFERRER");
  }

  return ok({
    commitment: keccak256(
      encodeAbiParameters(
        [
          { type: "string" },
          { type: "address" },
          { type: "bytes32" },
          { type: "address" },
          { type: "address" },
          { type: "uint64" },
          { type: "bytes32" },
        ],
        [
          parsedInput.value.label,
          owner,
          secret,
          subregistryAddress,
          resolverAddress,
          duration,
          referrer,
        ],
      ),
    ),
    label: parsedInput.value.label,
  });
}

/**
 * Validates and encodes an ENSv2 `.eth` registration commitment.
 *
 * The returned commitment and every commitment-bound input must be persisted
 * and reused unchanged when revealing the registration.
 */
export function prepareCommitName(
  props: PrepareCommitNameProps,
): Result<PreparedCommitName, PrepareCommitNameError | ParseNameInputError> {
  const { account, registrarAddress } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return err("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return err("INVALID_REGISTRAR_ADDRESS");
  }

  const result = makeNameCommitment(props);

  if (result.isErr()) {
    return err(result.error);
  }

  const request = {
    address: registrarAddress,
    abi: ethRegistrarAbi,
    functionName: "commit",
    args: [result.value.commitment],
  } as const satisfies CommitNameRequest;

  return ok({
    account,
    call: {
      data: encodeFunctionData(request),
      to: registrarAddress,
      value: 0n,
    },
    kind: "commit-name",
    metadata: result.value,
    request,
  });
}
