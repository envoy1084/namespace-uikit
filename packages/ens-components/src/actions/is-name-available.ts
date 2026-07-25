import { errAsync, ResultAsync } from "neverthrow";
import { isAddress, type PublicClient } from "viem";

import { ensNetworkConfigurations } from "../data";
import { parseNameInput, type ParseNameInputError } from "./parse-name-input";

export type IsNameAvailableErrorCode =
  | "invalid-name"
  | "unsupported-chain"
  | "configuration-error"
  | "contract-read-failed";

export interface IsNameAvailableErrorOptions {
  readonly cause?: unknown;
  readonly chainId?: number;
  readonly parseError?: ParseNameInputError;
}

export class IsNameAvailableError extends Error {
  override readonly name = "IsNameAvailableError";
  readonly code: IsNameAvailableErrorCode;
  readonly chainId: number | undefined;
  readonly parseError: ParseNameInputError | undefined;

  constructor(
    code: IsNameAvailableErrorCode,
    message: string,
    options: IsNameAvailableErrorOptions = {},
  ) {
    super(
      message,
      options.cause === undefined ? undefined : { cause: options.cause },
    );
    this.code = code;
    this.chainId = options.chainId;
    this.parseError = options.parseError;
  }
}

function getNetworkConfiguration(chainId: number | undefined) {
  return Object.values(ensNetworkConfigurations).find(
    (configuration) => configuration.chain.id === chainId,
  );
}

/**
 * Checks an ENS label or second-level `.eth` name against the ENSv2
 * ETHRegistrar selected by the public client's chain.
 *
 * This action performs no caching or debouncing. It is safe to call from React
 * hooks, server code, command handlers, or other framework-independent code.
 */
export function isNameAvailable(
  publicClient: PublicClient,
  value: string | null | undefined,
): ResultAsync<boolean, IsNameAvailableError> {
  const parsedInput = parseNameInput(value);

  if (parsedInput.isErr()) {
    return errAsync(
      new IsNameAvailableError("invalid-name", "The ENS name is invalid.", {
        parseError: parsedInput.error,
      }),
    );
  }

  const parsedName = parsedInput.value;

  if (parsedName.tld !== "eth" || parsedName.nameLevel !== 2) {
    return errAsync(
      new IsNameAvailableError(
        "invalid-name",
        "Name availability can only be checked for second-level .eth names.",
      ),
    );
  }

  const chainId = publicClient.chain?.id;
  const networkConfiguration = getNetworkConfiguration(chainId);

  if (networkConfiguration === undefined) {
    return errAsync(
      new IsNameAvailableError(
        "unsupported-chain",
        chainId === undefined
          ? "The public client does not have a configured chain."
          : `Chain ${chainId} is not supported by ENS Components.`,
        chainId === undefined ? undefined : { chainId },
      ),
    );
  }

  const resolvedChainId = networkConfiguration.chain.id;
  const ethRegistrar = networkConfiguration.contracts.ethRegistrar;

  if (!isAddress(ethRegistrar.address)) {
    return errAsync(
      new IsNameAvailableError(
        "configuration-error",
        `The ENSv2 ETHRegistrar address for ${networkConfiguration.network} is invalid.`,
        { chainId: resolvedChainId },
      ),
    );
  }

  return ResultAsync.fromPromise(
    publicClient.readContract({
      address: ethRegistrar.address,
      abi: ethRegistrar.snippets.ethRegistrarIsAvailableSnippet,
      functionName: "isAvailable",
      args: [parsedName.label],
    }),
    (cause) =>
      new IsNameAvailableError(
        "contract-read-failed",
        `Failed to check name availability on chain ${resolvedChainId}.`,
        { cause, chainId: resolvedChainId },
      ),
  );
}
