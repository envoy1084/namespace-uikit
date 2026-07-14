import type { ComponentType } from "react";

export interface GalleryDemo {
  component: string;
  demo: string;
  loader: () => Promise<ComponentType>;
}

export const galleryDemos: GalleryDemo[] = [
  {
    component: "accordion",
    demo: "accordion-basic",
    loader: () => import("./accordion/basic").then((module) => module.Basic),
  },
  {
    component: "action-bar",
    demo: "action-bar-default",
    loader: () =>
      import("./action-bar/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "agenda",
    demo: "agenda-default",
    loader: () =>
      import("./agenda/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "alert",
    demo: "alert-basic",
    loader: () => import("./alert/basic").then((module) => module.Basic),
  },
  {
    component: "alert-dialog",
    demo: "alert-dialog-default",
    loader: () =>
      import("./alert-dialog/default").then((module) => module.Default),
  },
  {
    component: "app-layout",
    demo: "app-layout-inset-dashboard",
    loader: () =>
      import("./app-layout/inset-dashboard.demo").then(
        (module) => module.DemoInsetDashboardExample,
      ),
  },
  {
    component: "area-chart",
    demo: "area-chart-default",
    loader: () =>
      import("./area-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "autocomplete",
    demo: "autocomplete-default",
    loader: () =>
      import("./autocomplete/default").then((module) => module.default),
  },
  {
    component: "avatar",
    demo: "avatar-basic",
    loader: () => import("./avatar/basic").then((module) => module.Basic),
  },
  {
    component: "badge",
    demo: "badge-basic",
    loader: () => import("./badge/basic").then((module) => module.BadgeBasic),
  },
  {
    component: "bar-chart",
    demo: "bar-chart-default",
    loader: () =>
      import("./bar-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "breadcrumbs",
    demo: "breadcrumbs-basic",
    loader: () =>
      import("./breadcrumbs/basic").then((module) => module.default),
  },
  {
    component: "button",
    demo: "button-basic",
    loader: () => import("./button/basic").then((module) => module.Basic),
  },
  {
    component: "button-group",
    demo: "button-group-basic",
    loader: () => import("./button-group/basic").then((module) => module.Basic),
  },
  {
    component: "calendar",
    demo: "calendar-booking-calendar",
    loader: () =>
      import("./calendar/booking-calendar").then(
        (module) => module.BookingCalendar,
      ),
  },
  {
    component: "card",
    demo: "card-default",
    loader: () => import("./card/default").then((module) => module.Default),
  },
  {
    component: "carousel",
    demo: "carousel-default",
    loader: () =>
      import("./carousel/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "cell-color-picker",
    demo: "cell-color-picker-default",
    loader: () =>
      import("./cell-color-picker/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "cell-select",
    demo: "cell-select-default",
    loader: () =>
      import("./cell-select/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "cell-slider",
    demo: "cell-slider-default",
    loader: () =>
      import("./cell-slider/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "cell-switch",
    demo: "cell-switch-default",
    loader: () =>
      import("./cell-switch/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chain-of-thought",
    demo: "chain-of-thought-default",
    loader: () =>
      import("./chain-of-thought/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chart-tooltip",
    demo: "chart-tooltip-default",
    loader: () =>
      import("./chart-tooltip/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-attachment",
    demo: "chat-attachment-default",
    loader: () =>
      import("./chat-attachment/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-conversation",
    demo: "chat-conversation-full-chat",
    loader: () =>
      import("./chat-conversation/full-chat.demo").then(
        (module) => module.DemoFullChatExample,
      ),
  },
  {
    component: "chat-list-view",
    demo: "chat-list-view-default",
    loader: () =>
      import("./chat-list-view/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-loader",
    demo: "chat-loader-default",
    loader: () =>
      import("./chat-loader/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-message",
    demo: "chat-message-default",
    loader: () =>
      import("./chat-message/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-message-actions",
    demo: "chat-message-actions-default",
    loader: () =>
      import("./chat-message-actions/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-source",
    demo: "chat-source-default",
    loader: () =>
      import("./chat-source/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "chat-tool",
    demo: "chat-tool-default",
    loader: () =>
      import("./chat-tool/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "checkbox",
    demo: "checkbox-basic",
    loader: () => import("./checkbox/basic").then((module) => module.Basic),
  },
  {
    component: "checkbox-button-group",
    demo: "checkbox-button-group-default",
    loader: () =>
      import("./checkbox-button-group/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "checkbox-group",
    demo: "checkbox-group-basic",
    loader: () =>
      import("./checkbox-group/basic").then((module) => module.Basic),
  },
  {
    component: "chip",
    demo: "chip-basic",
    loader: () => import("./chip/basic").then((module) => module.ChipBasic),
  },
  {
    component: "close-button",
    demo: "close-button-default",
    loader: () =>
      import("./close-button/default").then((module) => module.Default),
  },
  {
    component: "code-block",
    demo: "code-block-default",
    loader: () =>
      import("./code-block/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "color-area",
    demo: "color-area-basic",
    loader: () =>
      import("./color-area/basic").then((module) => module.ColorAreaBasic),
  },
  {
    component: "color-field",
    demo: "color-field-basic",
    loader: () => import("./color-field/basic").then((module) => module.Basic),
  },
  {
    component: "color-picker",
    demo: "color-picker-basic",
    loader: () => import("./color-picker/basic").then((module) => module.Basic),
  },
  {
    component: "color-slider",
    demo: "color-slider-basic",
    loader: () => import("./color-slider/basic").then((module) => module.Basic),
  },
  {
    component: "color-swatch",
    demo: "color-swatch-basic",
    loader: () =>
      import("./color-swatch/basic").then((module) => module.ColorSwatchBasic),
  },
  {
    component: "color-swatch-picker",
    demo: "color-swatch-picker-basic",
    loader: () =>
      import("./color-swatch-picker/basic").then((module) => module.Basic),
  },
  {
    component: "combo-box",
    demo: "combo-box-default",
    loader: () =>
      import("./combo-box/default").then((module) => module.Default),
  },
  {
    component: "command",
    demo: "command-default",
    loader: () =>
      import("./command/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "composed-chart",
    demo: "composed-chart-default",
    loader: () =>
      import("./composed-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "context-menu",
    demo: "context-menu-default",
    loader: () =>
      import("./context-menu/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "data-grid",
    demo: "data-grid-complex",
    loader: () =>
      import("./data-grid/complex.demo").then(
        (module) => module.DemoComplexExample,
      ),
  },
  {
    component: "date-field",
    demo: "date-field-basic",
    loader: () => import("./date-field/basic").then((module) => module.Basic),
  },
  {
    component: "date-picker",
    demo: "date-picker-basic",
    loader: () => import("./date-picker/basic").then((module) => module.Basic),
  },
  {
    component: "date-range-picker",
    demo: "date-range-picker-basic",
    loader: () =>
      import("./date-range-picker/basic").then((module) => module.Basic),
  },
  {
    component: "description",
    demo: "description-basic",
    loader: () => import("./description/basic").then((module) => module.Basic),
  },
  {
    component: "disclosure",
    demo: "disclosure-basic",
    loader: () => import("./disclosure/basic").then((module) => module.Basic),
  },
  {
    component: "disclosure-group",
    demo: "disclosure-group-basic",
    loader: () =>
      import("./disclosure-group/basic").then((module) => module.Basic),
  },
  {
    component: "drawer",
    demo: "drawer-basic",
    loader: () => import("./drawer/basic").then((module) => module.Basic),
  },
  {
    component: "drop-zone",
    demo: "drop-zone-default",
    loader: () =>
      import("./drop-zone/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "dropdown",
    demo: "dropdown-default",
    loader: () => import("./dropdown/default").then((module) => module.Default),
  },
  {
    component: "emoji-picker",
    demo: "emoji-picker-default",
    loader: () =>
      import("./emoji-picker/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "emoji-reaction-button",
    demo: "emoji-reaction-button-default",
    loader: () =>
      import("./emoji-reaction-button/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "empty-state",
    demo: "empty-state-default",
    loader: () =>
      import("./empty-state/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "error-message",
    demo: "error-message-basic",
    loader: () =>
      import("./error-message/basic").then(
        (module) => module.ErrorMessageBasic,
      ),
  },
  {
    component: "field-error",
    demo: "field-error-basic",
    loader: () => import("./field-error/basic").then((module) => module.Basic),
  },
  {
    component: "fieldset",
    demo: "fieldset-basic",
    loader: () => import("./fieldset/basic").then((module) => module.Basic),
  },
  {
    component: "file-tree",
    demo: "file-tree-default",
    loader: () =>
      import("./file-tree/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "floating-toc",
    demo: "floating-toc-default",
    loader: () =>
      import("./floating-toc/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "form",
    demo: "form-basic",
    loader: () => import("./form/basic").then((module) => module.Basic),
  },
  {
    component: "hover-card",
    demo: "hover-card-default",
    loader: () =>
      import("./hover-card/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "inline-select",
    demo: "inline-select-default",
    loader: () =>
      import("./inline-select/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "input",
    demo: "input-basic",
    loader: () => import("./input/basic").then((module) => module.Basic),
  },
  {
    component: "input-group",
    demo: "input-group-default",
    loader: () =>
      import("./input-group/default").then((module) => module.Default),
  },
  {
    component: "input-otp",
    demo: "input-otp-basic",
    loader: () => import("./input-otp/basic").then((module) => module.Basic),
  },
  {
    component: "item-card",
    demo: "item-card-default",
    loader: () =>
      import("./item-card/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "item-card-group",
    demo: "item-card-group-developer-settings",
    loader: () =>
      import("./item-card-group/developer-settings.demo").then(
        (module) => module.DemoDeveloperSettingsExample,
      ),
  },
  {
    component: "kanban",
    demo: "kanban-project-board",
    loader: () =>
      import("./kanban/project-board.demo").then(
        (module) => module.DemoProjectBoardExample,
      ),
  },
  {
    component: "kbd",
    demo: "kbd-basic",
    loader: () => import("./kbd/basic").then((module) => module.Basic),
  },
  {
    component: "kpi",
    demo: "kpi-default",
    loader: () =>
      import("./kpi/default.demo").then((module) => module.DemoDefaultExample),
  },
  {
    component: "kpi-group",
    demo: "kpi-group-horizontal",
    loader: () =>
      import("./kpi-group/horizontal.demo").then(
        (module) => module.DemoHorizontalExample,
      ),
  },
  {
    component: "label",
    demo: "label-basic",
    loader: () => import("./label/basic").then((module) => module.Basic),
  },
  {
    component: "line-chart",
    demo: "line-chart-portfolio",
    loader: () =>
      import("./line-chart/portfolio.demo").then(
        (module) => module.DemoPortfolioExample,
      ),
  },
  {
    component: "link",
    demo: "link-basic",
    loader: () => import("./link/basic").then((module) => module.LinkBasic),
  },
  {
    component: "list-box",
    demo: "list-box-default",
    loader: () => import("./list-box/default").then((module) => module.Default),
  },
  {
    component: "list-view",
    demo: "list-view-default",
    loader: () =>
      import("./list-view/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "map",
    demo: "map-global-newsroom",
    loader: () =>
      import("./map/global-newsroom.demo").then(
        (module) => module.DemoGlobalNewsroomExample,
      ),
  },
  {
    component: "markdown",
    demo: "markdown-default",
    loader: () =>
      import("./markdown/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "meter",
    demo: "meter-basic",
    loader: () => import("./meter/basic").then((module) => module.Basic),
  },
  {
    component: "modal",
    demo: "modal-default",
    loader: () => import("./modal/default").then((module) => module.Default),
  },
  {
    component: "native-select",
    demo: "native-select-default",
    loader: () =>
      import("./native-select/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "navbar",
    demo: "navbar-dashboard",
    loader: () =>
      import("./navbar/dashboard.demo").then(
        (module) => module.DemoDashboardExample,
      ),
  },
  {
    component: "number-field",
    demo: "number-field-basic",
    loader: () => import("./number-field/basic").then((module) => module.Basic),
  },
  {
    component: "number-stepper",
    demo: "number-stepper-default",
    loader: () =>
      import("./number-stepper/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "number-value",
    demo: "number-value-compact",
    loader: () =>
      import("./number-value/compact.demo").then(
        (module) => module.DemoCompactExample,
      ),
  },
  {
    component: "pagination",
    demo: "pagination-basic",
    loader: () =>
      import("./pagination/basic").then((module) => module.PaginationBasic),
  },
  {
    component: "pie-chart",
    demo: "pie-chart-default",
    loader: () =>
      import("./pie-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "popover",
    demo: "popover-basic",
    loader: () =>
      import("./popover/basic").then((module) => module.PopoverBasic),
  },
  {
    component: "pressable-feedback",
    demo: "pressable-feedback-comparison",
    loader: () =>
      import("./pressable-feedback/comparison.demo").then(
        (module) => module.DemoComparisonExample,
      ),
  },
  {
    component: "progress-bar",
    demo: "progress-bar-basic",
    loader: () => import("./progress-bar/basic").then((module) => module.Basic),
  },
  {
    component: "progress-circle",
    demo: "progress-circle-basic",
    loader: () =>
      import("./progress-circle/basic").then((module) => module.Basic),
  },
  {
    component: "prompt-input",
    demo: "prompt-input-review-composer",
    loader: () =>
      import("./prompt-input/review-composer.demo").then(
        (module) => module.DemoReviewComposerExample,
      ),
  },
  {
    component: "prompt-suggestion",
    demo: "prompt-suggestion-default",
    loader: () =>
      import("./prompt-suggestion/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "radar-chart",
    demo: "radar-chart-default",
    loader: () =>
      import("./radar-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "radial-chart",
    demo: "radial-chart-default",
    loader: () =>
      import("./radial-chart/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "radio-button-group",
    demo: "radio-button-group-default",
    loader: () =>
      import("./radio-button-group/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "radio-group",
    demo: "radio-group-basic",
    loader: () => import("./radio-group/basic").then((module) => module.Basic),
  },
  {
    component: "range-calendar",
    demo: "range-calendar-basic",
    loader: () =>
      import("./range-calendar/basic").then((module) => module.Basic),
  },
  {
    component: "rating",
    demo: "rating-default",
    loader: () =>
      import("./rating/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "resizable",
    demo: "resizable-default",
    loader: () =>
      import("./resizable/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "rich-text-editor",
    demo: "rich-text-editor-default",
    loader: () =>
      import("./rich-text-editor/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "scroll-shadow",
    demo: "scroll-shadow-default",
    loader: () =>
      import("./scroll-shadow/default").then((module) => module.default),
  },
  {
    component: "search-field",
    demo: "search-field-basic",
    loader: () => import("./search-field/basic").then((module) => module.Basic),
  },
  {
    component: "segment",
    demo: "segment-default",
    loader: () =>
      import("./segment/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "select",
    demo: "select-default",
    loader: () => import("./select/default").then((module) => module.Default),
  },
  {
    component: "separator",
    demo: "separator-basic",
    loader: () => import("./separator/basic").then((module) => module.Basic),
  },
  {
    component: "sheet",
    demo: "sheet-detached",
    loader: () =>
      import("./sheet/detached.demo").then(
        (module) => module.DemoDetachedExample,
      ),
  },
  {
    component: "sidebar",
    demo: "sidebar-agent-workspace",
    loader: () =>
      import("./sidebar/agent-workspace.demo").then(
        (module) => module.DemoAgentWorkspaceExample,
      ),
  },
  {
    component: "skeleton",
    demo: "skeleton-basic",
    loader: () => import("./skeleton/basic").then((module) => module.Basic),
  },
  {
    component: "slider",
    demo: "slider-default",
    loader: () => import("./slider/default").then((module) => module.Default),
  },
  {
    component: "spinner",
    demo: "spinner-basic",
    loader: () =>
      import("./spinner/basic").then((module) => module.SpinnerBasic),
  },
  {
    component: "stepper",
    demo: "stepper-default",
    loader: () =>
      import("./stepper/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "surface",
    demo: "surface-variants",
    loader: () =>
      import("./surface/variants").then((module) => module.Variants),
  },
  {
    component: "switch",
    demo: "switch-basic",
    loader: () => import("./switch/basic").then((module) => module.Basic),
  },
  {
    component: "table",
    demo: "table-custom-cells",
    loader: () =>
      import("./table/custom-cells").then((module) => module.CustomCells),
  },
  {
    component: "tabs",
    demo: "tabs-custom-render-function",
    loader: () =>
      import("./tabs/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
  },
  {
    component: "tag-group",
    demo: "tag-group-basic",
    loader: () =>
      import("./tag-group/basic").then((module) => module.TagGroupBasic),
  },
  {
    component: "text-area",
    demo: "textarea-basic",
    loader: () => import("./textarea/basic").then((module) => module.Basic),
  },
  {
    component: "text-field",
    demo: "textfield-basic",
    loader: () => import("./textfield/basic").then((module) => module.Basic),
  },
  {
    component: "text-shimmer",
    demo: "text-shimmer-default",
    loader: () =>
      import("./text-shimmer/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "time-field",
    demo: "time-field-basic",
    loader: () => import("./time-field/basic").then((module) => module.Basic),
  },
  {
    component: "timeline",
    demo: "timeline-incident-response",
    loader: () =>
      import("./timeline/incident-response.demo").then(
        (module) => module.DemoIncidentResponseExample,
      ),
  },
  {
    component: "toast",
    demo: "toast-default",
    loader: () => import("./toast/default").then((module) => module.Default),
  },
  {
    component: "toggle-button",
    demo: "toggle-button-basic",
    loader: () =>
      import("./toggle-button/basic").then((module) => module.Basic),
  },
  {
    component: "toggle-button-group",
    demo: "toggle-button-group-basic",
    loader: () =>
      import("./toggle-button-group/basic").then((module) => module.Basic),
  },
  {
    component: "toolbar",
    demo: "toolbar-basic",
    loader: () => import("./toolbar/basic").then((module) => module.Basic),
  },
  {
    component: "tooltip",
    demo: "tooltip-basic",
    loader: () =>
      import("./tooltip/basic").then((module) => module.TooltipBasic),
  },
  {
    component: "trend-chip",
    demo: "trend-chip-default",
    loader: () =>
      import("./trend-chip/default.demo").then(
        (module) => module.DemoDefaultExample,
      ),
  },
  {
    component: "typography",
    demo: "typography-primitives",
    loader: () =>
      import("./typography/primitives").then((module) => module.Primitives),
  },
  {
    component: "widget",
    demo: "widget-dashboard-grid",
    loader: () =>
      import("./widget/dashboard-grid.demo").then(
        (module) => module.DemoDashboardGridExample,
      ),
  },
];
