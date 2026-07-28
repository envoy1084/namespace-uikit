"use client";

import type { NameProfileRecordChange } from "#/components/name-profile-editor/types";

import { useState } from "react";

import { Accordion, Button, Surface } from "@thenamespace/uikit";
import { ArrowLeft01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

import { createProfileDiffSections } from "#/components/name-profile-editor/diff/diff-records";
import { ProfileDiffSection } from "#/components/name-profile-editor/diff/diff-section";
import {
  ProfileDiffBody,
  ProfileDiffFooter,
  ProfileDiffHeader,
  ProfileDiffHeading,
} from "#/components/name-profile-editor/diff/layout";

const ReviewGraphic = new URL(
  "../../../assets/register-ens-header.svg",
  import.meta.url,
);

export function ProfileDiffScreen({
  changes,
  name,
  onBack,
  presentation,
}: {
  changes: readonly NameProfileRecordChange[];
  name: string;
  onBack: () => void;
  presentation: "dialog" | "inline";
}) {
  const sections = createProfileDiffSections(changes);
  const [expandedKeys, setExpandedKeys] = useState(
    () =>
      new Set<string | number>(
        sections[0] === undefined ? [] : [sections[0].id],
      ),
  );

  return (
    <div className="relative w-full">
      <Button
        isIconOnly
        aria-label="Back to profile editor"
        className="absolute top-4 left-4 z-10"
        size="sm"
        type="button"
        variant="secondary"
        onPress={onBack}
      >
        <HugeiconsIcon aria-hidden icon={ArrowLeft01Icon} />
      </Button>

      <ProfileDiffHeader className="mx-auto" presentation={presentation}>
        <img
          alt=""
          className="mx-auto w-full max-w-64"
          src={ReviewGraphic.href}
        />
        <div>
          <ProfileDiffHeading
            className="mx-auto text-center"
            presentation={presentation}
          >
            Review changes
          </ProfileDiffHeading>
          <p className="text-muted text-center text-sm">
            Review the changes you are about to make to{" "}
            <span className="text-foreground font-medium break-all">
              {name}
            </span>
            .
          </p>
        </div>
      </ProfileDiffHeader>

      <ProfileDiffBody className="mt-2 flex-none" presentation={presentation}>
        <Surface className="mt-2 rounded-2xl p-3" variant="secondary">
          <Accordion
            className="flex flex-col gap-2"
            expandedKeys={expandedKeys}
            onExpandedChange={setExpandedKeys}
          >
            {sections.map((section) => (
              <ProfileDiffSection key={section.id} section={section} />
            ))}
          </Accordion>
        </Surface>
      </ProfileDiffBody>

      <ProfileDiffFooter className="mt-5 flex-col" presentation={presentation}>
        <Button className="w-full" type="button">
          Update
        </Button>
      </ProfileDiffFooter>
    </div>
  );
}
