export type ComponentEventHandler<TEvent> = (event: TEvent) => Promise<void> | void;

export function emitComponentEvent<TEvent>(
  handler: ComponentEventHandler<TEvent> | undefined,
  event: TEvent,
) {
  if (handler === undefined) return;

  try {
    void Promise.resolve(handler(event)).catch(() => undefined);
  } catch {
    // Consumer callbacks must not affect an already-confirmed component flow.
  }
}
