import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import {
  encodeAbiParameters,
  isAddress,
  isHex,
  keccak256,
  size,
  zeroAddress,
  type Address,
  type Hex,
  type WalletClient,
} from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/actions/parse-name-input";
import { ethRegistrarCommitSnippet } from "#/data/abi";

const MAX_UINT64 = (1n << 64n) - 1n;

export type CommitNameError =
  | "CONTRACT_WRITE_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_DURATION"
  | "INVALID_OWNER_ADDRESS"
  | "INVALID_REFERRER"
  | "INVALID_REGISTRAR_ADDRESS"
  | "INVALID_RESOLVER_ADDRESS"
  | "INVALID_SECRET"
  | "INVALID_SUBREGISTRY_ADDRESS"
  | "LABEL_TOO_SHORT"
  | "UNSUPPORTED_NAME";

export interface CommitNameProps {
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

export interface CommitNameResult {
  /** Commitment submitted to the registrar. */
  readonly commitment: Hex;
  /** Hash of the commitment transaction. */
  readonly transactionHash: Hex;
}

function isBytes32(value: Hex): boolean {
  return isHex(value) && size(value) === 32;
}

/**
 * Creates and submits an ENSv2 `.eth` registration commitment.
 *
 * The returned commitment and every commitment-bound input must be persisted
 * and reused unchanged when revealing the registration.
 */
export function commitName(
  walletClient: WalletClient,
  props: CommitNameProps,
): ResultAsync<CommitNameResult, CommitNameError | ParseNameInputError> {
  const {
    account,
    duration,
    input,
    owner,
    referrer,
    registrarAddress,
    resolverAddress,
    secret,
    subregistryAddress,
  } = props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return errAsync(parsedInput.error);
  }

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return errAsync("UNSUPPORTED_NAME");
  }

  if ([...parsedInput.value.label].length < 3) {
    return errAsync("LABEL_TOO_SHORT");
  }

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(owner) || owner === zeroAddress) {
    return errAsync("INVALID_OWNER_ADDRESS");
  }

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (!isAddress(resolverAddress)) {
    return errAsync("INVALID_RESOLVER_ADDRESS");
  }

  if (!isAddress(subregistryAddress)) {
    return errAsync("INVALID_SUBREGISTRY_ADDRESS");
  }

  if (duration <= 0n || duration > MAX_UINT64) {
    return errAsync("INVALID_DURATION");
  }

  if (!isBytes32(secret)) {
    return errAsync("INVALID_SECRET");
  }

  if (!isBytes32(referrer)) {
    return errAsync("INVALID_REFERRER");
  }

  const commitment = keccak256(
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
  );

  return ResultAsync.fromPromise(
    walletClient.writeContract({
      account,
      address: registrarAddress,
      abi: ethRegistrarCommitSnippet,
      chain: walletClient.chain,
      functionName: "commit",
      args: [commitment],
    }),
    () => "CONTRACT_WRITE_FAILED" as const,
  ).map((transactionHash) => ({ commitment, transactionHash }));
}
