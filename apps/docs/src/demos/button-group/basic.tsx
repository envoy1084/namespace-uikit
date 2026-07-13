import {
  Button,
  ButtonGroup,
  Chip,
  Description,
  Dropdown,
  Label,
} from "@thenamespace/uikit";
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  GitForkIcon,
  MoreHorizontalIcon,
  Image01Icon,
  PinIcon,
  QrCodeIcon,
  StarIcon,
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Video01Icon,
  HugeiconsIcon,
} from "@thenamespace/uikit/icons";

export function Basic() {
  return (
    <div className="flex flex-col items-start gap-6">
      {/* Single button with dropdown */}
      <div className="flex flex-col gap-2">
        <ButtonGroup>
          <Button>Merge pull request</Button>
          <Dropdown>
            <Button isIconOnly aria-label="More options">
              <ButtonGroup.Separator />
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </Button>
            <Dropdown.Popover className="max-w-[290px]" placement="bottom end">
              <Dropdown.Menu>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="merge"
                  textValue="Create a merge commit"
                >
                  <Label>Create a merge commit</Label>
                  <Description>
                    All commits from this branch will be added to the base
                    branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="squash-and-merge"
                  textValue="Squash and merge"
                >
                  <Label>Squash and merge</Label>
                  <Description>
                    The 14 commits from this branch will be combined into one
                    commit in the base branch
                  </Description>
                </Dropdown.Item>
                <Dropdown.Item
                  className="flex flex-col items-start gap-1"
                  id="rebase-and-merge"
                  textValue="Rebase and merge"
                >
                  <Label>Rebase and merge</Label>
                  <Description>
                    The 14 commits from this branch will be rebased and added to
                    the base branch
                  </Description>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </ButtonGroup>
      </div>

      {/* Individual buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-2 gap-y-4">
          <ButtonGroup variant="tertiary">
            <Button>
              <HugeiconsIcon icon={GitForkIcon} className="size-3.5" />
              Fork
              <Chip color="accent" size="sm" variant="soft">
                24
              </Chip>
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button isIconOnly>
              <HugeiconsIcon icon={QrCodeIcon} />
            </Button>
            <Button>
              <ButtonGroup.Separator />
              Scan to pay
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <HugeiconsIcon icon={ThumbsUpIcon} />
              <span className="text-xs font-semibold">2.4K</span>
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <HugeiconsIcon icon={ThumbsDownIcon} />
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <HugeiconsIcon icon={StarIcon} className="size-3.5" />
              Star
            </Button>
            <Button className="px-2">
              <ButtonGroup.Separator />
              <Chip color="accent" size="sm" variant="soft">
                104
              </Chip>
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="tertiary">
            <Button>
              <HugeiconsIcon icon={PinIcon} />
              Pinned
            </Button>
            <Button isIconOnly>
              <ButtonGroup.Separator />
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Previous/Next Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <HugeiconsIcon icon={ArrowLeft01Icon} />
            Previous
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Next
            <HugeiconsIcon icon={ArrowRight01Icon} />
          </Button>
        </ButtonGroup>
      </div>

      {/* Content Selection Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>
            <HugeiconsIcon icon={Image01Icon} />
            Photos
          </Button>
          <Button>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={Video01Icon} />
            Videos
          </Button>
          <Button isIconOnly aria-label="More options">
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </ButtonGroup>
      </div>

      {/* Text Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button>Left</Button>
          <Button>
            <ButtonGroup.Separator />
            Center
          </Button>
          <Button>
            <ButtonGroup.Separator />
            Right
          </Button>
        </ButtonGroup>
      </div>

      {/* Icon-Only Alignment Button Group */}
      <div className="flex flex-col gap-2">
        <ButtonGroup variant="tertiary">
          <Button isIconOnly>
            <HugeiconsIcon icon={TextAlignLeftIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignCenterIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignRightIcon} />
          </Button>
          <Button isIconOnly>
            <ButtonGroup.Separator />
            <HugeiconsIcon icon={TextAlignJustifyCenterIcon} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
