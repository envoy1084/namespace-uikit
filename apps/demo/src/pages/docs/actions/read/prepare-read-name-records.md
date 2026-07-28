# prepareNameRecordsRead

Validates a name and record selection, then prepares one Universal Resolver
request for every selected record.

```ts
import { executeContractReadsIndividually, prepareNameRecordsRead } from "ens-components/actions";

const prepared = prepareNameRecordsRead({
  input: "example.eth",
  network: "testnet",
  records: {
    addresses: ["60"],
    contenthash: true,
    text: ["avatar", "description"],
  },
  universalResolverAddress,
});

if (prepared.isErr()) throw new Error(prepared.error);

const result = await executeContractReadsIndividually(publicClient, prepared.value);
```

The action does not access an RPC endpoint. Its plan validates and normalizes
ABI content types, coin types, record keys, and interface identifiers.

Use `executeContractReadsIndividually` for this plan. Independent reads
preserve Universal Resolver CCIP Read behavior that cannot reliably pass
through Multicall3.

The decoded result is `NameRecordsResult`, including the canonical resolver
address, node, normalized selection, and `NameProfileFormValues`.
