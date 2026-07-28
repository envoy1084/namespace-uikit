import type { NameProfileEditorEventHandler } from "#/components/name-profile-editor/events";

export function emitNameProfileEditorEvent<TEvent>(
  handler: NameProfileEditorEventHandler<TEvent> | undefined,
  event: TEvent,
) {
  if (handler === undefined) return;

  try {
    void Promise.resolve(handler(event)).catch(() => undefined);
  } catch {
    // Consumer callbacks must not change an already-confirmed update flow.
  }
}
