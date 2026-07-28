import type { Address } from "viem";

import { DaiIcon, UsdcIcon } from "#/components/icons";
import {
  ethRegistrarAbi,
  ethRegistryAbi,
  l1ReverseRegistrarAbi,
  l2ReverseRegistrarAbi,
  permissionedResolverAbi,
  universalResolverV2Abi,
  verifiableFactoryAbi,
} from "#/data/abi";
import type { EnsIconComponent } from "#/icons/get-record-icon";

export interface EnsPaymentToken {
  readonly address: Address;
  readonly decimals: number;
  readonly icon: EnsIconComponent;
  readonly name: string;
  readonly symbol: string;
}

export type EnsPaymentTokens = readonly [EnsPaymentToken, ...EnsPaymentToken[]];

export interface EnsContracts {
  readonly l1ReverseRegistrar: {
    readonly abi: typeof l1ReverseRegistrarAbi;
    readonly address: Address;
  };
  readonly l2ReverseRegistrar: {
    readonly abi: typeof l2ReverseRegistrarAbi;
    readonly address: Address;
  };
  readonly ethRegistrar: {
    readonly abi: typeof ethRegistrarAbi;
    readonly address: Address;
  };
  readonly ethRegistry: {
    readonly abi: typeof ethRegistryAbi;
    readonly address: Address;
  };
  readonly paymentTokens: EnsPaymentTokens;
  readonly permissionedResolverImplementation: {
    readonly abi: typeof permissionedResolverAbi;
    readonly address: Address;
  };
  readonly universalResolverV2: {
    readonly abi: typeof universalResolverV2Abi;
    readonly address: Address;
  };
  readonly verifiableFactory: {
    readonly abi: typeof verifiableFactoryAbi;
    readonly address: Address;
  };
}

export const testnetContracts = {
  l1ReverseRegistrar: {
    address: "0xA0a1AbcDAe1a2a4A2EF8e9113Ff0e02DD81DC0C6" as Address,
    abi: l1ReverseRegistrarAbi,
  },
  l2ReverseRegistrar: {
    address: "0xEb8269Fb39290F31C4c29CEc548807cA2133AbB4" as Address,
    abi: l2ReverseRegistrarAbi,
  },
  ethRegistrar: {
    address: "0x8c2e866b439358c41ae05de9cbe8a00bfefaffca" as Address,
    abi: ethRegistrarAbi,
  },
  ethRegistry: {
    address: "0xdedb92913a25abe1f7bcdd85d8a344a43b398b67" as Address,
    abi: ethRegistryAbi,
  },
  paymentTokens: [
    {
      address: "0xba11ebdb3f9a2c5946d8629517f06364e53a2e10",
      decimals: 6,
      icon: UsdcIcon,
      name: "Mock USDC",
      symbol: "USDC",
    },
    {
      address: "0x2922bcd677af690fcd1ecc699519e4bfabc73ff8",
      decimals: 18,
      icon: DaiIcon,
      name: "Mock DAI",
      symbol: "DAI",
    },
  ] as const satisfies EnsPaymentTokens,
  permissionedResolverImplementation: {
    address: "0xdce5205a553573ffd47629327dddf36186022ffa" as Address,
    abi: permissionedResolverAbi,
  },
  universalResolverV2: {
    address: "0xeEeEEEeE14D718C2B47D9923Deab1335E144EeEe" as Address,
    abi: universalResolverV2Abi,
  },
  verifiableFactory: {
    address: "0xd2a632d8a8b67c2c4398c255cbd7af8dd7236198" as Address,
    abi: verifiableFactoryAbi,
  },
} as const satisfies EnsContracts;
