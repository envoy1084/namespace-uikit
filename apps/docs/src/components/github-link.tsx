import { buttonVariants } from "@thenamespace/uikit";

import { GitHubIcon } from "@/icons/github";

export function GitHubLink() {
  return (
    <a
      aria-label="Namespace UIKit on GitHub"
      className={buttonVariants({
        className: "h-[34px] border-none bg-default/80",
        size: "sm",
        variant: "tertiary",
      })}
      href="https://github.com/thenamespace/uikit"
      rel="noreferrer"
      target="_blank"
    >
      <GitHubIcon />
    </a>
  );
}
