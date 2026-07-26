const FALLBACK_ERROR_MESSAGE = "Something went wrong. Please try again.";

type ErrorMessage = string | ((data: unknown) => string);

function getDataString(data: unknown, key: string) {
  if (typeof data !== "object" || data === null || !(key in data)) {
    return undefined;
  }

  const value = (data as Record<string, unknown>)[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getName(data: unknown) {
  return getDataString(data, "name") ?? getDataString(data, "input");
}

const ERROR_MESSAGES: Readonly<Record<string, ErrorMessage>> = {
  ATOMIC_BATCH_FAILED: "The batched transactions could not be completed.",
  CAPABILITIES_REQUEST_FAILED:
    "Unable to check whether this wallet supports batched transactions.",
  CHAIN_SWITCH_FAILED: "Unable to switch networks. Please try again.",
  COMMITMENT_EXPIRED:
    "This commitment has expired. Create a new commitment to continue.",
  COMMITMENT_NOT_FOUND:
    "This commitment was not found on-chain. Create a new commitment to continue.",
  COMMITMENT_NOT_READY:
    "This commitment is still waiting. Try the registration again shortly.",
  CONTRACT_READ_FAILED: "Unable to reach the network. Please try again.",
  CONTRACT_CALLS_STATUS_FAILED: "Unable to confirm the batched transactions.",
  CONTRACT_SIMULATION_FAILED: "The resolver deployment could not be prepared.",
  CONTRACT_WRITE_FAILED: "The transaction could not be submitted.",
  EMPTY_INPUT: "Enter an ENS name.",
  EMPTY_CALLS: "There are no transactions to submit.",
  EMPTY_LABEL: "The ENS name contains an empty label.",
  INPUT_TOO_LONG: "The ENS name is too long.",
  INVALID_DURATION: "Select a valid registration duration.",
  INVALID_OWNER_ADDRESS: "The name owner address is invalid.",
  INVALID_ACCOUNT_ADDRESS: "The connected wallet address is invalid.",
  INVALID_APPROVAL_AMOUNT: "The token approval amount is invalid.",
  INVALID_CALLS_ID: "The saved atomic transaction identifier is invalid.",
  INVALID_CHAIN_ID: "The selected network is invalid.",
  INVALID_COMMITMENT: "The saved commitment is invalid.",
  INVALID_CONTRACT_CALL: "A prepared contract call is invalid.",
  INVALID_DEPLOYMENT_CALL: "The resolver deployment call is invalid.",
  INVALID_NAME: "Enter a valid ENS name.",
  INVALID_FACTORY_ADDRESS: "The resolver factory address is invalid.",
  INVALID_IMPLEMENTATION_ADDRESS:
    "The resolver implementation address is invalid.",
  INVALID_INIT_DATA: "The resolver initialization data is invalid.",
  INVALID_PAYMENT_TOKEN_ADDRESS: "The payment token address is invalid.",
  INVALID_REGISTRAR_ADDRESS: "The registrar address is invalid.",
  INVALID_REFERRER: "The referrer value is invalid.",
  INVALID_RESOLVER_ADDRESS: "The resolver address is invalid.",
  INVALID_SALT: "The saved resolver salt is invalid.",
  INVALID_SECRET: "The saved commitment secret is invalid.",
  INVALID_SUBREGISTRY_ADDRESS: "The subregistry address is invalid.",
  LABEL_TOO_LONG: "The ENS label is too long.",
  LABEL_TOO_SHORT: (data) => {
    const name = getName(data);
    return name
      ? `${name} is not available. Names must be at least 3 characters.`
      : "Names must be at least 3 characters.";
  },
  NAME_NOT_AVAILABLE: (data) => {
    const name = getName(data);
    return name ? `${name} is not available.` : "This name is not available.";
  },
  RESOLVER_DEPLOYMENT_INVALID:
    "The dedicated resolver deployment could not be verified.",
  RESOLVER_NOT_DEPLOYED:
    "The custom resolver is not deployed on the selected network.",
  MISMATCHED_ACCOUNTS:
    "Every transaction in a batch must use the same wallet account.",
  SINGLE_CALL_REQUIRED:
    "This transaction strategy supports exactly one contract call.",
  UNSUPPORTED_NAME: "Only second-level .eth names are supported.",
  TRANSACTION_CONFIRMATION_FAILED: "Unable to confirm the transaction.",
  TRANSACTION_REVERTED: "The transaction was reverted.",
  WALLET_ACCOUNT_CHANGED:
    "The connected account changed. Reopen this registration with the original wallet.",
  WALLET_NOT_CONNECTED: "Connect your wallet to continue.",
};

function getErrorCode(error: unknown) {
  if (typeof error === "string") return error;

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return undefined;
}

/**
 * Converts action error codes and unknown errors into user-facing messages.
 *
 * Optional untyped data can provide interpolation values such as
 * `{ name: "vitalik.eth" }`.
 */
export function formatError(error: unknown, data?: unknown) {
  const code = getErrorCode(error);
  const message = code === undefined ? undefined : ERROR_MESSAGES[code];

  if (typeof message === "function") return message(data);
  if (message !== undefined) return message;
  if (error instanceof Error && error.message.length > 0) return error.message;

  return FALLBACK_ERROR_MESSAGE;
}
