# useNameProfile

Returns an ENS profile with indexed domain metadata and canonical resolver
record values.

The hook uses the configured ENS GraphQL indexer only to discover text keys,
coin types, ABI content types, interface identifiers, and domain metadata. All
record values are read through the Universal Resolver.

```tsx
import { useNameProfile } from "ens-components/hooks";

const profile = useNameProfile({
  input: "example.eth",
});
```

## Additional records

Arbitrary data keys cannot currently be discovered by the indexer. Supply
known keys or other records that should always be read:

```tsx
const profile = useNameProfile({
  input: "example.eth",
  additionalRecords: {
    data: ["agent-context"],
    text: ["com.example.custom"],
  },
});
```

Additional arrays are merged with discovery. `contenthash`, `name`, and
`pubkey` default to `true` because they do not need key discovery. Set a scalar
to `false` to skip it.

## Parameters

```ts
interface UseNameProfileParameters<selectData = NameProfileResult> {
  additionalRecords?: NameRecordSelection;
  indexerUrl?: string;
  input: string | null | undefined;
  universalResolverAddress?: Address;
  query?: Omit<
    UseQueryOptions<NameProfileResult, NameProfileError, selectData>,
    "queryFn" | "queryKey"
  >;
}
```

`indexerUrl` and `universalResolverAddress` override the selected network
configuration for this query.

## Result

```ts
interface NameProfileResult extends NameRecordsResult {
  discovery: NameProfileRecordDiscovery;
  domain: NameProfileDomain;
  indexer: NameProfileIndexerState;
}
```

`records` and the top-level `resolverAddress` are canonical Universal Resolver
results. `domain` is the indexed snapshot and contains:

- owner, registrant, wrapped owner, and resolved addresses
- indexed resolver and subregistry information
- registration, expiry, wrapper, and grace-period timestamps
- v1 or v2 protocol, migration, normalization, wrapping, and reachability
- token identifiers, fuse state, subdomain count, event count, and role-holder
  count

`indexer.blockNumber` identifies the indexed snapshot. Ownership and
authorization should be checked directly onchain before submitting a
permission-sensitive transaction.
