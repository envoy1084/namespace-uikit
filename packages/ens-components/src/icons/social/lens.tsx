import type { SVGProps } from "react";
export const SocialLensIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <rect width={32} height={32} fill="#fff" rx={16} />
    <path
      fill="#2C2D30"
      fillRule="evenodd"
      d="M19.79 13.607a3.5 3.5 0 0 1 2.427-.987c2.09 0 3.783 1.735 3.783 3.876 0 1.852-1.79 3.436-2.238 3.8C21.67 22.002 18.942 23 16 23c-2.943 0-5.669-.997-7.762-2.704C7.792 19.932 6 18.345 6 16.496c0-2.14 1.693-3.876 3.782-3.876.941 0 1.785.378 2.429.987l.066-.034C12.424 11.577 14.011 10 16 10c1.99 0 3.576 1.576 3.723 3.573z"
      clipRule="evenodd"
    />
  </svg>
);
