import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export function DocsImage({
  alt,
  className,
  darkSrc,
  src,
  ...props
}: ComponentProps<"img"> & { darkSrc?: string }) {
  return (
    <picture className="not-prose border-separator my-6 block overflow-hidden rounded-xl border">
      {darkSrc ? (
        <source media="(prefers-color-scheme: dark)" srcSet={darkSrc} />
      ) : null}
      <img
        {...props}
        alt={alt}
        className={cn("h-auto w-full object-cover", className)}
        src={src}
      />
    </picture>
  );
}
