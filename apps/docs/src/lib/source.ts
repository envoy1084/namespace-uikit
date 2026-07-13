import { loader } from "fumadocs-core/source";

import { docs } from "@/.source";
import { createMetaIcon } from "@/lib/meta-icon";

export const source = loader({
  baseUrl: "/docs",
  icon: createMetaIcon,
  source: docs.toFumadocsSource(),
});

export type DocsPage = ReturnType<typeof source.getPages>[number];
