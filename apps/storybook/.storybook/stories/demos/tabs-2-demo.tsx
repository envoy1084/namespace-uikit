import React from "react";

import { Tabs } from "@thenamespace/uikit";
import { Comment01Icon, Mail01Icon } from "@thenamespace/uikit/icons";
import { HugeiconsIcon } from "@thenamespace/uikit/icons";

export function TabsDemo2() {
  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab className="gap-1.5" id="chats">
            <HugeiconsIcon icon={Comment01Icon} />
            <span>Chats</span>
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab className="gap-1.5" id="emails">
            <HugeiconsIcon icon={Mail01Icon} />
            <span>Emails</span>
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
