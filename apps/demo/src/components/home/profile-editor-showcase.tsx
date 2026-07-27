import type { NameProfileFormValues } from "ens-components";

import { useState } from "react";

import { Typography } from "@thenamespace/uikit";
import { NameProfileEditor } from "ens-components";

import { SectionLabel } from "@/components/home/section-label";

const DEMO_PROFILE: NameProfileFormValues = {
  abi: [],
  addresses: [
    {
      coinType: "60",
      value: "0x00A2895816e64F152FF81c8A931DC1bd9F5c3ce3",
    },
  ],
  contenthash: "",
  data: [],
  interfaces: [],
  name: "",
  pubkey: { x: "", y: "" },
  text: [
    { key: "name", value: "Achilles" },
    {
      key: "description",
      value: "Building useful identity tools for the open web.",
    },
    { key: "com.github", value: "thenamespace" },
  ],
};

export function ProfileEditorShowcase() {
  const [changeCount, setChangeCount] = useState(0);

  return (
    <section
      aria-labelledby="profile-editor-title"
      className="border-t border-[#dedede] bg-[#f4f4f4]"
    >
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-30">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>In development</SectionLabel>
          <Typography.Heading
            className="mt-4 text-[clamp(2.4rem,4vw,4.6rem)] leading-[1.06] font-semibold tracking-[-0.04em] text-balance"
            id="profile-editor-title"
            level={2}
          >
            Profile records.
          </Typography.Heading>
          <Typography.Paragraph className="mt-6 max-w-lg text-[17px] leading-[1.6] text-[#666]">
            A focused editor for profile, social, address, website, and advanced
            resolver records.
          </Typography.Paragraph>
        </div>

        <div className="mx-auto max-w-3xl">
          <NameProfileEditor
            initialRecords={DEMO_PROFILE}
            name="achilles.eth"
            onReview={({ changes }) => setChangeCount(changes.length)}
          />
          {changeCount > 0 && (
            <Typography.Paragraph
              className="mt-3 text-center"
              color="muted"
              size="sm"
            >
              {changeCount} {changeCount === 1 ? "change" : "changes"} ready for
              review.
            </Typography.Paragraph>
          )}
        </div>
      </div>
    </section>
  );
}
