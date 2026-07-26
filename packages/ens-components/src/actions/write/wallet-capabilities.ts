import { ResultAsync, errAsync } from "neverthrow";
import {
  BaseError,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  UnsupportedProviderMethodError,
  isAddress,
  zeroAddress,
  type Address,
  type WalletClient,
} from "viem";
import { getCapabilities } from "viem/actions";

export type SupportsAtomicBatchCallsError =
  | "CAPABILITIES_REQUEST_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_CHAIN_ID";

export interface SupportsAtomicBatchCallsProps {
  /** Account whose wallet capabilities should be checked. */
  readonly account: Address;
  /** Chain on which atomic batch support is required. */
  readonly chainId: number;
}

function isUnsupportedError(error: unknown): boolean {
  return (
    error instanceof MethodNotFoundRpcError ||
    error instanceof MethodNotSupportedRpcError ||
    error instanceof UnsupportedProviderMethodError
  );
}

function isUnsupportedCapabilitiesMethod(error: unknown): boolean {
  if (error instanceof BaseError) {
    return error.walk(isUnsupportedError) !== null;
  }

  return isUnsupportedError(error);
}

async function requestAtomicBatchSupport(
  walletClient: WalletClient,
  props: SupportsAtomicBatchCallsProps,
): Promise<boolean> {
  try {
    const capabilities = await getCapabilities(walletClient, props);
    const status = capabilities?.atomic?.status;

    return status === "ready" || status === "supported";
  } catch (error) {
    if (isUnsupportedCapabilitiesMethod(error)) {
      return false;
    }

    throw error;
  }
}

/**
 * Checks whether a wallet supports atomic EIP-5792 batch calls on a chain.
 *
 * Wallets that do not implement `wallet_getCapabilities`, omit the `atomic`
 * capability, or explicitly report it as unsupported resolve to `false`.
 */
export function supportsAtomicBatchCalls(
  walletClient: WalletClient,
  props: SupportsAtomicBatchCallsProps,
): ResultAsync<boolean, SupportsAtomicBatchCallsError> {
  const { account, chainId } = props;

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!Number.isSafeInteger(chainId) || chainId <= 0) {
    return errAsync("INVALID_CHAIN_ID");
  }

  return ResultAsync.fromPromise(
    requestAtomicBatchSupport(walletClient, props),
    () => "CAPABILITIES_REQUEST_FAILED" as const,
  );
}
