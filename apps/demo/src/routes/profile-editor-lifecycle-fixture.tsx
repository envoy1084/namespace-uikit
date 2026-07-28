import { createFileRoute } from "@tanstack/react-router";

import { ProfileEditorLifecycleFixture } from "@/components/profile-editor-fixtures/profile-editor-lifecycle-fixture";

export const Route = createFileRoute("/profile-editor-lifecycle-fixture")({
  component: ProfileEditorLifecycleFixture,
});
