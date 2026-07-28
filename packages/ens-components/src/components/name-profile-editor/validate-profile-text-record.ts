import { err, ok, type Result } from "neverthrow";

export type ProfileTextRecordValidationError =
  | "INVALID_EMAIL"
  | "INVALID_IMAGE_URL"
  | "INVALID_TIMEZONE"
  | "INVALID_URL";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;
const IMAGE_URI_PROTOCOLS = new Set([
  "data:",
  "eip155:",
  "http:",
  "https:",
  "ipfs:",
  "ipns:",
]);

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      url.hostname.length > 0
    );
  } catch {
    return false;
  }
}

function isImageUri(value: string): boolean {
  try {
    return IMAGE_URI_PROTOCOLS.has(new URL(value).protocol);
  } catch {
    return false;
  }
}

function isIanaTimeZone(value: string): boolean {
  try {
    if (typeof Intl.supportedValuesOf === "function") {
      const supported = new Set(Intl.supportedValuesOf("timeZone"));
      if (supported.has(value)) return true;

      const resolved = new Intl.DateTimeFormat(undefined, {
        timeZone: value,
      }).resolvedOptions().timeZone;
      if (resolved === "UTC") return true;

      const area = value.split("/")[0] ?? "";
      const resolvedArea = resolved.split("/")[0] ?? "";
      return (
        area.length > 0 &&
        value.includes("/") &&
        area === resolvedArea &&
        supported.has(resolved)
      );
    }

    const resolved = new Intl.DateTimeFormat(undefined, {
      timeZone: value,
    }).resolvedOptions().timeZone;
    return resolved.length > 0;
  } catch {
    return false;
  }
}

export function normalizeProfileTextValue(
  key: string,
  input: string,
): Result<string, ProfileTextRecordValidationError> {
  if (
    key !== "email" &&
    key !== "url" &&
    key !== "timezone" &&
    key !== "avatar" &&
    key !== "header"
  ) {
    return ok(input);
  }

  const value = input.trim();
  if (value.length === 0) return ok("");

  if (key === "email" && !EMAIL_PATTERN.test(value)) {
    return err("INVALID_EMAIL");
  }
  if (key === "url" && !isHttpUrl(value)) {
    return err("INVALID_URL");
  }
  if (key === "timezone" && !isIanaTimeZone(value)) {
    return err("INVALID_TIMEZONE");
  }
  if ((key === "avatar" || key === "header") && !isImageUri(value)) {
    return err("INVALID_IMAGE_URL");
  }

  return ok(value);
}
