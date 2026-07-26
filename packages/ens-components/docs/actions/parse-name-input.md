# parseNameInput

Normalizes user-provided ENS input with ENSIP-15 and returns structured name
information. A single label is interpreted as a second-level `.eth` name.

```ts
import { parseNameInput } from "ens-components";

const result = parseNameInput("  Example  ");

if (result.isOk()) {
  result.value.normalizedName; // "example.eth"
  result.value.label; // "example"
  result.value.nameLevel; // 2
}
```

## Signature

```ts
function parseNameInput(
  input: string | null | undefined,
): Result<ParsedNameInput, ParseNameInputError>;
```

This action is synchronous and does not access a provider or network.

## Result

```ts
interface ParsedNameInput {
  readonly label: string;
  readonly isLabelInput: boolean;
  readonly labels: readonly [string, ...string[]];
  readonly nameLevel: number;
  readonly normalizedName: string;
  readonly parentName: string;
  readonly tld: string;
}
```

For `sub.example.eth`, `label` is `sub`, `parentName` is `example.eth`, and
`nameLevel` is `3`.

## Errors

| Code             | Meaning                                      |
| ---------------- | -------------------------------------------- |
| `EMPTY_INPUT`    | The trimmed input is empty.                  |
| `EMPTY_LABEL`    | The normalized name contains an empty label. |
| `INPUT_TOO_LONG` | Input exceeds 1,024 UTF-16 code units.       |
| `INVALID_NAME`   | ENSIP-15 normalization fails.                |
| `LABEL_TOO_LONG` | A normalized label exceeds 255 UTF-8 bytes.  |
