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
  permissionedResolverHasRootRolesSnippet,
  permissionedResolverInitializeSnippet,
  verifiableFactoryDeployProxySnippet,
  verifiableFactoryProxyDeployedEventSnippet,
  verifiableFactoryVerifyContractSnippet,
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
  permissionedResolverImplementation: {
    address: "0xdce5205a553573ffd47629327dddf36186022ffa" as Hex,
    snippets: {
      permissionedResolverHasRootRolesSnippet,
      permissionedResolverInitializeSnippet,
    },
  },
  verifiableFactory: {
    address: "0xd2a632d8a8b67c2c4398c255cbd7af8dd7236198" as Hex,
    snippets: {
      verifiableFactoryDeployProxySnippet,
      verifiableFactoryProxyDeployedEventSnippet,
      verifiableFactoryVerifyContractSnippet,
    },
  },
};

export type EnsContracts = typeof testnetContracts;
