"use client";

// @demo-title With Arrow
import { HoverCard } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Link } from "@thenamespace/uikit/link";

function Profile() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          <Avatar.Image
            alt="Namespace UIKit"
            src="/assets/docs/namespace_isotipo.png"
          />
          <Avatar.Fallback>H</Avatar.Fallback>
        </Avatar>
        <div className="flex flex-col items-start justify-center">
          <span className="text-sm leading-4 font-semibold">
            Namespace UIKit
          </span>
          <span className="text-muted text-sm tracking-tight">@hero_ui</span>
        </div>
      </div>
      <p className="mt-3 pl-px text-sm font-medium">
        Building the future of UI for web &amp; mobile.&nbsp;
        <br />
        <span aria-label="confetti" role="img">
          🚀
        </span>
        &nbsp;(YC S24)&nbsp;
      </p>
      <div className="mt-3 flex gap-2">
        <div className="flex gap-1">
          <p className="text-sm font-semibold">4</p>
          <p className="text-muted text-sm">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm font-semibold">97.1K</p>
          <p className="text-muted text-sm">Followers</p>
        </div>
      </div>
    </>
  );
}

function TriggerLink() {
  return (
    <Link className="underline" href="https://x.com/hero_ui" target="_blank">
      @hero_ui
    </Link>
  );
}

export const ProWithArrowExample = () => (
  <div className="px-10 py-24">
    <p className="text-sm leading-8">
      Hover over{" "}
      <HoverCard>
        <HoverCard.Trigger>
          <TriggerLink />
        </HoverCard.Trigger>
        <HoverCard.Content>
          <HoverCard.Arrow />
          <Profile />
        </HoverCard.Content>
      </HoverCard>{" "}
      to see a preview with an arrow.
    </p>
  </div>
);
