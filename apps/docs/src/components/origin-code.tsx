"use client";

import { useEffect, useState } from "react";

import { Pre } from "fumadocs-ui/components/codeblock";

import { FumadocsCustomCodeblock } from "@/mdx-components/fumadocs-custom-codeblock";

export function OriginCode({
  path,
  prefix = "",
}: {
  path: `/${string}`;
  prefix?: string;
}) {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const code = `${prefix}${origin}${path}`;

  return (
    <FumadocsCustomCodeblock code={code}>
      <Pre>
        <code>{code}</code>
      </Pre>
    </FumadocsCustomCodeblock>
  );
}
