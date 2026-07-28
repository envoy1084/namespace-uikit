import { err, ok, type Result } from "neverthrow";
import { type Address, type ContractFunctionParameters, type Hex } from "viem";

import type { PreparedContractRead } from "#/actions/read/contract-reads";
import type { EnsNetwork } from "#/data";
import { universalResolverV2Abi } from "#/data/abi";
import { encodeDnsName, isNonZeroAddress } from "#/lib/helpers";
import type { ParseNameInputError } from "#/lib/parse-name-input";
import { parseNameInput } from "#/lib/parse-name-input";

export type PrepareNameResolverReadError =
  | "INVALID_UNIVERSAL_RESOLVER_ADDRESS"
  | ParseNameInputError;

export interface PrepareNameResolverReadParameters {
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly universalResolverAddress: Address;
}

type NameResolverRequest = ContractFunctionParameters<
  typeof universalResolverV2Abi,
  "view",
  "findResolver",
  readonly [Hex]
>;

export interface NameResolverReadResult {
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
