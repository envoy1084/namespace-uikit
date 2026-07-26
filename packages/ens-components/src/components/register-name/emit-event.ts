import type { RegisterNameEventHandler } from "#/components/register-name/events";

export function emitRegisterNameEvent<TEvent>(
  handler: RegisterNameEventHandler<TEvent> | undefined,
  event: TEvent,
) {
  if (handler === undefined) return;

  try {
    void Promise.resolve(handler(event)).catch(() => undefined);
  } catch {
    // Consumer callbacks must not change an already-confirmed transaction flow.
  }
}
