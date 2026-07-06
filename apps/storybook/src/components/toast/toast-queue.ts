import type {
  ButtonProps,
  ToastContentValue,
  ToastQueueOptions,
} from "@thenamespace/uikit";

import type { ReactNode } from "react";

export { ToastQueue, toast, toastQueue } from "@thenamespace/uikit";
export type { ToastContentValue, ToastQueueOptions };

export interface NamespaceToastOptions {
  actionProps?: ButtonProps;
  description?: ReactNode;
  indicator?: ReactNode;
  timeout?: number;
  title?: ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
}
