"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { Button, Form, Surface, Typography } from "@thenamespace/uikit";
import { FormProvider } from "react-hook-form";
import type { Address } from "viem";
import { useConnection } from "wagmi";

import { emitComponentEvent } from "#/components/emit-event";
import type {
  NameProfileEditorMessages,
  NameProfileEditorPresentation,
  NameProfileEditorSlots,
} from "#/components/name-profile-editor/customization";
import { ProfileDiffScreen } from "#/components/name-profile-editor/diff/diff-screen";
import { EditorHeader } from "#/components/name-profile-editor/editor/header";
import {
  canEditProfileChanges,
  createEditorPermissionRequests,
} from "#/components/name-profile-editor/editor/profile-permissions";
import { RecordSection } from "#/components/name-profile-editor/editor/record-section";
import { EditorSearch } from "#/components/name-profile-editor/editor/search";
import { EditorSidebar } from "#/components/name-profile-editor/editor/sidebar";
import type { RecordDefinition } from "#/components/name-profile-editor/editor/types";
import { useProfileEditorForm } from "#/components/name-profile-editor/editor/use-profile-editor-form";
import { useProfileMedia } from "#/components/name-profile-editor/editor/use-profile-media";
import type { NameProfileEditorEvents } from "#/components/name-profile-editor/events";
import type { ProfileUpdateSubmissionSuccess } from "#/components/name-profile-editor/submission/profile-update-submission";
import { useProfileUpdateSubmission } from "#/components/name-profile-editor/submission/use-profile-update-submission";
import { ProfileUpdateSuccess } from "#/components/name-profile-editor/success/profile-update-success";
import type {
  NameProfileEditorView,
  NameProfileFormValues,
  NameProfileImageUpload,
} from "#/components/name-profile-editor/types";
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
  const { chain } = useEnsConfig();
  const continueStatusId = useId();
  const [view, setView] = useState<NameProfileEditorView>("editor");
  const [successfulUpdate, setSuccessfulUpdate] =
    useState<Parameters<typeof ProfileUpdateSuccess>[0]["update"]>();
  const lastPermissionErrorRef = useRef<unknown>(undefined);
  const editor = useProfileEditorForm(initialRecords, resetVersion);
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
  const handleUpdateSuccess = useCallback(
    (result: ProfileUpdateSubmissionSuccess) => {
      onConfirmed(result.review.values);
      setSuccessfulUpdate(result);
      setView("success");
    },
    [onConfirmed],
  );
  const submission = useProfileUpdateSubmission({
    events,
    messages,
    name,
    onSuccess: handleUpdateSuccess,
    ...(onPendingChange === undefined ? {} : { onPendingChange }),
  });

  useEffect(() => {
    setSuccessfulUpdate(undefined);
    setView("editor");
  }, [resetVersion]);

  useEffect(() => {
    if (!permissions.isError || permissions.error === lastPermissionErrorRef.current) {
      return;
    }

    lastPermissionErrorRef.current = permissions.error;
    const isResolverError =
      permissions.error === "RESOLVER_NOT_FOUND" ||
      permissions.error === "UNSUPPORTED_RESOLVER" ||
      permissions.error === "INVALID_RESOLVER_ADDRESS";
    emitComponentEvent(events.onError, {
      ...(connection.address === undefined ? {} : { account: connection.address }),
      chainId: chain.id,
      error: permissions.error,
      name,
      phase: isResolverError ? "resolver" : "permission",
      ...(resolverAddress === undefined ? {} : { resolverAddress }),
    });
  }, [
    chain.id,
    connection.address,
    events.onError,
    name,
    permissions.error,
    permissions.isError,
    resolverAddress,
  ]);

  const hasConnectedAccount = connection.address !== undefined;
  const isPermissionReady =
    hasConnectedAccount &&
    !permissions.isPending &&
    !permissions.isError &&
    permissions.data !== undefined;

  const disabledDefinitionIds = new Set(
    [...media.uploadingRecords].map((record) => `text:${record}`),
  );

  const hasPermissionForChanges =
    hasConnectedAccount &&
    editor.review !== undefined &&
    permissions.data !== undefined &&
    canEditProfileChanges(permissions.data, editor.review.changes);
  const canContinue =
    hasConnectedAccount &&
    editor.form.formState.isValid &&
    editor.hasChanges &&
    isPermissionReady &&
    hasPermissionForChanges;
  const continueLabel = !hasConnectedAccount
    ? messages.connectWalletLabel
    : permissions.isPending || (!permissions.isError && permissions.data === undefined)
      ? messages.checkingAccessLabel
      : permissions.isError || (editor.review !== undefined && !hasPermissionForChanges)
        ? messages.noPermissionLabel
        : messages.nextLabel;
  const handleBack = useCallback(() => setView("editor"), []);
  const handleUpdate = useCallback(() => {
    void (async () => {
      const refreshed = await permissions.refetch();
      const refreshedPermissions = refreshed.data;
      if (
        refreshedPermissions === undefined ||
        !canEditProfileChanges(refreshedPermissions, editor.review?.changes ?? [])
      ) {
        return;
      }

      await submission.handleUpdate(
        editor.review as NonNullable<typeof editor.review>,
        refreshedPermissions.resolverAddress,
      );
    })();
  }, [editor.review, permissions, submission]);
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (!canContinue) {
        event.preventDefault();
        return;
      }
      void editor.form.handleSubmit(() => setView("diff"))(event);
    },
    [canContinue, editor.form],
  );
  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      void media.uploadMedia("avatar", event);
    },
    [media],
  );
  const handleHeaderChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      void media.uploadMedia("header", event);
    },
    [media],
  );
  const handleAvatarPress = useCallback(() => {
    media.requestMedia("avatar");
  }, [media]);
  const handleHeaderPress = useCallback(() => {
    media.requestMedia("header");
  }, [media]);
  const handleAddRecord = useCallback(
    (definition: RecordDefinition) => {
      editor.addRecord(definition, media.requestMedia);
    },
    [editor, media.requestMedia],
  );

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
      hasConnectedAccount &&
      !permissions.isFetching &&
      resolvedResolverAddress !== undefined &&
      hasPermissionForChanges;

    return (
      <ProfileDiffScreen
        changes={editor.review.changes}
        error={
          submission.error ??
          (hasConnectedAccount && permissions.isError ? permissions.error : undefined)
        }
        isConfirming={submission.isConfirming}
        isPending={submission.isPending || permissions.isFetching}
        isTransactionConfirmed={submission.isTransactionConfirmed}
        isUpdateAllowed={isUpdateAllowed}
        isWalletConnected={submission.isWalletConnected}
        buttonLabel={submission.buttonLabel}
        messages={messages}
        name={name}
        presentation={presentation}
        slots={slots}
        transactionHash={submission.transactionHash}
        onBack={handleBack}
        onUpdate={handleUpdate}
      />
    );
  }

  return (
    <FormProvider {...editor.form}>
      <Form className="w-full" onSubmit={handleSubmit}>
        <input
          ref={media.avatarInput}
          accept="image/*"
          aria-hidden="true"
          className="hidden"
          tabIndex={-1}
          type="file"
          onChange={handleAvatarChange}
        />
        <input
          ref={media.headerInput}
          accept="image/*"
          aria-hidden="true"
          className="hidden"
          tabIndex={-1}
          type="file"
          onChange={handleHeaderChange}
        />

        <div className="w-full">
          <EditorHeader
            addAvatarLabel={messages.addAvatarLabel}
            addHeaderLabel={messages.addHeaderLabel}
            avatarPlaceholder={slots.avatarPlaceholder}
            avatarUrl={media.avatarUrl}
            editAvatarLabel={messages.editAvatarLabel}
            editHeaderLabel={messages.editHeaderLabel}
            headerPlaceholder={slots.headerPlaceholder}
            headerUrl={media.headerUrl}
            isAvatarUploading={media.uploadingRecords.has("avatar")}
            isHeaderUploading={media.uploadingRecords.has("header")}
            sectionLabel={messages.profileMediaLabel}
            onAvatarPress={handleAvatarPress}
            onHeaderPress={handleHeaderPress}
          />
          <Surface
            className="border-default m-3 min-h-84 rounded-2xl border p-3 shadow-xs"
            variant="transparent"
          >
            <div className="flex flex-col gap-2">
              <EditorSearch
                label={messages.searchLabel}
                placeholder={messages.searchPlaceholder}
                value={editor.search}
                onChange={editor.setSearch}
              />
              <div className="flex min-h-84 items-start gap-3 max-[420px]:flex-col">
                <EditorSidebar
                  label={messages.profileSectionsLabel}
                  value={editor.activeSection}
                  onChange={editor.setActiveSection}
                />
                <div className="max-h-84 min-w-0 flex-1 overflow-y-auto px-1 max-[420px]:w-full">
                  <RecordSection
                    disabledDefinitionIds={disabledDefinitionIds}
                    emptyLabel={messages.noMatchingRecordsLabel}
                    error={
                      editor.activeSection === "general" && media.uploadError
                        ? media.uploadError
                        : undefined
                    }
                    records={editor.records}
                    search={editor.search}
                    section={editor.activeSection}
                    onAdd={handleAddRecord}
                    onRemove={editor.removeRecord}
                  />
                </div>
              </div>
            </div>
          </Surface>
          <div className="px-3 pb-3">
            <Button
              aria-describedby={continueStatusId}
              className="w-full"
              isDisabled={!canContinue}
              type="submit"
            >
              {continueLabel}
            </Button>
            <span aria-live="polite" className="sr-only" id={continueStatusId}>
              {continueLabel}
            </span>
            {permissions.isError ? (
              <Typography.Paragraph
                className="text-danger mx-auto mt-2 text-center"
                role="alert"
                size="xs"
              >
                {formatError(permissions.error, { name })}
              </Typography.Paragraph>
            ) : null}
          </div>
        </div>
      </Form>
    </FormProvider>
  );
}
