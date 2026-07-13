"use client";

// @demo-title With Avatar Group
import { EmptyState } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";

import { Icon } from "@/demos/pro-icon";

function UserAvatar({ alt, src }: { alt: string; src: string }) {
  return (
    <Avatar className="ring-background ring-2">
      <Avatar.Image alt={alt} src={src} />
      <Avatar.Fallback>
        {alt
          .split(" ")
          .map((part) => part[0])
          .join("")}
      </Avatar.Fallback>
    </Avatar>
  );
}

function WithAvatarGroupDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media>
            <div className="flex -space-x-2">
              <UserAvatar alt="John Doe" src="/assets/avatars/blue.jpg" />
              <UserAvatar alt="Kate Wilson" src="/assets/avatars/green.jpg" />
              <UserAvatar alt="Emily Chen" src="/assets/avatars/purple.jpg" />
            </div>
          </EmptyState.Media>
          <EmptyState.Title>No Team Members</EmptyState.Title>
          <EmptyState.Description>
            Invite your team to collaborate on this project.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="sm">
            <Icon icon="lucide:plus" />
            Invite Members
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}

export const ProWithAvatarGroupExample = () => <WithAvatarGroupDemo />;
