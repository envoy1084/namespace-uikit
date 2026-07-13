"use client";

import { Link } from "@thenamespace/uikit";

export function CustomRenderFunction() {
  return (
    <Link href="#" render={(props) => <span {...props} data-custom="foo" />}>
      Call to action
      <Link.Icon />
    </Link>
  );
}
