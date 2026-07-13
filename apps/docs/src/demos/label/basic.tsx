import { Input, Label } from "@thenamespace/uikit";

export function Basic() {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="name">Name</Label>
      <Input
        className="w-64"
        id="name"
        placeholder="Enter your name"
        type="text"
      />
    </div>
  );
}
