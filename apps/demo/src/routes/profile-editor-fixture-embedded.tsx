import { createFileRoute } from "@tanstack/react-router";

import { ProfileEditorEmbeddedFixture } from "@/components/profile-editor-fixtures/profile-editor-embedded-fixture";

export const Route = createFileRoute("/profile-editor-fixture-embedded")({
  component: ProfileEditorEmbeddedFixture,
});
