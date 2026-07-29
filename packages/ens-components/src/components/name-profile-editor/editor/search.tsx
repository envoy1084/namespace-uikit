import { InputGroup } from "@thenamespace/uikit";
import { Icon, Search01Icon } from "@thenamespace/uikit/icons";

export function EditorSearch({
  label,
  placeholder = "Search records",
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <InputGroup className="w-full" variant="secondary">
      <InputGroup.Prefix>
        <Icon icon={Search01Icon} className="text-muted size-4" strokeWidth={2} />
      </InputGroup.Prefix>
      <InputGroup.Input
        aria-label={label}
        className="w-full"
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  );
}
