export const ethRegistrarErrors = [
  {
    inputs: [
      { internalType: "bytes32", name: "commitment", type: "bytes32" },
      { internalType: "uint64", name: "validFrom", type: "uint64" },
      { internalType: "uint64", name: "blockTimestamp", type: "uint64" },
    ],
    name: "CommitmentTooNew",
    type: "error",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "commitment", type: "bytes32" },
      { internalType: "uint64", name: "validTo", type: "uint64" },
      { internalType: "uint64", name: "blockTimestamp", type: "uint64" },
    ],
    name: "CommitmentTooOld",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint64", name: "duration", type: "uint64" },
      { internalType: "uint64", name: "minDuration", type: "uint64" },
    ],
    name: "DurationTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxCommitmentAgeTooLow",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "label", type: "string" }],
    name: "NameNotAvailable",
    type: "error",
  },
  {
    inputs: [{ internalType: "string", name: "label", type: "string" }],
    name: "NameNotRenewable",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "commitment", type: "bytes32" }],
    name: "UnexpiredCommitmentExists",
    type: "error",
  },
] as const;

export const ethRegistrarIsAvailableSnippet = [
  ...ethRegistrarErrors,
  {
    inputs: [{ internalType: "string", name: "label", type: "string" }],
    name: "isAvailable",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
