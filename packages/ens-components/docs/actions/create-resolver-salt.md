# createResolverSalt

Creates a random, name-scoped `bytes32` salt for a dedicated resolver proxy.

```ts
import { createResolverSalt } from "ens-components";

const result = createResolverSalt({ input: "example.eth" });

if (result.isOk()) {
  const { normalizedName, salt } = result.value;
}
```

## Signature

```ts
function createResolverSalt(
  props: CreateResolverSaltProps,
): Result<
  CreateResolverSaltResult,
  CreateResolverSaltError | ParseNameInputError
>;
```

`input` accepts a label or second-level `.eth` name. Store the returned salt
before asking the wallet to deploy the resolver so the operation can be
resumed.

## Result

```ts
interface CreateResolverSaltResult {
  readonly normalizedName: string;
  readonly salt: Hex;
}
```

## Errors

- All [`parseNameInput`](./parse-name-input.md) errors
- `UNSUPPORTED_NAME`
