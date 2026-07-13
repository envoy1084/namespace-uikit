import { CodeBlock } from "fumadocs-ui/components/codeblock";

export function ProExamples({
  component,
  title,
}: {
  component: string;
  title: string;
}) {
  const identifier = title.replaceAll(/[^A-Za-z0-9_$]/g, "");
  const code = `import {${identifier}} from "@thenamespace/uikit/${component}";`;

  return (
    <div className="not-prose border-separator my-6 space-y-3 rounded-xl border p-4">
      <p className="font-medium">
        Import the component from its flat package entry point.
      </p>
      <CodeBlock title={`${component}.tsx`}>
        <pre>
          <code>{code}</code>
        </pre>
      </CodeBlock>
      <p className="text-muted text-sm">
        The examples below follow the same public API, compound parts, variants,
        and CSS classes as the UIKit Storybook stories.
      </p>
    </div>
  );
}
