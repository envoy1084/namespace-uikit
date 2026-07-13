"use client";

// @demo-title With Image
import { HoverCard } from "@thenamespace/uikit";
import { Link } from "@thenamespace/uikit/link";

function ImageCard() {
  return (
    <>
      <img
        alt="Neo Brutalism design"
        className="h-36 w-full rounded-t-2xl object-cover"
        src="/assets/namespace-pro-landing/chat-message.webp"
      />
      <div className="p-4">
        <p className="text-sm font-semibold">Neo Brutalism</p>
        <p className="text-muted mt-1 text-sm leading-relaxed">
          Raw aesthetics, bold colors, and playful typography.
        </p>
      </div>
    </>
  );
}

export const DemoWithImageExample = () => (
  <div className="px-10 py-24">
    <p className="text-sm leading-8">
      Learn more about the{" "}
      <HoverCard openDelay={0}>
        <HoverCard.Trigger>
          <Link
            className="underline"
            href="https://namespace.ninja"
            target="_blank"
          >
            Neo Brutalism
          </Link>
        </HoverCard.Trigger>
        <HoverCard.Content className="w-72 p-0">
          <HoverCard.Arrow />
          <ImageCard />
        </HoverCard.Content>
      </HoverCard>{" "}
      design trend.
    </p>
  </div>
);
