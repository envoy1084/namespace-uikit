export const verifiableFactoryErrors = [] as const;

export const verifiableFactoryDeployProxySnippet = [
  ...verifiableFactoryErrors,
  {
    inputs: [
      {
        internalType: "address",
        name: "implementation",
        type: "address",
      },
      { internalType: "uint256", name: "salt", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "deployProxy",
    outputs: [{ internalType: "address", name: "proxy", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const verifiableFactoryVerifyContractSnippet = [
  ...verifiableFactoryErrors,
  {
    inputs: [
      { internalType: "address", name: "proxy", type: "address" },
      {
        internalType: "address",
        name: "expectedImplementation",
        type: "address",
      },
    ],
    name: "verifyContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const verifiableFactoryProxyDeployedEventSnippet = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "proxyAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "ProxyDeployed",
    type: "event",
  },
] as const;
