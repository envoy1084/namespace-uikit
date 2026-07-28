import type { SVGProps } from "react";
export const ContenthashTorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <g clipPath="url(#contenthash_tor_svg__a)">
      <path
        fill="#F2E4FF"
        d="M16 31.375c8.491 0 15.375-6.884 15.375-15.375S24.491.625 16 .625.625 7.509.625 16 7.509 31.375 16 31.375"
      />
      <path
        fill="url(#contenthash_tor_svg__b)"
        fillRule="evenodd"
        d="M16.033 29.09v-1.94C22.177 27.133 27.15 22.148 27.15 16S22.177 4.867 16.033 4.85V2.91C23.248 2.928 29.09 8.78 29.09 16s-5.842 13.072-13.057 13.09m0-6.789a6.303 6.303 0 0 0 0-12.603V7.76a8.241 8.241 0 0 1 0 16.481zm0-9.694a3.393 3.393 0 0 1 0 6.785zM0 16c0 8.837 7.163 16 16 16s16-7.163 16-16S24.837 0 16 0 0 7.163 0 16"
        clipRule="evenodd"
      />
      <g filter="url(#contenthash_tor_svg__c)">
        <path
          fill="#000"
          d="M16 1.813c-7.974 0-14.437 6.435-14.437 14.375 0 7.939 6.463 14.375 14.437 14.375z"
        />
      </g>
      <path
        fill="url(#contenthash_tor_svg__d)"
        d="M16 1.813c-7.974 0-14.437 6.435-14.437 14.375 0 7.939 6.463 14.375 14.437 14.375z"
      />
    </g>
    <defs>
      <linearGradient
        id="contenthash_tor_svg__b"
        x1={16}
        x2={16}
        y1={32}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#420C5D" />
        <stop offset={1} stopColor="#951AD1" />
      </linearGradient>
      <linearGradient
        id="contenthash_tor_svg__d"
        x1={8.781}
        x2={8.781}
        y1={30.563}
        y2={1.813}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#420C5D" />
        <stop offset={1} stopColor="#951AD1" />
      </linearGradient>
      <clipPath id="contenthash_tor_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
      <filter
        id="contenthash_tor_svg__c"
        width={54.438}
        height={68.75}
        x={-26.438}
        y={-18.188}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-8} />
        <feGaussianBlur stdDeviation={10} />
        <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.25098 0 0 0 0 0.25098 0 0 0 0.2 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2017_247" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_2017_247" result="shape" />
      </filter>
    </defs>
  </svg>
);
