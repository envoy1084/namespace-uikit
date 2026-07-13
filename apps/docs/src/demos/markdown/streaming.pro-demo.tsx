"use client";

// @demo-title Streaming
import { useEffect, useState } from "react";

import { Streamdown } from "streamdown";
// oxlint-disable-next-line import/no-unassigned-import
import "streamdown/styles.css";
import { CodeBlock, Markdown } from "@thenamespace/uikit";

const streamingMarkdown = `# Streaming demo

Each token update only re-renders changed markdown blocks.

1. First item
2. Second item
3. Third item

\`\`\`js
console.log("streaming markdown");
\`\`\`
`;

const streamdownMarkdown = `# Streamdown demo

Streamdown repairs incomplete markdown while a response streams, so partially typed blocks stay readable.

- Animated words for newly streamed text
- Built-in caret while the response is active
- Graceful handling for unfinished code fences

\`\`\`tsx
<Streamdown animated caret="block" isAnimating={isStreaming}>
  {response}
</Streamdown>
\`\`\`
`;

function StreamingDemo({ streamdown = false }: { streamdown?: boolean }) {
  const source = streamdown ? streamdownMarkdown : streamingMarkdown;
  const [response, setResponse] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 8;
      setResponse(source.slice(0, index));
      if (index >= source.length) window.clearInterval(timer);
    }, 120);
    return () => window.clearInterval(timer);
  }, [source]);
  if (!streamdown)
    return (
      <div className="w-[640px]">
        <Markdown>{response}</Markdown>
      </div>
    );
  return (
    <div className="w-[640px]">
      <Streamdown
        animated
        caret="block"
        components={{
          code: ({ children, className }) => {
            const language =
              className?.match(/language-(\w+)/)?.[1] ?? "plaintext";
            const code = String(children ?? "").replace(/\n$/, "");
            return (
              <CodeBlock>
                <CodeBlock.Header>
                  <span className="text-muted text-xs uppercase">
                    {language}
                  </span>
                  <CodeBlock.CopyButton code={code} />
                </CodeBlock.Header>
                <CodeBlock.Code code={code} language={language} />
              </CodeBlock>
            );
          },
        }}
        isAnimating
      >
        {response}
      </Streamdown>
    </div>
  );
}

export const ProStreamingExample = () => <StreamingDemo />;
