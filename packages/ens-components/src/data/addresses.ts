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
    address: "0x694AA1769357215DE4FAC081bf1f309aDC325306" as Hex,
    snippets: { ethPriceFeedAbiSnippet },
  },
  ethRegistrar: {
    address: "0x8c2e866b439358c41ae05de9cbe8a00bfefaffca" as Hex,
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
    address: "0xba11ebdb3f9a2c5946d8629517f06364e53a2e10" as Hex,
    abi: erc20Abi,
    icon: mockUsdcIcon,
    symbol: "USDC",
  },
};

export type EnsContracts = typeof testnetContracts;
