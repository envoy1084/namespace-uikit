"use client";

// @demo-title With Form
import { Sheet } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Input } from "@thenamespace/uikit/input";
import { Label } from "@thenamespace/uikit/label";
import { TextField } from "@thenamespace/uikit/textfield";

function WithFormDemo() {
  return (
    <Sheet placement="right">
      <Sheet.Trigger>
        <Button variant="secondary">Edit Profile</Button>
      </Sheet.Trigger>
      <Sheet.Backdrop>
        <Sheet.Content className="w-[400px]">
          <Sheet.Dialog>
            <Sheet.CloseTrigger />
            <Sheet.Header>
              <Sheet.Heading>Edit Profile</Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body>
              <form className="flex flex-col gap-4">
                <TextField className="w-full" name="name" type="text">
                  <Label>Name</Label>
                  <Input placeholder="Enter your name" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="Enter your email" variant="secondary" />
                </TextField>
                <TextField className="w-full" name="bio">
                  <Label>Bio</Label>
                  <Input
                    placeholder="Tell us about yourself"
                    variant="secondary"
                  />
                </TextField>
              </form>
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.Close>
                <Button variant="secondary">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close>
                <Button>Save Changes</Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  );
}

export const DemoWithFormExample = () => <WithFormDemo />;
