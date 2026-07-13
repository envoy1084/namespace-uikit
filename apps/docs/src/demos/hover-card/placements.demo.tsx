"use client";

// @demo-title Placements
import { HoverCard } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";

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

function PlacementsDemo() {
  return (
    <div className="grid gap-4">
      <div className="text-muted my-2 text-sm">Hover buttons</div>
      {(["top", "left", "right", "bottom"] as const).map((placement) => (
        <HoverCard key={placement}>
          <HoverCard.Trigger>
            <Button className="w-full" variant="outline">
              {placement[0].toUpperCase() + placement.slice(1)}
            </Button>
          </HoverCard.Trigger>
          <HoverCard.Content placement={placement}>
            <HoverCard.Arrow />
            <Profile />
          </HoverCard.Content>
        </HoverCard>
      ))}
    </div>
  );
}

export const DemoPlacementsExample = () => <PlacementsDemo />;
