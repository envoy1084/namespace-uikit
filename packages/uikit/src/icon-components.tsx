import type { ComponentProps, ComponentType } from "react";

import {
  Add01Icon,
  AddSquareIcon,
  Alert01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Attachment01Icon,
  AtIcon,
  Bookmark01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  CheckmarkSquare02Icon,
  CircleIcon,
  Clock01Icon,
  Comment01Icon,
  Copy01Icon,
  CreditCardIcon,
  Delete02Icon,
  DollarCircleIcon,
  EyeIcon,
  FavouriteIcon,
  File02Icon,
  FloppyDiskIcon,
  FolderOpenIcon,
  GitForkIcon,
  Globe02Icon,
  HardDriveIcon,
  HelpCircleIcon,
  Home01Icon,
  Image01Icon,
  InformationCircleIcon,
  Link01Icon,
  Mail01Icon,
  Menu01Icon,
  Mic01Icon,
  MicOff01Icon,
  Moon02Icon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  Notification01Icon,
  NotificationOff01Icon,
  PackageIcon,
  PaintBoardIcon,
  PencilEdit01Icon,
  PinIcon,
  Plug01Icon,
  PowerServiceIcon,
  QrCodeIcon,
  ReceiptDollarIcon,
  RefreshIcon,
  Remove01Icon,
  Rocket01Icon,
  ScissorIcon,
  Search01Icon,
  Settings01Icon,
  ShoppingBag01Icon,
  SparklesIcon,
  SquareUnlock01Icon,
  StarIcon,
  Sun01Icon,
  TextAlignCenterIcon,
  TextAlignJustifyCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  UnavailableIcon,
  UnfoldMoreIcon,
  Upload01Icon,
  UserGroupIcon,
  UserIcon,
  Video01Icon,
  ViewOffIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

type UIKitIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon">;

function createIcon(
  displayName: string,
  icon: IconSvgElement,
): ComponentType<UIKitIconProps> {
  function UIKitIcon(props: UIKitIconProps) {
    return <HugeiconsIcon icon={icon} {...props} />;
  }

  UIKitIcon.displayName = displayName;
  return UIKitIcon;
}

export const ArrowRight: ComponentType<UIKitIconProps> = createIcon(
  "ArrowRight",
  ArrowRight01Icon,
);
export const ArrowRightFromSquare: ComponentType<UIKitIconProps> = createIcon(
  "ArrowRightFromSquare",
  ArrowUpRight01Icon,
);
export const ArrowUp: ComponentType<UIKitIconProps> = createIcon(
  "ArrowUp",
  ArrowUp01Icon,
);
export const ArrowUpFromLine: ComponentType<UIKitIconProps> = createIcon(
  "ArrowUpFromLine",
  Upload01Icon,
);
export const ArrowUpRightFromSquare: ComponentType<UIKitIconProps> = createIcon(
  "ArrowUpRightFromSquare",
  ArrowUpRight01Icon,
);
export const ArrowUturnCcwLeft: ComponentType<UIKitIconProps> = createIcon(
  "ArrowUturnCcwLeft",
  RefreshIcon,
);
export const ArrowUturnCwRight: ComponentType<UIKitIconProps> = createIcon(
  "ArrowUturnCwRight",
  RefreshIcon,
);
export const ArrowsRotateLeft: ComponentType<UIKitIconProps> = createIcon(
  "ArrowsRotateLeft",
  RefreshIcon,
);
export const At: ComponentType<UIKitIconProps> = createIcon("At", AtIcon);
export const Ban: ComponentType<UIKitIconProps> = createIcon(
  "Ban",
  UnavailableIcon,
);
export const Bars: ComponentType<UIKitIconProps> = createIcon(
  "Bars",
  Menu01Icon,
);
export const Bell: ComponentType<UIKitIconProps> = createIcon(
  "Bell",
  Notification01Icon,
);
export const BellFill: ComponentType<UIKitIconProps> = createIcon(
  "BellFill",
  Notification01Icon,
);
export const BellSlash: ComponentType<UIKitIconProps> = createIcon(
  "BellSlash",
  NotificationOff01Icon,
);
export const Bold: ComponentType<UIKitIconProps> = createIcon(
  "Bold",
  TextBoldIcon,
);
export const Bookmark: ComponentType<UIKitIconProps> = createIcon(
  "Bookmark",
  Bookmark01Icon,
);
export const Box: ComponentType<UIKitIconProps> = createIcon(
  "Box",
  PackageIcon,
);
export const Calendar: ComponentType<UIKitIconProps> = createIcon(
  "Calendar",
  Calendar03Icon,
);
export const Check: ComponentType<UIKitIconProps> = createIcon(
  "Check",
  CheckmarkSquare02Icon,
);
export const ChevronDown: ComponentType<UIKitIconProps> = createIcon(
  "ChevronDown",
  ArrowDown01Icon,
);
export const ChevronLeft: ComponentType<UIKitIconProps> = createIcon(
  "ChevronLeft",
  ArrowLeft01Icon,
);
export const ChevronRight: ComponentType<UIKitIconProps> = createIcon(
  "ChevronRight",
  ArrowRight01Icon,
);
export const ChevronUp: ComponentType<UIKitIconProps> = createIcon(
  "ChevronUp",
  ArrowUp01Icon,
);
export const ChevronsDown: ComponentType<UIKitIconProps> = createIcon(
  "ChevronsDown",
  ArrowDown01Icon,
);
export const ChevronsExpandVertical: ComponentType<UIKitIconProps> = createIcon(
  "ChevronsExpandVertical",
  UnfoldMoreIcon,
);
export const CircleCheck: ComponentType<UIKitIconProps> = createIcon(
  "CircleCheck",
  CheckmarkCircle02Icon,
);
export const CircleCheckFill: ComponentType<UIKitIconProps> = createIcon(
  "CircleCheckFill",
  CheckmarkCircle02Icon,
);
export const CircleChevronDown: ComponentType<UIKitIconProps> = createIcon(
  "CircleChevronDown",
  ArrowDown01Icon,
);
export const CircleDashed: ComponentType<UIKitIconProps> = createIcon(
  "CircleDashed",
  CircleIcon,
);
export const CircleDollar: ComponentType<UIKitIconProps> = createIcon(
  "CircleDollar",
  DollarCircleIcon,
);
export const CircleFill: ComponentType<UIKitIconProps> = createIcon(
  "CircleFill",
  CircleIcon,
);
export const CircleInfo: ComponentType<UIKitIconProps> = createIcon(
  "CircleInfo",
  InformationCircleIcon,
);
export const CircleQuestion: ComponentType<UIKitIconProps> = createIcon(
  "CircleQuestion",
  HelpCircleIcon,
);
export const CircleXmark: ComponentType<UIKitIconProps> = createIcon(
  "CircleXmark",
  CancelCircleIcon,
);
export const CircleXmarkFill: ComponentType<UIKitIconProps> = createIcon(
  "CircleXmarkFill",
  CancelCircleIcon,
);
export const Clock: ComponentType<UIKitIconProps> = createIcon(
  "Clock",
  Clock01Icon,
);
export const CodeFork: ComponentType<UIKitIconProps> = createIcon(
  "CodeFork",
  GitForkIcon,
);
export const Comment: ComponentType<UIKitIconProps> = createIcon(
  "Comment",
  Comment01Icon,
);
export const Copy: ComponentType<UIKitIconProps> = createIcon(
  "Copy",
  Copy01Icon,
);
export const CreditCard: ComponentType<UIKitIconProps> = createIcon(
  "CreditCard",
  CreditCardIcon,
);
export const Ellipsis: ComponentType<UIKitIconProps> = createIcon(
  "Ellipsis",
  MoreHorizontalIcon,
);
export const EllipsisVertical: ComponentType<UIKitIconProps> = createIcon(
  "EllipsisVertical",
  MoreVerticalIcon,
);
export const Envelope: ComponentType<UIKitIconProps> = createIcon(
  "Envelope",
  Mail01Icon,
);
export const Eye: ComponentType<UIKitIconProps> = createIcon("Eye", EyeIcon);
export const EyeSlash: ComponentType<UIKitIconProps> = createIcon(
  "EyeSlash",
  ViewOffIcon,
);
export const FloppyDisk: ComponentType<UIKitIconProps> = createIcon(
  "FloppyDisk",
  FloppyDiskIcon,
);
export const FolderOpen: ComponentType<UIKitIconProps> = createIcon(
  "FolderOpen",
  FolderOpenIcon,
);
export const Gear: ComponentType<UIKitIconProps> = createIcon(
  "Gear",
  Settings01Icon,
);
export const Globe: ComponentType<UIKitIconProps> = createIcon(
  "Globe",
  Globe02Icon,
);
export const HardDrive: ComponentType<UIKitIconProps> = createIcon(
  "HardDrive",
  HardDriveIcon,
);
export const Heart: ComponentType<UIKitIconProps> = createIcon(
  "Heart",
  FavouriteIcon,
);
export const HeartFill: ComponentType<UIKitIconProps> = createIcon(
  "HeartFill",
  FavouriteIcon,
);
export const House: ComponentType<UIKitIconProps> = createIcon(
  "House",
  Home01Icon,
);
export const Italic: ComponentType<UIKitIconProps> = createIcon(
  "Italic",
  TextItalicIcon,
);
export const Link: ComponentType<UIKitIconProps> = createIcon(
  "Link",
  Link01Icon,
);
export const LockOpen: ComponentType<UIKitIconProps> = createIcon(
  "LockOpen",
  SquareUnlock01Icon,
);
export const Magnifier: ComponentType<UIKitIconProps> = createIcon(
  "Magnifier",
  Search01Icon,
);
export const Microphone: ComponentType<UIKitIconProps> = createIcon(
  "Microphone",
  Mic01Icon,
);
export const MicrophoneSlash: ComponentType<UIKitIconProps> = createIcon(
  "MicrophoneSlash",
  MicOff01Icon,
);
export const Minus: ComponentType<UIKitIconProps> = createIcon(
  "Minus",
  Remove01Icon,
);
export const Moon: ComponentType<UIKitIconProps> = createIcon(
  "Moon",
  Moon02Icon,
);
export const Palette: ComponentType<UIKitIconProps> = createIcon(
  "Palette",
  PaintBoardIcon,
);
export const Paperclip: ComponentType<UIKitIconProps> = createIcon(
  "Paperclip",
  Attachment01Icon,
);
export const Pencil: ComponentType<UIKitIconProps> = createIcon(
  "Pencil",
  PencilEdit01Icon,
);
export const Person: ComponentType<UIKitIconProps> = createIcon(
  "Person",
  UserIcon,
);
export const Persons: ComponentType<UIKitIconProps> = createIcon(
  "Persons",
  UserGroupIcon,
);
export const Picture: ComponentType<UIKitIconProps> = createIcon(
  "Picture",
  Image01Icon,
);
export const Pin: ComponentType<UIKitIconProps> = createIcon("Pin", PinIcon);
export const PlanetEarth: ComponentType<UIKitIconProps> = createIcon(
  "PlanetEarth",
  Globe02Icon,
);
export const PlugConnection: ComponentType<UIKitIconProps> = createIcon(
  "PlugConnection",
  Plug01Icon,
);
export const Plus: ComponentType<UIKitIconProps> = createIcon(
  "Plus",
  Add01Icon,
);
export const Power: ComponentType<UIKitIconProps> = createIcon(
  "Power",
  PowerServiceIcon,
);
export const QrCode: ComponentType<UIKitIconProps> = createIcon(
  "QrCode",
  QrCodeIcon,
);
export const Receipt: ComponentType<UIKitIconProps> = createIcon(
  "Receipt",
  ReceiptDollarIcon,
);
export const Rocket: ComponentType<UIKitIconProps> = createIcon(
  "Rocket",
  Rocket01Icon,
);
export const Scissors: ComponentType<UIKitIconProps> = createIcon(
  "Scissors",
  ScissorIcon,
);
export const ShoppingBag: ComponentType<UIKitIconProps> = createIcon(
  "ShoppingBag",
  ShoppingBag01Icon,
);
export const Sparkles: ComponentType<UIKitIconProps> = createIcon(
  "Sparkles",
  SparklesIcon,
);
export const SquareArticle: ComponentType<UIKitIconProps> = createIcon(
  "SquareArticle",
  File02Icon,
);
export const SquarePlus: ComponentType<UIKitIconProps> = createIcon(
  "SquarePlus",
  AddSquareIcon,
);
export const Star: ComponentType<UIKitIconProps> = createIcon("Star", StarIcon);
export const Strikethrough: ComponentType<UIKitIconProps> = createIcon(
  "Strikethrough",
  TextStrikethroughIcon,
);
export const Sun: ComponentType<UIKitIconProps> = createIcon("Sun", Sun01Icon);
export const TextAlignCenter: ComponentType<UIKitIconProps> = createIcon(
  "TextAlignCenter",
  TextAlignCenterIcon,
);
export const TextAlignJustify: ComponentType<UIKitIconProps> = createIcon(
  "TextAlignJustify",
  TextAlignJustifyCenterIcon,
);
export const TextAlignLeft: ComponentType<UIKitIconProps> = createIcon(
  "TextAlignLeft",
  TextAlignLeftIcon,
);
export const TextAlignRight: ComponentType<UIKitIconProps> = createIcon(
  "TextAlignRight",
  TextAlignRightIcon,
);
export const ThumbsDown: ComponentType<UIKitIconProps> = createIcon(
  "ThumbsDown",
  ThumbsDownIcon,
);
export const ThumbsUp: ComponentType<UIKitIconProps> = createIcon(
  "ThumbsUp",
  ThumbsUpIcon,
);
export const TrashBin: ComponentType<UIKitIconProps> = createIcon(
  "TrashBin",
  Delete02Icon,
);
export const TriangleExclamation: ComponentType<UIKitIconProps> = createIcon(
  "TriangleExclamation",
  Alert01Icon,
);
export const Underline: ComponentType<UIKitIconProps> = createIcon(
  "Underline",
  TextUnderlineIcon,
);
export const Video: ComponentType<UIKitIconProps> = createIcon(
  "Video",
  Video01Icon,
);
export const VolumeFill: ComponentType<UIKitIconProps> = createIcon(
  "VolumeFill",
  VolumeHighIcon,
);
export const VolumeSlashFill: ComponentType<UIKitIconProps> = createIcon(
  "VolumeSlashFill",
  VolumeOffIcon,
);
export const Xmark: ComponentType<UIKitIconProps> = createIcon(
  "Xmark",
  Cancel01Icon,
);
