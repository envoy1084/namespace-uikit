import { err, ResultAsync, type Result } from "neverthrow";

export interface PreparedGraphqlRead<
  TData,
  TError,
  TKind extends string = string,
> {
  readonly kind: TKind;
  readonly request: {
    readonly query: string;
    readonly url: string;
    readonly variables: Readonly<Record<string, unknown>>;
  };
  readonly select: (data: unknown) => Result<TData, TError>;
}

export interface ExecuteGraphqlReadOptions {
  readonly signal?: AbortSignal;
}

interface GraphqlResponse {
  readonly data?: unknown;
  readonly errors?: readonly unknown[];
}

function isGraphqlResponse(value: unknown): value is GraphqlResponse {
  return typeof value === "object" && value !== null;
}

export function executeGraphqlRead<TData, TError, TKind extends string>(
  prepared: PreparedGraphqlRead<TData, TError, TKind>,
  options: ExecuteGraphqlReadOptions = {},
): ResultAsync<TData, TError | "GRAPHQL_READ_FAILED"> {
  return ResultAsync.fromPromise(
    fetch(prepared.request.url, {
      body: JSON.stringify({
        query: prepared.request.query,
        variables: prepared.request.variables,
      }),
      headers: {
        accept: "application/graphql-response+json, application/json",
        "content-type": "application/json",
      },
      method: "POST",
      ...(options.signal === undefined ? {} : { signal: options.signal }),
    }).then(async (response) => {
      if (!response.ok) throw new Error(`GraphQL HTTP ${response.status}`);
      return response.json() as Promise<unknown>;
    }),
    () => "GRAPHQL_READ_FAILED" as const,
  ).andThen((response) => {
    if (
      !isGraphqlResponse(response) ||
      response.data === undefined ||
      (response.errors !== undefined && response.errors.length > 0)
    ) {
      return err("GRAPHQL_READ_FAILED");
    }
    return prepared.select(response.data);
  });
}
