import { ColorArea } from "@thenamespace/uikit";

export function ColorAreaBasic() {
  return (
    <ColorArea defaultValue="rgb(116, 52, 255)">
      <ColorArea.Thumb />
    </ColorArea>
  );
}
