import { Button, Typography } from "@thenamespace/uikit";

const RegistrationSuccessGraphic = new URL(
  "../../../../assets/register-ens-success.svg",
  import.meta.url,
);

export interface RegistrationSuccessProps {
  name: string;
  onDone: () => void;
}

export function RegistrationSuccess({
  name,
  onDone,
}: RegistrationSuccessProps) {
  return (
    <div className="flex flex-col items-center px-4 py-6 text-center">
      <img
        alt=""
        className="h-auto w-full max-w-48"
        src={RegistrationSuccessGraphic.href}
      />
      <Typography.Heading className="mt-5 text-xl font-semibold" level={3}>
        Registration successful
      </Typography.Heading>
      <Typography.Paragraph className="mt-2" color="muted" size="sm">
        {name} is now registered to your wallet.
      </Typography.Paragraph>
      <Button className="mt-8 w-full" slot="close" onPress={onDone}>
        Done
      </Button>
    </div>
  );
}
