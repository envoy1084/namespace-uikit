import type { ReactElement, SVGProps } from "react";

import { Icon } from "@thenamespace/uikit/icons";
import {
  ApiIcon,
  CodeSquareIcon,
  Database01Icon,
  Globe02Icon,
  Image02Icon,
  Key01Icon,
  Location01Icon,
  Mail01Icon,
  Notification01Icon,
  Note01Icon,
  Tag01Icon,
  TextIcon,
  TimeZoneIcon,
  User02Icon,
  UserCircleIcon,
  UserShield01Icon,
  Wallet01Icon,
  type IconProps,
} from "@thenamespace/uikit/icons";

import {
  ChainAlgorandIcon,
  ChainArbitrumIcon,
  ChainArweaveIcon,
  ChainAvalancheIcon,
  ChainBaseIcon,
  ChainBitcoinCashIcon,
  ChainBitcoinIcon,
  ChainBnbIcon,
  ChainCardanoIcon,
  ChainCeloIcon,
  ChainCosmosIcon,
  ChainDogecoinIcon,
  EnsAddressIcon,
  ChainEthereumIcon,
  ChainFantomIcon,
  ChainFilecoinIcon,
  ChainFlowIcon,
  ChainGnosisIcon,
  ChainHederaIcon,
  ChainLineaIcon,
  ChainLitecoinIcon,
  ChainMetisIcon,
  ChainMoneroIcon,
  ChainNearIcon,
  ChainOptimismIcon,
  ChainPolkadotIcon,
  ChainPolygonIcon,
  ChainScrollIcon,
  ChainSolanaIcon,
  ChainStarknetIcon,
  ChainStellarIcon,
  ChainSuiIcon,
  ChainTezosIcon,
  ChainTronIcon,
  ChainXrpIcon,
  ChainZcashIcon,
  ChainZksyncIcon,
  ChainZoraIcon,
  ContenthashArweaveIcon,
  ContenthashIpfsIcon,
  ContenthashIpnsIcon,
  ContenthashSiaIcon,
  ContenthashSwarmIcon,
  ContenthashTonIcon,
  ContenthashTorIcon,
  SocialBlueskyIcon,
  SocialDiscordIcon,
  SocialFarcasterIcon,
  SocialGithubIcon,
  SocialInstagramIcon,
  SocialLensIcon,
  SocialLinkedinIcon,
  SocialMastodonIcon,
  SocialRedditIcon,
  SocialTelegramIcon,
  SocialTiktokIcon,
  SocialXIcon,
  SocialYoutubeIcon,
} from "#/icons/icon-components";

/** SVG component returned by an ENS icon resolver. */
export type EnsIconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

export type CoinTypeIdentifier = bigint | number | string;

export type EnsRecordIconType =
  | "abi"
  | "address"
  | "contenthash"
  | "data"
  | "interface"
  | "name"
  | "pubkey"
  | "text";

function createUIKitIcon(icon: IconProps["icon"]): EnsIconComponent {
  return function UIKitRecordIcon(props) {
    return <Icon aria-hidden icon={icon} {...(props as Omit<IconProps, "icon">)} />;
  };
}

const AbiIcon = createUIKitIcon(CodeSquareIcon);
const ContenthashIcon = createUIKitIcon(Globe02Icon);
const DataIcon = createUIKitIcon(Database01Icon);
const InterfaceIcon = createUIKitIcon(ApiIcon);
const NameIcon = createUIKitIcon(UserCircleIcon);
const PublicKeyIcon = createUIKitIcon(Key01Icon);
const TextRecordIcon = createUIKitIcon(TextIcon);
const WalletIcon = createUIKitIcon(Wallet01Icon);

const addressIcons: Readonly<Record<string, EnsIconComponent>> = {
  "0": ChainBitcoinIcon,
  "2": ChainLitecoinIcon,
  "3": ChainDogecoinIcon,
  "60": ChainEthereumIcon,
  "118": ChainCosmosIcon,
  "128": ChainMoneroIcon,
  "133": ChainZcashIcon,
  "144": ChainXrpIcon,
  "145": ChainBitcoinCashIcon,
  "148": ChainStellarIcon,
  "195": ChainTronIcon,
  "283": ChainAlgorandIcon,
  "354": ChainPolkadotIcon,
  "397": ChainNearIcon,
  "461": ChainFilecoinIcon,
  "472": ChainArweaveIcon,
  "501": ChainSolanaIcon,
  "539": ChainFlowIcon,
  "714": ChainBnbIcon,
  "784": ChainSuiIcon,
  "966": ChainPolygonIcon,
  "1729": ChainTezosIcon,
  "1815": ChainCardanoIcon,
  "3030": ChainHederaIcon,
  "9000": ChainAvalancheIcon,
  "9004": ChainStarknetIcon,
  "2147483648": EnsAddressIcon,
  "2147483649": ChainEthereumIcon,
  "2147483658": ChainOptimismIcon,
  "2147483704": ChainBnbIcon,
  "2147483748": ChainGnosisIcon,
  "2147483785": ChainPolygonIcon,
  "2147483898": ChainFantomIcon,
  "2147483972": ChainZksyncIcon,
  "2147484736": ChainMetisIcon,
  "2147492101": ChainBaseIcon,
  "2147525809": ChainArbitrumIcon,
  "2147525868": ChainCeloIcon,
  "2147526762": ChainAvalancheIcon,
  "2147542792": ChainLineaIcon,
  "2148018000": ChainScrollIcon,
  "2155261425": ChainZoraIcon,
  ada: ChainCardanoIcon,
  algo: ChainAlgorandIcon,
  algorand: ChainAlgorandIcon,
  arbitrum: ChainArbitrumIcon,
  arbitrumone: ChainArbitrumIcon,
  arweave: ChainArweaveIcon,
  atom: ChainCosmosIcon,
  avalanche: ChainAvalancheIcon,
  avax: ChainAvalancheIcon,
  base: ChainBaseIcon,
  bch: ChainBitcoinCashIcon,
  bitcoin: ChainBitcoinIcon,
  bitcoincash: ChainBitcoinCashIcon,
  bnb: ChainBnbIcon,
  bnbchain: ChainBnbIcon,
  btc: ChainBitcoinIcon,
  cardano: ChainCardanoIcon,
  celo: ChainCeloIcon,
  cosmos: ChainCosmosIcon,
  doge: ChainDogecoinIcon,
  dogecoin: ChainDogecoinIcon,
  dot: ChainPolkadotIcon,
  default: EnsAddressIcon,
  eth: ChainEthereumIcon,
  ethereum: ChainEthereumIcon,
  fantom: ChainFantomIcon,
  fil: ChainFilecoinIcon,
  filecoin: ChainFilecoinIcon,
  flow: ChainFlowIcon,
  ftm: ChainFantomIcon,
  gnosis: ChainGnosisIcon,
  hbar: ChainHederaIcon,
  hedera: ChainHederaIcon,
  linea: ChainLineaIcon,
  ltc: ChainLitecoinIcon,
  litecoin: ChainLitecoinIcon,
  matic: ChainPolygonIcon,
  metis: ChainMetisIcon,
  monero: ChainMoneroIcon,
  near: ChainNearIcon,
  optimism: ChainOptimismIcon,
  polkadot: ChainPolkadotIcon,
  polygon: ChainPolygonIcon,
  scroll: ChainScrollIcon,
  sol: ChainSolanaIcon,
  solana: ChainSolanaIcon,
  starknet: ChainStarknetIcon,
  stellar: ChainStellarIcon,
  strk: ChainStarknetIcon,
  sui: ChainSuiIcon,
  tezos: ChainTezosIcon,
  tron: ChainTronIcon,
  trx: ChainTronIcon,
  xrp: ChainXrpIcon,
  xrpledger: ChainXrpIcon,
  xlm: ChainStellarIcon,
  xmr: ChainMoneroIcon,
  xtz: ChainTezosIcon,
  zcash: ChainZcashIcon,
  zec: ChainZcashIcon,
  zksync: ChainZksyncIcon,
  zksyncera: ChainZksyncIcon,
  zora: ChainZoraIcon,
};

const socialIcons: Readonly<Record<string, EnsIconComponent>> = {
  bluesky: SocialBlueskyIcon,
  combluesky: SocialBlueskyIcon,
  comdiscord: SocialDiscordIcon,
  comfarcaster: SocialFarcasterIcon,
  comgithub: SocialGithubIcon,
  cominstagram: SocialInstagramIcon,
  comlens: SocialLensIcon,
  comlinkedin: SocialLinkedinIcon,
  commastodon: SocialMastodonIcon,
  comreddit: SocialRedditIcon,
  comtelegram: SocialTelegramIcon,
  comtiktok: SocialTiktokIcon,
  comtwitter: SocialXIcon,
  comyoutube: SocialYoutubeIcon,
  discord: SocialDiscordIcon,
  farcaster: SocialFarcasterIcon,
  github: SocialGithubIcon,
  instagram: SocialInstagramIcon,
  lens: SocialLensIcon,
  linkedin: SocialLinkedinIcon,
  mastodon: SocialMastodonIcon,
  orgtelegram: SocialTelegramIcon,
  reddit: SocialRedditIcon,
  telegram: SocialTelegramIcon,
  tiktok: SocialTiktokIcon,
  twitter: SocialXIcon,
  x: SocialXIcon,
  xyzfarcaster: SocialFarcasterIcon,
  youtube: SocialYoutubeIcon,
};

const textIcons: Readonly<Record<string, EnsIconComponent>> = {
  ...socialIcons,
  avatar: createUIKitIcon(Image02Icon),
  bio: createUIKitIcon(Note01Icon),
  description: createUIKitIcon(Note01Icon),
  display: createUIKitIcon(User02Icon),
  email: createUIKitIcon(Mail01Icon),
  ethensdelegate: createUIKitIcon(UserShield01Icon),
  header: createUIKitIcon(Image02Icon),
  location: createUIKitIcon(Location01Icon),
  mail: createUIKitIcon(Mail01Icon),
  name: createUIKitIcon(User02Icon),
  nickname: createUIKitIcon(User02Icon),
  notice: createUIKitIcon(Notification01Icon),
  shortbio: createUIKitIcon(Note01Icon),
  timezone: createUIKitIcon(TimeZoneIcon),
  url: createUIKitIcon(Globe02Icon),
  website: createUIKitIcon(Globe02Icon),
  keywords: createUIKitIcon(Tag01Icon),
};

const contenthashIcons: Readonly<Record<string, EnsIconComponent>> = {
  adnl: ContenthashTonIcon,
  ar: ContenthashArweaveIcon,
  arweave: ContenthashArweaveIcon,
  bzz: ContenthashSwarmIcon,
  ipfs: ContenthashIpfsIcon,
  ipns: ContenthashIpnsIcon,
  onion: ContenthashTorIcon,
  onion3: ContenthashTorIcon,
  sia: ContenthashSiaIcon,
  skynet: ContenthashSiaIcon,
  swarm: ContenthashSwarmIcon,
  ton: ContenthashTonIcon,
  tor: ContenthashTorIcon,
};

const typeIcons: Readonly<Record<EnsRecordIconType, EnsIconComponent>> = {
  abi: AbiIcon,
  address: WalletIcon,
  contenthash: ContenthashIcon,
  data: DataIcon,
  interface: InterfaceIcon,
  name: NameIcon,
  pubkey: PublicKeyIcon,
  text: TextRecordIcon,
};

function normalizeRecordName(name: unknown): string {
  return (
    typeof name === "string" || typeof name === "number" || typeof name === "bigint"
      ? String(name)
      : ""
  )
    .trim()
    .toLowerCase()
    .replaceAll(/[\s._-]/g, "");
}

/**
 * Returns the icon component for a standard ENS coin type or common coin name.
 * Unknown coin types use the ENS address icon.
 */
export function getAddressIcon(coinType: CoinTypeIdentifier): EnsIconComponent {
  return addressIcons[normalizeRecordName(coinType)] ?? EnsAddressIcon;
}

/**
 * Returns the icon component for a contenthash protocol or encoded URI.
 */
export function getContenthashIcon(value: string): EnsIconComponent {
  const protocol = normalizeRecordName(
    (typeof value === "string" ? value : "").split(":")[0] ?? value,
  );

  return contenthashIcons[protocol] ?? ContenthashIcon;
}

/**
 * Returns the icon component for a social profile service or ENS text key.
 */
export function getSocialIcon(service: string): EnsIconComponent {
  return socialIcons[normalizeRecordName(service)] ?? TextRecordIcon;
}

/**
 * Returns the icon component for a known ENS text-record key.
 */
export function getTextRecordIcon(key: string): EnsIconComponent {
  return textIcons[normalizeRecordName(key)] ?? TextRecordIcon;
}

/**
 * Returns a React icon component accepting standard SVG props.
 *
 * Known text-record keys, contenthash protocols, and coin names receive a
 * branded icon. Unknown records fall back to their resolver record type.
 */
export function getRecordIcon(name: string, type: EnsRecordIconType): EnsIconComponent {
  const safeName = typeof name === "string" ? name : "";
  const normalizedName = normalizeRecordName(safeName);

  if (type === "address") {
    return getAddressIcon(safeName);
  }

  if (type === "contenthash") {
    return getContenthashIcon(safeName);
  }

  if (type === "text") {
    return getTextRecordIcon(normalizedName);
  }

  return typeIcons[type];
}
