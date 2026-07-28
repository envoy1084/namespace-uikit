"use client";

import {
  AtIcon,
  CodeIcon,
  Database01Icon,
  DiscordIcon,
  GithubIcon,
  Globe02Icon,
  HugeiconsIcon,
  Key01Icon,
  Link01Icon,
  Location01Icon,
  Mail01Icon,
  NewTwitterIcon,
  QuestionIcon,
  SmartPhone01Icon,
  TelegramIcon,
  TextIcon,
  UserCircle02Icon,
  YoutubeIcon,
} from "@thenamespace/uikit/icons";

const icons = {
  at: AtIcon,
  code: CodeIcon,
  database: Database01Icon,
  discord: DiscordIcon,
  github: GithubIcon,
  globe: Globe02Icon,
  interface: CodeIcon,
  key: Key01Icon,
  link: Link01Icon,
  location: Location01Icon,
  mail: Mail01Icon,
  phone: SmartPhone01Icon,
  question: QuestionIcon,
  telegram: TelegramIcon,
  text: TextIcon,
  user: UserCircle02Icon,
  x: NewTwitterIcon,
  youtube: YoutubeIcon,
} as const;

function EthereumIcon() {
  return (
    <svg aria-hidden="true" className="size-8" viewBox="0 0 32 32">
      <circle cx="16" cy="16" fill="#7857e5" r="15" />
      <path d="m16 5-6.8 11L16 20l6.8-4z" fill="#fff" />
      <path d="m9.2 17.3 6.8 9.6 6.8-9.6-6.8 4z" fill="#d9d1ff" />
      <path d="M16 5v15l6.8-4z" fill="#b9abff" />
    </svg>
  );
}

function SolanaIcon() {
  return (
    <svg aria-hidden="true" className="size-8" viewBox="0 0 32 32">
      <defs>
        <linearGradient id="sol-a" x1="4" x2="28" y1="4" y2="28">
          <stop stopColor="#00ffa3" />
          <stop offset="1" stopColor="#dc1fff" />
        </linearGradient>
      </defs>
      <path
        d="M8 7h19l-4 4H4zM4 14h19l4 4H8zM8 21h19l-4 4H4z"
        fill="url(#sol-a)"
      />
    </svg>
  );
}

function ArbitrumIcon() {
  return (
    <svg aria-hidden="true" className="size-8" viewBox="0 0 32 32">
      <path d="M16 2 28 9v14l-12 7L4 23V9z" fill="#1f2d3d" />
      <path d="m13 24 8-16h4l-8 18z" fill="#28a0f0" />
      <path d="M7 21 14 7h4l-8 17z" fill="#9dcced" />
      <path d="m19 26 3-6 3 5-5 3z" fill="#fff" />
    </svg>
  );
}

function PolygonIcon() {
  return (
    <span className="flex size-8 items-center justify-center rounded-full bg-[#7b3fe4] text-lg font-semibold text-white">
      ∞
    </span>
  );
}

function ProtocolIcon({ icon }: { icon: string }) {
  if (icon === "ipfs") {
    return (
      <span className="flex size-8 items-center justify-center text-2xl text-[#5ab6bd]">
        ◇
      </span>
    );
  }
  if (icon === "onion") {
    return (
      <span className="flex size-8 items-center justify-center text-2xl text-[#7c4dd7]">
        ◉
      </span>
    );
  }
  if (icon === "arweave") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full border-[3px] border-[#10232e] font-serif text-lg font-semibold text-[#10232e]">
        a
      </span>
    );
  }
  return (
    <span className="flex size-8 items-center justify-center text-2xl text-[#00bd6f]">
      ◒
    </span>
  );
}

function BrandIcon({ icon }: { icon: string }) {
  if (icon === "eth") return <EthereumIcon />;
  if (icon === "sol") return <SolanaIcon />;
  if (icon === "arb") return <ArbitrumIcon />;
  if (icon === "polygon") return <PolygonIcon />;
  if (["arweave", "ipfs", "onion", "skynet"].includes(icon)) {
    return <ProtocolIcon icon={icon} />;
  }
  if (icon === "btc") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-[#f7931a] text-lg font-semibold text-white">
        ₿
      </span>
    );
  }
  if (icon === "base") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-[#0755f9] text-lg font-semibold text-white">
        −
      </span>
    );
  }
  if (icon === "celo") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-[#efff3d] text-base font-semibold text-[#111]">
        C
      </span>
    );
  }
  if (icon === "op") {
    return (
      <span className="flex size-8 items-center justify-center rounded-full bg-[#ff0420] text-[11px] font-semibold text-white italic">
        OP
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="size-8 rounded-full bg-[radial-gradient(circle_at_30%_25%,#72b7ff_0%,#504bc1_30%,#241414_62%,#ff7557_100%)]"
    />
  );
}

export function RecordIcon({
  className,
  icon,
}: {
  className?: string;
  icon: string;
}) {
  if (
    [
      "arb",
      "arweave",
      "base",
      "btc",
      "celo",
      "eth",
      "ipfs",
      "onion",
      "op",
      "polygon",
      "skynet",
      "sol",
      "zora",
    ].includes(icon)
  ) {
    return <BrandIcon icon={icon} />;
  }

  const iconData = icons[icon as keyof typeof icons] ?? TextIcon;
  return (
    <span
      className={`flex size-8 items-center justify-center text-[#858585] ${className ?? ""}`}
    >
      <HugeiconsIcon icon={iconData} size={25} strokeWidth={1.8} />
    </span>
  );
}
