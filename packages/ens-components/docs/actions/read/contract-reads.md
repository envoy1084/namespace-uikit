# Prepared contract reads

Read actions validate domain input and return typed read requests. They do not
access an RPC endpoint until passed to an executor.

Use `executeContractRead` for one prepared read and
`executeContractReads` for a prepared multicall plan. Use
`executeContractReadsIndividually` when each read must preserve its own CCIP
Read flow.

```ts
import {
  executeContractRead,
  prepareNameAvailabilityRead,
} from "ens-components/actions";

const prepared = prepareNameAvailabilityRead({
  input: "example.eth",
  network: "testnet",
  registrarAddress,
});

if (prepared.isErr()) throw new Error(prepared.error);

const availability = await executeContractRead(publicClient, prepared.value);
if (availability.isErr()) throw new Error(availability.error);
```

Plans contain an ordered `reads` tuple and a typed `select` function. The plan
executor submits one Viem multicall with `allowFailure: true`, then applies the
selector.

```ts
const prepared = prepareNamePriceRead({
  duration,
  input: "example.eth",
  network: "testnet",
  paymentTokenAddress,
  registrarAddress,
});

if (prepared.isErr()) throw new Error(prepared.error);

const price = await executeContractReads(publicClient, prepared.value);
```

Both executors return `ResultAsync`. RPC or decode failures use
`CONTRACT_READ_FAILED`; plan selectors may add domain errors.

GraphQL read actions use `PreparedGraphqlRead` and `executeGraphqlRead`.
GraphQL transport or response-envelope failures use `GRAPHQL_READ_FAILED`.
