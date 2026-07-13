"use client";

// @demo-title Default
import { TextShimmer } from "@thenamespace/uikit";

export const DemoDefaultExample = () => (
  <div className="flex flex-col gap-4 text-sm">
    <TextShimmer>Thinking...</TextShimmer>
    <TextShimmer>Generating response...</TextShimmer>
  </div>
);
