import { ResultAsync, type Result } from "neverthrow";
import type { ContractFunctionParameters, PublicClient } from "viem";

export interface PreparedContractRead<
  TRequest extends ContractFunctionParameters = ContractFunctionParameters,
  TResult = unknown,
  TKind extends string = string,
  TMetadata = unknown,
> {
  /** Stable domain discriminator for logging and cache-key construction. */
  readonly kind: TKind;
  /** Domain data produced while preparing the read. */
  readonly metadata: TMetadata;
  /** ABI-inferred request executed by a public client. */
  readonly request: TRequest;
  /**
   * Optional type marker for the decoded result. Prepare actions do not
   * populate it at runtime.
   */
  readonly resultType?: TResult;
}

export type ContractReadRequest<TPrepared extends PreparedContractRead> =
  TPrepared extends PreparedContractRead<
    infer TRequest,
    infer _TResult,
    infer _TKind,
    infer _TMetadata
  >
    ? TRequest
    : never;

export type ContractReadValue<TPrepared extends PreparedContractRead> =
  TPrepared extends PreparedContractRead<
    infer _TRequest,
    infer TResult,
    infer _TKind,
    infer _TMetadata
  >
    ? TResult
    : never;

export type ContractReadRequests<TReads extends readonly PreparedContractRead[]> = {
  readonly [TIndex in keyof TReads]: ContractReadRequest<TReads[TIndex]>;
};

export type ContractReadResults<TReads extends readonly PreparedContractRead[]> = {
  readonly [TIndex in keyof TReads]:
    | {
        readonly result: ContractReadValue<TReads[TIndex]>;
        readonly status: "success";
      }
    | {
        readonly error: Error;
        readonly result?: undefined;
        readonly status: "failure";
      };
};

export interface PreparedContractReadPlan<
  TReads extends readonly [PreparedContractRead, ...PreparedContractRead[]],
  TData,
  TError,
  TKind extends string = string,
> {
  readonly kind: TKind;
  readonly reads: TReads;
  readonly select: (results: ContractReadResults<TReads>) => Result<TData, TError>;
}

export function executeContractRead<TPrepared extends PreparedContractRead>(
  publicClient: PublicClient,
  prepared: TPrepared,
): ResultAsync<ContractReadValue<TPrepared>, "CONTRACT_READ_FAILED"> {
  return ResultAsync.fromPromise(
    publicClient.readContract(prepared.request as ContractFunctionParameters) as Promise<
      ContractReadValue<TPrepared>
    >,
    () => "CONTRACT_READ_FAILED" as const,
  );
}

export function executeContractReads<
  TReads extends readonly [PreparedContractRead, ...PreparedContractRead[]],
  TData,
  TError,
  TKind extends string,
>(
  publicClient: PublicClient,
  plan: PreparedContractReadPlan<TReads, TData, TError, TKind>,
): ResultAsync<TData, TError | "CONTRACT_READ_FAILED"> {
  const requests = plan.reads.map(
    ({ request }) => request,
  ) as unknown as ContractReadRequests<TReads>;

  return ResultAsync.fromPromise(
    publicClient.multicall({
      allowFailure: true,
      contracts: requests as never,
    }) as unknown as Promise<ContractReadResults<TReads>>,
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(plan.select);
}

/**
 * Executes a prepared read plan as independent RPC reads.
 *
 * Prefer this mode for Universal Resolver calls because each call may trigger
 * its own CCIP Read flow, which cannot reliably pass through Multicall3.
 */
export function executeContractReadsIndividually<
  TReads extends readonly [PreparedContractRead, ...PreparedContractRead[]],
  TData,
  TError,
  TKind extends string,
>(
  publicClient: PublicClient,
  plan: PreparedContractReadPlan<TReads, TData, TError, TKind>,
): ResultAsync<TData, TError | "CONTRACT_READ_FAILED"> {
  return ResultAsync.fromPromise(
    Promise.all(
      plan.reads.map(async (read) => {
        try {
          const result = await publicClient.readContract(
            read.request as ContractFunctionParameters,
          );
          return { result, status: "success" } as const;
        } catch (error) {
          return {
            error: error instanceof Error ? error : new Error("Read failed"),
            status: "failure",
          } as const;
        }
      }),
    ) as Promise<ContractReadResults<TReads>>,
    () => "CONTRACT_READ_FAILED" as const,
  ).andThen(plan.select);
}
