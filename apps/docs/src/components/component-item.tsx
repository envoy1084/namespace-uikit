import Image from "next/image";
import Link from "next/link";

import { cn } from "@/utils/cn";

interface ComponentItemProps {
  className?: string;
  href: string;
  imageName: string;
  title: string;
}

function ComponentImagePair({
  alt,
  imageName,
}: {
  alt: string;
  imageName: string;
}) {
  return (
    <>
      <Image
        unoptimized
        alt={alt}
        className="absolute inset-0 block size-full object-cover dark:hidden"
        height={594}
        src={`/assets/component-gallery/light-${imageName}.png`}
        width={874}
      />
      <Image
        unoptimized
        alt={alt}
        className="absolute inset-0 hidden size-full object-cover dark:block"
        height={594}
        src={`/assets/component-gallery/dark-${imageName}.png`}
        width={874}
      />
    </>
  );
}

export function ComponentItem({
  className,
  href,
  imageName,
  title,
}: ComponentItemProps) {
  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      <div className="order-1 sm:order-2">
        <Link className="link no-underline" href={href}>
          {title}
        </Link>
      </div>
      <div className="border-separator relative order-2 h-[198px] overflow-hidden rounded-xl border sm:order-1">
        <Link className="block size-full" href={href}>
          <ComponentImagePair alt={title} imageName={imageName} />
        </Link>
      </div>
    </div>
  );
}
