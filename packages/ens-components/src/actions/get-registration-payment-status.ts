import type { EnsNetwork } from "#/data";

import { err, errAsync, ok, ResultAsync } from "neverthrow";
import {
  erc20Abi,
  isAddress,
  zeroAddress,
  type Address,
  type PublicClient,
} from "viem";

import {
  parseNameInput,
  type ParseNameInputError,
} from "#/actions/parse-name-input";
import {
  ethRegistrarGetRegisterPriceSnippet,
  ethRegistrarIsAvailableSnippet,
} from "#/data/abi";

const MAX_UINT64 = (1n << 64n) - 1n;

export type GetRegistrationPaymentStatusError =
  | "CONTRACT_READ_FAILED"
  | "INVALID_ACCOUNT_ADDRESS"
  | "INVALID_DURATION"
  | "INVALID_PAYMENT_TOKEN_ADDRESS"
  | "INVALID_REGISTRAR_ADDRESS"
  | "LABEL_TOO_SHORT"
  | "NAME_NOT_AVAILABLE"
  | "UNSUPPORTED_NAME";

export interface GetRegistrationPaymentStatusProps {
  readonly account: Address;
  readonly duration: bigint;
  readonly input: string | null | undefined;
  readonly network: EnsNetwork;
  readonly paymentTokenAddress: Address;
  readonly registrarAddress: Address;
}

export interface RegistrationPaymentStatus {
  readonly allowance: bigint;
  readonly balance: bigint;
  readonly base: bigint;
  readonly decimals: number;
  readonly hasSufficientAllowance: boolean;
  readonly hasSufficientBalance: boolean;
  readonly premium: bigint;
  readonly total: bigint;
}

export function getRegistrationPaymentStatus(
  publicClient: PublicClient,
  props: GetRegistrationPaymentStatusProps,
): ResultAsync<
  RegistrationPaymentStatus,
  GetRegistrationPaymentStatusError | ParseNameInputError
> {
  const { account, duration, input, paymentTokenAddress, registrarAddress } =
    props;
  const parsedInput = parseNameInput(input);

  if (parsedInput.isErr()) {
    return errAsync(parsedInput.error);
  }

  if (parsedInput.value.nameLevel !== 2 || parsedInput.value.tld !== "eth") {
    return errAsync("UNSUPPORTED_NAME");
  }

  if ([...parsedInput.value.label].length < 3) {
    return errAsync("LABEL_TOO_SHORT");
  }

  if (duration <= 0n || duration > MAX_UINT64) {
    return errAsync("INVALID_DURATION");
  }

  if (!isAddress(account) || account === zeroAddress) {
    return errAsync("INVALID_ACCOUNT_ADDRESS");
  }

  if (!isAddress(registrarAddress)) {
    return errAsync("INVALID_REGISTRAR_ADDRESS");
  }

  if (!isAddress(paymentTokenAddress)) {
    return errAsync("INVALID_PAYMENT_TOKEN_ADDRESS");
  }

  const label = parsedInput.value.label;

  return ResultAsync.fromPromise(
    publicClient.multicall({
      allowFailure: true,
      contracts: [
        {
          address: registrarAddress,
          abi: ethRegistrarIsAvailableSnippet,
          functionName: "isAvailable",
          args: [label],
        },
        {
          address: registrarAddress,
          abi: ethRegistrarGetRegisterPriceSnippet,
          functionName: "getRegisterPrice",
          args: [label, duration, paymentTokenAddress],
        },
        {
          address: paymentTokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        },
        {
          address: paymentTokenAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [account],
        },
        {
          address: paymentTokenAddress,
          abi: erc20Abi,
          functionName: "allowance",
          args: [account, registrarAddress],
        },
      ],
    }),
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(([availability, price, tokenDecimals, balance, allowance]) => {
    if (
      availability.status === "failure" ||
      price.status === "failure" ||
      tokenDecimals.status === "failure" ||
      balance.status === "failure" ||
      allowance.status === "failure"
    ) {
      return err("CONTRACT_READ_FAILED" as const);
    }

    if (!availability.result) {
      return err("NAME_NOT_AVAILABLE" as const);
    }

    const [base, premium] = price.result;
    const total = base + premium;

    return ok({
      allowance: allowance.result,
      balance: balance.result,
      base,
      decimals: tokenDecimals.result,
      hasSufficientAllowance: allowance.result >= total,
      hasSufficientBalance: balance.result >= total,
      premium,
      total,
    });
  });
}
