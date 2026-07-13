import {
  Blocks,
  Book,
  BookOpen,
  Bot,
  Brush,
  Copy,
  FileText,
  Layers,
  Moon,
  Palette,
  PaintBucket,
  Rocket,
} from "lucide-react";

export function createMetaIcon(icon?: string) {
  const className = "size-4";

  if (icon === "book-open") return <BookOpen className={className} />;
  if (icon === "circles-4-diamond") return <Blocks className={className} />;
  if (icon === "book") return <Book className={className} />;
  if (icon === "rocket") return <Rocket className={className} />;
  if (icon === "layers") return <Layers className={className} />;
  if (icon === "bucket-paint") return <PaintBucket className={className} />;
  if (icon === "palette") return <Palette className={className} />;
  if (icon === "moon") return <Moon className={className} />;
  if (icon === "brush") return <Brush className={className} />;
  if (icon === "copy-transparent") return <Copy className={className} />;
  if (icon === "bot") return <Bot className={className} />;
  if (icon) return <FileText className={className} />;

  return undefined;
}
