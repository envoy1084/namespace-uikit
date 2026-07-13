import { Avatar } from "@thenamespace/uikit";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4">
      {/* Custom size with Tailwind classes */}
      <Avatar className="size-16">
        <Avatar.Image alt="Extra Large" src="/assets/avatars/blue.jpg" />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>

      {/* Square avatar */}
      <Avatar className="rounded-lg">
        <Avatar.Image alt="Square Avatar" src="/assets/avatars/purple.jpg" />
        <Avatar.Fallback className="rounded-lg">SQ</Avatar.Fallback>
      </Avatar>

      {/* Gradient border */}
      <Avatar className="bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5">
        <div className="bg-background size-full rounded-full p-0.5">
          <Avatar.Image
            alt="Gradient Border"
            className="rounded-full"
            src="/assets/avatars/red.jpg"
          />
          <Avatar.Fallback className="border-none">GB</Avatar.Fallback>
        </div>
      </Avatar>

      {/* Status indicator */}
      <div className="relative">
        <Avatar>
          <Avatar.Image alt="Online User" src="/assets/avatars/orange.jpg" />
          <Avatar.Fallback>ON</Avatar.Fallback>
        </Avatar>
        <span className="ring-background absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2" />
      </div>
    </div>
  );
}
