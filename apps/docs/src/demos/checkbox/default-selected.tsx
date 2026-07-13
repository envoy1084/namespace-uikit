import { Checkbox } from "@thenamespace/uikit";

export function DefaultSelected() {
  return (
    <Checkbox defaultSelected id="default-notifications">
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Enable email notifications
      </Checkbox.Content>
    </Checkbox>
  );
}
