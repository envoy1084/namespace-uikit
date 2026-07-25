"use client";

import { InputGroup } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

import { useRegisterName } from "../context";

export const NameSearchStep = () => {
  const { input, setInput } = useRegisterName();

  return (
    <div>
      <InputGroup className="w-full" variant="secondary">
        <InputGroup.Prefix>
          <Icon icon={Search01Icon} className="text-muted size-4" />
        </InputGroup.Prefix>
        <InputGroup.Input
          className="w-full"
          placeholder="Search Label, eg- vitalik"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <InputGroup.Suffix>
          <span>.eth</span>
        </InputGroup.Suffix>
      </InputGroup>
    </div>
  );
};
