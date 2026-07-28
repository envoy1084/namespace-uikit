import type { SVGProps } from "react";
export const ChainZoraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path fill="#fff" d="M32 8a8 8 0 0 0-8-8H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8z" />
    <path fill="url(#zora_svg__a)" d="M16 26a10 10 0 1 1 0-20 10 10 0 0 1 0 20" />
    <defs>
      <radialGradient
        id="zora_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="rotate(180 10.27 5.688)scale(16.8921)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.007} stopColor="#F2CEFE" />
        <stop offset={0.191} stopColor="#AFBAF1" />
        <stop offset={0.498} stopColor="#4281D3" />
        <stop offset={0.667} stopColor="#2E427D" />
        <stop offset={0.823} stopColor="#230101" />
        <stop offset={1} stopColor="#8F6B40" />
      </radialGradient>
    </defs>
  </svg>
);
