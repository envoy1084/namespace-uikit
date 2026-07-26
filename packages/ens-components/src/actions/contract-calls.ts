import type {
  ContractFunctionParameters,
  Address,
  Hex,
  TransactionReceipt,
} from "viem";

export interface ContractCall {
  readonly data: Hex;
  readonly to: Address;
  readonly value: bigint;
}

/**
 * A validated contract write that can be submitted individually or composed
 * with other prepared writes.
 */
export interface PreparedContractWrite<
  TRequest extends ContractFunctionParameters = ContractFunctionParameters,
  TKind extends string = string,
  TMetadata = unknown,
> {
  /** Account whose wallet must submit this call. */
  readonly account: Address;
  /** Encoded EIP-5792-compatible call. */
  readonly call: ContractCall;
  /** Stable domain discriminator for logging and progress handling. */
  readonly kind: TKind;
  /** Domain data produced while preparing the call. */
  readonly metadata: TMetadata;
  /** ABI-inferred request used to inspect or simulate the write. */
  readonly request: TRequest;
}

export type ContractCallStrategy = "atomic" | "auto" | "sequential" | "single";

export type ResolvedContractCallStrategy = "atomic" | "sequential" | "single";

export type ContractCallProgress =
  | {
      readonly callIndex: number;
      readonly prepared: PreparedContractWrite;
      readonly state: "signing";
      readonly strategy: ResolvedContractCallStrategy;
    }
  | {
      readonly callIndex: number;
      readonly prepared: PreparedContractWrite;
      readonly state: "submitted";
      readonly strategy: "sequential" | "single";
      readonly transactionHash: Hex;
    }
  | {
      readonly callIndex: number;
      readonly prepared: PreparedContractWrite;
      readonly receipt: TransactionReceipt;
      readonly state: "confirmed";
      readonly strategy: "sequential" | "single";
      readonly transactionHash: Hex;
    }
  | {
      readonly callsId: string;
      readonly prepared: readonly PreparedContractWrite[];
      readonly state: "submitted";
      readonly strategy: "atomic";
    }
  | {
      readonly callsId: string;
      readonly prepared: readonly PreparedContractWrite[];
      readonly state: "confirmed";
      readonly strategy: "atomic";
      readonly transactionHashes: readonly Hex[];
    };

export interface SubmittedContractTransaction {
  readonly prepared: PreparedContractWrite;
  readonly receipt?: TransactionReceipt;
  readonly transactionHash: Hex;
}

export type ExecuteContractCallsResult =
  | {
      readonly callsId: string;
      readonly status: "confirmed" | "submitted";
      readonly strategy: "atomic";
      readonly transactionHashes: readonly Hex[];
    }
  | {
      readonly status: "confirmed" | "submitted";
      readonly strategy: "sequential" | "single";
      readonly transactions: readonly SubmittedContractTransaction[];
    };
