import { erc20Abi, type Hex } from "viem";

import {
  ethRegistrarAbi,
  permissionedResolverAbi,
  verifiableFactoryAbi,
} from "#/data/abi";

const mockUsdcIcon = new URL("../assets/usdc.svg", import.meta.url).href;

export const testnetContracts = {
  ethRegistrar: {
    address: "0x8c2e866b439358c41ae05de9cbe8a00bfefaffca" as Hex,
    abi: ethRegistrarAbi,
  },
  mockUsdc: {
    address: "0xba11ebdb3f9a2c5946d8629517f06364e53a2e10" as Hex,
    abi: erc20Abi,
    icon: mockUsdcIcon,
    symbol: "USDC",
  },
  permissionedResolverImplementation: {
    address: "0xdce5205a553573ffd47629327dddf36186022ffa" as Hex,
    abi: permissionedResolverAbi,
  },
  verifiableFactory: {
    address: "0xd2a632d8a8b67c2c4398c255cbd7af8dd7236198" as Hex,
    abi: verifiableFactoryAbi,
  },
};

export type EnsContracts = typeof testnetContracts;
