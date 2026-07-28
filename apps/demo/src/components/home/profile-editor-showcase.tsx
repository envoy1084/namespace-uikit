import type { NameProfileFormValues } from "ens-components";

import { useState } from "react";

import {
  Button,
  Input,
  Label,
  TextField,
  Typography,
} from "@thenamespace/uikit";
import { ArrowUpRight01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { NameProfileEditor } from "ens-components";

import { SectionLabel } from "@/components/home/section-label";

const DEMO_PROFILE: NameProfileFormValues = {
  abi: [],
  addresses: [],
  contenthash: "",
  data: [],
  interfaces: [],
  name: "",
  pubkey: { x: "", y: "" },
  text: [],
};

function formatDemoName(value: string): string {
  const name = value.trim() || "achilles";
  return name.includes(".") ? name : `${name}.eth`;
}

async function uploadDemoProfileImage(file: File): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return URL.createObjectURL(file);
}

export function ProfileEditorShowcase() {
  const [nameInput, setNameInput] = useState("achilles");
  const name = formatDemoName(nameInput);

  return (
    <section
      aria-labelledby="profile-editor-title"
      className="mx-auto grid max-w-7xl scroll-mt-24 items-start gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(16.25rem,0.68fr)_minmax(38rem,1fr)] lg:gap-16 lg:px-12 lg:py-30"
      id="profile-editor-demo"
    >
      <div className="lg:sticky lg:top-28 lg:pt-6">
        <SectionLabel>In development</SectionLabel>
        <Typography.Heading
          className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
          id="profile-editor-title"
          level={2}
        >
          Profile records.
        </Typography.Heading>
        <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
          Compose profile, social, address, and website records before sending
          an update.
        </Typography.Paragraph>

        <TextField
          fullWidth
          className="mt-7"
          value={nameInput}
          onChange={setNameInput}
        >
          <Label className="text-sm">ENS name</Label>
          <Input
            className="mt-2 ring-inset"
            placeholder="richard"
            variant="secondary"
          />
        </TextField>

        <NameProfileEditor
          initialRecords={DEMO_PROFILE}
          name={name}
          uploadImage={uploadDemoProfileImage}
          slots={{
            trigger: (
              <Button className="mt-4" size="lg">
                Open dialog demo
                <HugeiconsIcon
                  aria-hidden
                  icon={ArrowUpRight01Icon}
                  size={18}
                />
              </Button>
            ),
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-md">
        <NameProfileEditor
          initialRecords={DEMO_PROFILE}
          name={name}
          presentation="inline"
        />
      </div>
    </section>
  );
}
