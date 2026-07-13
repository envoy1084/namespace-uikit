"use client";

// @demo-title Default
import { ChatLoader } from "@thenamespace/uikit";

export const DemoDefaultExample = () => (
  <div className="flex w-[420px] flex-col gap-8">
    <div className="flex items-center gap-3">
      <span className="text-muted text-sm">Dots</span>
      <ChatLoader.Dots />
    </div>
    <div className="flex items-center gap-3">
      <span className="text-muted text-sm">Pulse</span>
      <ChatLoader.Pulse />
    </div>
    <div className="flex items-center gap-3">
      <span className="text-muted text-sm">Spinner</span>
      <ChatLoader.Spinner />
    </div>
    <ChatLoader.Skeleton />
  </div>
);
