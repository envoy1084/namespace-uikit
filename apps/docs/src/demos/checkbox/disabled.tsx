import { Checkbox, Description } from "@thenamespace/uikit";

export function Disabled() {
  return (
    <Checkbox isDisabled id="feature">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Premium Feature
      </Checkbox.Content>
      <Description>This feature is coming soon</Description>
    </Checkbox>
  );
}
