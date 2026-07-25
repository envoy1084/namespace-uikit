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
  CHAIN_SWITCH_FAILED: "Unable to switch networks. Please try again.",
  CONTRACT_READ_FAILED: "Unable to reach the network. Please try again.",
  CONTRACT_WRITE_FAILED: "The commitment transaction could not be submitted.",
  EMPTY_INPUT: "Enter an ENS name.",
  EMPTY_LABEL: "The ENS name contains an empty label.",
  INPUT_TOO_LONG: "The ENS name is too long.",
  INVALID_DURATION: "Select a valid registration duration.",
  INVALID_NAME: "Enter a valid ENS name.",
  INVALID_PAYMENT_TOKEN_ADDRESS: "The payment token address is invalid.",
  INVALID_REGISTRAR_ADDRESS: "The registrar address is invalid.",
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
  UNSUPPORTED_NAME: "Only second-level .eth names are supported.",
  TRANSACTION_CONFIRMATION_FAILED:
    "Unable to confirm the commitment transaction.",
  TRANSACTION_REVERTED: "The commitment transaction was reverted.",
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
