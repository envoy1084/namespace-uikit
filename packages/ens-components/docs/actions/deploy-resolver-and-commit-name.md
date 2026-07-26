# deployResolverAndCommitName

Requests an atomic EIP-5792 batch containing a resolver deployment followed by
an ENS v2 commitment.

```ts
import { deployResolverAndCommitName } from "ens-components";

const result = await deployResolverAndCommitName(walletClient, {
  ...commitmentProps,
  chain,
  deploymentCall: prepared.call,
});

if (result.isOk()) {
  const status = await waitForAtomicBatch(walletClient, {
    callsId: result.value.callsId,
  });
}
```

## Signature

```ts
function deployResolverAndCommitName(
  walletClient: WalletClient,
  props: DeployResolverAndCommitNameProps,
): ResultAsync<
  DeployResolverAndCommitNameResult,
  DeployResolverAndCommitNameError | ParseNameInputError
>;
```

`DeployResolverAndCommitNameProps` contains all
[`CommitNameProps`](./commit-name.md) fields plus:

| Prop             | Type                     | Description                                  |
| ---------------- | ------------------------ | -------------------------------------------- |
| `chain`          | `Chain`                  | Explicit chain for the EIP-5792 request.     |
| `deploymentCall` | `ResolverDeploymentCall` | Encoded call returned by the prepare action. |

The result contains `callsId`, `commitment`, `label`, and `resolverAddress`.
Persist `callsId` before waiting for the batch so it can be reconciled after a
reload.

## Errors

- All [`makeNameCommitment`](./make-name-commitment.md) errors
- `ATOMIC_BATCH_FAILED`
- `INVALID_ACCOUNT_ADDRESS`
- `INVALID_DEPLOYMENT_CALL`
- `INVALID_REGISTRAR_ADDRESS`
