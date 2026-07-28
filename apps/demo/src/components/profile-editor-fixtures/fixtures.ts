import type {
  NameProfileFormValues,
  NameProfileRecordChange,
} from "ens-components";
import type { TransactionReceipt } from "viem";

import type { ProfileUpdateSubmissionSuccess } from "#/components/name-profile-editor/submission/profile-update-submission";

export type ProfileFixturePresentation = "dialog" | "inline";
export type ProfileFixtureState = "confirming" | "error" | "review" | "success";
export type ProfileFixtureViewport = "desktop" | "mobile";

export const fixtureName = "piedpiper.eth";
export const fixtureTransactionHash =
  "0x10c6f8fdca4f11c319471bac728adcfd7b76a84f6f8de5762fe2f0d03c998211" as const;

export const fixtureValues: NameProfileFormValues = {
  abi: [],
  addresses: [
    {
      coinType: "60",
      value: "0x00A2895816e64F152FF81c8A931DC1bd9F5c3ce3",
    },
  ],
  contenthash: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3ftehpm",
  data: [],
  interfaces: [],
  name: "",
  pubkey: { x: "", y: "" },
  text: [
    {
      key: "description",
      value: "A decentralized internet made for everyone.",
    },
  ],
};

export const fixtureChanges: readonly NameProfileRecordChange[] = [
  {
    key: "description",
    previousValue: "The old internet.",
    type: "text",
    value: "A decentralized internet made for everyone.",
  },
  {
    key: "avatar",
    previousValue: "ipfs://bafybeiavatar",
    type: "text",
    value: null,
  },
  {
    coinType: "60",
    previousValue: null,
    type: "address",
    value: "0x00A2895816e64F152FF81c8A931DC1bd9F5c3ce3",
  },
  {
    previousValue: "ipfs://bafybeioldsite",
    type: "contenthash",
    value: "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3ftehpm",
  },
];

export const fixtureSuccess: ProfileUpdateSubmissionSuccess = {
  receipt: {
    status: "success",
    transactionHash: fixtureTransactionHash,
  } as unknown as TransactionReceipt,
  resolverAddress: "0x0000000000000000000000000000000000000001",
  review: {
    changes: fixtureChanges,
    values: fixtureValues,
  },
  transactionHash: fixtureTransactionHash,
};
