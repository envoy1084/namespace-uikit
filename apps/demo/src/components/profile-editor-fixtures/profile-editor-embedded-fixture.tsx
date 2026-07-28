"use client";

import type {
  ProfileFixturePresentation,
  ProfileFixtureState,
} from "@/components/profile-editor-fixtures/fixtures";

import { ProfileEditorStateFixture } from "@/components/profile-editor-fixtures/profile-editor-state-fixture";

const validStates = new Set<ProfileFixtureState>([
  "review",
  "confirming",
  "error",
  "success",
]);

function isFixtureState(value: string | null): value is ProfileFixtureState {
  return validStates.has(value as ProfileFixtureState);
}

export function ProfileEditorEmbeddedFixture() {
  const params = new URLSearchParams(window.location.search);
  const stateParam = params.get("state");
  const presentationParam = params.get("presentation");
  const state = isFixtureState(stateParam) ? stateParam : "review";
  const presentation: ProfileFixturePresentation =
    presentationParam === "dialog" ? "dialog" : "inline";

  return (
    <div className="bg-secondary flex min-h-[calc(100vh-4rem)] justify-center p-3">
      <ProfileEditorStateFixture
        isDialogOpen
        presentation={presentation}
        state={state}
        onDialogOpenChange={() => undefined}
      />
    </div>
  );
}
