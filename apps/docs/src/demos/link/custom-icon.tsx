import { Link } from "@thenamespace/uikit";
import {
  ArrowUpRight01Icon,
  Link01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function LinkCustomIcon() {
  return (
    <div className="flex flex-col gap-3">
      <Link href="#">
        External link
        <Link.Icon className="ml-1.5 size-3">
          <HugeiconsIcon icon={ArrowUpRight01Icon} />
        </Link.Icon>
      </Link>
      <Link className="gap-1" href="#">
        Go to page
        <Link.Icon className="size-3">
          <HugeiconsIcon icon={Link01Icon} />
        </Link.Icon>
      </Link>
    </div>
  );
}
