import { Link, Typography } from "@thenamespace/uikit";
import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function HomeFooter() {
  return (
    <footer className="mx-auto grid max-w-7xl items-center gap-6 border-t border-[#bcbcbc] px-5 py-8 text-[#666] sm:px-8 lg:min-h-[108px] lg:grid-cols-[1fr_auto_1fr] lg:px-12">
      <a
        className="flex items-center gap-2.5 font-bold text-[#1f1f1f]"
        href="/"
        aria-label="ENS Components"
      >
        <img
          alt=""
          className="overflow-hidden rounded-lg border border-[#dedede]"
          height="32"
          src="/namespace.svg"
          width="32"
        />
        <span>ENS Components</span>
      </a>
      <Typography.Paragraph
        className="text-left text-[#666] lg:text-center"
        size="xs"
      >
        Built by Namespace.
      </Typography.Paragraph>
      <Link
        className="inline-flex w-fit gap-1.5 justify-self-start font-semibold text-[#1f1f1f] no-underline lg:justify-self-end"
        href="https://github.com/thenamespace/uikit/tree/main/packages/ens-components"
        rel="noreferrer"
        target="_blank"
      >
        GitHub
        <HugeiconsIcon aria-hidden icon={ArrowUpRight01Icon} size={15} />
      </Link>
    </footer>
  );
}
