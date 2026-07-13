import { CodeBlock } from "fumadocs-ui/components/codeblock";

import { ProStoryPreview } from "@/components/pro-story-preview";
import { proStorySources } from "@/generated/pro-story-sources";

export function ProExamples({
  component,
  title,
}: {
  component: string;
  title: string;
}) {
  const identifier = title.replaceAll(/[^A-Za-z0-9_$]/g, "");
  const code = `import {${identifier}} from "@thenamespace/uikit/${component}";`;
  const storySource = proStorySources[component] ?? "";
  const storyNames = [
    ...storySource.matchAll(/^export const ([A-Za-z0-9_$]+)/gm),
  ].map(([, name]) => name);

  return (
    <div className="not-prose my-6 space-y-4">
      {storySource ? (
        <ProStoryPreview code={storySource} component={component} />
      ) : null}
      <div className="border-separator space-y-3 rounded-xl border p-4">
        <p className="font-medium">
          Import the component from its flat package entry point.
        </p>
        <CodeBlock title={`${component}.tsx`}>
          <pre>
            <code>{code}</code>
          </pre>
        </CodeBlock>
        <p className="text-muted text-sm">
          These examples use the same public API, compound parts, variants, and
          CSS classes as the tested UIKit Storybook stories.
        </p>
        {storyNames.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {storyNames.map((name) => (
              <span
                className="bg-default rounded-full px-2.5 py-1 text-xs"
                key={name}
              >
                {name.replaceAll(/([a-z0-9])([A-Z])/g, "$1 $2")}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
