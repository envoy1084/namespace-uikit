---
title: Contract Reads
description: Execute prepared ENS contract reads.
---

# Contract Reads

Preparation actions validate input and return typed requests. They do not
access an RPC endpoint.

## Import

```ts
import {
  executeContractRead,
  executeContractReads,
  executeContractReadsIndividually,
} from "ens-components/actions";
```

## executeContractRead

Use `executeContractRead` for one prepared read and
one RPC request.

```ts
const prepared = prepareNameAvailabilityRead({
  input: "example.eth",
  registrarAddress,
});

if (prepared.isErr()) throw prepared.error;

const availability = await executeContractRead(publicClient, prepared.value);
if (availability.isErr()) throw availability.error;
```

## executeContractReads

Executes a prepared plan through Viem Multicall. A plan contains an ordered
`reads` tuple and a typed `select` function.

```ts
const prepared = prepareNameRegistrationPriceRead({
  duration,
  input: "example.eth",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isErr()) throw prepared.error;

const price = await executeContractReads(publicClient, prepared.value);
```

## executeContractReadsIndividually

Executes every request separately, then applies the plan selector. Use this
when each Universal Resolver request must preserve its own CCIP Read flow.

All executors return `ResultAsync`. RPC or decoding failures return
`CONTRACT_READ_FAILED`; plan selectors can return additional domain errors.
