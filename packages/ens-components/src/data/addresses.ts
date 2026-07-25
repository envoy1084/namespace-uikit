import type { Hex } from "viem";

import { ethPriceFeedAbiSnippet, ethRegistrarIsAvailableSnippet } from "./abi";

export const testnetContracts = {
  ethPriceFeed: {
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" as Hex,
    snippets: { ethPriceFeedAbiSnippet },
  },
  ethRegistrar: {
    address: "0xa4449a0dd2b83007553d9b1d28b583a46a805a30" as Hex,
    snippets: { ethRegistrarIsAvailableSnippet },
  },
};

/**
 * ENSv2 does not currently have a mainnet deployment in the tracked contracts
 * repository. Fallback to testnet contracts for now.
 */
export const mainnetContracts = testnetContracts;

export type EnsContracts = typeof testnetContracts;
