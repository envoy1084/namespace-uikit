"use client";

import { useMemo, useState } from "react";

import {
  Button,
  ButtonGroup,
  Description,
  Dropdown,
  Label,
} from "@thenamespace/uikit";
import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  FileText,
} from "lucide-react";

export function PageActions({ markdownUrl }: { markdownUrl: string }) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const items = useMemo(() => {
    const prompt = `Use this Namespace UIKit documentation as the source of truth: ${markdownUrl}`;

    return [
      {
        description: "View this page as clean Markdown",
        href: markdownUrl,
        icon: <FileText className="size-[18px]" />,
        key: "markdown",
        title: "View Markdown",
      },
      {
        description: "Ask ChatGPT about this documentation",
        href: `https://chatgpt.com/?${new URLSearchParams({ hints: "search", q: prompt })}`,
        icon: <Bot className="size-4" />,
        key: "chatgpt",
        title: "Open in ChatGPT",
      },
      {
        description: "Ask Claude about this documentation",
        href: `https://claude.ai/new?${new URLSearchParams({ q: prompt })}`,
        icon: <Bot className="size-4" />,
        key: "claude",
        title: "Open in Claude",
      },
    ];
  }, [markdownUrl]);

  async function copyMarkdown() {
    const response = await fetch(markdownUrl);
    if (!response.ok) throw new Error("Unable to load page Markdown");
    await navigator.clipboard.writeText(await response.text());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ButtonGroup size="md" variant="tertiary">
      <Button onPress={copyMarkdown}>
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Copied" : "Copy Markdown"}
      </Button>
      <Dropdown isOpen={isOpen} onOpenChange={setOpen}>
        <Button
          isIconOnly
          aria-label="More page actions"
          size="md"
          variant="tertiary"
        >
          <ButtonGroup.Separator />
          <ChevronDown
            className={`text-fd-muted-foreground size-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </Button>
        <Dropdown.Popover placement="bottom end">
          <Dropdown.Menu
            onAction={(key) => {
              const item = items.find((entry) => entry.key === key);
              if (item) window.open(item.href, "_blank", "noreferrer noopener");
            }}
          >
            {items.map((item) => (
              <Dropdown.Item
                href={item.href}
                id={item.key}
                key={item.key}
                rel="noreferrer noopener"
                target="_blank"
                textValue={item.title}
              >
                {item.icon}
                <div className="flex w-full flex-col">
                  <Label>{item.title}</Label>
                  <Description>{item.description}</Description>
                </div>
                {item.key !== "markdown" ? (
                  <ExternalLink className="text-foreground/70 size-3.5" />
                ) : null}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </ButtonGroup>
  );
}
