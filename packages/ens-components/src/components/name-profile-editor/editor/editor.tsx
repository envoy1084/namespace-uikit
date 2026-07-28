"use client";

import type {
  NameProfileEditorView,
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";

import { useState } from "react";

import { Button, Form, Surface } from "@thenamespace/uikit";
import { FormProvider } from "react-hook-form";

import { ProfileDiffScreen } from "#/components/name-profile-editor/diff/diff-screen";
import { EditorHeader } from "#/components/name-profile-editor/editor/header";
import { getProfileSectionError } from "#/components/name-profile-editor/editor/profile-form-resolver";
import { RecordSection } from "#/components/name-profile-editor/editor/record-section";
import { EditorSearch } from "#/components/name-profile-editor/editor/search";
import { EditorSidebar } from "#/components/name-profile-editor/editor/sidebar";
import { useProfileEditorForm } from "#/components/name-profile-editor/editor/use-profile-editor-form";
import { useProfileMedia } from "#/components/name-profile-editor/editor/use-profile-media";

export function ProfileEditor({
  initialRecords,
  name,
  presentation,
  uploadImage,
}: {
  initialRecords: NameProfileFormValues;
  name: string;
  presentation: "dialog" | "inline";
  uploadImage?: NameProfileImageUpload | undefined;
}) {
  const [view, setView] = useState<NameProfileEditorView>("editor");
  const editor = useProfileEditorForm(initialRecords);
  const media = useProfileMedia({
    appendText: editor.appendText,
    form: editor.form,
    name,
    setActiveSection: editor.setActiveSection,
    uploadImage,
    values: editor.values,
  });

  const disabledDefinitionIds = new Set(
    [...media.uploadingRecords].map((record) => `text:${record}`),
  );
  const validationError = getProfileSectionError(
    editor.form.formState.errors,
    editor.activeSection,
  );
  const canContinue = editor.form.formState.isValid && editor.hasChanges;

  if (view === "diff" && editor.review !== undefined) {
    return (
      <ProfileDiffScreen
        changes={editor.review.changes}
        name={name}
        presentation={presentation}
        onBack={() => setView("editor")}
      />
    );
  }

  return (
    <FormProvider {...editor.form}>
      <Form
        className="w-full"
        onSubmit={(event) => {
          void editor.form.handleSubmit(() => setView("diff"))(event);
        }}
      >
        <input
          ref={media.avatarInput}
          accept="image/*"
          aria-hidden="true"
          className="hidden"
          tabIndex={-1}
          type="file"
          onChange={(event) => void media.uploadMedia("avatar", event)}
        />
        <input
          ref={media.headerInput}
          accept="image/*"
          aria-hidden="true"
          className="hidden"
          tabIndex={-1}
          type="file"
          onChange={(event) => void media.uploadMedia("header", event)}
        />

        <div className="w-full">
          <EditorHeader
            avatarUrl={media.avatarUrl}
            headerUrl={media.headerUrl}
            isAvatarUploading={media.uploadingRecords.has("avatar")}
            isHeaderUploading={media.uploadingRecords.has("header")}
            onAvatarPress={() => media.requestMedia("avatar")}
            onHeaderPress={() => media.requestMedia("header")}
          />
          <Surface
            className="border-default m-3 min-h-84 rounded-2xl border p-3 shadow-xs"
            variant="transparent"
          >
            <div className="flex flex-col gap-2">
              <EditorSearch value={editor.search} onChange={editor.setSearch} />
              <div className="flex min-h-84 items-start gap-3">
                <EditorSidebar
                  value={editor.activeSection}
                  onChange={editor.setActiveSection}
                />
                <div className="max-h-84 min-w-0 flex-1 overflow-y-auto pr-1">
                  <RecordSection
                    disabledDefinitionIds={disabledDefinitionIds}
                    error={
                      editor.activeSection === "general" && media.uploadError
                        ? media.uploadError
                        : validationError
                    }
                    records={editor.records}
                    search={editor.search}
                    section={editor.activeSection}
                    onAdd={(definition) =>
                      editor.addRecord(definition, media.requestMedia)
                    }
                    onRemove={editor.removeRecord}
                  />
                </div>
              </div>
            </div>
          </Surface>
          <div className="px-3 pb-3">
            <Button className="w-full" isDisabled={!canContinue} type="submit">
              Next
            </Button>
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
