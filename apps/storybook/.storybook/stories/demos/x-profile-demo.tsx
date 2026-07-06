import React from "react";

import { Avatar, Card } from "@thenamespace/uikit";

import { VerifiedBadgeIcon } from "./components/icons";

export function XProfileDemo() {
  return (
    <Card className="w-[400px] items-start justify-center">
      <Card.Header className="items-top w-full flex-row justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image
              alt="Namespace UI"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui_isotipo.png"
            />
            <Avatar.Fallback>H</Avatar.Fallback>
          </Avatar>
          <div className="flex h-full flex-col items-start justify-center">
            <div className="flex items-center gap-0.5">
              <span className="text-sm leading-4 font-semibold">
                Namespace UI
              </span>
              <VerifiedBadgeIcon height={18} width={18} />
            </div>
            <span className="text-muted text-sm tracking-tight">@hero_ui</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex-row text-left">
        <p className="pl-px text-sm font-medium">
          Building the future of UI for web & mobile.&nbsp;
          <br />
          <span aria-label="confetti" role="img">
            🚀
          </span>
          &nbsp;(YC S24)&nbsp;
        </p>
      </Card.Content>
      <Card.Footer className="gap-2">
        <div className="flex gap-1">
          <p className="text-sm font-semibold">4</p>
          <p className="text-muted text-sm">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm font-semibold">97.1K</p>
          <p className="text-muted text-sm">Followers</p>
        </div>
      </Card.Footer>
    </Card>
  );
}
