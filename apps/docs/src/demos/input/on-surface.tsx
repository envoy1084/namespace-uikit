import { Input, Surface } from "@thenamespace/uikit";

export function OnSurface() {
  return (
    <Surface className="bg-surface flex h-[180px] w-[280px] items-center justify-center rounded-3xl p-4">
      <Input className="w-full" placeholder="Your name" variant="secondary" />
    </Surface>
  );
}
