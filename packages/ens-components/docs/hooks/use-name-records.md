# useNameRecords

Reads an explicit set of ENS records through the configured Universal
Resolver. It supports wildcard resolution and CCIP Read because every resolver
request is executed independently instead of through Multicall3.

```tsx
import { useNameRecords } from "ens-components/hooks";

const profile = useNameRecords({
  input: "example.eth",
  records: {
    addresses: ["60", "0"],
    contenthash: true,
    text: ["avatar", "description", "url"],
  },
});
```

## Parameters

```ts
interface UseNameRecordsParameters<selectData = NameRecordsResult> {
  input: string | null | undefined;
  records: NameRecordSelection;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameRecordsResult, NameRecordsError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

`records` accepts:

```ts
interface NameRecordSelection {
  abi?: readonly string[];
  addresses?: readonly string[];
  contenthash?: boolean;
  data?: readonly string[];
  interfaces?: readonly Hex[];
  name?: boolean;
  pubkey?: boolean;
  text?: readonly string[];
}
```

ABI content types and address coin types use unsigned decimal strings. Data and
text arrays contain record keys. Interface identifiers are four-byte hex
values.

## Result

```ts
interface NameRecordsResult {
  name: string;
  node: Hex;
  records: NameProfileFormValues;
  requestedRecords: NormalizedNameRecordSelection;
  resolverAddress: Address;
}
```

`records` uses the same normalized shape accepted by `NameProfileEditor`.
Unrequested categories remain empty and can be distinguished through
`requestedRecords`.

The query is disabled until a public client, valid name, valid Universal
Resolver address, and non-empty record selection are available.
