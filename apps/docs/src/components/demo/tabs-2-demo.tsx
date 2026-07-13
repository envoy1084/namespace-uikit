"use client";

import { Tabs } from "@thenamespace/uikit";

import { useDictionary } from "@/components/demo/dictionary";
import { Iconify } from "@/components/iconify";

export function TabsDemo2() {
  const { demos } = useDictionary();
  const t = demos.tabs2;

  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label={t.ariaLabel}>
          <Tabs.Tab className="gap-1.5" id="chats">
            <Iconify icon="hugeicons:comment" />
            <span>{t.chats}</span>
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab className="gap-1.5" id="emails">
            <Iconify icon="hugeicons:envelope" />
            <span>{t.emails}</span>
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
