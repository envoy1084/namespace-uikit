import { Pre } from "fumadocs-ui/components/codeblock";

import { absoluteSiteUrl } from "@/lib/site";
import { FumadocsCustomCodeblock } from "@/mdx-components/fumadocs-custom-codeblock";

export function SiteUrlCode({
  path,
  prefix = "",
}: {
  path: `/${string}`;
  prefix?: string;
}) {
  const code = `${prefix}${absoluteSiteUrl(path)}`;

  return (
    <FumadocsCustomCodeblock code={code}>
      <Pre>
        <code>{code}</code>
      </Pre>
    </FumadocsCustomCodeblock>
  );
}
