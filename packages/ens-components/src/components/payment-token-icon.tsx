import type { EnsIconComponent } from "#/icons/get-record-icon";

export interface PaymentTokenIconProps {
  className?: string;
  icon: EnsIconComponent;
  symbol: string;
}

export function PaymentTokenIcon({
  className = "size-5",
  icon: Icon,
  symbol,
}: PaymentTokenIconProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ${className}`}
    >
      <Icon aria-hidden="true" className="size-full" />
      <span className="sr-only">{symbol}</span>
    </span>
  );
}
