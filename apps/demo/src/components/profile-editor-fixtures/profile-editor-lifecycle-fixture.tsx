"use client";

import type {
  NameProfileEditorPresentation,
  NameProfileFormValues,
} from "ens-components";

import { useState } from "react";

import { Button, ButtonGroup, Surface, Typography } from "@thenamespace/uikit";
import { NameProfileEditor, emptyNameProfileFormValues } from "ens-components";

const populatedRecords: NameProfileFormValues = {
  ...emptyNameProfileFormValues,
  text: [
    {
      key: "description",
      value: "A decentralized internet made for everyone.",
    },
  ],
};

const resolverAddress = "0x0000000000000000000000000000000000000001";

export function ProfileEditorLifecycleFixture() {
  const [name, setName] = useState("piedpiper.eth");
  const [records, setRecords] = useState<"empty" | "populated">("empty");
  const [resolver, setResolver] = useState<"discover" | "override">("discover");
  const [presentation, setPresentation] =
    useState<NameProfileEditorPresentation>("inline");
  const [renderVersion, setRenderVersion] = useState(0);
  const selectedRecords =
    records === "populated" ? populatedRecords : emptyNameProfileFormValues;
  const clonedRecords: NameProfileFormValues = {
    ...selectedRecords,
    abi: [...selectedRecords.abi],
    addresses: [...selectedRecords.addresses],
    data: [...selectedRecords.data],
    interfaces: [...selectedRecords.interfaces],
    pubkey: { ...selectedRecords.pubkey },
    text: [...selectedRecords.text],
  };

  return (
    <div className="bg-secondary min-h-screen px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Typography.Heading
          className="text-3xl leading-tight font-medium"
          level={1}
        >
          Profile editor lifecycle fixture
        </Typography.Heading>
        <Typography.Paragraph className="mt-2 max-w-xl" color="muted">
          Change inputs without remounting the component, then verify drafts,
          dismissal, and reset behavior.
        </Typography.Paragraph>

        <Surface className="mt-8 flex flex-wrap gap-3 rounded-2xl p-4">
          <ButtonGroup size="sm" variant="secondary">
            <Button
              aria-pressed={name === "piedpiper.eth"}
              onPress={() => setName("piedpiper.eth")}
            >
              Pied Piper
            </Button>
            <Button
              aria-pressed={name === "hooli.eth"}
              onPress={() => setName("hooli.eth")}
            >
              <ButtonGroup.Separator />
              Hooli
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" variant="secondary">
            <Button
              aria-pressed={records === "empty"}
              onPress={() => setRecords("empty")}
            >
              Empty records
            </Button>
            <Button
              aria-pressed={records === "populated"}
              onPress={() => setRecords("populated")}
            >
              <ButtonGroup.Separator />
              Populated records
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" variant="secondary">
            <Button
              aria-pressed={resolver === "discover"}
              onPress={() => setResolver("discover")}
            >
              Discover resolver
            </Button>
            <Button
              aria-pressed={resolver === "override"}
              onPress={() => setResolver("override")}
            >
              <ButtonGroup.Separator />
              Override resolver
            </Button>
          </ButtonGroup>
          <ButtonGroup size="sm" variant="secondary">
            <Button
              aria-pressed={presentation === "inline"}
              onPress={() => setPresentation("inline")}
            >
              Inline
            </Button>
            <Button
              aria-pressed={presentation === "dialog"}
              onPress={() => setPresentation("dialog")}
            >
              <ButtonGroup.Separator />
              Dialog
            </Button>
          </ButtonGroup>
          <Button
            size="sm"
            variant="secondary"
            onPress={() => setRenderVersion((current) => current + 1)}
          >
            Rerender parent ({renderVersion})
          </Button>
        </Surface>

        <div className="mt-8 flex justify-center">
          <NameProfileEditor
            initialRecords={clonedRecords}
            name={name}
            presentation={presentation}
            slots={{ trigger: <Button>Open lifecycle fixture</Button> }}
            {...(resolver === "override" ? { resolverAddress } : {})}
          />
        </div>
      </div>
    </div>
  );
}
