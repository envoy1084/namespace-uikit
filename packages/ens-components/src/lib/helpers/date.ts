const LONG_DATE_FORMAT = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatLocalizedDate(value: Date | number): string {
  return LONG_DATE_FORMAT.format(value);
}

export function formatUnixTimestamp(timestamp: bigint): string {
  return formatLocalizedDate(Number(timestamp) * 1_000);
}
