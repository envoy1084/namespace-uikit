import type { NameRegistrationEventHandler } from "#/components/name-registration/events";

export function emitNameRegistrationEvent<TEvent>(
  handler: NameRegistrationEventHandler<TEvent> | undefined,
  event: TEvent,
) {
  if (handler === undefined) return;

  try {
    void Promise.resolve(handler(event)).catch(() => undefined);
  } catch {
    // Consumer callbacks must not change an already-confirmed transaction flow.
  }
}
