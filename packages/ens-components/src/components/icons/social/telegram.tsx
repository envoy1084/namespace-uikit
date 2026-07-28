import type { SVGProps } from "react";
export const SocialTelegramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g clipPath="url(#social_telegram_svg__a)">
      <path
        fill="url(#social_telegram_svg__b)"
        d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16"
      />
      <path
        fill="#C8DAEA"
        d="m10.83 17.17 1.899 5.254s.237.491.491.491 4.034-3.932 4.034-3.932l4.204-8.119-10.56 4.95z"
      />
      <path
        fill="#A9C6D8"
        d="m13.348 18.517-.365 3.873s-.152 1.187 1.034 0 2.322-2.102 2.322-2.102"
      />
      <path
        fill="#fff"
        d="M10.865 17.357 6.96 16.085s-.467-.19-.316-.619c.03-.088.093-.164.28-.293.865-.603 16.014-6.048 16.014-6.048s.427-.144.68-.049a.37.37 0 0 1 .251.274q.041.171.034.345c-.001.1-.013.193-.023.34-.092 1.488-2.853 12.598-2.853 12.598s-.165.65-.757.672a1.08 1.08 0 0 1-.79-.305c-1.162-1-5.176-3.697-6.063-4.29a.17.17 0 0 1-.073-.12c-.012-.063.056-.14.056-.14s6.99-6.214 7.176-6.866c.014-.05-.04-.075-.113-.053-.464.17-8.513 5.253-9.4 5.814a.4.4 0 0 1-.198.012"
      />
    </g>
    <defs>
      <linearGradient
        id="social_telegram_svg__b"
        x1={16}
        x2={16}
        y1={32}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1D93D2" />
        <stop offset={1} stopColor="#38B0E3" />
      </linearGradient>
      <clipPath id="social_telegram_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);
