"use client";

import { Button, Modal } from "@thenamespace/uikit";
import {
  HugeiconsIcon,
  type IconSvgElement,
  SparklesIcon,
  Upload01Icon,
} from "@thenamespace/uikit/icons";

const iconMap: Record<string, IconSvgElement> = {
  "hugeicons:arrow-up-from-line": Upload01Icon,
  "hugeicons:sparkles": SparklesIcon,
};

export function CustomAnimations() {
  const animations = [
    {
      classNames: {
        backdrop: [
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:zoom-in-95",
          "data-[entering]:duration-400",
          "data-[entering]:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:zoom-out-95",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.7,0,0.84,0)]",
        ].join(" "),
      },
      description:
        "Physics-based elastic scaling. Simulates a high-damping spring system with fast transient response and prolonged settling time. Ideal for Modals and Popovers.",
      icon: "hugeicons:sparkles",
      name: "Kinematic Scale",
    },
    {
      classNames: {
        backdrop: [
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
        container: [
          "data-[entering]:animate-in",
          "data-[entering]:fade-in-0",
          "data-[entering]:slide-in-from-bottom-4",
          "data-[entering]:duration-500",
          "data-[entering]:ease-[cubic-bezier(0.25,1,0.5,1)]",
          "data-[exiting]:animate-out",
          "data-[exiting]:fade-out-0",
          "data-[exiting]:slide-out-to-bottom-2",
          "data-[exiting]:duration-200",
          "data-[exiting]:ease-[cubic-bezier(0.5,0,0.75,0)]",
        ].join(" "),
      },
      description:
        "Simulates movement through a medium with fluid resistance. Eliminates mechanical linearity for a natural, grounded feel. Perfect for Bottom Sheets or Toasts.",
      icon: "hugeicons:arrow-up-from-line",
      name: "Fluid Slide",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {animations.map(({ classNames, description, icon, name }) => {
        const iconData = iconMap[icon];

        return (
          <Modal key={name}>
            <Button variant="secondary">{name}</Button>
            <Modal.Backdrop className={classNames.backdrop}>
              <Modal.Container className={classNames.container}>
                <Modal.Dialog className="sm:max-w-[360px]">
                  <Modal.CloseTrigger />
                  <Modal.Header>
                    <Modal.Icon className="bg-default text-foreground">
                      {iconData ? (
                        <HugeiconsIcon className="size-5" icon={iconData} />
                      ) : null}
                    </Modal.Icon>
                    <Modal.Heading>{name} Animation</Modal.Heading>
                  </Modal.Header>
                  <Modal.Body>
                    <p className="mt-1">{description}</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button slot="close" variant="tertiary">
                      Close
                    </Button>
                    <Button slot="close">Try Again</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal.Container>
            </Modal.Backdrop>
          </Modal>
        );
      })}
    </div>
  );
}
