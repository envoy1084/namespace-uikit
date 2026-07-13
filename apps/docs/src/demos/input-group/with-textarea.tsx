"use client";

import { useState } from "react";

import {
  Button,
  InputGroup,
  Kbd,
  Spinner,
  TextField,
  Tooltip,
} from "@thenamespace/uikit";
import {
  ArrowUp01Icon,
  AtIcon,
  Mic01Icon,
  Plug01Icon,
  Add01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function WithTextArea() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setValue("");
    }, 1000);
  };

  return (
    <TextField
      fullWidth
      aria-label="Prompt input"
      className="flex w-sm flex-col sm:w-lg"
      name="prompt"
    >
      <InputGroup fullWidth className="flex flex-col gap-2 rounded-3xl py-2">
        <InputGroup.Prefix className="px-3 py-0">
          <Button aria-label="Add context" size="sm" variant="outline">
            <HugeiconsIcon icon={AtIcon} />
            Add Context
          </Button>
        </InputGroup.Prefix>
        <InputGroup.TextArea
          className="w-full resize-none px-3.5 py-0"
          placeholder="Assign tasks or ask anything..."
          rows={5}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <InputGroup.Suffix className="flex w-full items-center gap-1.5 px-3 py-0">
          <Tooltip delay={0}>
            <Button
              isIconOnly
              aria-label="Attach file"
              size="sm"
              variant="tertiary"
            >
              <HugeiconsIcon icon={Add01Icon} />
            </Button>
            <Tooltip.Content>
              <p className="text-xs">Add a files and more</p>
            </Tooltip.Content>
          </Tooltip>
          <Tooltip delay={0}>
            <Button
              isIconOnly
              aria-label="Connect Apps"
              size="sm"
              variant="tertiary"
            >
              <HugeiconsIcon icon={Plug01Icon} />
            </Button>
            <Tooltip.Content>
              <p className="text-xs">Connect apps</p>
            </Tooltip.Content>
          </Tooltip>
          <div className="ml-auto flex items-center gap-1.5">
            <Tooltip delay={0}>
              <Button
                isIconOnly
                aria-label="Voice input"
                size="sm"
                variant="ghost"
              >
                <HugeiconsIcon icon={Mic01Icon} />
              </Button>
              <Tooltip.Content>
                <p className="text-xs">Voice input</p>
              </Tooltip.Content>
            </Tooltip>
            <Tooltip delay={0}>
              <Button
                isIconOnly
                aria-label="Send prompt"
                isDisabled={!value.trim()}
                isPending={isSubmitting}
                onPress={handleSubmit}
              >
                {({ isPending }) =>
                  isPending ? (
                    <Spinner color="current" size="sm" />
                  ) : (
                    <HugeiconsIcon icon={ArrowUp01Icon} />
                  )
                }
              </Button>
              <Tooltip.Content className="flex items-center gap-1">
                <p className="text-xs">Send</p>
                <Kbd className="h-4 rounded-sm px-1">
                  <Kbd.Abbr keyValue="enter" />
                </Kbd>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
