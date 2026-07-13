import type { ComponentResourceLinks } from "@/lib/component-resources";

import { Github } from "lucide-react";

function StorybookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4 text-[#ff4785]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="m16.7 1.1-.1 2.1 1.7-.1.2-2.2c0-.3-.2-.5-.5-.5l-1.3.1v.6ZM4.8 2.2l12.8-.8c.7 0 1.3.5 1.3 1.2l.8 17.7c0 .7-.5 1.3-1.2 1.3l-13.6.8c-.7 0-1.3-.5-1.3-1.2L2.8 3.5c0-.7.5-1.3 1.2-1.3h.8Zm9.8 5.5c0 .5 3.5.3 3.9-.1 0-3.8-2-5.8-5.7-5.8-3.8 0-5.8 2-5.8 5 0 5.3 7.1 5.4 7.1 8.3 0 .8-.4 1.3-1.2 1.3-1 0-1.4-.5-1.3-2.3 0-.4-4-.5-4 0-.5 6.6 9.9 6.6 9.9.5 0-5.6-7.2-5.4-7.2-8 0-1 .7-1.3 1.3-1.3.7 0 1 .4 1 2.4Z" />
    </svg>
  );
}

function ReactAriaIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex size-4 items-center justify-center rounded-full bg-[#6733ff] text-[10px] font-bold text-white"
    >
      A
    </span>
  );
}

function ResourceLink({
  children,
  href,
  icon,
}: {
  children: React.ReactNode;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      className="button button--tertiary button--sm dark:bg-default/70 relative gap-2"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {icon}
      {children}
    </a>
  );
}

export function ComponentLinks({ links }: { links: ComponentResourceLinks }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {links.storybook ? (
        <ResourceLink href={links.storybook} icon={<StorybookIcon />}>
          Storybook
        </ResourceLink>
      ) : null}
      {links.reactAria ? (
        <ResourceLink href={links.reactAria} icon={<ReactAriaIcon />}>
          React Aria
        </ResourceLink>
      ) : null}
      <ResourceLink href={links.source} icon={<Github className="size-4" />}>
        Source
      </ResourceLink>
      {links.styles ? (
        <ResourceLink href={links.styles} icon={<Github className="size-4" />}>
          Styles source
        </ResourceLink>
      ) : null}
    </div>
  );
}
