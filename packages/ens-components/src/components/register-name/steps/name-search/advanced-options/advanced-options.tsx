"use client";

import { Disclosure } from "@thenamespace/uikit";

import { CustomResolverAddress } from "#/components/register-name/steps/name-search/advanced-options/custom-resolver-address";
import { ReferrerAddress } from "#/components/register-name/steps/name-search/advanced-options/referrer-address";

export function AdvancedOptions() {
  return (
    <Disclosure className="border-default mt-4 border-t pt-3">
      <Disclosure.Heading>
        <Disclosure.Trigger className="text-foreground flex w-full items-center bg-transparent px-0 py-1 text-xs font-medium">
          <span>Advanced options</span>
          <Disclosure.Indicator className="text-muted size-4" />
        </Disclosure.Trigger>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="space-y-4 px-0 pt-3 pb-0">
          <ReferrerAddress />
          <CustomResolverAddress />
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}
