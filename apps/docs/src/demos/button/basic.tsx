"use client";

import { Button } from "@thenamespace/uikit";

export function Basic() {
  return (
    <Button onPress={() => console.log("Button pressed")}>Click me</Button>
  );
}
