import { InputGroup } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

export function EditorSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputGroup className="w-full" variant="secondary">
      <InputGroup.Prefix>
        <Icon
          icon={Search01Icon}
          className="text-muted size-4"
          strokeWidth={2}
        />
      </InputGroup.Prefix>
      <InputGroup.Input
        aria-label="Search profile records"
        className="w-full"
        placeholder="Search records"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
}
