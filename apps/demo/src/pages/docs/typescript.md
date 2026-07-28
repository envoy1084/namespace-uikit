---
title: TypeScript
description: TypeScript requirements and type inference in ENS Components.
---

# TypeScript

ENS Components is written in TypeScript and publishes declaration files for
every entry point.

## Recommended configuration

Use TypeScript 5.7 or newer with strict checking and a bundler-aware module
resolver.

```json
{
  "compilerOptions": {
    "lib": ["DOM", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "target": "ES2022",
    "verbatimModuleSyntax": true
  }
}
```

## Error codes

Actions return `Result<value, errorCode>` from Neverthrow. Error codes are
string literal unions, so branches remain exhaustive.

```ts
const prepared = prepareNameAvailabilityRead({
  input: "example.eth",
  registrarAddress,
});

if (prepared.isErr()) {
  switch (prepared.error) {
    case "INVALID_REGISTRAR_ADDRESS":
    case "UNSUPPORTED_NAME":
      break;
  }
}
```

Hooks expose the same codes through TanStack Query's `error` property.

## Query selection

Read hooks preserve TanStack Query `select` inference.

```ts
const price = useNameRegistrationPrice({
  input: "example.eth",
  duration: 31_557_600n,
  query: {
    select: (data) => data.price,
  },
});

// bigint | undefined
price.data;
```

## Prepared calls

Prepared actions retain their ABI-derived request and result types. Pass the
prepared value directly to the corresponding executor instead of rebuilding
the request object.

```ts
const prepared = prepareNameResolverRead({
  input: "example.eth",
  universalResolverAddress,
});

if (prepared.isOk()) {
  const result = await executeContractRead(publicClient, prepared.value);
}
```
