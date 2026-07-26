"use client";

import { useEffect, useRef, useState } from "react";

import { Button, ButtonGroup, Typography } from "@thenamespace/uikit";
import {
  Copy01Icon,
  HugeiconsIcon,
  Tick02Icon,
} from "@thenamespace/uikit/icons";

const installCommand = "npm install ens-components";

export function InstallCommand() {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimer = useRef<number>(undefined);

  useEffect(
    () => () => {
      window.clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setIsCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setIsCopied(false), 2000);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <ButtonGroup
      className="mt-8 w-full max-w-[30rem]"
      fullWidth
      size="lg"
      variant="outline"
    >
      <Button
        aria-label={`Copy ${installCommand}`}
        className="min-w-0 flex-1 justify-start border-[#535353] bg-[#292929] px-4 text-white shadow-none hover:bg-[#303030]"
        onPress={() => void handleCopy()}
      >
        <Typography.Code className="truncate bg-transparent p-0 font-mono text-sm text-white sm:text-[15px]">
          {installCommand}
        </Typography.Code>
      </Button>
      <Button
        aria-label={`${isCopied ? "Copied" : "Copy"} ${installCommand}`}
        className="border-[#535353] bg-white text-[#1f1f1f] shadow-none hover:bg-[#f4f4f4]"
        isIconOnly
        onPress={() => void handleCopy()}
      >
        <ButtonGroup.Separator />
        <HugeiconsIcon
          aria-hidden
          icon={isCopied ? Tick02Icon : Copy01Icon}
          size={16}
        />
      </Button>
    </ButtonGroup>
  );
}
