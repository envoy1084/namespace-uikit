import type { SVGProps } from "react";
export const EnsAddressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="url(#ens_svg__a)"
      d="M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16s7.163 16 16 16 16-7.163 16-16"
    />
    <path
      fill="#fff"
      d="M10.046 14.28c.18.385.615 1.135.615 1.135L15.715 7l-4.929 3.47a2.14 2.14 0 0 0-.7.776 3.62 3.62 0 0 0-.035 3.034zM8.05 17.05a5.7 5.7 0 0 0 2.2 4.12L15.71 25s-3.407-4.95-6.285-9.885a5 5 0 0 1-.58-1.68 2.7 2.7 0 0 1 0-.806l-.22.426a6.5 6.5 0 0 0-.585 1.901c-.06.699-.05 1.4.014 2.1zm13.903.67a20 20 0 0 0-.615-1.135L16.29 25l4.928-3.465c.29-.2.53-.465.7-.78a3.62 3.62 0 0 0 .031-3.035zm1.997-2.77a5.7 5.7 0 0 0-2.201-4.12L16.289 7s3.409 4.95 6.285 9.885c.29.52.485 1.09.575 1.68.04.265.04.54 0 .805l.22-.425c.294-.6.492-1.24.59-1.901.061-.699.051-1.4-.014-2.1z"
    />
    <defs>
      <linearGradient
        id="ens_svg__a"
        x1={10.416}
        x2={25.087}
        y1={7.619}
        y2={24.995}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7C97FA" />
        <stop offset={1} stopColor="#53B1EF" />
      </linearGradient>
    </defs>
  </svg>
);
