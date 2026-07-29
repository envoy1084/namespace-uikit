"use client";

// @demo-title With Avatar
import { EmptyState } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Badge } from "@thenamespace/uikit/badge";
import { Button } from "@thenamespace/uikit/button";

function WithAvatarDemo() {
  return (
    <div className="w-[420px]">
      <EmptyState>
        <EmptyState.Header>
          <EmptyState.Media>
            <Badge.Anchor>
              <Avatar className="size-12">
                <Avatar.Image alt="John Doe" src="/assets/avatars/blue.jpg" />
                <Avatar.Fallback>JD</Avatar.Fallback>
              </Avatar>
              <Badge
                className="right-1 bottom-0.5 size-3 min-h-3 min-w-3"
                color="danger"
                placement="bottom-right"
                size="sm"
              />
            </Badge.Anchor>
          </EmptyState.Media>
          <EmptyState.Title>User Offline</EmptyState.Title>
          <EmptyState.Description>
            This user is currently offline. You can leave a message to notify them or try again
            later.
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

export const DemoWithAvatarExample = () => <WithAvatarDemo />;
