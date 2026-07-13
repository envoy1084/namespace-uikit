"use client";

// @demo-title Default
import { CodeBlock } from "@thenamespace/uikit";

const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Namespace UIKit"));`;

export const DemoDefaultExample = () => (
  <div className="w-[480px]">
    <CodeBlock>
      <CodeBlock.Header>
        <span className="text-muted text-xs uppercase">typescript</span>
        <CodeBlock.CopyButton code={code} />
      </CodeBlock.Header>
      <CodeBlock.Code code={code} language="typescript" />
    </CodeBlock>
  </div>
);
