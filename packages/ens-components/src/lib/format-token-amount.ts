export interface FormatTokenAmountOptions {
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

/**
 * Formats an atomic token amount without converting it to a JavaScript number.
 */
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  options: FormatTokenAmountOptions = {},
) {
  const maximumFractionDigits = Math.max(
    0,
    Math.trunc(options.maximumFractionDigits ?? decimals),
  );
  const minimumFractionDigits = Math.min(
    maximumFractionDigits,
    Math.max(0, Math.trunc(options.minimumFractionDigits ?? 0)),
  );
  const tokenDecimals = Math.max(0, Math.trunc(decimals));
  const isNegative = amount < 0n;
  let displayAmount = isNegative ? -amount : amount;
  let displayDecimals = tokenDecimals;

  if (tokenDecimals > maximumFractionDigits) {
    const divisor = 10n ** BigInt(tokenDecimals - maximumFractionDigits);
    const remainder = displayAmount % divisor;
    displayAmount /= divisor;

    if (remainder * 2n >= divisor) {
      displayAmount += 1n;
    }

    displayDecimals = maximumFractionDigits;
  }

  const scale = 10n ** BigInt(displayDecimals);
  const integer = displayAmount / scale;
  let fraction =
    displayDecimals === 0
      ? ""
      : (displayAmount % scale).toString().padStart(displayDecimals, "0");

  while (fraction.length > minimumFractionDigits && fraction.endsWith("0")) {
    fraction = fraction.slice(0, -1);
  }

  fraction = fraction.padEnd(minimumFractionDigits, "0");

  return `${isNegative ? "-" : ""}${integer}${fraction === "" ? "" : `.${fraction}`}`;
}
