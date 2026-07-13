"use client";

import { Avatar, Card } from "@thenamespace/uikit";

import { useDictionary } from "@/components/demo/dictionary";
import { VerifiedBadgeIcon } from "@/icons/verified-badge";

export function XProfileDemo() {
  const { demos } = useDictionary();
  const t = demos.xProfile;

  return (
    <Card className="w-full items-start justify-center xl:w-[400px]">
      <Card.Header className="items-top w-full flex-row justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <Avatar.Fallback>N</Avatar.Fallback>
          </Avatar>
          <div className="flex h-full flex-col items-start justify-center">
            <div className="flex items-center gap-0.5">
              <span className="text-sm leading-4 font-semibold">Namespace</span>
              <VerifiedBadgeIcon height={18} width={18} />
            </div>
            <span className="text-muted text-sm tracking-tight">
              @thenamespace
            </span>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="flex-row text-left">
        <p className="pl-px text-sm font-medium">
          {t.bio}&nbsp;
          <br />
          <span aria-label={t.confettiLabel} role="img">
            🚀
          </span>
          &nbsp;{t.bioSuffix}&nbsp;
        </p>
      </Card.Content>
      <Card.Footer className="gap-2">
        <div className="flex gap-1">
          <p className="text-sm font-semibold">4</p>
          <p className="text-muted text-sm">{t.following}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm font-semibold">97.1K</p>
          <p className="text-muted text-sm">{t.followers}</p>
        </div>
      </Card.Footer>
    </Card>
  );
}
