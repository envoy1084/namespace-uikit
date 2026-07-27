import type { NameRenewalEventHandler } from "#/components/renew-name/events";

export function emitNameRenewalEvent<TEvent>(
  handler: NameRenewalEventHandler<TEvent> | undefined,
  event: TEvent,
) {
  if (handler === undefined) return;

  try {
    void Promise.resolve(handler(event)).catch(() => undefined);
  } catch {
    // Consumer callbacks must not change an already-confirmed renewal flow.
  }
}
