"use client";

import { useEffect, useRef, useState } from "react";

import { Button, ButtonGroup } from "@thenamespace/uikit";
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
    <ButtonGroup className="mt-8 w-full max-w-[30rem]" fullWidth size="lg">
      <Button
        aria-label={`Copy ${installCommand}`}
        onPress={() => void handleCopy()}
      >
        <span className="truncate font-mono text-sm sm:text-[15px]">
          {installCommand}
        </span>
      </Button>
      <Button
        aria-label={`${isCopied ? "Copied" : "Copy"} ${installCommand}`}
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
