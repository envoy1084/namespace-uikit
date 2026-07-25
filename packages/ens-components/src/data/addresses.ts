import { ethPriceFeedAbiSnippet, ethRegistrarIsAvailableSnippet } from "./abi";

export const testnetContracts = {
  ethPriceFeed: {
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    snippets: { ethPriceFeedAbiSnippet },
  },
  ethRegistrar: {
    address: "0xa4449a0dd2b83007553d9b1d28b583a46a805a30",
    snippets: { ethRegistrarIsAvailableSnippet },
  },
} as const;
