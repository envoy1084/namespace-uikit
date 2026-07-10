import { ethPriceFeedAbiSnippet } from "./abi";

export const Contracts = {
  ethPriceFeed: {
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    snippets: { ethPriceFeedAbiSnippet: ethPriceFeedAbiSnippet },
  },
} as const;
