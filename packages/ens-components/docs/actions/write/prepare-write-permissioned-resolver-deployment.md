# preparePermissionedResolverDeploymentWrite

Simulates a `PermissionedResolver` proxy deployment and returns its
deterministic address and encoded factory call. It does not send a transaction.

```ts
import {
  createResolverSalt,
  preparePermissionedResolverDeploymentWrite,
} from "ens-components";

const salt = createResolverSalt({ input: "example.eth" });
if (salt.isErr()) throw new Error(salt.error);

const result = await preparePermissionedResolverDeploymentWrite(publicClient, {
  account,
  factoryAddress,
  implementationAddress,
  network: "testnet",
  owner: account,
  salt: salt.value.salt,
});
```

## Signature

```ts
function preparePermissionedResolverDeploymentWrite(
  publicClient: PublicClient,
  props: PreparePermissionedResolverDeploymentWriteProps,
): ResultAsync<
  PreparedPermissionedResolverDeploymentWrite,
  PreparePermissionedResolverDeploymentWriteError
>;
```

## Props

| Prop                    | Type                     | Description                                                       |
| ----------------------- | ------------------------ | ----------------------------------------------------------------- |
| `account`               | `Address`                | Account that will call the factory. It affects the proxy address. |
| `factoryAddress`        | `Address`                | ENS v2 `VerifiableFactory`.                                       |
| `implementationAddress` | `Address`                | `PermissionedResolver` implementation.                            |
| `network`               | `"mainnet" \| "testnet"` | Network associated with the addresses.                            |
| `owner`                 | `Address`                | Account receiving all resolver roles.                             |
| `salt`                  | `Hex`                    | Random `bytes32` deployment salt.                                 |

## Result

The prepared write contains:

- `call`, the encoded factory call used by `executeContractWrites`;
- `request`, the ABI-inferred `deployProxy` request;
- `metadata.resolverAddress`, the simulated proxy address;
- `metadata.initData` and `metadata.salt`;
- `account` and the stable kind `deploy-permissioned-resolver`.

Compose it with `prepareCommitNameWrite` and use `strategy: "auto"` to select an
atomic wallet batch when supported, otherwise an ordered sequence.

## Errors

- `CONTRACT_SIMULATION_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_OWNER_ADDRESS`
- `INVALID_RESOLVER_ADDRESS`
- `INVALID_SALT`
