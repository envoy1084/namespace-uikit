import { useEffect, useState } from "react";

import { Button, Input, Label, Spinner, Surface, TextField, Typography } from "@thenamespace/uikit";
import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { formatError, NameProfileEditor } from "ens-components";
import { useNameProfile } from "ens-components/hooks";

import { RegistrationHeaderGraphic, RegistrationSuccessGraphic } from "../component-graphics";
import { SectionLabel } from "./section-label";

const profileGraphics = {
  reviewGraphic: <RegistrationHeaderGraphic />,
  successGraphic: <RegistrationSuccessGraphic />,
};
const profileDialogSlots = {
  ...profileGraphics,
  trigger: (
    <Button className="mt-4" size="lg">
      Open dialog demo
      <HugeiconsIcon aria-hidden icon={ArrowUpRight01Icon} size={18} />
    </Button>
  ),
};

function formatDemoName(value: string): string {
  const name = value.trim();
  if (name.length === 0) return "";
  return name.includes(".") ? name : `${name}.eth`;
}

function useDebouncedValue(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
}

export function ProfileEditorShowcase() {
  const [nameInput, setNameInput] = useState("achilles");
  const debouncedNameInput = useDebouncedValue(nameInput, 400);
  const pendingName = formatDemoName(nameInput);
  const name = formatDemoName(debouncedNameInput);
  const isNamePending = pendingName !== name;
  const profile = useNameProfile({
    input: name,
    query: {
      enabled: name.length > 0,
      staleTime: 30_000,
    },
  });
  const profileData = isNamePending ? undefined : profile.data;
  const isProfileLoading = isNamePending || profile.isFetching;
  const statusMessage =
    pendingName.length === 0
      ? "Enter an ENS name to load its profile."
      : isProfileLoading
        ? `Loading ${pendingName}…`
        : profile.isError
          ? formatError(profile.error, { name: pendingName })
          : `No profile data was found for ${pendingName}.`;

  return (
    <section
      aria-labelledby="profile-editor-title"
      className="mx-auto grid max-w-7xl scroll-mt-24 items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(16.25rem,0.68fr)_minmax(38rem,1fr)] lg:gap-16 lg:px-12 lg:py-30"
      id="name-profile-editor"
    >
      <div className="lg:sticky lg:top-28 lg:pt-6">
        <SectionLabel>Available now</SectionLabel>
        <Typography.Heading
          className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
          id="profile-editor-title"
          level={2}
        >
          Profile records.
        </Typography.Heading>
        <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
          Edit profile, social, address, and website records in one update.
        </Typography.Paragraph>

        <TextField fullWidth className="mt-7" value={nameInput} onChange={setNameInput}>
          <Label className="text-sm">ENS name</Label>
          <Input className="mt-2 ring-inset" placeholder="richard" variant="secondary" />
        </TextField>

        {profileData === undefined ? (
          <Button isDisabled className="mt-4" size="lg">
            {isProfileLoading
              ? "Loading profile"
              : pendingName.length === 0
                ? "Enter an ENS name"
                : "Profile unavailable"}
          </Button>
        ) : (
          <NameProfileEditor
            initialRecords={profileData.records}
            name={profileData.name}
            resolverAddress={profileData.resolverAddress}
            slots={profileDialogSlots}
          />
        )}
      </div>

      <div className="mx-auto w-full max-w-md">
        {profileData === undefined ? (
          <Surface className="flex min-h-[44rem] w-full items-center justify-center rounded-3xl">
            <output
              aria-live="polite"
              className="flex max-w-xs flex-col items-center gap-3 px-6 text-center"
            >
              {isProfileLoading ? <Spinner size="sm" /> : null}
              <Typography.Paragraph color="muted" size="sm">
                {statusMessage}
              </Typography.Paragraph>
            </output>
          </Surface>
        ) : (
          <NameProfileEditor
            initialRecords={profileData.records}
            name={profileData.name}
            presentation="inline"
            resolverAddress={profileData.resolverAddress}
            slots={profileGraphics}
          />
        )}
      </div>
    </section>
  );
}
