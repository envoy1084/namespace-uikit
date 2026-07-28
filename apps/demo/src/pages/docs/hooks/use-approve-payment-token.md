# useApprovePaymentToken

Approves an ERC-20 payment token for an ENS registrar or another spender.

```tsx
import { useApprovePaymentToken } from "ens-components/hooks";

const approval = useApprovePaymentToken();
approval.mutate({
  account,
  amount,
  paymentTokenAddress,
  spenderAddress: registrarAddress,
});
```

`amount` is expressed in token atomic units. See
[ENS write mutation options](./write-mutation-options).
