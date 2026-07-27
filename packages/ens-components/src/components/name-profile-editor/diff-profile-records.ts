import type {
  NameProfilePublicKeyRecord,
  NameProfileRecordChange,
  NormalizedNameProfileRecords,
} from "#/components/name-profile-editor/types";

function compareBigints(left: bigint, right: bigint): number {
  if (left < right) return -1;
  if (left > right) return 1;
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

function diffMap<K, V, TChange extends NameProfileRecordChange>(
  baseline: ReadonlyMap<K, V>,
  draft: ReadonlyMap<K, V>,
  compareKeys: (left: K, right: K) => number,
  createChange: (key: K, previousValue: V | null, value: V | null) => TChange,
): TChange[] {
  const keys = sortKeys(
    new Set<K>([...baseline.keys(), ...draft.keys()]),
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

function arePublicKeysEqual(
  left: NameProfilePublicKeyRecord | null,
  right: NameProfilePublicKeyRecord | null,
): boolean {
  if (left === null || right === null) return left === right;
  return left.x === right.x && left.y === right.y;
}

/**
 * Produces the semantic resolver-record changes between two normalized
 * profiles.
 *
 * Changes are ordered by resolver profile and then by their record key so the
 * review UI and prepared transaction calls remain stable across renders.
 */
export function diffProfileRecords(
  baseline: NormalizedNameProfileRecords,
  draft: NormalizedNameProfileRecords,
): readonly NameProfileRecordChange[] {
  const changes: NameProfileRecordChange[] = [
    ...diffMap(
      baseline.abi,
      draft.abi,
      compareBigints,
      (contentType, previousValue, value) => ({
        contentType,
        previousValue,
        type: "abi",
        value,
      }),
    ),
    ...diffMap(
      baseline.addresses,
      draft.addresses,
      compareBigints,
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
      previousValue: baseline.contenthash,
      type: "contenthash",
      value: draft.contenthash,
    });
  }

  changes.push(
    ...diffMap(
      baseline.data,
      draft.data,
      compareStrings,
      (key, previousValue, value) => ({
        key,
        previousValue,
        type: "data",
        value,
      }),
    ),
    ...diffMap(
      baseline.interfaces,
      draft.interfaces,
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
      previousValue: baseline.name,
      type: "name",
      value: draft.name,
    });
  }

  if (!arePublicKeysEqual(baseline.pubkey, draft.pubkey)) {
    changes.push({
      previousValue: baseline.pubkey,
      type: "pubkey",
      value: draft.pubkey,
    });
  }

  changes.push(
    ...diffMap(
      baseline.text,
      draft.text,
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
