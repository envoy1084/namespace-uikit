"use client";

import { Avatar, Button, Card, CloseButton } from "@thenamespace/uikit";

import { useDictionary } from "@/components/demo/dictionary";
import { Iconify } from "@/components/iconify";

export function AlertDialogDemo() {
  const { demos } = useDictionary();
  const t = demos.alertDialog;

  return (
    <Card className="h-[208px] w-full items-start justify-center p-5 min-[1200px]:w-[340px]">
      <Card.Header className="flex w-full items-start justify-center gap-2 px-1">
        <Avatar color="warning" variant="soft">
          <Avatar.Fallback>
            <Iconify className="text-lg" icon="hugeicons:floppy-disk" />
          </Avatar.Fallback>
        </Avatar>
        <Card.Title>{t.title}</Card.Title>
        <Card.Description>{t.description}</Card.Description>
        <CloseButton className="absolute top-3 right-3" />
      </Card.Header>
      <Card.Footer className="flex w-full items-center gap-2 px-0.5 pt-3">
        <Button className="w-full" variant="tertiary">
          {t.discard}
        </Button>
        <Button className="w-full">{t.save}</Button>
      </Card.Footer>
    </Card>
  );
}
