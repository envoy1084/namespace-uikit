import { ethPriceFeedAbiSnippet, ethRegistrarIsAvailableSnippet } from "./abi";

export const testnetContracts = {
  ethPriceFeed: {
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    snippets: { ethPriceFeedAbiSnippet },
  },
  ethRegistrar: {
    address: "",
    snippets: { ethRegistrarIsAvailableSnippet },
  },
} as const;
