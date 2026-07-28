"use client";

import type {
  ProfileFixturePresentation,
  ProfileFixtureState,
} from "@/components/profile-editor-fixtures/fixtures";

import { useState } from "react";

import { Button, ButtonGroup, Surface, Typography } from "@thenamespace/uikit";

import { ProfileEditorStateFixture } from "@/components/profile-editor-fixtures/profile-editor-state-fixture";

const states: readonly ProfileFixtureState[] = [
  "review",
  "confirming",
  "error",
  "success",
];

const presentations: readonly ProfileFixturePresentation[] = [
  "inline",
  "dialog",
];

function FixtureSelector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  onChange: (value: T) => void;
  options: readonly T[];
  value: T;
}) {
  return (
    <div>
      <Typography.Paragraph className="mb-2" size="xs" weight="medium">
        {label}
      </Typography.Paragraph>
      <ButtonGroup aria-label={label} size="sm" variant="secondary">
        {options.map((option, index) => (
          <Button
            key={option}
            aria-pressed={value === option}
            className="capitalize"
            onPress={() => onChange(option)}
          >
            {index === 0 ? null : <ButtonGroup.Separator />}
            {option}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}

export function ProfileEditorFixtures() {
  const [state, setState] = useState<ProfileFixtureState>("review");
  const [presentation, setPresentation] =
    useState<ProfileFixturePresentation>("inline");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-secondary min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Typography.Heading
          className="text-3xl leading-tight font-medium"
          level={1}
        >
          Profile editor state fixtures
        </Typography.Heading>
        <Typography.Paragraph className="mt-2 max-w-xl" color="muted">
          Demo-only states for visual, responsive, and accessibility review. No
          wallet calls are made.
        </Typography.Paragraph>

        <Surface className="mt-8 flex flex-wrap items-end gap-5 rounded-2xl p-4">
          <FixtureSelector
            label="State"
            options={states}
            value={state}
            onChange={(nextState) => {
              setState(nextState);
              if (presentation === "dialog") setIsDialogOpen(true);
            }}
          />
          <FixtureSelector
            label="Presentation"
            options={presentations}
            value={presentation}
            onChange={(nextPresentation) => {
              setPresentation(nextPresentation);
              setIsDialogOpen(nextPresentation === "dialog");
            }}
          />
          {presentation === "dialog" ? (
            <Button onPress={() => setIsDialogOpen(true)}>Open fixture</Button>
          ) : null}
        </Surface>

        <div className="mt-8 flex justify-center">
          <ProfileEditorStateFixture
            isDialogOpen={isDialogOpen}
            presentation={presentation}
            state={state}
            onDialogOpenChange={setIsDialogOpen}
          />
        </div>
      </div>
    </div>
  );
}
