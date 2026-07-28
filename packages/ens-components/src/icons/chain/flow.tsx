import type { SVGProps } from "react";
export const ChainFlowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#00EF8B"
      d="M32 16c0-8.837-7.163-16-16-16S0 7.163 0 16s7.163 16 16 16 16-7.163 16-16"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M25 11.156h-4.242c-.913 0-1.65.932-1.65 1.829v.546h-4.713v-.546c0-3.301 2.734-5.985 6.11-5.985H25zm-10.605 8.61c0 .932-.548 1.698-1.473 1.698-1.178 0-1.685-.766-1.685-1.698 0-.933.76-1.485 1.685-1.485h1.473zm4.713-1.485v1.212c0 3.443-2.769 6.507-6.186 6.507a6.17 6.17 0 0 1-4.203-1.92A6.27 6.27 0 0 1 7 19.767c0-1.608.616-3.154 1.72-4.316a6.17 6.17 0 0 1 4.202-1.919h1.473v4.75zm0 0v-4.75h4.714v4.75z"
      clipRule="evenodd"
    />
  </svg>
);
