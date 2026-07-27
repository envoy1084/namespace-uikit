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
  telegram: AtIcon,
  text: TextIcon,
  user: UserCircle02Icon,
  x: NewTwitterIcon,
  youtube: YoutubeIcon,
} as const;

function CoinIcon({ icon }: { icon: string }) {
  if (icon === "btc") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-[#f7931a] text-sm font-semibold text-white">
        ₿
      </span>
    );
  }

  if (icon === "eth") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-[#627eea] text-xs font-semibold text-white">
        ◆
      </span>
    );
  }

  if (icon === "sol") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-[#121212] text-[9px] font-semibold text-[#8cffc1]">
        SOL
      </span>
    );
  }

  if (icon === "base") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-[#0052ff] text-xs font-semibold text-white">
        B
      </span>
    );
  }

  if (icon === "arb") {
    return (
      <span className="flex size-7 items-center justify-center rounded-full bg-[#213147] text-xs font-semibold text-[#6da8ff]">
        A
      </span>
    );
  }

  return (
    <span className="flex size-7 items-center justify-center rounded-full bg-[#ff0420] text-[10px] font-semibold text-white">
      OP
    </span>
  );
}

export function RecordIcon({
  className,
  icon,
}: {
  className?: string;
  icon: string;
}) {
  if (["arb", "base", "btc", "eth", "op", "sol"].includes(icon)) {
    return <CoinIcon icon={icon} />;
  }

  const iconData = icons[icon as keyof typeof icons] ?? TextIcon;
  return (
    <span
      className={`text-muted flex size-7 items-center justify-center ${className ?? ""}`}
    >
      <HugeiconsIcon icon={iconData} size={18} />
    </span>
  );
}
