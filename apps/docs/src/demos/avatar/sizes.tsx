import { Avatar } from "@thenamespace/uikit";

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image alt="Small Avatar" src="/assets/avatars/blue.jpg" />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Image alt="Medium Avatar" src="/assets/avatars/purple.jpg" />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image alt="Large Avatar" src="/assets/avatars/red.jpg" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    </div>
  );
}
