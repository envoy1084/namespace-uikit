import { Switch } from "@thenamespace/uikit";

export function WithoutLabel() {
  return (
    <Switch aria-label="Enable notifications">
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Content>
    </Switch>
  );
}
