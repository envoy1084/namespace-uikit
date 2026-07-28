import type { ProfileEditorSection } from "#/components/name-profile-editor/editor/types";
import type {
  NameProfileRecordChange,
  NameProfileRecordType,
} from "#/components/name-profile-editor/types";

import {
  findRecordDefinition,
  sectionLabels,
  sectionOrder,
} from "#/components/name-profile-editor/editor/record-definitions";

export type ProfileChangeStatus = "added" | "removed" | "updated";

export interface ProfileDiffItem {
  change: NameProfileRecordChange;
  iconName: string;
  label: string;
  section: ProfileEditorSection;
  status: ProfileChangeStatus;
  type: NameProfileRecordType;
}

export interface ProfileDiffSection {
  id: ProfileEditorSection;
  items: readonly ProfileDiffItem[];
  label: string;
}

function changeStatus(change: NameProfileRecordChange): ProfileChangeStatus {
  if (change.previousValue === null) return "added";
  if (change.value === null) return "removed";
  return "updated";
}

function contenthashName(change: NameProfileRecordChange): string {
  if (change.type !== "contenthash") return "ipfs";

  const value = change.value ?? change.previousValue ?? "";
  const protocol = value.split(":")[0]?.toLowerCase() ?? "ipfs";
  const aliases: Readonly<Record<string, string>> = {
    ar: "arweave",
    bzz: "swarm",
    sia: "skynet",
    ton: "adnl",
  };

  return aliases[protocol] ?? protocol;
}

function createDiffItem(change: NameProfileRecordChange): ProfileDiffItem {
  if (change.type === "text") {
    const definition = findRecordDefinition("text", change.key);
    return {
      change,
      iconName: change.key,
      label: definition?.label ?? change.key,
      section: definition?.section ?? "general",
      status: changeStatus(change),
      type: change.type,
    };
  }

  if (change.type === "address") {
    const definition = findRecordDefinition("address", change.coinType);
    return {
      change,
      iconName: change.coinType,
      label: definition?.label ?? `Coin ${change.coinType}`,
      section: "addresses",
      status: changeStatus(change),
      type: change.type,
    };
  }

  if (change.type === "contenthash") {
    const name = contenthashName(change);
    const definition = findRecordDefinition("contenthash", name);
    return {
      change,
      iconName: name,
      label: definition?.label ?? "Content hash",
      section: "website",
      status: changeStatus(change),
      type: change.type,
    };
  }

  const details: Readonly<
    Record<
      Exclude<NameProfileRecordType, "address" | "contenthash" | "text">,
      { iconName: string; label: (change: NameProfileRecordChange) => string }
    >
  > = {
    abi: {
      iconName: "abi",
      label: (item) =>
        item.type === "abi" ? `ABI ${item.contentType}` : "ABI",
    },
    data: {
      iconName: "data",
      label: (item) => (item.type === "data" ? item.key : "Data"),
    },
    interface: {
      iconName: "interface",
      label: (item) =>
        item.type === "interface"
          ? `Interface ${item.interfaceId}`
          : "Interface",
    },
    name: { iconName: "name", label: () => "Name" },
    pubkey: { iconName: "pubkey", label: () => "Public key" },
  };
  const detail = details[change.type];

  return {
    change,
    iconName: detail.iconName,
    label: detail.label(change),
    section: "advanced",
    status: changeStatus(change),
    type: change.type,
  };
}

export function createProfileDiffSections(
  changes: readonly NameProfileRecordChange[],
): readonly ProfileDiffSection[] {
  const items = changes.map(createDiffItem);

  return sectionOrder.flatMap((section) => {
    const sectionItems = items.filter((item) => item.section === section);
    return sectionItems.length === 0
      ? []
      : [{ id: section, items: sectionItems, label: sectionLabels[section] }];
  });
}
