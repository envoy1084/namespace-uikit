import { err, errAsync, ok, type Result, type ResultAsync } from "neverthrow";
import { type Address, type ContractFunctionParameters, type Hex, type PublicClient } from "viem";

import { executeContractRead, type PreparedContractRead } from "#/actions/read/contract-reads";
import { universalResolverV2Abi } from "#/data/abi";
import { encodeDnsName, isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareNameResolverReadError =
  | "INVALID_UNIVERSAL_RESOLVER_ADDRESS"
  | ParseNameInputError;

export interface PrepareNameResolverReadParameters {
  readonly input: string | null | undefined;
  readonly universalResolverAddress: Address;
}

type NameResolverRequest = ContractFunctionParameters<
  typeof universalResolverV2Abi,
  "view",
  "findResolver",
  readonly [Hex]
>;

export interface NameResolverResult {
  readonly name: string;
  readonly node: Hex;
  readonly offset: bigint;
  readonly resolverAddress: Address;
}

export type PreparedNameResolverRead = PreparedContractRead<
  NameResolverRequest,
  readonly [Address, Hex, bigint],
  "name-resolver",
  {
    readonly name: string;
  }
>;

export type ReadNameResolverParameters = PrepareNameResolverReadParameters;
export type ReadNameResolverReturnType = NameResolverResult;
export type ReadNameResolverErrorType = PrepareNameResolverReadError | "CONTRACT_READ_FAILED";

/** Prepares discovery of the resolver currently serving an ENS name. */
export function prepareNameResolverRead(
  parameters: PrepareNameResolverReadParameters,
): Result<PreparedNameResolverRead, PrepareNameResolverReadError> {
  if (!isNonZeroAddress(parameters.universalResolverAddress)) {
    return err("INVALID_UNIVERSAL_RESOLVER_ADDRESS");
  }

  const parsed = parseNameInput(parameters.input);
  if (parsed.isErr()) return err(parsed.error);

  return ok({
    kind: "name-resolver",
    metadata: {
      name: parsed.value.normalizedName,
    },
    request: {
      address: parameters.universalResolverAddress,
      abi: universalResolverV2Abi,
      functionName: "findResolver",
      args: [encodeDnsName(parsed.value.normalizedName)],
    },
  });
}

/** Reads the resolver currently serving an ENS name. */
export function readNameResolver(
  publicClient: PublicClient,
  parameters: ReadNameResolverParameters,
): ResultAsync<ReadNameResolverReturnType, ReadNameResolverErrorType> {
  const prepared = prepareNameResolverRead(parameters);
  if (prepared.isErr()) return errAsync(prepared.error);

  return executeContractRead(publicClient, prepared.value).map(
    ([resolverAddress, node, offset]) => ({
      name: prepared.value.metadata.name,
      node,
      offset,
      resolverAddress,
    }),
  );
}
