import type { NameProfileRecordType } from "#/components/name-profile-editor/types";

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
  Note01Icon,
  TextIcon,
  User02Icon,
  UserCircleIcon,
  Wallet01Icon,
  type IconProps,
} from "@thenamespace/uikit/icons";

import {
  ChainArbitrumIcon,
  ChainArweaveIcon,
  ChainAvalancheIcon,
  ChainBaseIcon,
  ChainBitcoinCashIcon,
  ChainBitcoinIcon,
  ChainBnbIcon,
  ChainCardanoIcon,
  ChainCosmosIcon,
  ChainDogecoinIcon,
  ChainEthereumIcon,
  ChainGnosisIcon,
  ChainLineaIcon,
  ChainLitecoinIcon,
  ChainOptimismIcon,
  ChainPolkadotIcon,
  ChainPolygonIcon,
  ChainScrollIcon,
  ChainSolanaIcon,
  ChainTronIcon,
  ChainXrpIcon,
  ChainZksyncIcon,
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
} from "#/components/icons";

/** SVG component returned by the record icon resolver. */
export type RecordIconComponent = (
  props: SVGProps<SVGSVGElement>,
) => ReactElement;

function createUIKitIcon(icon: IconProps["icon"]): RecordIconComponent {
  return function UIKitRecordIcon(props) {
    return (
      <Icon aria-hidden icon={icon} {...(props as Omit<IconProps, "icon">)} />
    );
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

const addressIcons: Readonly<Record<string, RecordIconComponent>> = {
  "0": ChainBitcoinIcon,
  "2": ChainLitecoinIcon,
  "3": ChainDogecoinIcon,
  "60": ChainEthereumIcon,
  "118": ChainCosmosIcon,
  "144": ChainXrpIcon,
  "145": ChainBitcoinCashIcon,
  "195": ChainTronIcon,
  "354": ChainPolkadotIcon,
  "472": ChainArweaveIcon,
  "501": ChainSolanaIcon,
  "714": ChainBnbIcon,
  "966": ChainPolygonIcon,
  "1815": ChainCardanoIcon,
  "9000": ChainAvalancheIcon,
  "2147483649": ChainEthereumIcon,
  "2147483658": ChainOptimismIcon,
  "2147483704": ChainBnbIcon,
  "2147483748": ChainGnosisIcon,
  "2147483785": ChainPolygonIcon,
  "2147483972": ChainZksyncIcon,
  "2147492101": ChainBaseIcon,
  "2147525809": ChainArbitrumIcon,
  "2147526762": ChainAvalancheIcon,
  "2147542792": ChainLineaIcon,
  "2148018000": ChainScrollIcon,
  ada: ChainCardanoIcon,
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
  cosmos: ChainCosmosIcon,
  doge: ChainDogecoinIcon,
  dogecoin: ChainDogecoinIcon,
  dot: ChainPolkadotIcon,
  eth: ChainEthereumIcon,
  ethereum: ChainEthereumIcon,
  gnosis: ChainGnosisIcon,
  linea: ChainLineaIcon,
  ltc: ChainLitecoinIcon,
  litecoin: ChainLitecoinIcon,
  matic: ChainPolygonIcon,
  optimism: ChainOptimismIcon,
  polkadot: ChainPolkadotIcon,
  polygon: ChainPolygonIcon,
  scroll: ChainScrollIcon,
  sol: ChainSolanaIcon,
  solana: ChainSolanaIcon,
  tron: ChainTronIcon,
  trx: ChainTronIcon,
  xrp: ChainXrpIcon,
  xrpledger: ChainXrpIcon,
  zksync: ChainZksyncIcon,
  zksyncera: ChainZksyncIcon,
};

const textIcons: Readonly<Record<string, RecordIconComponent>> = {
  avatar: createUIKitIcon(Image02Icon),
  bio: createUIKitIcon(Note01Icon),
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
  description: createUIKitIcon(Note01Icon),
  discord: SocialDiscordIcon,
  display: createUIKitIcon(User02Icon),
  email: createUIKitIcon(Mail01Icon),
  farcaster: SocialFarcasterIcon,
  github: SocialGithubIcon,
  header: createUIKitIcon(Image02Icon),
  instagram: SocialInstagramIcon,
  lens: SocialLensIcon,
  linkedin: SocialLinkedinIcon,
  location: createUIKitIcon(Location01Icon),
  mail: createUIKitIcon(Mail01Icon),
  mastodon: SocialMastodonIcon,
  name: createUIKitIcon(User02Icon),
  nickname: createUIKitIcon(User02Icon),
  orgtelegram: SocialTelegramIcon,
  reddit: SocialRedditIcon,
  shortbio: createUIKitIcon(Note01Icon),
  telegram: SocialTelegramIcon,
  tiktok: SocialTiktokIcon,
  twitter: SocialXIcon,
  url: createUIKitIcon(Globe02Icon),
  website: createUIKitIcon(Globe02Icon),
  x: SocialXIcon,
  youtube: SocialYoutubeIcon,
  xyzfarcaster: SocialFarcasterIcon,
};

const contenthashIcons: Readonly<Record<string, RecordIconComponent>> = {
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

const typeIcons: Readonly<Record<NameProfileRecordType, RecordIconComponent>> =
  {
    abi: AbiIcon,
    address: WalletIcon,
    contenthash: ContenthashIcon,
    data: DataIcon,
    interface: InterfaceIcon,
    name: NameIcon,
    pubkey: PublicKeyIcon,
    text: TextRecordIcon,
  };

function normalizeRecordName(name: string): string {
  return (typeof name === "string" ? name : "")
    .trim()
    .toLowerCase()
    .replaceAll(/[\s._-]/g, "");
}

/**
 * Returns a React icon component accepting standard SVG props.
 *
 * Known text-record keys, contenthash protocols, and coin names receive a
 * branded icon. Unknown records fall back to their resolver record type.
 */
export function getRecordIcon(
  name: string,
  type: NameProfileRecordType,
): RecordIconComponent {
  const safeName = typeof name === "string" ? name : "";
  const normalizedName = normalizeRecordName(safeName);

  if (type === "address") {
    return addressIcons[normalizedName] ?? typeIcons.address;
  }

  if (type === "contenthash") {
    const protocol = normalizeRecordName(safeName.split(":")[0] ?? safeName);
    return contenthashIcons[protocol] ?? typeIcons.contenthash;
  }

  if (type === "text") {
    return textIcons[normalizedName] ?? typeIcons.text;
  }

  return typeIcons[type];
}
