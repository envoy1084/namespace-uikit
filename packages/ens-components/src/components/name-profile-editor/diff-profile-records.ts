import type {
  NameProfileFormValues,
  NameProfilePublicKeyRecord,
  NameProfileRecordChange,
} from "#/components/name-profile-editor/types";

function compareNumericStrings(left: string, right: string): number {
  const leftValue = BigInt(left);
  const rightValue = BigInt(right);
  if (leftValue < rightValue) return -1;
  if (leftValue > rightValue) return 1;
  return 0;
}

function compareStrings(left: string, right: string): number {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function sortKeys<K>(
  keys: Iterable<K>,
  compareKeys: (left: K, right: K) => number,
): K[] {
  return [...keys].reduce<K[]>((sorted, key) => {
    const index = sorted.findIndex(
      (existing) => compareKeys(key, existing) < 0,
    );

    if (index === -1) return sorted.concat(key);
    return sorted.slice(0, index).concat(key, sorted.slice(index));
  }, []);
}

function createRecordMap<TRecord>(
  records: readonly TRecord[],
  getKey: (record: TRecord) => string,
  getValue: (record: TRecord) => string,
): ReadonlyMap<string, string> {
  return new Map(records.map((record) => [getKey(record), getValue(record)]));
}

function diffMap<TChange extends NameProfileRecordChange>(
  baseline: ReadonlyMap<string, string>,
  draft: ReadonlyMap<string, string>,
  compareKeys: (left: string, right: string) => number,
  createChange: (
    key: string,
    previousValue: string | null,
    value: string | null,
  ) => TChange,
): TChange[] {
  const keys = sortKeys(
    new Set([...baseline.keys(), ...draft.keys()]),
    compareKeys,
  );
  const changes: TChange[] = [];

  for (const key of keys) {
    const previousValue = baseline.get(key) ?? null;
    const value = draft.get(key) ?? null;
    if (previousValue === value) continue;

    changes.push(createChange(key, previousValue, value));
  }

  return changes;
}

function emptyToNull(value: string): string | null {
  return value.length === 0 ? null : value;
}

function publicKeyToNullable(
  pubkey: NameProfilePublicKeyRecord,
): NameProfilePublicKeyRecord | null {
  if (pubkey.x.length === 0 && pubkey.y.length === 0) return null;
  return { x: pubkey.x, y: pubkey.y };
}

function arePublicKeysEqual(
  left: NameProfilePublicKeyRecord | null,
  right: NameProfilePublicKeyRecord | null,
): boolean {
  if (left === null || right === null) return left === right;
  return left.x === right.x && left.y === right.y;
}

/**
 * Produces semantic resolver-record changes between two canonical form
 * snapshots.
 *
 * Changes are ordered by resolver profile and then by their record key so the
 * review UI and prepared transaction calls remain stable across renders.
 */
export function diffProfileRecords(
  baseline: NameProfileFormValues,
  draft: NameProfileFormValues,
): readonly NameProfileRecordChange[] {
  const baselineAbi = createRecordMap(
    baseline.abi,
    (record) => record.contentType,
    (record) => record.value,
  );
  const draftAbi = createRecordMap(
    draft.abi,
    (record) => record.contentType,
    (record) => record.value,
  );
  const baselineAddresses = createRecordMap(
    baseline.addresses,
    (record) => record.coinType,
    (record) => record.value,
  );
  const draftAddresses = createRecordMap(
    draft.addresses,
    (record) => record.coinType,
    (record) => record.value,
  );

  const changes: NameProfileRecordChange[] = [
    ...diffMap(
      baselineAbi,
      draftAbi,
      compareNumericStrings,
      (contentType, previousValue, value) => ({
        contentType,
        previousValue,
        type: "abi",
        value,
      }),
    ),
    ...diffMap(
      baselineAddresses,
      draftAddresses,
      compareNumericStrings,
      (coinType, previousValue, value) => ({
        coinType,
        previousValue,
        type: "address",
        value,
      }),
    ),
  ];

  if (baseline.contenthash !== draft.contenthash) {
    changes.push({
      previousValue: emptyToNull(baseline.contenthash),
      type: "contenthash",
      value: emptyToNull(draft.contenthash),
    });
  }

  const baselineData = createRecordMap(
    baseline.data,
    (record) => record.key,
    (record) => record.value,
  );
  const draftData = createRecordMap(
    draft.data,
    (record) => record.key,
    (record) => record.value,
  );
  const baselineInterfaces = createRecordMap(
    baseline.interfaces,
    (record) => record.interfaceId,
    (record) => record.implementer,
  );
  const draftInterfaces = createRecordMap(
    draft.interfaces,
    (record) => record.interfaceId,
    (record) => record.implementer,
  );

  changes.push(
    ...diffMap(
      baselineData,
      draftData,
      compareStrings,
      (key, previousValue, value) => ({
        key,
        previousValue,
        type: "data",
        value,
      }),
    ),
    ...diffMap(
      baselineInterfaces,
      draftInterfaces,
      compareStrings,
      (interfaceId, previousValue, value) => ({
        interfaceId,
        previousValue,
        type: "interface",
        value,
      }),
    ),
  );

  if (baseline.name !== draft.name) {
    changes.push({
      previousValue: emptyToNull(baseline.name),
      type: "name",
      value: emptyToNull(draft.name),
    });
  }

  const baselinePubkey = publicKeyToNullable(baseline.pubkey);
  const draftPubkey = publicKeyToNullable(draft.pubkey);
  if (!arePublicKeysEqual(baselinePubkey, draftPubkey)) {
    changes.push({
      previousValue: baselinePubkey,
      type: "pubkey",
      value: draftPubkey,
    });
  }

  const baselineText = createRecordMap(
    baseline.text,
    (record) => record.key,
    (record) => record.value,
  );
  const draftText = createRecordMap(
    draft.text,
    (record) => record.key,
    (record) => record.value,
  );

  changes.push(
    ...diffMap(
      baselineText,
      draftText,
      compareStrings,
      (key, previousValue, value) => ({
        key,
        previousValue,
        type: "text",
        value,
      }),
    ),
  );

  return changes;
}
