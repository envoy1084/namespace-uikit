"use client";

import React from "react";

import { Icon } from "@iconify/react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  Separator,
} from "@thenamespace/uikit";
import { QrCodeIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";
import { cn } from "tailwind-variants";

export function Basic() {
  const [expandedKeys, setExpandedKeys] = React.useState(
    new Set<string | number>(["preview"]),
  );

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col gap-4 bg-transparent p-4">
        <DisclosureGroup
          expandedKeys={expandedKeys}
          onExpandedChange={setExpandedKeys}
        >
          <Disclosure aria-label="Preview Namespace UIKit Native" id="preview">
            <Disclosure.Heading>
              <Button
                slot="trigger"
                variant={expandedKeys.has("preview") ? "secondary" : "tertiary"}
                className={cn("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("preview"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <HugeiconsIcon icon={QrCodeIcon} />
                  Preview Namespace UIKit Native
                </div>
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-muted text-sm">
                  Scan this QR code with your camera app to preview the
                  Namespace UIKit native components.
                </p>
                <img
                  alt="Expo Go QR Code"
                  className="aspect-square w-full max-w-54 object-cover"
                  src="/assets/images/qr-code-native.png"
                />
                <p className="text-muted text-sm">
                  Expo must be installed on your device.
                </p>
                <Button className="mt-4" variant="primary">
                  <Icon
                    className="[&_path]:fill-accent-foreground"
                    icon="logos:expo-icon"
                  />
                  Preview on Expo Go
                </Button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
          <Separator className="my-2" />
          <Disclosure id="download">
            <Disclosure.Heading aria-label="Download Namespace UIKit Native">
              <Button
                slot="trigger"
                variant={
                  expandedKeys.has("download") ? "secondary" : "tertiary"
                }
                className={cn("w-full border-none", {
                  "bg-transparent": !expandedKeys.has("download"),
                })}
              >
                <div className="flex w-full items-center justify-start gap-2">
                  <Icon icon="tabler:brand-apple-filled" />
                  Download App
                </div>
                <Disclosure.Indicator className="text-muted" />
              </Button>
            </Disclosure.Heading>
            <Disclosure.Content>
              <Disclosure.Body className="mx-2 flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-muted text-sm">
                  Download the Namespace UIKit native app to explore our mobile
                  components directly on your device.
                </p>
                <img
                  alt="App Store QR Code"
                  className="aspect-square w-full max-w-54 object-cover"
                  src="/assets/images/qr-code-native.png"
                />
                <p className="text-muted text-sm">
                  Available on iOS and Android devices.
                </p>
                <Button className="mt-4" variant="primary">
                  <Icon icon="tabler:brand-apple-filled" />
                  Download on App Store
                </Button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure>
        </DisclosureGroup>
      </div>
    </div>
  );
}
