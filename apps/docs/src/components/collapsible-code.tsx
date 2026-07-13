interface CollapsibleCodeProps {
  className?: string;
  code: string;
  collapsible?: boolean;
  lang?: string;
  showLineNumbers?: boolean;
  title?: string;
}

export function CollapsibleCode({
  className,
  code,
  collapsible = true,
  lang = "tsx",
  title,
}: CollapsibleCodeProps) {
  const content = (
    <pre
      className={`max-h-[36rem] overflow-auto p-4 text-xs ${className ?? ""}`}
    >
      <code data-language={lang}>{code.trim()}</code>
    </pre>
  );

  if (!collapsible) return content;

  return (
    <details className="not-prose border-separator my-6 overflow-hidden rounded-xl border">
      <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
        {title || "View code"}
      </summary>
      <div className="border-separator border-t">{content}</div>
    </details>
  );
}
