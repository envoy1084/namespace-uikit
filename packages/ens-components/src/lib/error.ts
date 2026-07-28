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
  DUPLICATE_ABI_CONTENT_TYPE: "Each ABI content type can only be added once.",
  DUPLICATE_ADDRESS_COIN_TYPE: "Each network address can only be added once.",
  DUPLICATE_DATA_KEY: "Each data key can only be added once.",
  DUPLICATE_INTERFACE_ID: "Each interface ID can only be added once.",
  DUPLICATE_TEXT_KEY: "Each text record key can only be added once.",
  EMPTY_PERMISSION_REQUESTS:
    "Select at least one record before checking permissions.",
  EMPTY_PROFILE_CHANGES: "There are no profile changes to update.",
  EMPTY_INPUT: "Enter an ENS name.",
  EMPTY_CALLS: "There are no transactions to submit.",
  EMPTY_LABEL: "The ENS name contains an empty label.",
  IMAGE_UPLOAD_FAILED: "The image upload did not return a usable URL.",
  INPUT_TOO_LONG: "The ENS name is too long.",
  INVALID_DURATION: "Select a valid duration.",
  INVALID_ETH_REGISTRY_ADDRESS: "The ENS registry address is invalid.",
  INVALID_OWNER_ADDRESS: "The name owner address is invalid.",
  INVALID_ACCOUNT_ADDRESS: "The connected wallet address is invalid.",
  INVALID_ABI_CONTENT_TYPE:
    "Enter one power-of-two ABI content type, such as 1, 2, 4, or 8.",
  INVALID_ABI_VALUE: "Enter ABI data as 0x-prefixed, even-length hex bytes.",
  INVALID_ADDRESS: (data) => {
    const network = getDataString(data, "network");
    return network
      ? `Enter an address that is valid for ${network}.`
      : "Enter an address that is valid for this coin type.";
  },
  INVALID_APPROVAL_AMOUNT: "The token approval amount is invalid.",
  INVALID_CALLS_ID: "The saved atomic transaction identifier is invalid.",
  INVALID_CHAIN_ID: "The selected network is invalid.",
  INVALID_COMMITMENT: "The saved commitment is invalid.",
  INVALID_COIN_TYPE: "Enter the coin type as a non-negative whole number.",
  INVALID_CONTENTHASH:
    "Enter a valid IPFS, IPNS, Arweave, Swarm, Tor, Sia, or TON content hash.",
  INVALID_CONTRACT_CALL: "A prepared contract call is invalid.",
  INVALID_DATA_KEY: "Enter a key for this data record.",
  INVALID_DATA_VALUE: "Enter the data value as even-length hex bytes.",
  INVALID_DEPLOYMENT_CALL: "The resolver deployment call is invalid.",
  INVALID_EMAIL: "Enter a complete email address, such as name@example.com.",
  INVALID_NAME: "Enter a valid ENS name.",
  INVALID_FACTORY_ADDRESS: "The resolver factory address is invalid.",
  INVALID_IMPLEMENTATION_ADDRESS:
    "The resolver implementation address is invalid.",
  INVALID_IMAGE_FILE: "Select a valid image file.",
  INVALID_IMAGE_URL:
    "Enter an HTTP, HTTPS, IPFS, IPNS, data, or eip155 image URI.",
  INVALID_INTERFACE_ID:
    "Enter the interface ID as four-byte hex, such as 0x01ffc9a7.",
  INVALID_INTERFACE_IMPLEMENTER:
    "Enter a valid contract address for this interface.",
  INVALID_L1_REVERSE_REGISTRAR_ADDRESS:
    "The L1 primary-name registrar address is invalid.",
  INVALID_L2_REVERSE_REGISTRAR_ADDRESS:
    "The ENS v2 primary-name registrar address is invalid.",
  INVALID_INIT_DATA: "The resolver initialization data is invalid.",
  INVALID_NAME_RECORD: "Enter a valid normalized ENS name.",
  INVALID_PAYMENT_TOKEN_ADDRESS: "The payment token address is invalid.",
  INVALID_PERMISSION_KEY: "One of the record permission keys is invalid.",
  INVALID_PROFILE_RECORDS: "One or more profile records are invalid.",
  INVALID_PUBLIC_KEY:
    "Enter both public-key coordinates as 32-byte hex values.",
  INVALID_PUBLIC_KEY_X:
    "Enter X as 0x followed by exactly 64 hexadecimal characters.",
  INVALID_PUBLIC_KEY_Y:
    "Enter Y as 0x followed by exactly 64 hexadecimal characters.",
  INVALID_REGISTRAR_ADDRESS: "The registrar address is invalid.",
  INVALID_SPENDER_ADDRESS: "The token spender address is invalid.",
  INVALID_REFERRER: "The referrer value is invalid.",
  INVALID_RESOLVER_ADDRESS: "The resolver address is invalid.",
  INVALID_SALT: "The saved resolver salt is invalid.",
  INVALID_SECRET: "The saved commitment secret is invalid.",
  INVALID_SUBREGISTRY_ADDRESS: "The subregistry address is invalid.",
  INVALID_TEXT_KEY: "Enter a key for this text record.",
  INVALID_TIMEZONE:
    "Enter a canonical IANA timezone, such as America/Los_Angeles.",
  INVALID_URL: "Enter a complete URL beginning with http:// or https://.",
  INVALID_UNIVERSAL_RESOLVER_ADDRESS:
    "The Universal Resolver address is invalid.",
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
  NAME_NOT_RENEWABLE: (data) => {
    const name = getName(data);
    return name
      ? `${name} cannot be renewed right now.`
      : "This name cannot be renewed right now.";
  },
  PROFILE_PERMISSION_READ_FAILED:
    "Unable to check this wallet's record permissions.",
  PROFILE_UPDATE_SIMULATION_FAILED:
    "The record update could not be prepared. Check your permissions and try again.",
  RESOLVER_CHANGED:
    "The resolver changed while this update was being prepared. Review the records and try again.",
  RESOLVER_NOT_FOUND: "This name does not have a resolver.",
  RESOLVER_DEPLOYMENT_INVALID:
    "The dedicated resolver deployment could not be verified.",
  RESOLVER_NOT_DEPLOYED:
    "The custom resolver is not deployed on the selected network.",
  MISMATCHED_ACCOUNTS:
    "Every transaction in a batch must use the same wallet account.",
  MISSING_PUBLIC_KEY_X: "Enter the public key X coordinate.",
  MISSING_PUBLIC_KEY_Y: "Enter the public key Y coordinate.",
  PARTIAL_BATCH_FAILED:
    "Some transactions confirmed before a later one failed. Review them before retrying.",
  SINGLE_CALL_REQUIRED:
    "This transaction strategy supports exactly one contract call.",
  UNSUPPORTED_NAME: "Only second-level .eth names are supported.",
  UNSUPPORTED_RESOLVER:
    "This resolver does not support ENS v2 record permissions.",
  TRANSACTION_CONFIRMATION_FAILED: "Unable to confirm the transaction.",
  TRANSACTION_REJECTED: "The transaction was rejected in the wallet.",
  TRANSACTION_REVERTED: "The transaction was reverted.",
  UNSUPPORTED_COIN_TYPE:
    "Choose a supported coin type or remove this address record.",
  WALLET_ACCOUNT_CHANGED:
    "The connected account changed. Switch back to the original wallet and try again.",
  WALLET_NETWORK_CHANGED:
    "The connected network changed. Switch back to the required network and try again.",
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
