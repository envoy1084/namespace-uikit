import Image from "next/image";

import { Avatar } from "@thenamespace/uikit";

const SRC = "/assets/avatars/blue.jpg";

export function CustomImageComponent() {
  return (
    <Avatar>
      <Avatar.Image asChild height={40} src={SRC} width={40}>
        <Image alt="John Doe" src={SRC} />
      </Avatar.Image>
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}
