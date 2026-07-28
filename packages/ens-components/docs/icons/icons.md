# ENS icons

Import icon resolvers and individual SVG components from
`ens-components/icons`. Icons are not exported from the package root.

## Icon resolvers

Each resolver returns a React component that accepts standard
`SVGProps<SVGSVGElement>`:

```tsx
import {
  getAddressIcon,
  getContentHashIcon,
  getSocialIcon,
} from "ens-components/icons";

const EthereumIcon = getAddressIcon(60);
const IpfsIcon = getContentHashIcon("ipfs://bafy...");
const GithubIcon = getSocialIcon("com.github");

export function RecordIcons() {
  return (
    <>
      <EthereumIcon aria-label="Ethereum address" className="size-5" />
      <IpfsIcon aria-label="IPFS content hash" className="size-5" />
      <GithubIcon aria-label="GitHub profile" className="size-5" />
    </>
  );
}
```

### `getAddressIcon`

```ts
function getAddressIcon(coinType: bigint | number | string): EnsIconComponent;
```

Accepts an ENSIP-9 coin type or a common coin or network alias. Unknown values
return the ENS address icon.

### `getContentHashIcon`

```ts
function getContentHashIcon(value: string): EnsIconComponent;
```

Accepts a protocol name or a URI. Supported protocols include IPFS, IPNS,
Arweave, Swarm, Sia, Tor, and TON. Unknown values return the generic
contenthash icon.

### `getSocialIcon`

```ts
function getSocialIcon(service: string): EnsIconComponent;
```

Accepts a service name or common ENS text-record key, including names such as
`github`, `com.github`, `twitter`, and `com.twitter`. Unknown values return the
generic text-record icon.

### `getTextRecordIcon`

```ts
function getTextRecordIcon(key: string): EnsIconComponent;
```

Returns an icon for a known ENS text-record key and falls back to the generic
text-record icon.

### `getRecordIcon`

```ts
function getRecordIcon(name: string, type: EnsRecordIconType): EnsIconComponent;
```

Resolves address, contenthash, text, ABI, data, interface, name, and public-key
record icons through one API.

## Individual icons

Individual SVG components are available from the same entry point:

```tsx
import {
  ChainEthereumIcon,
  ContenthashIpfsIcon,
  SocialGithubIcon,
} from "ens-components/icons";
```

Every individual icon accepts standard `SVGProps<SVGSVGElement>`.
