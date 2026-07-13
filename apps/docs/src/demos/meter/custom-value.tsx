import { Label, Meter } from "@thenamespace/uikit";

export function CustomValue() {
  return (
    <Meter
      className="w-64"
      formatOptions={{ currency: "USD", style: "currency" }}
      maxValue={1000}
      minValue={0}
      value={750}
    >
      <Label>Revenue</Label>
      <Meter.Output />
      <Meter.Track>
        <Meter.Fill />
      </Meter.Track>
    </Meter>
  );
}
