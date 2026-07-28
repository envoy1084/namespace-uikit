"use client";

import type { Address } from "viem";

import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import type {
  NameProfileEditorView,
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  Button,
  Form,
  Spinner,
  Surface,
  Typography,
} from "@thenamespace/uikit";
import { FormProvider } from "react-hook-form";
import { useConnection } from "wagmi";

import { canEditNameProfileRecord } from "#/actions";
import { ProfileDiffScreen } from "#/components/name-profile-editor/diff/diff-screen";
import { EditorHeader } from "#/components/name-profile-editor/editor/header";
import { getProfileSectionError } from "#/components/name-profile-editor/editor/profile-form-resolver";
import {
  canEditDefinition,
  canEditEditorRecord,
  canEditProfileChanges,
  createEditorPermissionRequests,
} from "#/components/name-profile-editor/editor/profile-permissions";
import { recordDefinitions } from "#/components/name-profile-editor/editor/record-definitions";
import { RecordSection } from "#/components/name-profile-editor/editor/record-section";
import { EditorSearch } from "#/components/name-profile-editor/editor/search";
import { EditorSidebar } from "#/components/name-profile-editor/editor/sidebar";
import { useProfileEditorForm } from "#/components/name-profile-editor/editor/use-profile-editor-form";
import { useProfileMedia } from "#/components/name-profile-editor/editor/use-profile-media";
import { emitNameProfileEditorEvent } from "#/components/name-profile-editor/emit-event";
import { useProfileUpdateSubmission } from "#/components/name-profile-editor/submission/use-profile-update-submission";
import { ProfileUpdateSuccess } from "#/components/name-profile-editor/success/profile-update-success";
import { useNameProfilePermissions } from "#/hooks";
import { formatError } from "#/lib";
import { useEnsConfig } from "#/providers";

export function ProfileEditor({
  events,
  initialRecords,
  messages,
  name,
  onConfirmed,
  onDone,
  onPendingChange,
  presentation,
  resetVersion,
  resolverAddress,
  slots,
  uploadImage,
}: {
  events: NameProfileEditorEvents;
  initialRecords: NameProfileFormValues;
  messages: NameProfileEditorMessages;
  name: string;
  onConfirmed: (values: NameProfileFormValues) => void;
  onDone: () => void;
  onPendingChange?: (isPending: boolean) => void;
  presentation: NameProfileEditorPresentation;
  resetVersion: number;
  resolverAddress?: Address | undefined;
  slots: NameProfileEditorSlots;
  uploadImage?: NameProfileImageUpload | undefined;
}) {
  const connection = useConnection();
  const { chain, network } = useEnsConfig();
  const [view, setView] = useState<NameProfileEditorView>("editor");
  const [successfulUpdate, setSuccessfulUpdate] =
    useState<Parameters<typeof ProfileUpdateSuccess>[0]["update"]>();
  const lastPermissionErrorRef = useRef<unknown>(undefined);
  const editor = useProfileEditorForm(initialRecords);
  const media = useProfileMedia({
    appendText: editor.appendText,
    form: editor.form,
    name,
    setActiveSection: editor.setActiveSection,
    uploadImage,
    values: editor.values,
  });
  const permissionRequests = useMemo(
    () => createEditorPermissionRequests(editor.values),
    [editor.values],
  );
  const permissions = useNameProfilePermissions({
    account: connection.address,
    input: name,
    requests: permissionRequests,
    resolverAddress,
  });
  const submission = useProfileUpdateSubmission({
    events,
    name,
    onSuccess: (result) => {
      onConfirmed(result.review.values);
      setSuccessfulUpdate(result);
      setView("success");
    },
    updateLabel: messages.updateLabel,
    ...(onPendingChange === undefined ? {} : { onPendingChange }),
  });

  useEffect(() => {
    setSuccessfulUpdate(undefined);
    setView("editor");
  }, [resetVersion]);

  useEffect(() => {
    if (
      !permissions.isError ||
      permissions.error === lastPermissionErrorRef.current
    ) {
      return;
    }

    lastPermissionErrorRef.current = permissions.error;
    const isResolverError =
      permissions.error === "RESOLVER_NOT_FOUND" ||
      permissions.error === "UNSUPPORTED_RESOLVER" ||
      permissions.error === "INVALID_RESOLVER_ADDRESS";
    emitNameProfileEditorEvent(events.onError, {
      ...(connection.address === undefined
        ? {}
        : { account: connection.address }),
      chainId: chain.id,
      error: permissions.error,
      name,
      network,
      phase: isResolverError ? "resolver" : "permission",
      ...(resolverAddress === undefined ? {} : { resolverAddress }),
    });
  }, [
    chain.id,
    connection.address,
    events.onError,
    name,
    network,
    permissions.error,
    permissions.isError,
    resolverAddress,
  ]);

  const hasConnectedAccount = connection.address !== undefined;
  const isPermissionReady =
    !hasConnectedAccount || permissions.data !== undefined;
  const canEdit = (request: Parameters<typeof canEditNameProfileRecord>[1]) =>
    !hasConnectedAccount || canEditNameProfileRecord(permissions.data, request);

  const disabledDefinitionIds = new Set(
    [...media.uploadingRecords].map((record) => `text:${record}`),
  );
  const disabledRecordIds = new Set<string>();
  if (hasConnectedAccount) {
    for (const definition of recordDefinitions) {
      if (!canEditDefinition(permissions.data, definition)) {
        disabledDefinitionIds.add(definition.id);
      }
    }
    for (const record of editor.records) {
      if (!canEditEditorRecord(permissions.data, record, editor.values)) {
        disabledRecordIds.add(record.id);
      }
    }
  }

  const validationError = getProfileSectionError(
    editor.form.formState.errors,
    editor.activeSection,
  );
  const hasPermissionForChanges =
    !hasConnectedAccount ||
    (editor.review !== undefined &&
      canEditProfileChanges(permissions.data, editor.review.changes));
  const canContinue =
    editor.form.formState.isValid &&
    editor.hasChanges &&
    isPermissionReady &&
    hasPermissionForChanges;
  const permissionMessage = !hasConnectedAccount
    ? undefined
    : permissions.isPending
      ? "Checking record permissions…"
      : permissions.isError
        ? formatError(permissions.error, { name })
        : editor.review !== undefined && !hasPermissionForChanges
          ? "This wallet does not have permission to update one or more changed records."
          : undefined;

  if (view === "success" && successfulUpdate !== undefined) {
    return (
      <ProfileUpdateSuccess
        messages={messages}
        name={name}
        presentation={presentation}
        slots={slots}
        update={successfulUpdate}
        onDone={onDone}
      />
    );
  }

  if (view === "diff" && editor.review !== undefined) {
    const resolvedResolverAddress = permissions.data?.resolverAddress;
    const isUpdateAllowed =
      !hasConnectedAccount ||
      (resolvedResolverAddress !== undefined && hasPermissionForChanges);

    return (
      <ProfileDiffScreen
        changes={editor.review.changes}
        error={
          submission.error ??
          (hasConnectedAccount && permissions.isError
            ? permissions.error
            : undefined)
        }
        isConfirming={submission.isConfirming}
        isPending={submission.isPending}
        isTransactionConfirmed={submission.isTransactionConfirmed}
        isUpdateAllowed={isUpdateAllowed}
        isWalletConnected={submission.isWalletConnected}
        buttonLabel={submission.buttonLabel}
        messages={messages}
        name={name}
        presentation={presentation}
        slots={slots}
        transactionHash={submission.transactionHash}
        onBack={() => setView("editor")}
        onUpdate={() => {
          if (resolvedResolverAddress !== undefined) {
            void submission.handleUpdate(
              editor.review as NonNullable<typeof editor.review>,
              resolvedResolverAddress,
            );
          }
        }}
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
            avatarPlaceholder={slots.avatarPlaceholder}
            avatarUrl={media.avatarUrl}
            headerPlaceholder={slots.headerPlaceholder}
            headerUrl={media.headerUrl}
            isAvatarDisabled={!canEdit({ key: "avatar", type: "text" })}
            isAvatarUploading={media.uploadingRecords.has("avatar")}
            isHeaderDisabled={!canEdit({ key: "header", type: "text" })}
            isHeaderUploading={media.uploadingRecords.has("header")}
            onAvatarPress={() => media.requestMedia("avatar")}
            onHeaderPress={() => media.requestMedia("header")}
          />
          <Surface
            className="border-default m-3 min-h-84 rounded-2xl border p-3 shadow-xs"
            variant="transparent"
          >
            <div className="flex flex-col gap-2">
              <EditorSearch
                placeholder={messages.searchPlaceholder}
                value={editor.search}
                onChange={editor.setSearch}
              />
              <div className="flex min-h-84 items-start gap-3">
                <EditorSidebar
                  value={editor.activeSection}
                  onChange={editor.setActiveSection}
                />
                <div className="max-h-84 min-w-0 flex-1 overflow-y-auto pr-1">
                  <RecordSection
                    disabledDefinitionIds={disabledDefinitionIds}
                    disabledRecordIds={disabledRecordIds}
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
            {permissionMessage === undefined ? null : (
              <div className="mt-2 flex min-h-5 items-center justify-center gap-2">
                {permissions.isPending ? (
                  <Spinner className="size-3" size="sm" />
                ) : null}
                <Typography.Paragraph
                  className={
                    permissions.isError || !hasPermissionForChanges
                      ? "text-danger text-center"
                      : "text-center"
                  }
                  size="xs"
                  {...(permissions.isError || !hasPermissionForChanges
                    ? { role: "alert" }
                    : { color: "muted" })}
                >
                  {permissionMessage}
                </Typography.Paragraph>
              </div>
            )}
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
