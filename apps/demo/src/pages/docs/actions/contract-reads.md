---
title: Contract Reads
description: Execute prepared contract reads and multicall plans.
---

# Contract Reads

Executes typed requests returned by prepare read actions.

## Import

```ts [import.ts]
import {
  executeContractRead,
  executeContractReads,
  executeContractReadsIndividually,
} from "ens-components/actions";
```

## executeContractRead

Executes one `PreparedContractRead`.

```ts [availability.ts]
const prepared = prepareNameAvailabilityRead({
  input: "example.eth",
  registrarAddress,
});

if (prepared.isErr()) throw prepared.error;

const availability = await executeContractRead(publicClient, prepared.value);
if (availability.isErr()) throw availability.error;
```

### Parameters

#### publicClient

`PublicClient`

The Viem client used to execute the request.

#### prepared

`PreparedContractRead`

The validated request returned by a prepare read action.

### Return Type

`ResultAsync<TResult, ExecuteContractReadError>`

## executeContractReads

Executes a prepared plan through Viem Multicall. A plan contains an ordered
`reads` tuple and a typed `select` function.

```ts [registration-price.ts]
const prepared = prepareNameRegistrationPriceRead({
  duration,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isErr()) throw prepared.error;

const price = await executeContractReads(publicClient, prepared.value);
```

### Return Type

`ResultAsync<TResult, ExecuteContractReadsError | TSelectError>`

## executeContractReadsIndividually

Executes every request separately, then applies the plan selector. Use this
when each Universal Resolver request must preserve its own CCIP Read flow.

## Error

RPC or decoding failures return `CONTRACT_READ_FAILED`. Plan selectors can
return additional domain error codes.

See [Batching](/docs/guides/batching) for read-plan composition and executor
selection.
