"use client";

// @demo-title Default
// oxlint-disable-next-line import/no-unassigned-import
import "streamdown/styles.css";
import { Markdown } from "@thenamespace/uikit";

const markdown = `# Namespace UIKit AI Markdown

This component uses **react-markdown** with block-level memoization for streaming performance.

## Features

- Headings, lists, and links
- Inline \`code\` snippets
- Fenced code blocks with Shiki highlighting

\`\`\`tsx
<ChatMessage.Assistant>
  <ChatMessage.Avatar alt="Assistant" fallback="AI" show />
  <ChatMessage.Body>
    <ChatMessage.Content>
      <Markdown>{response}</Markdown>
    </ChatMessage.Content>
  </ChatMessage.Body>
</ChatMessage.Assistant>
\`\`\`

> AI responses can include rich formatting without coupling to any SDK.
`;

export const ProDefaultExample = () => (
  <div className="w-[640px]">
    <Markdown>{markdown}</Markdown>
  </div>
);
