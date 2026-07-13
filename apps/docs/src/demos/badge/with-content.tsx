import { Avatar, Badge } from "@thenamespace/uikit";
import { Notification01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

const AVATAR_URL = "/assets/avatars/green.jpg";

export function BadgeWithContent() {
  return (
    <div className="flex items-center gap-6">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          5
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          New
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          99+
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="accent" size="sm">
          <HugeiconsIcon icon={Notification01Icon} className="size-2.5" />
        </Badge>
      </Badge.Anchor>
    </div>
  );
}
