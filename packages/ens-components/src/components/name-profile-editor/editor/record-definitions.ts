import type {
  ProfileEditorSection,
  RecordDefinition,
} from "#/components/name-profile-editor/editor/types";
import type { NameProfileRecordType } from "#/components/name-profile-editor/types";

export const sectionLabels: Readonly<Record<ProfileEditorSection, string>> = {
  addresses: "Addresses",
  advanced: "Advanced",
  general: "General",
  social: "Social",
  website: "Website",
};

export const sectionOrder: readonly ProfileEditorSection[] = [
  "general",
  "social",
  "addresses",
  "website",
  "advanced",
];

function defineRecord(
  section: ProfileEditorSection,
  type: NameProfileRecordType,
  name: string,
  label: string,
  placeholder: string,
  options: {
    isCustom?: boolean;
    isRepeatable?: boolean;
  } = {},
): RecordDefinition {
  return {
    id: `${type}:${name}`,
    ...options,
    label,
    name,
    placeholder,
    section,
    type,
  };
}

const generalRecords = [
  defineRecord("general", "text", "name", "Nickname", "Richard Hendricks"),
  defineRecord(
    "general",
    "text",
    "description",
    "Short bio",
    "Making the world a better place",
  ),
  defineRecord("general", "text", "url", "Website", "https://piedpiper.com"),
  defineRecord("general", "text", "location", "Location", "Palo Alto, CA"),
  defineRecord("general", "text", "email", "E-mail", "richard@piedpiper.com"),
  defineRecord(
    "general",
    "text",
    "avatar",
    "Avatar",
    "ipfs://bafybeigdyrzt5sfp…di7kiv7wq",
  ),
  defineRecord(
    "general",
    "text",
    "header",
    "Header",
    "https://piedpiper.com/header.png",
  ),
  defineRecord("general", "text", "custom", "Custom", "Value", {
    isCustom: true,
    isRepeatable: true,
  }),
] as const;

const socialRecords = [
  defineRecord("social", "text", "com.twitter", "X", "richardhendricks"),
  defineRecord("social", "text", "com.discord", "Discord", "richardh"),
  defineRecord("social", "text", "com.github", "GitHub", "richardhendricks"),
  defineRecord(
    "social",
    "text",
    "org.telegram",
    "Telegram",
    "richard_hendricks",
  ),
  defineRecord("social", "text", "com.youtube", "YouTube", "@piedpiper"),
  defineRecord("social", "text", "xyz.farcaster", "Farcaster", "richard.eth"),
  defineRecord("social", "text", "com.lens", "Lens", "richard"),
  defineRecord("social", "text", "com.instagram", "Instagram", "piedpiper"),
  defineRecord(
    "social",
    "text",
    "com.linkedin",
    "LinkedIn",
    "richard-hendricks",
  ),
  defineRecord("social", "text", "com.reddit", "Reddit", "piedpiper"),
  defineRecord("social", "text", "com.tiktok", "TikTok", "@piedpiper"),
  defineRecord(
    "social",
    "text",
    "com.mastodon",
    "Mastodon",
    "@richard@techhub.social",
  ),
  defineRecord(
    "social",
    "text",
    "com.bluesky",
    "Bluesky",
    "richard.piedpiper.com",
  ),
] as const;

const evmAddressPlaceholder = "0xA0b86991…3606eB48";

const addressRecords = [
  defineRecord(
    "addresses",
    "address",
    "2147483648",
    "Default",
    evmAddressPlaceholder,
  ),
  defineRecord("addresses", "address", "60", "Ethereum", evmAddressPlaceholder),
  defineRecord("addresses", "address", "0", "Bitcoin", "1A1zP1eP…DivfNa"),
  defineRecord("addresses", "address", "501", "Solana", "TokenkegQ…VQ5DA"),
  defineRecord(
    "addresses",
    "address",
    "2147492101",
    "Base",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147525809",
    "Arbitrum",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483658",
    "Optimism",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483785",
    "Polygon",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483704",
    "BNB Chain",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147526762",
    "Avalanche",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147525868",
    "Celo",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483898",
    "Fantom",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147484736",
    "Metis",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2155261425",
    "Zora",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483748",
    "Gnosis",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2148018000",
    "Scroll",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147542792",
    "Linea",
    evmAddressPlaceholder,
  ),
  defineRecord(
    "addresses",
    "address",
    "2147483972",
    "zkSync Era",
    evmAddressPlaceholder,
  ),
  defineRecord("addresses", "address", "1815", "Cardano", "addr1qx2fx…0w4k6f"),
  defineRecord("addresses", "address", "118", "Cosmos", "cosmos1fl48…yu3r8w"),
  defineRecord("addresses", "address", "283", "Algorand", "XMHLM7…5J5J4U"),
  defineRecord("addresses", "address", "461", "Filecoin", "f1abcde…vwxyz"),
  defineRecord("addresses", "address", "539", "Flow", "0xf8d6e0586b0a20c7"),
  defineRecord("addresses", "address", "3030", "Hedera", "0.0.123456"),
  defineRecord("addresses", "address", "128", "Monero", "48bWuo…FzJs8N"),
  defineRecord("addresses", "address", "397", "NEAR", "piedpiper.near"),
  defineRecord("addresses", "address", "9004", "Starknet", "0x049d36…4dc7"),
  defineRecord("addresses", "address", "148", "Stellar", "GBRPYH…QY2J5"),
  defineRecord("addresses", "address", "784", "Sui", "0x2f8c8a…8c95"),
  defineRecord("addresses", "address", "1729", "Tezos", "tz1VSUr8…LNaTF"),
  defineRecord("addresses", "address", "133", "Zcash", "t1Zcash…Address"),
  defineRecord("addresses", "address", "3", "Dogecoin", "DBs4WcRE…M6QSUSz"),
  defineRecord("addresses", "address", "2", "Litecoin", "ltc1qg82…7c6m9a"),
  defineRecord("addresses", "address", "354", "Polkadot", "5GrwvaEF…Qq3pJ"),
  defineRecord("addresses", "address", "195", "Tron", "TR7NHqje…gjLj6t"),
  defineRecord("addresses", "address", "144", "XRP", "rDsbeoma…iTCdBv"),
  defineRecord(
    "addresses",
    "address",
    "145",
    "Bitcoin Cash",
    "bitcoincash:qp63uahg…spdc2h",
  ),
  defineRecord("addresses", "address", "472", "Arweave", "aDe2hr18…i5J2WA"),
  defineRecord("addresses", "address", "custom", "Custom", "Address", {
    isCustom: true,
    isRepeatable: true,
  }),
] as const;

const websiteRecords = [
  defineRecord(
    "website",
    "contenthash",
    "ipfs",
    "IPFS",
    "ipfs://bafybeigdyrzt5sfp…di7kiv7wq",
  ),
  defineRecord(
    "website",
    "contenthash",
    "ipns",
    "IPNS",
    "ipns://k51qzi5uqu5dl7t5…6qlwyx",
  ),
  defineRecord(
    "website",
    "contenthash",
    "arweave",
    "Arweave",
    "arweave://j7W9FZ4d…eR4pJQ",
  ),
  defineRecord(
    "website",
    "contenthash",
    "swarm",
    "Swarm",
    "swarm://d1de9994c2a6…9d61c0",
  ),
  defineRecord(
    "website",
    "contenthash",
    "onion",
    "Tor v2",
    "onion://expyuzz4wqqy…yqhjn",
  ),
  defineRecord(
    "website",
    "contenthash",
    "onion3",
    "Tor v3",
    "onion3://2gzyxa5ihm7n…d.onion",
  ),
  defineRecord(
    "website",
    "contenthash",
    "skynet",
    "Skynet",
    "skynet://AAC_O9R3…61_fN0",
  ),
  defineRecord(
    "website",
    "contenthash",
    "adnl",
    "TON",
    "adnl://UQCwBymK…T7f9kQ",
  ),
] as const;

const advancedRecords = [
  defineRecord("advanced", "name", "name", "Name", "richard.eth"),
  defineRecord("advanced", "pubkey", "pubkey", "Public key", "0x04…"),
  defineRecord("advanced", "abi", "abi", "ABI", "0x5b7b2274…7d5d", {
    isRepeatable: true,
  }),
  defineRecord("advanced", "data", "data", "Data", "0x70696564…6572", {
    isRepeatable: true,
  }),
  defineRecord(
    "advanced",
    "interface",
    "interface",
    "Interface",
    evmAddressPlaceholder,
    { isRepeatable: true },
  ),
] as const;

export const recordDefinitions: readonly RecordDefinition[] = [
  ...generalRecords,
  ...socialRecords,
  ...addressRecords,
  ...websiteRecords,
  ...advancedRecords,
];

export function findRecordDefinition(
  type: NameProfileRecordType,
  name: string,
): RecordDefinition | undefined {
  return recordDefinitions.find(
    (definition) => definition.type === type && definition.name === name,
  );
}
