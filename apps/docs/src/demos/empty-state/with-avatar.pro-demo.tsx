"use client";

// @demo-title With Avatar
import { EmptyState } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Button } from "@thenamespace/uikit/button";

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

function WithAvatarDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media>
            <UserAvatar alt="John Doe" src="/assets/avatars/blue.jpg" />
          </EmptyState.Media>
          <EmptyState.Title>User Offline</EmptyState.Title>
          <EmptyState.Description>
            This user is currently offline. You can leave a message to notify
            them or try again later.
          </EmptyState.Description>
        </EmptyState.Header>
        <EmptyState.Content>
          <Button size="md" variant="secondary">
            Leave Message
          </Button>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}

export const ProWithAvatarExample = () => <WithAvatarDemo />;
