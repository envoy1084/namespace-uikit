import type {
  CommitNameProps,
  CreateResolverSaltError,
  IsResolverDeployedError,
  MakeNameCommitmentError,
  ParseNameInputError,
  PreparePermissionedResolverDeploymentError,
} from "#/actions";
import type { EnsNetwork } from "#/data";
import type {
  RegistrationAttemptInput,
  RegistrationAttemptUpdate,
  StoredRegistrationAttempt,
  StoredRegistrationResolver,
} from "#/hooks/use-registration-attempts";

import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import {
  bytesToHex,
  zeroAddress,
  type Address,
  type Hex,
  type PublicClient,
} from "viem";

import {
  createResolverSalt,
  isResolverDeployed,
  makeNameCommitment,
  parseNameInput,
  preparePermissionedResolverDeployment,
} from "#/actions";

export type PrepareRegistrationAttemptError =
  | "INVALID_DURATION"
  | "RESOLVER_NOT_DEPLOYED"
  | CreateResolverSaltError
  | IsResolverDeployedError
  | MakeNameCommitmentError
  | ParseNameInputError
  | PreparePermissionedResolverDeploymentError;

export interface PrepareRegistrationAttemptProps {
  account: Address;
  chainId: number;
  duration: bigint;
  factoryAddress: Address;
  implementationAddress: Address;
  input: string | null | undefined;
  network: EnsNetwork;
  owner: Address;
  paymentTokenAddress: Address;
  referrer: Hex;
  registrarAddress: Address;
  resolverAddress: Address | null;
}

function createSecret(): Hex {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
}

function buildRegistrationAttempt(
  props: PrepareRegistrationAttemptProps,
  resolver: StoredRegistrationResolver,
  secret: Hex,
): Result<
  RegistrationAttemptInput,
  MakeNameCommitmentError | ParseNameInputError
> {
  const parsedInput = parseNameInput(props.input);
  if (parsedInput.isErr()) return err(parsedInput.error);

  const commitment = makeNameCommitment({
    duration: props.duration,
    input: props.input,
    owner: props.owner,
    referrer: props.referrer,
    resolverAddress: resolver.address,
    secret,
    subregistryAddress: zeroAddress,
  });

  if (commitment.isErr()) return err(commitment.error);

  return ok({
    account: props.account,
    chainId: props.chainId,
    commitment: commitment.value.commitment,
    duration: props.duration.toString(),
    label: commitment.value.label,
    normalizedName: parsedInput.value.normalizedName,
    owner: props.owner,
    paymentTokenAddress: props.paymentTokenAddress,
    referrer: props.referrer,
    registrarAddress: props.registrarAddress,
    resolver,
    secret,
    submission: { type: "prepared" },
    subregistry: zeroAddress,
  });
}

export function prepareRegistrationAttempt(
  publicClient: PublicClient,
  props: PrepareRegistrationAttemptProps,
): ResultAsync<RegistrationAttemptInput, PrepareRegistrationAttemptError> {
  const secret = createSecret();

  if (props.resolverAddress !== null) {
    const resolverAddress = props.resolverAddress;

    return isResolverDeployed(publicClient, {
      network: props.network,
      resolverAddress,
    }).andThen((isDeployed) => {
      if (!isDeployed) return err("RESOLVER_NOT_DEPLOYED" as const);

      return buildRegistrationAttempt(
        props,
        {
          address: resolverAddress,
          type: "custom",
        },
        secret,
      );
    });
  }

  const salt = createResolverSalt({ input: props.input });
  if (salt.isErr()) return errAsync(salt.error);

  return preparePermissionedResolverDeployment(publicClient, {
    account: props.account,
    factoryAddress: props.factoryAddress,
    implementationAddress: props.implementationAddress,
    network: props.network,
    owner: props.owner,
    salt: salt.value.salt,
  }).andThen((prepared) =>
    buildRegistrationAttempt(
      props,
      {
        address: prepared.resolverAddress,
        deployer: props.account,
        deploymentData: prepared.call.data,
        factoryAddress: props.factoryAddress,
        implementationAddress: props.implementationAddress,
        initData: prepared.initData,
        salt: prepared.salt,
        type: "dedicated",
      },
      secret,
    ),
  );
}

export function renewRegistrationAttempt(
  attempt: StoredRegistrationAttempt,
): Result<
  RegistrationAttemptUpdate,
  "INVALID_DURATION" | MakeNameCommitmentError | ParseNameInputError
> {
  let duration: bigint;

  try {
    duration = BigInt(attempt.duration);
  } catch {
    return err("INVALID_DURATION");
  }

  const secret = createSecret();
  const commitment = makeNameCommitment({
    duration,
    input: attempt.normalizedName,
    owner: attempt.owner,
    referrer: attempt.referrer,
    resolverAddress: attempt.resolver.address,
    secret,
    subregistryAddress: attempt.subregistry,
  });

  if (commitment.isErr()) return err(commitment.error);

  return ok({
    commitment: commitment.value.commitment,
    secret,
    submission: { type: "prepared" },
  });
}

export function getAttemptCommitNameProps(
  attempt: StoredRegistrationAttempt,
  network: EnsNetwork,
): CommitNameProps | undefined {
  try {
    return {
      account: attempt.account,
      duration: BigInt(attempt.duration),
      input: attempt.normalizedName,
      network,
      owner: attempt.owner,
      referrer: attempt.referrer,
      registrarAddress: attempt.registrarAddress,
      resolverAddress: attempt.resolver.address,
      secret: attempt.secret,
      subregistryAddress: attempt.subregistry,
    };
  } catch {
    return undefined;
  }
}
