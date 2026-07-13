"use client";

import { Avatar, Card } from "@thenamespace/uikit";
import { tv } from "tailwind-variants";

import { useDictionary } from "@/components/demo/dictionary";

const cardStyles = tv({
  slots: {
    avatar: "size-[56px] rounded-xl",
    card: "w-full flex-1",
    cardContent: "items-start",
    footer: "items-center gap-2",
    footerAvatar: "size-4",
  },
});

export function SubtleCardsDemo() {
  const { avatar, card, cardContent, footer, footerAvatar } = cardStyles();
  const { demos } = useDictionary();
  const t = demos.subtleCards;

  return (
    <div className="flex w-full flex-row flex-wrap justify-between gap-4">
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image
              alt={t.indieTitle}
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
            />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">{t.indieTitle}</p>
          <p className="text-muted text-sm">{t.indieMembers}</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image
              alt="John"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">{t.indieBy}</p>
        </Card.Footer>
      </Card>
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image
              alt={t.aiTitle}
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
            />
            <Avatar.Fallback>J</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">{t.aiTitle}</p>
          <p className="text-muted text-sm">{t.aiMembers}</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image
              alt="Martha"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">{t.aiBy}</p>
        </Card.Footer>
      </Card>
    </div>
  );
}
