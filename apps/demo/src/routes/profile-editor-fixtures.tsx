import { createFileRoute } from "@tanstack/react-router";

import { ProfileEditorFixtures } from "@/components/profile-editor-fixtures/profile-editor-fixtures";

export const Route = createFileRoute("/profile-editor-fixtures")({
  component: ProfileEditorFixtures,
});
