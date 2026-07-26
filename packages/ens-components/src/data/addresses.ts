import type { Address } from "viem";

import {
  ethRegistrarAbi,
  permissionedResolverAbi,
  verifiableFactoryAbi,
} from "#/data/abi";

const mockDaiIcon = new URL("../assets/dai.svg", import.meta.url).href;
const mockUsdcIcon = new URL("../assets/usdc.svg", import.meta.url).href;

export interface EnsPaymentToken {
  readonly address: Address;
  readonly decimals: number;
  readonly icon: string;
  readonly name: string;
  readonly symbol: string;
}

export type EnsPaymentTokens = readonly [EnsPaymentToken, ...EnsPaymentToken[]];

export interface EnsContracts {
  readonly ethRegistrar: {
    readonly abi: typeof ethRegistrarAbi;
    readonly address: Address;
  };
  readonly paymentTokens: EnsPaymentTokens;
  readonly permissionedResolverImplementation: {
    readonly abi: typeof permissionedResolverAbi;
    readonly address: Address;
  };
  readonly verifiableFactory: {
    readonly abi: typeof verifiableFactoryAbi;
    readonly address: Address;
  };
}

export const testnetContracts = {
  ethRegistrar: {
    address: "0x8c2e866b439358c41ae05de9cbe8a00bfefaffca" as Address,
    abi: ethRegistrarAbi,
  },
  paymentTokens: [
    {
      address: "0xba11ebdb3f9a2c5946d8629517f06364e53a2e10",
      decimals: 6,
      icon: mockUsdcIcon,
      name: "Mock USDC",
      symbol: "USDC",
    },
    {
      address: "0x2922bcd677af690fcd1ecc699519e4bfabc73ff8",
      decimals: 18,
      icon: mockDaiIcon,
      name: "Mock DAI",
      symbol: "DAI",
    },
  ] as const satisfies EnsPaymentTokens,
  permissionedResolverImplementation: {
    address: "0xdce5205a553573ffd47629327dddf36186022ffa" as Address,
    abi: permissionedResolverAbi,
  },
  verifiableFactory: {
    address: "0xd2a632d8a8b67c2c4398c255cbd7af8dd7236198" as Address,
    abi: verifiableFactoryAbi,
  },
} as const satisfies EnsContracts;
