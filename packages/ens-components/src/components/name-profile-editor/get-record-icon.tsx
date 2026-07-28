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
  ChainEnsIcon,
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
  "2147483648": ChainEnsIcon,
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
  default: ChainEnsIcon,
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
  ethensdelegate: createUIKitIcon(UserShield01Icon),
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
  notice: createUIKitIcon(Notification01Icon),
  orgtelegram: SocialTelegramIcon,
  reddit: SocialRedditIcon,
  shortbio: createUIKitIcon(Note01Icon),
  telegram: SocialTelegramIcon,
  tiktok: SocialTiktokIcon,
  timezone: createUIKitIcon(TimeZoneIcon),
  twitter: SocialXIcon,
  url: createUIKitIcon(Globe02Icon),
  website: createUIKitIcon(Globe02Icon),
  keywords: createUIKitIcon(Tag01Icon),
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
