import type { Color, SortDescriptor } from "@thenamespace/uikit";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  Checkbox,
  CheckboxGroup,
  Chip,
  CloseButton,
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  ComboBox,
  DateField,
  DatePicker,
  Description,
  Disclosure,
  DisclosureGroup,
  Drawer,
  Dropdown,
  EmptyState,
  FieldError,
  Fieldset,
  Form,
  Input,
  InputGroup,
  InputOTP,
  Kbd,
  Label,
  Link as HeroLink,
  ListBox,
  Meter,
  Modal,
  NumberField,
  Pagination,
  Popover,
  ProgressBar,
  ProgressCircle,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  Separator,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  Tabs,
  Tag,
  TagGroup,
  TextArea,
  TextField,
  TimeField,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Tooltip,
  parseColor,
} from "@thenamespace/uikit";
import {
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  Download01Icon,
  Icon,
  Mail01Icon,
  Settings02Icon,
  StarIcon,
} from "@thenamespace/uikit/icons";

export type ComponentCategory =
  | "Buttons"
  | "Collections"
  | "Colors"
  | "Controls"
  | "Data Display"
  | "Date and Time"
  | "Feedback"
  | "Forms"
  | "Layout"
  | "Navigation"
  | "Overlays"
  | "Typography";

export interface ShowcaseExample {
  title: string;
  description?: string;
  preview: ReactNode;
  size?: "default" | "wide";
}

export interface ComponentEntry {
  category: ComponentCategory;
  description: string;
  examples: ShowcaseExample[];
  id: string;
  title: string;
}

export const categoryOrder: ComponentCategory[] = [
  "Buttons",
  "Collections",
  "Colors",
  "Controls",
  "Data Display",
  "Date and Time",
  "Feedback",
  "Forms",
  "Layout",
  "Navigation",
  "Overlays",
  "Typography",
];

const buttonVariants = [
  "primary",
  "secondary",
  "tertiary",
  "outline",
  "ghost",
  "danger",
  "danger-soft",
] as const;

const colorSwatches = [
  "#F43F5E",
  "#D946EF",
  "#8B5CF6",
  "#5474F6",
  "#06B6D4",
  "#10B981",
  "#84CC16",
];

const teamRows = [
  {
    email: "kate@namespace.dev",
    id: 1,
    name: "Kate Moore",
    role: "Design Lead",
    status: "Active",
  },
  {
    email: "john@namespace.dev",
    id: 2,
    name: "John Smith",
    role: "Frontend",
    status: "Active",
  },
  {
    email: "sara@namespace.dev",
    id: 3,
    name: "Sara Johnson",
    role: "Product",
    status: "On Leave",
  },
  {
    email: "michael@namespace.dev",
    id: 4,
    name: "Michael Brown",
    role: "Platform",
    status: "Inactive",
  },
] as const;

type TeamRow = (typeof teamRows)[number];

function compareTeamRows(
  row: TeamRow,
  nextRow: TeamRow,
  sortDescriptor: SortDescriptor,
) {
  const key = sortDescriptor.column as keyof TeamRow;
  const result = String(row[key]).localeCompare(String(nextRow[key]));

  return sortDescriptor.direction === "descending" ? -result : result;
}

function PreviewStack({ children }: { children: ReactNode }) {
  return <div className="preview-stack">{children}</div>;
}

function PreviewRow({ children }: { children: ReactNode }) {
  return <div className="preview-row">{children}</div>;
}

function ButtonVariantsPreview() {
  return (
    <PreviewRow>
      {buttonVariants.map((variant) => (
        <Button key={variant} size="sm" variant={variant}>
          {variant}
        </Button>
      ))}
    </PreviewRow>
  );
}

function ButtonStatesPreview() {
  return (
    <PreviewRow>
      <Button>
        <Icon color="currentColor" icon={ArrowRight02Icon} size={18} />
        Save
      </Button>
      <Button isDisabled variant="secondary">
        Disabled
      </Button>
      <Button isIconOnly aria-label="Settings" variant="ghost">
        <Icon color="currentColor" icon={Settings02Icon} size={20} />
      </Button>
    </PreviewRow>
  );
}

function ButtonGroupPreview() {
  return (
    <ButtonGroup variant="secondary">
      <Button>Day</Button>
      <Button>
        <ButtonGroup.Separator />
        Week
      </Button>
      <Button>
        <ButtonGroup.Separator />
        Month
      </Button>
    </ButtonGroup>
  );
}

function ToggleButtonGroupPreview() {
  return (
    <ToggleButtonGroup aria-label="Text style" defaultSelectedKeys={["bold"]}>
      <ToggleButton id="bold">Bold</ToggleButton>
      <ToggleButton id="italic">
        <ToggleButtonGroup.Separator />
        Italic
      </ToggleButton>
      <ToggleButton id="underline">
        <ToggleButtonGroup.Separator />
        Underline
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

function DropdownPreview() {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Actions
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="new-file" textValue="New file">
            <Label>New file</Label>
          </Dropdown.Item>
          <Dropdown.Item id="copy-link" textValue="Copy link">
            <Label>Copy link</Label>
          </Dropdown.Item>
          <Dropdown.Item id="edit-file" textValue="Edit file">
            <Label>Edit file</Label>
          </Dropdown.Item>
          <Dropdown.Item
            id="delete-file"
            textValue="Delete file"
            variant="danger"
          >
            <Label>Delete file</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}

function ListBoxPreview() {
  return (
    <ListBox
      aria-label="People"
      className="demo-listbox"
      defaultSelectedKeys={["bob"]}
    >
      <ListBox.Item id="bob" textValue="Bob">
        <Avatar size="sm">
          <Avatar.Fallback>BO</Avatar.Fallback>
        </Avatar>
        <div>
          <Label>Bob</Label>
          <Description>bob@namespace.dev</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="fred" textValue="Fred">
        <Avatar size="sm">
          <Avatar.Fallback>FR</Avatar.Fallback>
        </Avatar>
        <div>
          <Label>Fred</Label>
          <Description>fred@namespace.dev</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
      <ListBox.Item id="martha" textValue="Martha">
        <Avatar size="sm">
          <Avatar.Fallback>MA</Avatar.Fallback>
        </Avatar>
        <div>
          <Label>Martha</Label>
          <Description>martha@namespace.dev</Description>
        </div>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  );
}

function TagGroupPreview() {
  return (
    <TagGroup
      aria-label="Categories"
      defaultSelectedKeys={["travel"]}
      selectionMode="single"
    >
      <TagGroup.List>
        <Tag id="news">News</Tag>
        <Tag id="travel">Travel</Tag>
        <Tag id="gaming">Gaming</Tag>
        <Tag id="shopping">Shopping</Tag>
      </TagGroup.List>
    </TagGroup>
  );
}

function ColorFieldPreview() {
  const [color, setColor] = useState<Color | null>(parseColor("#5474F6"));

  return (
    <ColorField
      className="field-width"
      name="brand-color"
      value={color}
      onChange={setColor}
    >
      <Label>Color</Label>
      <ColorField.Group>
        <ColorField.Prefix>
          {color ? (
            <ColorSwatch color={color} size="xs" />
          ) : (
            <ColorSwatch size="xs" />
          )}
        </ColorField.Prefix>
        <ColorField.Input />
      </ColorField.Group>
    </ColorField>
  );
}

function ColorPickerPreview() {
  return (
    <ColorPicker defaultValue="#5474F6">
      <ColorPicker.Trigger>
        <ColorSwatch size="lg" />
        <Label>Pick a color</Label>
      </ColorPicker.Trigger>
      <ColorPicker.Popover>
        <ColorArea
          aria-label="Color area"
          colorSpace="hsb"
          xChannel="saturation"
          yChannel="brightness"
        >
          <ColorArea.Thumb />
        </ColorArea>
        <ColorSlider channel="hue" colorSpace="hsb">
          <Label>Hue</Label>
          <ColorSlider.Output />
          <ColorSlider.Track>
            <ColorSlider.Thumb />
          </ColorSlider.Track>
        </ColorSlider>
      </ColorPicker.Popover>
    </ColorPicker>
  );
}

function ColorSwatchPickerPreview() {
  return (
    <ColorSwatchPicker defaultValue="#5474F6">
      {colorSwatches.map((color) => (
        <ColorSwatchPicker.Item key={color} color={color}>
          <ColorSwatchPicker.Swatch />
          <ColorSwatchPicker.Indicator />
        </ColorSwatchPicker.Item>
      ))}
    </ColorSwatchPicker>
  );
}

function SliderPreview() {
  return (
    <Slider
      aria-label="Price"
      className="field-width"
      defaultValue={52}
      maxValue={100}
    >
      <Label>Price</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>
  );
}

function SwitchPreview() {
  return (
    <PreviewRow>
      <Switch>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <span>Off</span>
        </Switch.Content>
      </Switch>
      <Switch defaultSelected>
        <Switch.Content>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <span>On</span>
        </Switch.Content>
      </Switch>
    </PreviewRow>
  );
}

function AvatarPreview() {
  return (
    <PreviewRow>
      <Avatar>
        <Avatar.Fallback>NS</Avatar.Fallback>
      </Avatar>
      <Avatar color="accent">
        <Avatar.Fallback>UI</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Fallback>KT</Avatar.Fallback>
      </Avatar>
    </PreviewRow>
  );
}

function BadgePreview() {
  return (
    <PreviewRow>
      <Badge.Anchor>
        <Avatar>
          <Avatar.Fallback>NS</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          5
        </Badge>
      </Badge.Anchor>
      <Badge.Anchor>
        <Button size="sm" variant="secondary">
          Inbox
        </Button>
        <Badge color="accent" placement="top-right" size="sm">
          New
        </Badge>
      </Badge.Anchor>
    </PreviewRow>
  );
}

function ChipPreview() {
  return (
    <PreviewRow>
      <Chip>Default</Chip>
      <Chip color="accent">Accent</Chip>
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
    </PreviewRow>
  );
}

function TablePreview() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const rows = useMemo(() => {
    return teamRows.reduce<TeamRow[]>((sortedRows, row) => {
      const insertIndex = sortedRows.findIndex(
        (nextRow) => compareTeamRows(row, nextRow, sortDescriptor) < 0,
      );

      if (insertIndex === -1) {
        sortedRows.push(row);

        return sortedRows;
      }

      sortedRows.splice(insertIndex, 0, row);

      return sortedRows;
    }, []);
  }, [sortDescriptor]);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Team members"
          className="demo-table"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column allowsSorting id="name" isRowHeader>
              {({ sortDirection }) => (
                <Table.SortableColumnHeader
                  {...(sortDirection ? { sortDirection } : {})}
                >
                  Name
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="role">
              {({ sortDirection }) => (
                <Table.SortableColumnHeader
                  {...(sortDirection ? { sortDirection } : {})}
                >
                  Role
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({ sortDirection }) => (
                <Table.SortableColumnHeader
                  {...(sortDirection ? { sortDirection } : {})}
                >
                  Status
                </Table.SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column id="email">Email</Table.Column>
          </Table.Header>
          <Table.Body>
            {rows.map((row) => (
              <Table.Row key={row.id} id={row.id}>
                <Table.Cell>{row.name}</Table.Cell>
                <Table.Cell>{row.role}</Table.Cell>
                <Table.Cell>
                  <Chip
                    color={
                      row.status === "Active"
                        ? "success"
                        : row.status === "On Leave"
                          ? "warning"
                          : "danger"
                    }
                    size="sm"
                    variant="soft"
                  >
                    {row.status}
                  </Chip>
                </Table.Cell>
                <Table.Cell>{row.email}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

function CalendarPreview() {
  return (
    <Calendar aria-label="Event date">
      <Calendar.Header>
        <Calendar.Heading />
        <Calendar.NavButton slot="previous" />
        <Calendar.NavButton slot="next" />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => <Calendar.Cell date={date} />}
        </Calendar.GridBody>
      </Calendar.Grid>
    </Calendar>
  );
}

function DatePickerPreview() {
  return (
    <DatePicker className="field-width" name="event-date">
      <Label>Date</Label>
      <DateField.Group fullWidth>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover>
        <Calendar aria-label="Event date">
          <Calendar.Header>
            <Calendar.Heading />
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}

function FeedbackPreview() {
  return (
    <Alert status="accent">
      <Alert.Indicator>
        <Icon color="currentColor" icon={CheckmarkCircle02Icon} size={20} />
      </Alert.Indicator>
      <Alert.Content>
        <Alert.Title>Tokens synced</Alert.Title>
        <Alert.Description>
          Components are reading from the Namespace theme.
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

function ProgressPreview() {
  return (
    <PreviewStack>
      <ProgressBar aria-label="Loading" value={64}>
        <Label>Loading</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
      <Meter aria-label="Storage" value={72}>
        <Label>Storage</Label>
        <Meter.Output />
        <Meter.Track>
          <Meter.Fill />
        </Meter.Track>
      </Meter>
    </PreviewStack>
  );
}

function ProgressCirclePreview() {
  return (
    <PreviewRow>
      <ProgressCircle aria-label="Loading" value={60}>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
      <ProgressCircle aria-label="Loading" isIndeterminate>
        <ProgressCircle.Track>
          <ProgressCircle.TrackCircle />
          <ProgressCircle.FillCircle />
        </ProgressCircle.Track>
      </ProgressCircle>
    </PreviewRow>
  );
}

function SkeletonPreview() {
  return (
    <PreviewStack>
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-16 w-full" />
    </PreviewStack>
  );
}

function CheckboxPreview() {
  return (
    <Checkbox defaultSelected>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <span>Accept updates</span>
      </Checkbox.Content>
    </Checkbox>
  );
}

function CheckboxGroupPreview() {
  return (
    <CheckboxGroup name="interests">
      <Label>Interests</Label>
      <Checkbox value="code">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Code
        </Checkbox.Content>
      </Checkbox>
      <Checkbox value="design">
        <Checkbox.Content>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          Design
        </Checkbox.Content>
      </Checkbox>
    </CheckboxGroup>
  );
}

function InputPreview() {
  return (
    <PreviewStack>
      <Input
        className="field-width"
        defaultValue="Namespace Console"
        variant="primary"
      />
      <Input
        className="field-width"
        placeholder="Secondary input"
        variant="secondary"
      />
    </PreviewStack>
  );
}

function InputGroupPreview() {
  return (
    <InputGroup className="field-width">
      <InputGroup.Prefix>
        <Icon color="currentColor" icon={Mail01Icon} size={16} />
      </InputGroup.Prefix>
      <Input aria-label="Email" placeholder="name@namespace.dev" />
      <InputGroup.Suffix>.com</InputGroup.Suffix>
    </InputGroup>
  );
}

function InputOTPPreview() {
  return (
    <InputOTP maxLength={6}>
      <InputOTP.Group>
        <InputOTP.Slot index={0} />
        <InputOTP.Slot index={1} />
        <InputOTP.Slot index={2} />
      </InputOTP.Group>
      <InputOTP.Separator />
      <InputOTP.Group>
        <InputOTP.Slot index={3} />
        <InputOTP.Slot index={4} />
        <InputOTP.Slot index={5} />
      </InputOTP.Group>
    </InputOTP>
  );
}

function NumberFieldPreview() {
  return (
    <NumberField
      className="field-width"
      defaultValue={24}
      minValue={0}
      name="seats"
    >
      <Label>Seats</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>
  );
}

function RadioGroupPreview() {
  return (
    <RadioGroup defaultValue="team" name="plan">
      <Label>Plan</Label>
      <Radio value="solo">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Solo
        </Radio.Content>
      </Radio>
      <Radio value="team">
        <Radio.Content>
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          Team
        </Radio.Content>
      </Radio>
    </RadioGroup>
  );
}

function SearchFieldPreview() {
  return (
    <SearchField name="component-search">
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input
          className="field-input"
          placeholder="Search components..."
        />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}

function SelectPreview() {
  return (
    <Select
      className="field-width"
      defaultSelectedKey="web"
      placeholder="Select target"
    >
      <Label>Target</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="web" textValue="Web">
            Web
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="native" textValue="Native">
            Native
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="docs" textValue="Docs">
            Docs
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
}

function ComboBoxPreview() {
  return (
    <ComboBox className="field-width">
      <Label>Component</Label>
      <ComboBox.InputGroup>
        <Input placeholder="Search..." />
        <ComboBox.Trigger />
      </ComboBox.InputGroup>
      <ComboBox.Popover>
        <ListBox>
          <ListBox.Item id="button" textValue="Button">
            Button
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="table" textValue="Table">
            Table
            <ListBox.ItemIndicator />
          </ListBox.Item>
          <ListBox.Item id="color-picker" textValue="ColorPicker">
            ColorPicker
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>
  );
}

function TextFieldPreview() {
  return (
    <TextField className="field-width" name="workspace">
      <Label>Workspace</Label>
      <Input placeholder="Namespace" />
      <Description>Shown in shared navigation.</Description>
      <FieldError />
    </TextField>
  );
}

function FormPreview() {
  return (
    <Form className="form-demo">
      <Input aria-label="Project" placeholder="Project name" />
      <Button type="submit">Create</Button>
    </Form>
  );
}

function FieldsetPreview() {
  return (
    <Fieldset className="field-width">
      <Fieldset.Legend>Notifications</Fieldset.Legend>
      <CheckboxPreview />
    </Fieldset>
  );
}

function AccordionPreview() {
  return (
    <Accordion className="accordion-demo">
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            API limits
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Track usage across products and environments.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Billing
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Invoices and usage reports stay in one workspace.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

function CardPreview() {
  return (
    <Card className="demo-card">
      <Card.Header>
        <Card.Title>Creator Hub</Card.Title>
        <Card.Description>
          Review shared assets before publishing.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <HeroLink href="#">
          Open
          <HeroLink.Icon />
        </HeroLink>
      </Card.Footer>
    </Card>
  );
}

function DisclosurePreview() {
  return (
    <Disclosure defaultExpanded>
      <Disclosure.Heading>
        <Button slot="trigger" variant="secondary">
          Preview details
          <Disclosure.Indicator />
        </Button>
      </Disclosure.Heading>
      <Disclosure.Content>
        <Disclosure.Body className="disclosure-body">
          Release notes and checklist content can sit inside the panel.
        </Disclosure.Body>
      </Disclosure.Content>
    </Disclosure>
  );
}

function DisclosureGroupPreview() {
  return (
    <DisclosureGroup defaultExpandedKeys={["first"]}>
      <Disclosure id="first">
        <Disclosure.Heading>
          <Button slot="trigger" variant="tertiary">
            Status
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="disclosure-body">
            Production ready.
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
      <Disclosure id="second">
        <Disclosure.Heading>
          <Button slot="trigger" variant="tertiary">
            Notes
            <Disclosure.Indicator />
          </Button>
        </Disclosure.Heading>
        <Disclosure.Content>
          <Disclosure.Body className="disclosure-body">
            Lightweight panel content.
          </Disclosure.Body>
        </Disclosure.Content>
      </Disclosure>
    </DisclosureGroup>
  );
}

function ToolbarPreview() {
  return (
    <Toolbar aria-label="Editor toolbar">
      <ButtonGroup variant="tertiary">
        <Button>
          <Icon color="currentColor" icon={Copy01Icon} size={16} />
          Copy
        </Button>
        <Button>
          <ButtonGroup.Separator />
          <Icon color="currentColor" icon={Download01Icon} size={16} />
          Export
        </Button>
      </ButtonGroup>
      <Separator />
      <ToggleButtonGroup aria-label="Formatting" defaultSelectedKeys={["bold"]}>
        <ToggleButton id="bold">B</ToggleButton>
        <ToggleButton id="italic">
          <ToggleButtonGroup.Separator />I
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar>
  );
}

function BreadcrumbsPreview() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Item href="#">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#">Components</Breadcrumbs.Item>
      <Breadcrumbs.Item>Button</Breadcrumbs.Item>
    </Breadcrumbs>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(2);
  const totalPages = 4;

  return (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => setPage((p) => p - 1)}
          >
            <Pagination.PreviousIcon />
            Prev
          </Pagination.Previous>
        </Pagination.Item>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (value) => (
            <Pagination.Item key={value}>
              <Pagination.Link
                isActive={value === page}
                onPress={() => setPage(value)}
              >
                {value}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => setPage((p) => p + 1)}
          >
            Next
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}

function TabsPreview() {
  return (
    <Tabs defaultSelectedKey="overview" variant="secondary">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Component sections">
          <Tabs.Tab id="overview">
            <Tabs.Indicator />
            Overview
          </Tabs.Tab>
          <Tabs.Tab id="tokens">
            <Tabs.Separator />
            <Tabs.Indicator />
            Tokens
          </Tabs.Tab>
          <Tabs.Tab id="states">
            <Tabs.Separator />
            <Tabs.Indicator />
            States
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="overview">
        <p className="panel-copy">Preview the component in context.</p>
      </Tabs.Panel>
      <Tabs.Panel id="tokens">
        <p className="panel-copy">
          Tokenized variants share the same theme values.
        </p>
      </Tabs.Panel>
      <Tabs.Panel id="states">
        <p className="panel-copy">State styling is visible in the local app.</p>
      </Tabs.Panel>
    </Tabs>
  );
}

function PopoverPreview() {
  return (
    <Popover>
      <Button>Open popover</Button>
      <Popover.Content className="popover-demo">
        <Popover.Dialog>
          <Popover.Heading>Preview</Popover.Heading>
          <p>Popover content rendered through the uikit package.</p>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
}

function TooltipPreview() {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button variant="secondary">Hover target</Button>
      </Tooltip.Trigger>
      <Tooltip.Content showArrow>Tooltip content</Tooltip.Content>
    </Tooltip>
  );
}

function ModalPreview() {
  return (
    <Modal>
      <Button variant="secondary">Open modal</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Workspace ready</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>The modal is rendered from the uikit package.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close">Done</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

function DrawerPreview() {
  return (
    <Drawer>
      <Button variant="secondary">Open drawer</Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>Drawer panel</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <p>Side panel content for focused workflows.</p>
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Confirm</Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

function TypographyPreview() {
  return (
    <PreviewStack>
      <h3 className="type-demo-heading">Typography heading</h3>
      <p className="type-demo-copy">
        Body text uses the app font stack and Namespace theme colors.
      </p>
      <HeroLink href="#">
        Text link
        <HeroLink.Icon />
      </HeroLink>
    </PreviewStack>
  );
}

function KbdPreview() {
  return (
    <PreviewRow>
      <Kbd>
        <Kbd.Abbr keyValue="command" />
        <Kbd.Content>K</Kbd.Content>
      </Kbd>
      <Kbd>
        <Kbd.Content>Esc</Kbd.Content>
      </Kbd>
    </PreviewRow>
  );
}

export const components: ComponentEntry[] = [
  {
    category: "Buttons",
    description: "Action primitives and grouped controls.",
    examples: [
      { preview: <ButtonVariantsPreview />, title: "Variants" },
      { preview: <ButtonStatesPreview />, title: "States" },
      {
        preview: (
          <PreviewRow>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </PreviewRow>
        ),
        title: "Sizes",
      },
    ],
    id: "button",
    title: "Button",
  },
  {
    category: "Buttons",
    description: "Connected buttons for related commands.",
    examples: [{ preview: <ButtonGroupPreview />, title: "Basic" }],
    id: "button-group",
    title: "ButtonGroup",
  },
  {
    category: "Buttons",
    description: "Compact dismiss action.",
    examples: [
      {
        preview: (
          <PreviewRow>
            <CloseButton aria-label="Close" />
            <CloseButton aria-label="Dismiss" />
          </PreviewRow>
        ),
        title: "Sizes",
      },
    ],
    id: "close-button",
    title: "CloseButton",
  },
  {
    category: "Buttons",
    description: "Button with selected and unselected states.",
    examples: [
      {
        preview: (
          <PreviewRow>
            <ToggleButton id="bold">Bold</ToggleButton>
            <ToggleButton id="star" isSelected>
              <Icon color="currentColor" icon={StarIcon} size={16} />
              Saved
            </ToggleButton>
          </PreviewRow>
        ),
        title: "States",
      },
    ],
    id: "toggle-button",
    title: "ToggleButton",
  },
  {
    category: "Buttons",
    description: "Grouped toggle controls.",
    examples: [{ preview: <ToggleButtonGroupPreview />, title: "Basic" }],
    id: "toggle-button-group",
    title: "ToggleButtonGroup",
  },
  {
    category: "Collections",
    description: "Action menu with selectable items.",
    examples: [{ preview: <DropdownPreview />, title: "Basic" }],
    id: "dropdown",
    title: "Dropdown",
  },
  {
    category: "Collections",
    description: "Selectable list with rich rows.",
    examples: [{ preview: <ListBoxPreview />, title: "Basic" }],
    id: "list-box",
    title: "ListBox",
  },
  {
    category: "Collections",
    description: "Focusable tags for filters and categories.",
    examples: [{ preview: <TagGroupPreview />, title: "Basic" }],
    id: "tag-group",
    title: "TagGroup",
  },
  {
    category: "Colors",
    description: "Two-axis color selection area.",
    examples: [
      {
        preview: (
          <ColorArea aria-label="Color area" defaultValue="rgb(84, 116, 246)">
            <ColorArea.Thumb />
          </ColorArea>
        ),
        title: "Basic",
      },
    ],
    id: "color-area",
    title: "ColorArea",
  },
  {
    category: "Colors",
    description: "Color value input with swatch affordance.",
    examples: [{ preview: <ColorFieldPreview />, title: "Basic" }],
    id: "color-field",
    title: "ColorField",
  },
  {
    category: "Colors",
    description: "Composable color picker trigger and popover.",
    examples: [
      { preview: <ColorPickerPreview />, title: "Trigger" },
      {
        preview: (
          <PreviewStack>
            <ColorArea
              aria-label="Color area"
              colorSpace="hsb"
              defaultValue="#5474F6"
              xChannel="saturation"
              yChannel="brightness"
            >
              <ColorArea.Thumb />
            </ColorArea>
            <ColorSlider
              aria-label="Hue"
              channel="hue"
              colorSpace="hsb"
              defaultValue="hsl(220, 90%, 65%)"
            >
              <Label>Hue</Label>
              <ColorSlider.Output />
              <ColorSlider.Track>
                <ColorSlider.Thumb />
              </ColorSlider.Track>
            </ColorSlider>
          </PreviewStack>
        ),
        title: "Picker content",
      },
    ],
    id: "color-picker",
    title: "ColorPicker",
  },
  {
    category: "Colors",
    description: "Channel slider for color adjustment.",
    examples: [
      {
        preview: (
          <ColorSlider
            channel="hue"
            className="field-width"
            defaultValue="hsl(0, 100%, 50%)"
          >
            <Label>Hue</Label>
            <ColorSlider.Output />
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>
        ),
        title: "Hue",
      },
    ],
    id: "color-slider",
    title: "ColorSlider",
  },
  {
    category: "Colors",
    description: "Visual color preview.",
    examples: [
      {
        preview: (
          <PreviewRow>
            {colorSwatches.slice(0, 5).map((color) => (
              <ColorSwatch key={color} color={color} />
            ))}
          </PreviewRow>
        ),
        title: "Colors",
      },
    ],
    id: "color-swatch",
    title: "ColorSwatch",
  },
  {
    category: "Colors",
    description: "Selectable collection of swatches.",
    examples: [{ preview: <ColorSwatchPickerPreview />, title: "Basic" }],
    id: "color-swatch-picker",
    title: "ColorSwatchPicker",
  },
  {
    category: "Controls",
    description: "Range selection control.",
    examples: [{ preview: <SliderPreview />, title: "Basic" }],
    id: "slider",
    title: "Slider",
  },
  {
    category: "Controls",
    description: "Binary setting control.",
    examples: [{ preview: <SwitchPreview />, title: "States" }],
    id: "switch",
    title: "Switch",
  },
  {
    category: "Data Display",
    description: "Avatar image and fallback display.",
    examples: [{ preview: <AvatarPreview />, title: "Fallbacks" }],
    id: "avatar",
    title: "Avatar",
  },
  {
    category: "Data Display",
    description: "Small status or count indicator.",
    examples: [{ preview: <BadgePreview />, title: "Anchored badges" }],
    id: "badge",
    title: "Badge",
  },
  {
    category: "Data Display",
    description: "Compact status and filter labels.",
    examples: [{ preview: <ChipPreview />, title: "Colors" }],
    id: "chip",
    title: "Chip",
  },
  {
    category: "Data Display",
    description: "Structured tabular data.",
    examples: [
      { preview: <TablePreview />, size: "wide", title: "Sortable table" },
    ],
    id: "table",
    title: "Table",
  },
  {
    category: "Date and Time",
    description: "Calendar month selection grid.",
    examples: [{ preview: <CalendarPreview />, title: "Basic" }],
    id: "calendar",
    title: "Calendar",
  },
  {
    category: "Date and Time",
    description: "Date input field.",
    examples: [
      {
        preview: (
          <DateField className="field-width" name="date">
            <Label>Date</Label>
            <DateField.Group>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </DateField>
        ),
        title: "Basic",
      },
    ],
    id: "date-field",
    title: "DateField",
  },
  {
    category: "Date and Time",
    description: "Date field with calendar popover.",
    examples: [{ preview: <DatePickerPreview />, title: "Basic" }],
    id: "date-picker",
    title: "DatePicker",
  },
  {
    category: "Date and Time",
    description: "Time input field.",
    examples: [
      {
        preview: (
          <TimeField className="field-width" name="time">
            <Label>Time</Label>
            <DateField.Group>
              <TimeField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </TimeField.Input>
            </DateField.Group>
          </TimeField>
        ),
        title: "Basic",
      },
    ],
    id: "time-field",
    title: "TimeField",
  },
  {
    category: "Feedback",
    description: "Inline status message.",
    examples: [{ preview: <FeedbackPreview />, title: "Accent" }],
    id: "alert",
    title: "Alert",
  },
  {
    category: "Feedback",
    description: "Linear and meter progress display.",
    examples: [{ preview: <ProgressPreview />, title: "Progress" }],
    id: "progress-bar",
    title: "ProgressBar",
  },
  {
    category: "Feedback",
    description: "Circular progress display.",
    examples: [
      {
        preview: <ProgressCirclePreview />,
        title: "Determinate and indeterminate",
      },
    ],
    id: "progress-circle",
    title: "ProgressCircle",
  },
  {
    category: "Feedback",
    description: "Loading placeholder.",
    examples: [{ preview: <SkeletonPreview />, title: "Lines" }],
    id: "skeleton",
    title: "Skeleton",
  },
  {
    category: "Feedback",
    description: "Loading indicator.",
    examples: [
      {
        preview: (
          <PreviewRow>
            <Spinner color="accent" />
            <Spinner color="danger" size="lg" />
          </PreviewRow>
        ),
        title: "Colors",
      },
    ],
    id: "spinner",
    title: "Spinner",
  },
  {
    category: "Feedback",
    description: "Empty surface state.",
    examples: [
      {
        preview: <EmptyState>No components found</EmptyState>,
        title: "Basic",
      },
    ],
    id: "empty-state",
    title: "EmptyState",
  },
  {
    category: "Forms",
    description: "Binary form input.",
    examples: [{ preview: <CheckboxPreview />, title: "Basic" }],
    id: "checkbox",
    title: "Checkbox",
  },
  {
    category: "Forms",
    description: "Grouped checkbox controls.",
    examples: [{ preview: <CheckboxGroupPreview />, title: "Basic" }],
    id: "checkbox-group",
    title: "CheckboxGroup",
  },
  {
    category: "Forms",
    description: "Single line text input.",
    examples: [{ preview: <InputPreview />, title: "Variants" }],
    id: "input",
    title: "Input",
  },
  {
    category: "Forms",
    description: "Input with prefix and suffix slots.",
    examples: [{ preview: <InputGroupPreview />, title: "Basic" }],
    id: "input-group",
    title: "InputGroup",
  },
  {
    category: "Forms",
    description: "One-time password field.",
    examples: [{ preview: <InputOTPPreview />, title: "Basic" }],
    id: "input-otp",
    title: "InputOTP",
  },
  {
    category: "Forms",
    description: "Numeric field with steppers.",
    examples: [{ preview: <NumberFieldPreview />, title: "Basic" }],
    id: "number-field",
    title: "NumberField",
  },
  {
    category: "Forms",
    description: "Single choice radio group.",
    examples: [{ preview: <RadioGroupPreview />, title: "Basic" }],
    id: "radio-group",
    title: "RadioGroup",
  },
  {
    category: "Forms",
    description: "Search field with clear action.",
    examples: [{ preview: <SearchFieldPreview />, title: "Basic" }],
    id: "search-field",
    title: "SearchField",
  },
  {
    category: "Forms",
    description: "Select control with list popover.",
    examples: [{ preview: <SelectPreview />, title: "Basic" }],
    id: "select",
    title: "Select",
  },
  {
    category: "Forms",
    description: "Searchable combo box.",
    examples: [{ preview: <ComboBoxPreview />, title: "Basic" }],
    id: "combo-box",
    title: "ComboBox",
  },
  {
    category: "Forms",
    description: "Composed text field.",
    examples: [{ preview: <TextFieldPreview />, title: "Basic" }],
    id: "text-field",
    title: "TextField",
  },
  {
    category: "Forms",
    description: "Multi-line text input.",
    examples: [
      {
        preview: (
          <div className="field-wrapper">
            <Label>Notes</Label>
            <TextArea
              aria-label="Notes"
              className="field-width"
              defaultValue="Notes about this component."
              name="notes"
            />
          </div>
        ),
        title: "Basic",
      },
    ],
    id: "text-area",
    title: "TextArea",
  },
  {
    category: "Forms",
    description: "Native form wrapper.",
    examples: [{ preview: <FormPreview />, title: "Basic" }],
    id: "form",
    title: "Form",
  },
  {
    category: "Forms",
    description: "Related form controls with a legend.",
    examples: [{ preview: <FieldsetPreview />, title: "Basic" }],
    id: "fieldset",
    title: "Fieldset",
  },
  {
    category: "Layout",
    description: "Stacked collapsible sections.",
    examples: [{ preview: <AccordionPreview />, title: "Basic" }],
    id: "accordion",
    title: "Accordion",
  },
  {
    category: "Layout",
    description: "Content container.",
    examples: [{ preview: <CardPreview />, title: "Basic" }],
    id: "card",
    title: "Card",
  },
  {
    category: "Layout",
    description: "Single collapsible section.",
    examples: [{ preview: <DisclosurePreview />, title: "Basic" }],
    id: "disclosure",
    title: "Disclosure",
  },
  {
    category: "Layout",
    description: "Grouped disclosure sections.",
    examples: [{ preview: <DisclosureGroupPreview />, title: "Basic" }],
    id: "disclosure-group",
    title: "DisclosureGroup",
  },
  {
    category: "Layout",
    description: "Visual divider.",
    examples: [
      {
        preview: (
          <div className="separator-demo">
            <span>Before</span>
            <Separator />
            <span>After</span>
          </div>
        ),
        title: "Horizontal",
      },
    ],
    id: "separator",
    title: "Separator",
  },
  {
    category: "Layout",
    description: "Keyboard navigable action bar.",
    examples: [{ preview: <ToolbarPreview />, size: "wide", title: "Actions" }],
    id: "toolbar",
    title: "Toolbar",
  },
  {
    category: "Navigation",
    description: "Current location trail.",
    examples: [{ preview: <BreadcrumbsPreview />, title: "Basic" }],
    id: "breadcrumbs",
    title: "Breadcrumbs",
  },
  {
    category: "Navigation",
    description: "Page navigation control.",
    examples: [{ preview: <PaginationPreview />, title: "Basic" }],
    id: "pagination",
    title: "Pagination",
  },
  {
    category: "Navigation",
    description: "Tabbed content navigation.",
    examples: [{ preview: <TabsPreview />, title: "Basic" }],
    id: "tabs",
    title: "Tabs",
  },
  {
    category: "Overlays",
    description: "Small contextual panel.",
    examples: [{ preview: <PopoverPreview />, title: "Basic" }],
    id: "popover",
    title: "Popover",
  },
  {
    category: "Overlays",
    description: "Hover and focus hint.",
    examples: [{ preview: <TooltipPreview />, title: "Basic" }],
    id: "tooltip",
    title: "Tooltip",
  },
  {
    category: "Overlays",
    description: "Dialog overlay.",
    examples: [{ preview: <ModalPreview />, title: "Basic" }],
    id: "modal",
    title: "Modal",
  },
  {
    category: "Overlays",
    description: "Side panel overlay.",
    examples: [{ preview: <DrawerPreview />, title: "Basic" }],
    id: "drawer",
    title: "Drawer",
  },
  {
    category: "Typography",
    description: "Text, link, and heading styles.",
    examples: [{ preview: <TypographyPreview />, title: "Basic" }],
    id: "typography",
    title: "Typography",
  },
  {
    category: "Typography",
    description: "Keyboard shortcut display.",
    examples: [{ preview: <KbdPreview />, title: "Basic" }],
    id: "kbd",
    title: "Kbd",
  },
];

export const componentById = new Map(
  components.map((component) => [component.id, component]),
);

export function getComponent(id: string) {
  return componentById.get(id);
}

export function getComponentsByCategory() {
  return categoryOrder
    .map((category) => ({
      category,
      components: components.filter(
        (component) => component.category === category,
      ),
    }))
    .filter((group) => group.components.length > 0);
}
