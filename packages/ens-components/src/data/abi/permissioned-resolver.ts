export const permissionedResolverErrors = [
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes", name: "dns", type: "bytes" }],
    name: "DNSDecodingFailed",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "resource", type: "uint256" },
      { internalType: "uint256", name: "roleBitmap", type: "uint256" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "EACCannotGrantRoles",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "resource", type: "uint256" },
      { internalType: "uint256", name: "roleBitmap", type: "uint256" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "EACCannotRevokeRoles",
    type: "error",
  },
  {
    inputs: [],
    name: "EACInvalidAccount",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "roleBitmap", type: "uint256" }],
    name: "EACInvalidRoleBitmap",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "resource", type: "uint256" },
      { internalType: "uint256", name: "role", type: "uint256" },
    ],
    name: "EACMaxAssignees",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "resource", type: "uint256" },
      { internalType: "uint256", name: "role", type: "uint256" },
    ],
    name: "EACMinAssignees",
    type: "error",
  },
  {
    inputs: [],
    name: "EACRootResourceNotAllowed",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "resource", type: "uint256" },
      { internalType: "uint256", name: "roleBitmap", type: "uint256" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "EACUnauthorizedAccountRoles",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC1967NonPayable",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "contentType", type: "uint256" }],
    name: "InvalidContentType",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes", name: "addressBytes", type: "bytes" }],
    name: "InvalidEVMAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidInitialization",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotInitializing",
    type: "error",
  },
  {
    inputs: [],
    name: "UUPSUnauthorizedCallContext",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
    name: "UnsupportedResolverProfile",
    type: "error",
  },
] as const;

export const permissionedResolverInitializeSnippet = [
  ...permissionedResolverErrors,
  {
    inputs: [
      { internalType: "address", name: "admin", type: "address" },
      { internalType: "uint256", name: "roleBitmap", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const permissionedResolverHasRootRolesSnippet = [
  ...permissionedResolverErrors,
  {
    inputs: [
      { internalType: "uint256", name: "roleBitmap", type: "uint256" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "hasRootRoles",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
