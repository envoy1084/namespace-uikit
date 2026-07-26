# prepareNameAvailabilityRead

Validates and normalizes a second-level `.eth` name, then prepares the
registrar `isAvailable` read.

```ts
const prepared = prepareNameAvailabilityRead({
  input: "example",
  network: "testnet",
  registrarAddress,
});

if (prepared.isOk()) {
  const result = await executeContractRead(publicClient, prepared.value);
}
```

The prepared value contains the ABI-inferred `request`, normalized name
metadata, and the stable kind `name-availability`.

## Errors

- `EMPTY_INPUT`
- `EMPTY_LABEL`
- `INVALID_NAME`
- `INVALID_REGISTRAR_ADDRESS`
- `LABEL_TOO_LONG`
- `LABEL_TOO_SHORT`
- `UNSUPPORTED_NAME`
