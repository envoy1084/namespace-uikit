import { InputGroup, Label, TextField } from "@thenamespace/uikit";
import { Mail01Icon, EyeIcon, HugeiconsIcon } from "@thenamespace/uikit/icons";

export function FullWidth() {
  return (
    <div className="w-[400px] space-y-4">
      <TextField fullWidth name="email">
        <Label>Email address</Label>
        <InputGroup fullWidth>
          <InputGroup.Prefix>
            <HugeiconsIcon icon={Mail01Icon} className="text-muted size-4" />
          </InputGroup.Prefix>
          <InputGroup.Input placeholder="name@email.com" />
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>Password</Label>
        <InputGroup fullWidth>
          <InputGroup.Input placeholder="Enter password" type="password" />
          <InputGroup.Suffix>
            <HugeiconsIcon icon={EyeIcon} className="text-muted size-4" />
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
    </div>
  );
}
