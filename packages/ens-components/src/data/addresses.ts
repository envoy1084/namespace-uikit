import { erc20Abi, type Hex } from "viem";

import {
  ethPriceFeedAbiSnippet,
  ethRegistrarCommitSnippet,
  ethRegistrarCommitmentAtSnippet,
  ethRegistrarGetRegisterPriceSnippet,
  ethRegistrarIsAvailableSnippet,
  ethRegistrarMaxCommitmentAgeSnippet,
  ethRegistrarMinCommitmentAgeSnippet,
  ethRegistrarNameRegisteredEventSnippet,
  ethRegistrarRegisterSnippet,
} from "#/data/abi";

const mockUsdcIcon = new URL("../assets/usdc.svg", import.meta.url).href;

export const testnetContracts = {
  ethPriceFeed: {
    address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" as Hex,
    snippets: { ethPriceFeedAbiSnippet },
  },
  ethRegistrar: {
    address: "0xa4449a0dd2b83007553d9b1d28b583a46a805a30" as Hex,
    snippets: {
      ethRegistrarCommitSnippet,
      ethRegistrarCommitmentAtSnippet,
      ethRegistrarGetRegisterPriceSnippet,
      ethRegistrarIsAvailableSnippet,
      ethRegistrarMaxCommitmentAgeSnippet,
      ethRegistrarMinCommitmentAgeSnippet,
      ethRegistrarNameRegisteredEventSnippet,
      ethRegistrarRegisterSnippet,
    },
  },
  mockUsdc: {
    address: "0xd3322b29a7bdee707d1684676f149bf41aa3422f" as Hex,
    abi: erc20Abi,
    icon: mockUsdcIcon,
    symbol: "USDC",
  },
};

export type EnsContracts = typeof testnetContracts;
