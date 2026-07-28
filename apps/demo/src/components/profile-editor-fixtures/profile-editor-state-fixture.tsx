import type {
  ProfileFixturePresentation,
  ProfileFixtureState,
} from "@/components/profile-editor-fixtures/fixtures";

import { Modal, Surface } from "@thenamespace/uikit";

import { DEFAULT_NAME_PROFILE_EDITOR_MESSAGES } from "#/components/name-profile-editor/customization";
import { ProfileDiffScreen } from "#/components/name-profile-editor/diff/diff-screen";
import { ProfileUpdateSuccess } from "#/components/name-profile-editor/success/profile-update-success";
import {
  fixtureChanges,
  fixtureName,
  fixtureSuccess,
  fixtureTransactionHash,
} from "@/components/profile-editor-fixtures/fixtures";

function FixtureScreen({
  presentation,
  state,
}: {
  presentation: ProfileFixturePresentation;
  state: ProfileFixtureState;
}) {
  if (state === "success") {
    return (
      <ProfileUpdateSuccess
        messages={DEFAULT_NAME_PROFILE_EDITOR_MESSAGES}
        name={fixtureName}
        presentation={presentation}
        slots={{}}
        update={fixtureSuccess}
        onDone={() => undefined}
      />
    );
  }

  const isConfirming = state === "confirming";

  return (
    <ProfileDiffScreen
      buttonLabel="Update"
      changes={fixtureChanges}
      error={state === "error" ? "TRANSACTION_REJECTED" : undefined}
      isConfirming={isConfirming}
      isPending={isConfirming}
      isTransactionConfirmed={false}
      isUpdateAllowed
      isWalletConnected
      messages={DEFAULT_NAME_PROFILE_EDITOR_MESSAGES}
      name={fixtureName}
      presentation={presentation}
      slots={{}}
      transactionHash={isConfirming ? fixtureTransactionHash : undefined}
      onBack={() => undefined}
      onUpdate={() => undefined}
    />
  );
}

export function ProfileEditorStateFixture({
  isDialogOpen,
  presentation,
  state,
  onDialogOpenChange,
}: {
  isDialogOpen: boolean;
  presentation: ProfileFixturePresentation;
  state: ProfileFixtureState;
  onDialogOpenChange: (isOpen: boolean) => void;
}) {
  if (presentation === "inline") {
    return (
      <Surface className="w-full max-w-md rounded-3xl">
        <FixtureScreen presentation="inline" state={state} />
      </Surface>
    );
  }

  return (
    <Modal isOpen={isDialogOpen} onOpenChange={onDialogOpenChange}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog
            aria-label={`${state} profile editor fixture`}
            className="p-0"
          >
            <Modal.CloseTrigger className="bg-background text-foreground z-20 size-8 shadow-sm" />
            <FixtureScreen presentation="dialog" state={state} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
