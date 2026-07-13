import {
  Checkbox,
  CheckboxGroup,
  Description,
  Label,
} from "@thenamespace/uikit";
import {
  Comment01Icon,
  HugeiconsIcon,
  Mail01Icon,
  Notification01Icon,
} from "@thenamespace/uikit/icons";
import clsx from "clsx";

export function FeaturesAndAddOns() {
  const addOns = [
    {
      description: "Receive updates via email",
      icon: Mail01Icon,
      title: "Email Notifications",
      value: "email",
    },
    {
      description: "Get instant SMS notifications",
      icon: Comment01Icon,
      title: "SMS Alerts",
      value: "sms",
    },
    {
      description: "Browser and mobile push alerts",
      icon: Notification01Icon,
      title: "Push Notifications",
      value: "push",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center gap-10 px-4 py-8">
      <section className="flex w-full min-w-[320px] flex-col gap-4">
        <CheckboxGroup name="notification-preferences">
          <Label>Notification preferences</Label>
          <Description>Choose how you want to receive updates</Description>
          <div className="flex flex-col gap-2">
            {addOns.map((addon) => (
              <Checkbox
                key={addon.value}
                value={addon.value}
                variant="secondary"
              >
                <Checkbox.Content
                  className={clsx(
                    "group bg-surface relative flex w-full flex-row items-start justify-start gap-4 rounded-3xl px-5 py-4 transition-all",
                    "data-[selected=true]:bg-accent/10",
                  )}
                >
                  <Checkbox.Control className="absolute top-3 right-4 size-5 rounded-full before:rounded-full">
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  <HugeiconsIcon
                    className="text-accent-soft-foreground size-5"
                    icon={addon.icon}
                  />
                  <div className="flex flex-col gap-1">
                    <span>{addon.title}</span>
                    <Description>{addon.description}</Description>
                  </div>
                </Checkbox.Content>
              </Checkbox>
            ))}
          </div>
        </CheckboxGroup>
      </section>
    </div>
  );
}
