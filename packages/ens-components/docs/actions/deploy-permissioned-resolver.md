# deployPermissionedResolver

Submits a prepared `PermissionedResolver` proxy deployment.

```ts
import { deployPermissionedResolver } from "ens-components";

const result = await deployPermissionedResolver(walletClient, {
  account,
  factoryAddress,
  implementationAddress,
  initData: prepared.initData,
  network: "testnet",
  salt: prepared.salt,
});

if (result.isOk()) {
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: result.value,
  });
}
```

## Signature

```ts
function deployPermissionedResolver(
  walletClient: WalletClient,
  props: DeployPermissionedResolverProps,
): ResultAsync<Hex, DeployPermissionedResolverError>;
```

The result is the submitted transaction hash. Wait for a successful receipt,
then verify the proxy with
[`getPermissionedResolverStatus`](./get-permissioned-resolver-status.md).

## Errors

- `CONTRACT_WRITE_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_FACTORY_ADDRESS`
- `INVALID_IMPLEMENTATION_ADDRESS`
- `INVALID_INIT_DATA`
- `INVALID_SALT`
