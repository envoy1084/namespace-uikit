import type { CommitNameProps } from "#/actions/commit-name";
import type { ParseNameInputError } from "#/actions/parse-name-input";
import type { ResolverDeploymentCall } from "#/actions/prepare-permissioned-resolver-deployment";

import { errAsync, ResultAsync } from "neverthrow";
import {
  encodeFunctionData,
  isAddress,
  isHex,
  size,
  zeroAddress,
  type Address,
  type Chain,
  type Hex,
  type WalletClient,
} from "viem";
import { sendCalls } from "viem/actions";

import {
  makeNameCommitment,
  type MakeNameCommitmentError,
} from "#/actions/commit-name";
import { ethRegistrarAbi } from "#/data/abi";

export type DeployResolverAndCommitNameError =
  | "ATOMIC_BATCH_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_DEPLOYMENT_CALL"
  | "INVALID_REGISTRAR_ADDRESS"
  | MakeNameCommitmentError;

export interface DeployResolverAndCommitNameProps extends CommitNameProps {
  /** Explicit chain used by the EIP-5792 request. */
  readonly chain: Chain;
  /** Encoded resolver deployment returned by the prepare action. */
  readonly deploymentCall: ResolverDeploymentCall;
}

export interface DeployResolverAndCommitNameResult {
  readonly callsId: string;
  readonly commitment: Hex;
  readonly label: string;
  readonly resolverAddress: Address;
}

/**
 * Atomically deploys a dedicated resolver and submits its name commitment.
 */
export function deployResolverAndCommitName(
  walletClient: WalletClient,
  props: DeployResolverAndCommitNameProps,
): ResultAsync<
  DeployResolverAndCommitNameResult,
  DeployResolverAndCommitNameError | ParseNameInputError
> {
  const { account, chain, deploymentCall, registrarAddress, resolverAddress } =
    props;

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(registrarAddress) || registrarAddress === zeroAddress) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (
    !isAddress(deploymentCall.to) ||
    deploymentCall.to === zeroAddress ||
    !isHex(deploymentCall.data) ||
    size(deploymentCall.data) === 0 ||
    deploymentCall.value < 0n
  ) {
    return errAsync("INVALID_DEPLOYMENT_CALL");
  }

  const commitment = makeNameCommitment(props);

  if (commitment.isErr()) {
    return errAsync(commitment.error);
  }

  const commitData = encodeFunctionData({
    abi: ethRegistrarAbi,
    functionName: "commit",
    args: [commitment.value.commitment],
  });

  return ResultAsync.fromPromise(
    sendCalls(walletClient, {
      account,
      chain,
      calls: [
        deploymentCall,
        {
          data: commitData,
          to: registrarAddress,
          value: 0n,
        },
      ],
      forceAtomic: true,
    }),
    () => "ATOMIC_BATCH_FAILED" as const,
  ).map(({ id: callsId }) => ({
    callsId,
    commitment: commitment.value.commitment,
    label: commitment.value.label,
    resolverAddress,
  }));
}
