import type { ParseNameInputError } from "#/actions/parse-name-input";
import type { EnsNetwork } from "#/data";

import { errAsync, ResultAsync } from "neverthrow";
import {
  isAddress,
  zeroAddress,
  type Address,
  type Hex,
  type WalletClient,
} from "viem";

import {
  makeNameCommitment,
  type MakeNameCommitmentError,
  type MakeNameCommitmentProps,
} from "#/actions/commit-name";
import { ethRegistrarRegisterSnippet } from "#/data/abi";

export type RegisterNameError =
  | "CONTRACT_WRITE_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export interface RegisterNameProps extends MakeNameCommitmentProps {
  /** Account that pays for and submits the registration. */
  readonly account: Address;
  /** Network associated with the supplied contract addresses. */
  readonly network: EnsNetwork;
  /** ERC-20 token used to pay for registration. */
  readonly paymentTokenAddress: Address;
  /** ENSv2 ETHRegistrar address on the supplied network. */
  readonly registrarAddress: Address;
}

export interface RegisterNameResult {
  readonly label: string;
  readonly transactionHash: Hex;
}

export function registerName(
  walletClient: WalletClient,
  props: RegisterNameProps,
): ResultAsync<RegisterNameResult, RegisterNameError | ParseNameInputError> {
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
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress)) {
    return errAsync("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const commitment = makeNameCommitment(props);

  if (commitment.isErr()) {
    return errAsync(commitment.error);
  }

  return ResultAsync.fromPromise(
    walletClient.writeContract({
      account,
      address: registrarAddress,
      abi: ethRegistrarRegisterSnippet,
      chain: walletClient.chain,
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
    }),
    () => "CONTRACT_WRITE_FAILED" as const,
  ).map((transactionHash) => ({
    label: commitment.value.label,
    transactionHash,
  }));
}
