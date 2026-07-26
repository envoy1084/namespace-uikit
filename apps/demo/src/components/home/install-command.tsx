"use client";

import { useEffect, useRef, useState } from "react";

import { Button, Typography } from "@thenamespace/uikit";
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
    <Button
      aria-label={`Copy ${installCommand}`}
      className="mt-8 flex min-h-14 w-full max-w-[30rem] justify-between rounded-xl border-[#535353] bg-[#292929] px-4 text-white shadow-none hover:border-[#8c8c8c] hover:bg-[#303030]"
      onPress={() => void handleCopy()}
      variant="outline"
    >
      <Typography.Code className="bg-transparent p-0 font-mono text-sm text-white sm:text-[15px]">
        {installCommand}
      </Typography.Code>
      <span className="flex items-center gap-2 text-xs font-semibold text-[#bcbcbc]">
        {isCopied ? "Copied" : "Copy"}
        <HugeiconsIcon
          aria-hidden
          icon={isCopied ? Tick02Icon : Copy01Icon}
          size={16}
        />
      </span>
    </Button>
  );
}
