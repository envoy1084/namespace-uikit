"use client";

import { Button, Surface } from "@thenamespace/uikit";
import { Add01Icon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function EditorHeader() {
  return (
    <section aria-label="Profile media" className="relative w-full pb-12">
      <Surface
        className="relative h-36 overflow-hidden rounded-2xl p-0"
        variant="secondary"
      >
        <div className="absolute top-4 right-4">
          <Button
            isIconOnly
            aria-label="Add profile header"
            size="lg"
            variant="primary"
          >
            <HugeiconsIcon icon={Add01Icon} size={28} strokeWidth={1.6} />
          </Button>
        </div>
      </Surface>

      <Surface className="absolute top-13 left-1/2 flex size-28 -translate-x-1/2 items-center justify-center rounded-2xl p-4">
        <Button
          isIconOnly
          aria-label="Add profile avatar"
          size="lg"
          variant="secondary"
        >
          <HugeiconsIcon icon={Add01Icon} size={28} strokeWidth={1.6} />
        </Button>
      </Surface>
    </section>
  );
}
