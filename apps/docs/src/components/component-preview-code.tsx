import { CodeBlock } from "@/components/codeblock";

export async function ComponentPreviewCode({ code }: { code: string }) {
  return (
    <div className="border-separator relative rounded-b-xl border bg-transparent">
      <CodeBlock code={code} collapsible lang="tsx" showLineNumbers />
    </div>
  );
}
