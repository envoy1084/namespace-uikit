import { Blocks, BookOpen, FileText } from "lucide-react";

export function createMetaIcon(icon?: string) {
  const className = "size-4";

  if (icon === "book-open") return <BookOpen className={className} />;
  if (icon === "circles-4-diamond") return <Blocks className={className} />;
  if (icon) return <FileText className={className} />;

  return undefined;
}
