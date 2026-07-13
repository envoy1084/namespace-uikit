import type { ComponentType } from "react";

export interface Demo {
  file: string;
  loader: () => Promise<ComponentType>;
}

export const demos: Record<string, Demo> = {
  "accordion-basic": {
    loader: () => import("./accordion/basic").then((module) => module.Basic),
    file: "accordion/basic.tsx",
  },
  "accordion-controlled": {
    loader: () =>
      import("./accordion/controlled").then((module) => module.Controlled),
    file: "accordion/controlled.tsx",
  },
  "accordion-custom-indicator": {
    loader: () =>
      import("./accordion/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "accordion/custom-indicator.tsx",
  },
  "accordion-custom-render-function": {
    loader: () =>
      import("./accordion/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "accordion/custom-render-function.tsx",
  },
  "accordion-custom-styles": {
    loader: () =>
      import("./accordion/custom-styles").then((module) => module.CustomStyles),
    file: "accordion/custom-styles.tsx",
  },
  "accordion-disabled": {
    loader: () =>
      import("./accordion/disabled").then((module) => module.Disabled),
    file: "accordion/disabled.tsx",
  },
  "accordion-faq": {
    loader: () => import("./accordion/faq").then((module) => module.FAQ),
    file: "accordion/faq.tsx",
  },
  "accordion-multiple": {
    loader: () =>
      import("./accordion/multiple").then((module) => module.Multiple),
    file: "accordion/multiple.tsx",
  },
  "accordion-surface": {
    loader: () =>
      import("./accordion/surface").then((module) => module.Surface),
    file: "accordion/surface.tsx",
  },
  "accordion-without-separator": {
    loader: () =>
      import("./accordion/without-separator").then(
        (module) => module.WithoutSeparator,
      ),
    file: "accordion/without-separator.tsx",
  },
  "alert-basic": {
    loader: () => import("./alert/basic").then((module) => module.Basic),
    file: "alert/basic.tsx",
  },
  "alert-dialog-backdrop-variants": {
    loader: () =>
      import("./alert-dialog/backdrop-variants").then(
        (module) => module.BackdropVariants,
      ),
    file: "alert-dialog/backdrop-variants.tsx",
  },
  "alert-dialog-close-methods": {
    loader: () =>
      import("./alert-dialog/close-methods").then(
        (module) => module.CloseMethods,
      ),
    file: "alert-dialog/close-methods.tsx",
  },
  "alert-dialog-controlled": {
    loader: () =>
      import("./alert-dialog/controlled").then((module) => module.Controlled),
    file: "alert-dialog/controlled.tsx",
  },
  "alert-dialog-custom-animations": {
    loader: () =>
      import("./alert-dialog/custom-animations").then(
        (module) => module.CustomAnimations,
      ),
    file: "alert-dialog/custom-animations.tsx",
  },
  "alert-dialog-custom-backdrop": {
    loader: () =>
      import("./alert-dialog/custom-backdrop").then(
        (module) => module.CustomBackdrop,
      ),
    file: "alert-dialog/custom-backdrop.tsx",
  },
  "alert-dialog-custom-icon": {
    loader: () =>
      import("./alert-dialog/custom-icon").then((module) => module.CustomIcon),
    file: "alert-dialog/custom-icon.tsx",
  },
  "alert-dialog-custom-portal": {
    loader: () =>
      import("./alert-dialog/custom-portal").then(
        (module) => module.CustomPortal,
      ),
    file: "alert-dialog/custom-portal.tsx",
  },
  "alert-dialog-custom-trigger": {
    loader: () =>
      import("./alert-dialog/custom-trigger").then(
        (module) => module.CustomTrigger,
      ),
    file: "alert-dialog/custom-trigger.tsx",
  },
  "alert-dialog-default": {
    loader: () =>
      import("./alert-dialog/default").then((module) => module.Default),
    file: "alert-dialog/default.tsx",
  },
  "alert-dialog-dismiss-behavior": {
    loader: () =>
      import("./alert-dialog/dismiss-behavior").then(
        (module) => module.DismissBehavior,
      ),
    file: "alert-dialog/dismiss-behavior.tsx",
  },
  "alert-dialog-placements": {
    loader: () =>
      import("./alert-dialog/placements").then((module) => module.Placements),
    file: "alert-dialog/placements.tsx",
  },
  "alert-dialog-sizes": {
    loader: () => import("./alert-dialog/sizes").then((module) => module.Sizes),
    file: "alert-dialog/sizes.tsx",
  },
  "alert-dialog-statuses": {
    loader: () =>
      import("./alert-dialog/statuses").then((module) => module.Statuses),
    file: "alert-dialog/statuses.tsx",
  },
  "autocomplete-allows-empty-collection": {
    loader: () =>
      import("./autocomplete/allows-empty-collection").then(
        (module) => module.AllowsEmptyCollection,
      ),
    file: "autocomplete/allows-empty-collection.tsx",
  },
  "autocomplete-asynchronous-filtering": {
    loader: () =>
      import("./autocomplete/asynchronous-filtering").then(
        (module) => module.AsynchronousFiltering,
      ),
    file: "autocomplete/asynchronous-filtering.tsx",
  },
  "autocomplete-controlled": {
    loader: () =>
      import("./autocomplete/controlled").then((module) => module.Controlled),
    file: "autocomplete/controlled.tsx",
  },
  "autocomplete-controlled-open-state": {
    loader: () =>
      import("./autocomplete/controlled-open-state").then(
        (module) => module.ControlledOpenState,
      ),
    file: "autocomplete/controlled-open-state.tsx",
  },
  "autocomplete-custom-indicator": {
    loader: () =>
      import("./autocomplete/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "autocomplete/custom-indicator.tsx",
  },
  "autocomplete-default": {
    loader: () =>
      import("./autocomplete/default").then((module) => module.default),
    file: "autocomplete/default.tsx",
  },
  "autocomplete-disabled": {
    loader: () =>
      import("./autocomplete/disabled").then((module) => module.Disabled),
    file: "autocomplete/disabled.tsx",
  },
  "autocomplete-email-recipients": {
    loader: () =>
      import("./autocomplete/email-recipients").then(
        (module) => module.EmailRecipients,
      ),
    file: "autocomplete/email-recipients.tsx",
  },
  "autocomplete-full-width": {
    loader: () =>
      import("./autocomplete/full-width").then((module) => module.FullWidth),
    file: "autocomplete/full-width.tsx",
  },
  "autocomplete-location-search": {
    loader: () =>
      import("./autocomplete/location-search").then(
        (module) => module.LocationSearch,
      ),
    file: "autocomplete/location-search.tsx",
  },
  "autocomplete-multiple-select": {
    loader: () =>
      import("./autocomplete/multiple-select").then(
        (module) => module.MultipleSelect,
      ),
    file: "autocomplete/multiple-select.tsx",
  },
  "autocomplete-required": {
    loader: () =>
      import("./autocomplete/required").then((module) => module.Required),
    file: "autocomplete/required.tsx",
  },
  "autocomplete-tag-group-selection": {
    loader: () =>
      import("./autocomplete/tag-group-selection").then(
        (module) => module.TagGroupSelection,
      ),
    file: "autocomplete/tag-group-selection.tsx",
  },
  "autocomplete-user-selection": {
    loader: () =>
      import("./autocomplete/user-selection").then(
        (module) => module.UserSelection,
      ),
    file: "autocomplete/user-selection.tsx",
  },
  "autocomplete-user-selection-multiple": {
    loader: () =>
      import("./autocomplete/user-selection-multiple").then(
        (module) => module.UserSelectionMultiple,
      ),
    file: "autocomplete/user-selection-multiple.tsx",
  },
  "autocomplete-variants": {
    loader: () =>
      import("./autocomplete/variants").then((module) => module.Variants),
    file: "autocomplete/variants.tsx",
  },
  "autocomplete-virtualization": {
    loader: () =>
      import("./autocomplete/virtualization").then(
        (module) => module.Virtualization,
      ),
    file: "autocomplete/virtualization.tsx",
  },
  "autocomplete-with-description": {
    loader: () =>
      import("./autocomplete/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "autocomplete/with-description.tsx",
  },
  "autocomplete-with-disabled-options": {
    loader: () =>
      import("./autocomplete/with-disabled-options").then(
        (module) => module.WithDisabledOptions,
      ),
    file: "autocomplete/with-disabled-options.tsx",
  },
  "autocomplete-with-sections": {
    loader: () =>
      import("./autocomplete/with-sections").then(
        (module) => module.WithSections,
      ),
    file: "autocomplete/with-sections.tsx",
  },
  "avatar-basic": {
    loader: () => import("./avatar/basic").then((module) => module.Basic),
    file: "avatar/basic.tsx",
  },
  "avatar-colors": {
    loader: () => import("./avatar/colors").then((module) => module.Colors),
    file: "avatar/colors.tsx",
  },
  "avatar-custom-styles": {
    loader: () =>
      import("./avatar/custom-styles").then((module) => module.CustomStyles),
    file: "avatar/custom-styles.tsx",
  },
  "avatar-fallback": {
    loader: () => import("./avatar/fallback").then((module) => module.Fallback),
    file: "avatar/fallback.tsx",
  },
  "avatar-group": {
    loader: () => import("./avatar/group").then((module) => module.Group),
    file: "avatar/group.tsx",
  },
  "avatar-sizes": {
    loader: () => import("./avatar/sizes").then((module) => module.Sizes),
    file: "avatar/sizes.tsx",
  },
  "avatar-variants": {
    loader: () => import("./avatar/variants").then((module) => module.Variants),
    file: "avatar/variants.tsx",
  },
  "badge-basic": {
    loader: () => import("./badge/basic").then((module) => module.BadgeBasic),
    file: "badge/basic.tsx",
  },
  "badge-colors": {
    loader: () => import("./badge/colors").then((module) => module.BadgeColors),
    file: "badge/colors.tsx",
  },
  "badge-dot": {
    loader: () => import("./badge/dot").then((module) => module.BadgeDot),
    file: "badge/dot.tsx",
  },
  "badge-placements": {
    loader: () =>
      import("./badge/placements").then((module) => module.BadgePlacements),
    file: "badge/placements.tsx",
  },
  "badge-sizes": {
    loader: () => import("./badge/sizes").then((module) => module.BadgeSizes),
    file: "badge/sizes.tsx",
  },
  "badge-variants": {
    loader: () =>
      import("./badge/variants").then((module) => module.BadgeVariants),
    file: "badge/variants.tsx",
  },
  "badge-with-content": {
    loader: () =>
      import("./badge/with-content").then((module) => module.BadgeWithContent),
    file: "badge/with-content.tsx",
  },
  "breadcrumbs-basic": {
    loader: () =>
      import("./breadcrumbs/basic").then((module) => module.default),
    file: "breadcrumbs/basic.tsx",
  },
  "breadcrumbs-custom-render-function": {
    loader: () =>
      import("./breadcrumbs/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "breadcrumbs/custom-render-function.tsx",
  },
  "breadcrumbs-custom-separator": {
    loader: () =>
      import("./breadcrumbs/custom-separator").then((module) => module.default),
    file: "breadcrumbs/custom-separator.tsx",
  },
  "breadcrumbs-disabled": {
    loader: () =>
      import("./breadcrumbs/disabled").then((module) => module.default),
    file: "breadcrumbs/disabled.tsx",
  },
  "breadcrumbs-level-2": {
    loader: () =>
      import("./breadcrumbs/level-2").then((module) => module.default),
    file: "breadcrumbs/level-2.tsx",
  },
  "breadcrumbs-level-3": {
    loader: () =>
      import("./breadcrumbs/level-3").then((module) => module.default),
    file: "breadcrumbs/level-3.tsx",
  },
  "button-basic": {
    loader: () => import("./button/basic").then((module) => module.Basic),
    file: "button/basic.tsx",
  },
  "button-custom-render-function": {
    loader: () =>
      import("./button/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "button/custom-render-function.tsx",
  },
  "button-custom-variants": {
    loader: () =>
      import("./button/custom-variants").then(
        (module) => module.CustomVariants,
      ),
    file: "button/custom-variants.tsx",
  },
  "button-disabled": {
    loader: () => import("./button/disabled").then((module) => module.Disabled),
    file: "button/disabled.tsx",
  },
  "button-full-width": {
    loader: () =>
      import("./button/full-width").then((module) => module.FullWidth),
    file: "button/full-width.tsx",
  },
  "button-group-basic": {
    loader: () => import("./button-group/basic").then((module) => module.Basic),
    file: "button-group/basic.tsx",
  },
  "button-group-disabled": {
    loader: () =>
      import("./button-group/disabled").then((module) => module.Disabled),
    file: "button-group/disabled.tsx",
  },
  "button-group-full-width": {
    loader: () =>
      import("./button-group/full-width").then((module) => module.FullWidth),
    file: "button-group/full-width.tsx",
  },
  "button-group-orientation": {
    loader: () =>
      import("./button-group/orientation").then((module) => module.Orientation),
    file: "button-group/orientation.tsx",
  },
  "button-group-sizes": {
    loader: () => import("./button-group/sizes").then((module) => module.Sizes),
    file: "button-group/sizes.tsx",
  },
  "button-group-variants": {
    loader: () =>
      import("./button-group/variants").then((module) => module.Variants),
    file: "button-group/variants.tsx",
  },
  "button-group-with-icons": {
    loader: () =>
      import("./button-group/with-icons").then((module) => module.WithIcons),
    file: "button-group/with-icons.tsx",
  },
  "button-group-without-separator": {
    loader: () =>
      import("./button-group/without-separator").then(
        (module) => module.WithoutSeparator,
      ),
    file: "button-group/without-separator.tsx",
  },
  "button-icon-only": {
    loader: () =>
      import("./button/icon-only").then((module) => module.IconOnly),
    file: "button/icon-only.tsx",
  },
  "button-loading": {
    loader: () => import("./button/loading").then((module) => module.Loading),
    file: "button/loading.tsx",
  },
  "button-loading-state": {
    loader: () =>
      import("./button/loading-state").then((module) => module.LoadingState),
    file: "button/loading-state.tsx",
  },
  "button-ripple-effect": {
    loader: () =>
      import("./button/ripple-effect").then((module) => module.RippleEffect),
    file: "button/ripple-effect.tsx",
  },
  "button-sizes": {
    loader: () => import("./button/sizes").then((module) => module.Sizes),
    file: "button/sizes.tsx",
  },
  "button-social": {
    loader: () => import("./button/social").then((module) => module.Social),
    file: "button/social.tsx",
  },
  "button-variants": {
    loader: () => import("./button/variants").then((module) => module.Variants),
    file: "button/variants.tsx",
  },
  "button-with-icons": {
    loader: () =>
      import("./button/with-icons").then((module) => module.WithIcons),
    file: "button/with-icons.tsx",
  },
  "calendar-basic": {
    loader: () => import("./calendar/basic").then((module) => module.Basic),
    file: "calendar/basic.tsx",
  },
  "calendar-booking-calendar": {
    loader: () =>
      import("./calendar/booking-calendar").then(
        (module) => module.BookingCalendar,
      ),
    file: "calendar/booking-calendar.tsx",
  },
  "calendar-controlled": {
    loader: () =>
      import("./calendar/controlled").then((module) => module.Controlled),
    file: "calendar/controlled.tsx",
  },
  "calendar-custom-icons": {
    loader: () =>
      import("./calendar/custom-icons").then((module) => module.CustomIcons),
    file: "calendar/custom-icons.tsx",
  },
  "calendar-custom-styles": {
    loader: () =>
      import("./calendar/custom-styles").then((module) => module.CustomStyles),
    file: "calendar/custom-styles.tsx",
  },
  "calendar-day-view": {
    loader: () =>
      import("./calendar/day-view").then((module) => module.DayView),
    file: "calendar/day-view.tsx",
  },
  "calendar-default-value": {
    loader: () =>
      import("./calendar/default-value").then((module) => module.DefaultValue),
    file: "calendar/default-value.tsx",
  },
  "calendar-disabled": {
    loader: () =>
      import("./calendar/disabled").then((module) => module.Disabled),
    file: "calendar/disabled.tsx",
  },
  "calendar-focused-value": {
    loader: () =>
      import("./calendar/focused-value").then((module) => module.FocusedValue),
    file: "calendar/focused-value.tsx",
  },
  "calendar-international-calendar": {
    loader: () =>
      import("./calendar/international-calendar").then(
        (module) => module.InternationalCalendar,
      ),
    file: "calendar/international-calendar.tsx",
  },
  "calendar-min-max-dates": {
    loader: () =>
      import("./calendar/min-max-dates").then((module) => module.MinMaxDates),
    file: "calendar/min-max-dates.tsx",
  },
  "calendar-multiple-months": {
    loader: () =>
      import("./calendar/multiple-months").then(
        (module) => module.MultipleMonths,
      ),
    file: "calendar/multiple-months.tsx",
  },
  "calendar-multiple-selection": {
    loader: () =>
      import("./calendar/multiple-selection").then(
        (module) => module.MultipleSelection,
      ),
    file: "calendar/multiple-selection.tsx",
  },
  "calendar-read-only": {
    loader: () =>
      import("./calendar/read-only").then((module) => module.ReadOnly),
    file: "calendar/read-only.tsx",
  },
  "calendar-unavailable-dates": {
    loader: () =>
      import("./calendar/unavailable-dates").then(
        (module) => module.UnavailableDates,
      ),
    file: "calendar/unavailable-dates.tsx",
  },
  "calendar-week-view": {
    loader: () =>
      import("./calendar/week-view").then((module) => module.WeekView),
    file: "calendar/week-view.tsx",
  },
  "calendar-weeks-in-month": {
    loader: () =>
      import("./calendar/weeks-in-month").then((module) => module.WeeksInMonth),
    file: "calendar/weeks-in-month.tsx",
  },
  "calendar-with-indicators": {
    loader: () =>
      import("./calendar/with-indicators").then(
        (module) => module.WithIndicators,
      ),
    file: "calendar/with-indicators.tsx",
  },
  "calendar-year-picker": {
    loader: () =>
      import("./calendar/year-picker").then((module) => module.YearPicker),
    file: "calendar/year-picker.tsx",
  },
  "card-default": {
    loader: () => import("./card/default").then((module) => module.Default),
    file: "card/default.tsx",
  },
  "card-horizontal": {
    loader: () =>
      import("./card/horizontal").then((module) => module.Horizontal),
    file: "card/horizontal.tsx",
  },
  "card-variants": {
    loader: () => import("./card/variants").then((module) => module.Variants),
    file: "card/variants.tsx",
  },
  "card-with-avatar": {
    loader: () =>
      import("./card/with-avatar").then((module) => module.WithAvatar),
    file: "card/with-avatar.tsx",
  },
  "card-with-form": {
    loader: () => import("./card/with-form").then((module) => module.WithForm),
    file: "card/with-form.tsx",
  },
  "card-with-images": {
    loader: () =>
      import("./card/with-images").then((module) => module.WithImages),
    file: "card/with-images.tsx",
  },
  "checkbox-basic": {
    loader: () => import("./checkbox/basic").then((module) => module.Basic),
    file: "checkbox/basic.tsx",
  },
  "checkbox-controlled": {
    loader: () =>
      import("./checkbox/controlled").then((module) => module.Controlled),
    file: "checkbox/controlled.tsx",
  },
  "checkbox-custom-indicator": {
    loader: () =>
      import("./checkbox/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "checkbox/custom-indicator.tsx",
  },
  "checkbox-custom-render-function": {
    loader: () =>
      import("./checkbox/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "checkbox/custom-render-function.tsx",
  },
  "checkbox-default-selected": {
    loader: () =>
      import("./checkbox/default-selected").then(
        (module) => module.DefaultSelected,
      ),
    file: "checkbox/default-selected.tsx",
  },
  "checkbox-disabled": {
    loader: () =>
      import("./checkbox/disabled").then((module) => module.Disabled),
    file: "checkbox/disabled.tsx",
  },
  "checkbox-external-label": {
    loader: () =>
      import("./checkbox/external-label").then(
        (module) => module.ExternalLabel,
      ),
    file: "checkbox/external-label.tsx",
  },
  "checkbox-form": {
    loader: () => import("./checkbox/form").then((module) => module.Form),
    file: "checkbox/form.tsx",
  },
  "checkbox-full-rounded": {
    loader: () =>
      import("./checkbox/full-rounded").then((module) => module.FullRounded),
    file: "checkbox/full-rounded.tsx",
  },
  "checkbox-group-basic": {
    loader: () =>
      import("./checkbox-group/basic").then((module) => module.Basic),
    file: "checkbox-group/basic.tsx",
  },
  "checkbox-group-controlled": {
    loader: () =>
      import("./checkbox-group/controlled").then((module) => module.Controlled),
    file: "checkbox-group/controlled.tsx",
  },
  "checkbox-group-custom-render-function": {
    loader: () =>
      import("./checkbox-group/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "checkbox-group/custom-render-function.tsx",
  },
  "checkbox-group-disabled": {
    loader: () =>
      import("./checkbox-group/disabled").then((module) => module.Disabled),
    file: "checkbox-group/disabled.tsx",
  },
  "checkbox-group-features-and-addons": {
    loader: () =>
      import("./checkbox-group/features-and-addons").then(
        (module) => module.FeaturesAndAddOns,
      ),
    file: "checkbox-group/features-and-addons.tsx",
  },
  "checkbox-group-indeterminate": {
    loader: () =>
      import("./checkbox-group/indeterminate").then(
        (module) => module.Indeterminate,
      ),
    file: "checkbox-group/indeterminate.tsx",
  },
  "checkbox-group-on-surface": {
    loader: () =>
      import("./checkbox-group/on-surface").then((module) => module.OnSurface),
    file: "checkbox-group/on-surface.tsx",
  },
  "checkbox-group-validation": {
    loader: () =>
      import("./checkbox-group/validation").then((module) => module.Validation),
    file: "checkbox-group/validation.tsx",
  },
  "checkbox-group-with-custom-indicator": {
    loader: () =>
      import("./checkbox-group/with-custom-indicator").then(
        (module) => module.WithCustomIndicator,
      ),
    file: "checkbox-group/with-custom-indicator.tsx",
  },
  "checkbox-indeterminate": {
    loader: () =>
      import("./checkbox/indeterminate").then((module) => module.Indeterminate),
    file: "checkbox/indeterminate.tsx",
  },
  "checkbox-invalid": {
    loader: () => import("./checkbox/invalid").then((module) => module.Invalid),
    file: "checkbox/invalid.tsx",
  },
  "checkbox-render-props": {
    loader: () =>
      import("./checkbox/render-props").then((module) => module.RenderProps),
    file: "checkbox/render-props.tsx",
  },
  "checkbox-variants": {
    loader: () =>
      import("./checkbox/variants").then((module) => module.Variants),
    file: "checkbox/variants.tsx",
  },
  "checkbox-with-description": {
    loader: () =>
      import("./checkbox/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "checkbox/with-description.tsx",
  },
  "chip-basic": {
    loader: () => import("./chip/basic").then((module) => module.ChipBasic),
    file: "chip/basic.tsx",
  },
  "chip-statuses": {
    loader: () =>
      import("./chip/statuses").then((module) => module.ChipStatuses),
    file: "chip/statuses.tsx",
  },
  "chip-variants": {
    loader: () =>
      import("./chip/variants").then((module) => module.ChipVariants),
    file: "chip/variants.tsx",
  },
  "chip-with-icon": {
    loader: () =>
      import("./chip/with-icon").then((module) => module.ChipWithIcon),
    file: "chip/with-icon.tsx",
  },
  "close-button-default": {
    loader: () =>
      import("./close-button/default").then((module) => module.Default),
    file: "close-button/default.tsx",
  },
  "close-button-interactive": {
    loader: () =>
      import("./close-button/interactive").then((module) => module.Interactive),
    file: "close-button/interactive.tsx",
  },
  "close-button-with-custom-icon": {
    loader: () =>
      import("./close-button/with-custom-icon").then(
        (module) => module.WithCustomIcon,
      ),
    file: "close-button/with-custom-icon.tsx",
  },
  "color-area-basic": {
    loader: () =>
      import("./color-area/basic").then((module) => module.ColorAreaBasic),
    file: "color-area/basic.tsx",
  },
  "color-area-controlled": {
    loader: () =>
      import("./color-area/controlled").then(
        (module) => module.ColorAreaControlled,
      ),
    file: "color-area/controlled.tsx",
  },
  "color-area-custom-render-function": {
    loader: () =>
      import("./color-area/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "color-area/custom-render-function.tsx",
  },
  "color-area-disabled": {
    loader: () =>
      import("./color-area/disabled").then(
        (module) => module.ColorAreaDisabled,
      ),
    file: "color-area/disabled.tsx",
  },
  "color-area-space-and-channels": {
    loader: () =>
      import("./color-area/space-and-channels").then(
        (module) => module.ColorAreaSpaceAndChannels,
      ),
    file: "color-area/space-and-channels.tsx",
  },
  "color-area-with-dots": {
    loader: () =>
      import("./color-area/with-dots").then(
        (module) => module.ColorAreaWithDots,
      ),
    file: "color-area/with-dots.tsx",
  },
  "color-field-basic": {
    loader: () => import("./color-field/basic").then((module) => module.Basic),
    file: "color-field/basic.tsx",
  },
  "color-field-channel-editing": {
    loader: () =>
      import("./color-field/channel-editing").then(
        (module) => module.ChannelEditing,
      ),
    file: "color-field/channel-editing.tsx",
  },
  "color-field-controlled": {
    loader: () =>
      import("./color-field/controlled").then((module) => module.Controlled),
    file: "color-field/controlled.tsx",
  },
  "color-field-custom-render-function": {
    loader: () =>
      import("./color-field/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "color-field/custom-render-function.tsx",
  },
  "color-field-disabled": {
    loader: () =>
      import("./color-field/disabled").then((module) => module.Disabled),
    file: "color-field/disabled.tsx",
  },
  "color-field-form-example": {
    loader: () =>
      import("./color-field/form-example").then((module) => module.FormExample),
    file: "color-field/form-example.tsx",
  },
  "color-field-full-width": {
    loader: () =>
      import("./color-field/full-width").then((module) => module.FullWidth),
    file: "color-field/full-width.tsx",
  },
  "color-field-invalid": {
    loader: () =>
      import("./color-field/invalid").then((module) => module.Invalid),
    file: "color-field/invalid.tsx",
  },
  "color-field-on-surface": {
    loader: () =>
      import("./color-field/on-surface").then((module) => module.OnSurface),
    file: "color-field/on-surface.tsx",
  },
  "color-field-required": {
    loader: () =>
      import("./color-field/required").then((module) => module.Required),
    file: "color-field/required.tsx",
  },
  "color-field-variants": {
    loader: () =>
      import("./color-field/variants").then((module) => module.Variants),
    file: "color-field/variants.tsx",
  },
  "color-field-with-description": {
    loader: () =>
      import("./color-field/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "color-field/with-description.tsx",
  },
  "color-picker-basic": {
    loader: () => import("./color-picker/basic").then((module) => module.Basic),
    file: "color-picker/basic.tsx",
  },
  "color-picker-controlled": {
    loader: () =>
      import("./color-picker/controlled").then((module) => module.Controlled),
    file: "color-picker/controlled.tsx",
  },
  "color-picker-with-fields": {
    loader: () =>
      import("./color-picker/with-fields").then((module) => module.WithFields),
    file: "color-picker/with-fields.tsx",
  },
  "color-picker-with-sliders": {
    loader: () =>
      import("./color-picker/with-sliders").then(
        (module) => module.WithSliders,
      ),
    file: "color-picker/with-sliders.tsx",
  },
  "color-picker-with-swatches": {
    loader: () =>
      import("./color-picker/with-swatches").then(
        (module) => module.WithSwatches,
      ),
    file: "color-picker/with-swatches.tsx",
  },
  "color-slider-alpha-channel": {
    loader: () =>
      import("./color-slider/alpha-channel").then(
        (module) => module.AlphaChannel,
      ),
    file: "color-slider/alpha-channel.tsx",
  },
  "color-slider-basic": {
    loader: () => import("./color-slider/basic").then((module) => module.Basic),
    file: "color-slider/basic.tsx",
  },
  "color-slider-channels": {
    loader: () =>
      import("./color-slider/channels").then((module) => module.Channels),
    file: "color-slider/channels.tsx",
  },
  "color-slider-controlled": {
    loader: () =>
      import("./color-slider/controlled").then((module) => module.Controlled),
    file: "color-slider/controlled.tsx",
  },
  "color-slider-custom-render-function": {
    loader: () =>
      import("./color-slider/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "color-slider/custom-render-function.tsx",
  },
  "color-slider-disabled": {
    loader: () =>
      import("./color-slider/disabled").then((module) => module.Disabled),
    file: "color-slider/disabled.tsx",
  },
  "color-slider-rgb-channels": {
    loader: () =>
      import("./color-slider/rgb-channels").then(
        (module) => module.RGBChannels,
      ),
    file: "color-slider/rgb-channels.tsx",
  },
  "color-slider-vertical": {
    loader: () =>
      import("./color-slider/vertical").then((module) => module.Vertical),
    file: "color-slider/vertical.tsx",
  },
  "color-swatch-accessibility": {
    loader: () =>
      import("./color-swatch/accessibility").then(
        (module) => module.ColorSwatchAccessibility,
      ),
    file: "color-swatch/accessibility.tsx",
  },
  "color-swatch-basic": {
    loader: () =>
      import("./color-swatch/basic").then((module) => module.ColorSwatchBasic),
    file: "color-swatch/basic.tsx",
  },
  "color-swatch-custom-render-function": {
    loader: () =>
      import("./color-swatch/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "color-swatch/custom-render-function.tsx",
  },
  "color-swatch-custom-styles": {
    loader: () =>
      import("./color-swatch/custom-styles").then(
        (module) => module.ColorSwatchCustomStyles,
      ),
    file: "color-swatch/custom-styles.tsx",
  },
  "color-swatch-picker-basic": {
    loader: () =>
      import("./color-swatch-picker/basic").then((module) => module.Basic),
    file: "color-swatch-picker/basic.tsx",
  },
  "color-swatch-picker-controlled": {
    loader: () =>
      import("./color-swatch-picker/controlled").then(
        (module) => module.Controlled,
      ),
    file: "color-swatch-picker/controlled.tsx",
  },
  "color-swatch-picker-custom-indicator": {
    loader: () =>
      import("./color-swatch-picker/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "color-swatch-picker/custom-indicator.tsx",
  },
  "color-swatch-picker-custom-render-function": {
    loader: () =>
      import("./color-swatch-picker/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "color-swatch-picker/custom-render-function.tsx",
  },
  "color-swatch-picker-default-value": {
    loader: () =>
      import("./color-swatch-picker/default-value").then(
        (module) => module.DefaultValue,
      ),
    file: "color-swatch-picker/default-value.tsx",
  },
  "color-swatch-picker-disabled": {
    loader: () =>
      import("./color-swatch-picker/disabled").then(
        (module) => module.Disabled,
      ),
    file: "color-swatch-picker/disabled.tsx",
  },
  "color-swatch-picker-sizes": {
    loader: () =>
      import("./color-swatch-picker/sizes").then((module) => module.Sizes),
    file: "color-swatch-picker/sizes.tsx",
  },
  "color-swatch-picker-stack-layout": {
    loader: () =>
      import("./color-swatch-picker/stack-layout").then(
        (module) => module.StackLayout,
      ),
    file: "color-swatch-picker/stack-layout.tsx",
  },
  "color-swatch-picker-variants": {
    loader: () =>
      import("./color-swatch-picker/variants").then(
        (module) => module.Variants,
      ),
    file: "color-swatch-picker/variants.tsx",
  },
  "color-swatch-shapes": {
    loader: () =>
      import("./color-swatch/shapes").then(
        (module) => module.ColorSwatchShapes,
      ),
    file: "color-swatch/shapes.tsx",
  },
  "color-swatch-sizes": {
    loader: () =>
      import("./color-swatch/sizes").then((module) => module.ColorSwatchSizes),
    file: "color-swatch/sizes.tsx",
  },
  "color-swatch-transparency": {
    loader: () =>
      import("./color-swatch/transparency").then(
        (module) => module.ColorSwatchTransparency,
      ),
    file: "color-swatch/transparency.tsx",
  },
  "combo-box-allows-custom-value": {
    loader: () =>
      import("./combo-box/allows-custom-value").then(
        (module) => module.AllowsCustomValue,
      ),
    file: "combo-box/allows-custom-value.tsx",
  },
  "combo-box-asynchronous-loading": {
    loader: () =>
      import("./combo-box/asynchronous-loading").then(
        (module) => module.AsynchronousLoading,
      ),
    file: "combo-box/asynchronous-loading.tsx",
  },
  "combo-box-controlled": {
    loader: () =>
      import("./combo-box/controlled").then((module) => module.Controlled),
    file: "combo-box/controlled.tsx",
  },
  "combo-box-controlled-input-value": {
    loader: () =>
      import("./combo-box/controlled-input-value").then(
        (module) => module.ControlledInputValue,
      ),
    file: "combo-box/controlled-input-value.tsx",
  },
  "combo-box-custom-filtering": {
    loader: () =>
      import("./combo-box/custom-filtering").then(
        (module) => module.CustomFiltering,
      ),
    file: "combo-box/custom-filtering.tsx",
  },
  "combo-box-custom-indicator": {
    loader: () =>
      import("./combo-box/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "combo-box/custom-indicator.tsx",
  },
  "combo-box-custom-render-function": {
    loader: () =>
      import("./combo-box/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "combo-box/custom-render-function.tsx",
  },
  "combo-box-custom-value": {
    loader: () =>
      import("./combo-box/custom-value").then((module) => module.CustomValue),
    file: "combo-box/custom-value.tsx",
  },
  "combo-box-default": {
    loader: () =>
      import("./combo-box/default").then((module) => module.Default),
    file: "combo-box/default.tsx",
  },
  "combo-box-default-selected-key": {
    loader: () =>
      import("./combo-box/default-selected-key").then(
        (module) => module.DefaultSelectedKey,
      ),
    file: "combo-box/default-selected-key.tsx",
  },
  "combo-box-disabled": {
    loader: () =>
      import("./combo-box/disabled").then((module) => module.Disabled),
    file: "combo-box/disabled.tsx",
  },
  "combo-box-full-width": {
    loader: () =>
      import("./combo-box/full-width").then((module) => module.FullWidth),
    file: "combo-box/full-width.tsx",
  },
  "combo-box-menu-trigger": {
    loader: () =>
      import("./combo-box/menu-trigger").then((module) => module.MenuTrigger),
    file: "combo-box/menu-trigger.tsx",
  },
  "combo-box-on-surface": {
    loader: () =>
      import("./combo-box/on-surface").then((module) => module.OnSurface),
    file: "combo-box/on-surface.tsx",
  },
  "combo-box-required": {
    loader: () =>
      import("./combo-box/required").then((module) => module.Required),
    file: "combo-box/required.tsx",
  },
  "combo-box-with-description": {
    loader: () =>
      import("./combo-box/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "combo-box/with-description.tsx",
  },
  "combo-box-with-disabled-options": {
    loader: () =>
      import("./combo-box/with-disabled-options").then(
        (module) => module.WithDisabledOptions,
      ),
    file: "combo-box/with-disabled-options.tsx",
  },
  "combo-box-with-sections": {
    loader: () =>
      import("./combo-box/with-sections").then((module) => module.WithSections),
    file: "combo-box/with-sections.tsx",
  },
  "date-field-basic": {
    loader: () => import("./date-field/basic").then((module) => module.Basic),
    file: "date-field/basic.tsx",
  },
  "date-field-controlled": {
    loader: () =>
      import("./date-field/controlled").then((module) => module.Controlled),
    file: "date-field/controlled.tsx",
  },
  "date-field-custom-render-function": {
    loader: () =>
      import("./date-field/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "date-field/custom-render-function.tsx",
  },
  "date-field-disabled": {
    loader: () =>
      import("./date-field/disabled").then((module) => module.Disabled),
    file: "date-field/disabled.tsx",
  },
  "date-field-form-example": {
    loader: () =>
      import("./date-field/form-example").then((module) => module.FormExample),
    file: "date-field/form-example.tsx",
  },
  "date-field-full-width": {
    loader: () =>
      import("./date-field/full-width").then((module) => module.FullWidth),
    file: "date-field/full-width.tsx",
  },
  "date-field-granularity": {
    loader: () =>
      import("./date-field/granularity").then((module) => module.Granularity),
    file: "date-field/granularity.tsx",
  },
  "date-field-invalid": {
    loader: () =>
      import("./date-field/invalid").then((module) => module.Invalid),
    file: "date-field/invalid.tsx",
  },
  "date-field-on-surface": {
    loader: () =>
      import("./date-field/on-surface").then((module) => module.OnSurface),
    file: "date-field/on-surface.tsx",
  },
  "date-field-required": {
    loader: () =>
      import("./date-field/required").then((module) => module.Required),
    file: "date-field/required.tsx",
  },
  "date-field-variants": {
    loader: () =>
      import("./date-field/variants").then((module) => module.Variants),
    file: "date-field/variants.tsx",
  },
  "date-field-with-description": {
    loader: () =>
      import("./date-field/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "date-field/with-description.tsx",
  },
  "date-field-with-prefix-and-suffix": {
    loader: () =>
      import("./date-field/with-prefix-and-suffix").then(
        (module) => module.WithPrefixAndSuffix,
      ),
    file: "date-field/with-prefix-and-suffix.tsx",
  },
  "date-field-with-prefix-icon": {
    loader: () =>
      import("./date-field/with-prefix-icon").then(
        (module) => module.WithPrefixIcon,
      ),
    file: "date-field/with-prefix-icon.tsx",
  },
  "date-field-with-suffix-icon": {
    loader: () =>
      import("./date-field/with-suffix-icon").then(
        (module) => module.WithSuffixIcon,
      ),
    file: "date-field/with-suffix-icon.tsx",
  },
  "date-field-with-validation": {
    loader: () =>
      import("./date-field/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "date-field/with-validation.tsx",
  },
  "date-picker-basic": {
    loader: () => import("./date-picker/basic").then((module) => module.Basic),
    file: "date-picker/basic.tsx",
  },
  "date-picker-controlled": {
    loader: () =>
      import("./date-picker/controlled").then((module) => module.Controlled),
    file: "date-picker/controlled.tsx",
  },
  "date-picker-custom-render-function": {
    loader: () =>
      import("./date-picker/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "date-picker/custom-render-function.tsx",
  },
  "date-picker-disabled": {
    loader: () =>
      import("./date-picker/disabled").then((module) => module.Disabled),
    file: "date-picker/disabled.tsx",
  },
  "date-picker-form-example": {
    loader: () =>
      import("./date-picker/form-example").then((module) => module.FormExample),
    file: "date-picker/form-example.tsx",
  },
  "date-picker-format-options": {
    loader: () =>
      import("./date-picker/format-options-no-ssr").then(
        (module) => module.FormatOptions,
      ),
    file: "date-picker/format-options.tsx",
  },
  "date-picker-international-calendar": {
    loader: () =>
      import("./date-picker/international-calendar").then(
        (module) => module.InternationalCalendar,
      ),
    file: "date-picker/international-calendar.tsx",
  },
  "date-picker-with-custom-indicator": {
    loader: () =>
      import("./date-picker/with-custom-indicator").then(
        (module) => module.WithCustomIndicator,
      ),
    file: "date-picker/with-custom-indicator.tsx",
  },
  "date-picker-with-validation": {
    loader: () =>
      import("./date-picker/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "date-picker/with-validation.tsx",
  },
  "date-range-picker-basic": {
    loader: () =>
      import("./date-range-picker/basic").then((module) => module.Basic),
    file: "date-range-picker/basic.tsx",
  },
  "date-range-picker-controlled": {
    loader: () =>
      import("./date-range-picker/controlled").then(
        (module) => module.Controlled,
      ),
    file: "date-range-picker/controlled.tsx",
  },
  "date-range-picker-custom-render-function": {
    loader: () =>
      import("./date-range-picker/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "date-range-picker/custom-render-function.tsx",
  },
  "date-range-picker-disabled": {
    loader: () =>
      import("./date-range-picker/disabled").then((module) => module.Disabled),
    file: "date-range-picker/disabled.tsx",
  },
  "date-range-picker-form-example": {
    loader: () =>
      import("./date-range-picker/form-example").then(
        (module) => module.FormExample,
      ),
    file: "date-range-picker/form-example.tsx",
  },
  "date-range-picker-format-options": {
    loader: () =>
      import("./date-range-picker/format-options-no-ssr").then(
        (module) => module.FormatOptions,
      ),
    file: "date-range-picker/format-options.tsx",
  },
  "date-range-picker-international-calendar": {
    loader: () =>
      import("./date-range-picker/international-calendar").then(
        (module) => module.InternationalCalendar,
      ),
    file: "date-range-picker/international-calendar.tsx",
  },
  "date-range-picker-with-custom-indicator": {
    loader: () =>
      import("./date-range-picker/with-custom-indicator").then(
        (module) => module.WithCustomIndicator,
      ),
    file: "date-range-picker/with-custom-indicator.tsx",
  },
  "date-range-picker-with-validation": {
    loader: () =>
      import("./date-range-picker/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "date-range-picker/with-validation.tsx",
  },
  "description-basic": {
    loader: () => import("./description/basic").then((module) => module.Basic),
    file: "description/basic.tsx",
  },
  "disclosure-basic": {
    loader: () => import("./disclosure/basic").then((module) => module.Basic),
    file: "disclosure/basic.tsx",
  },
  "disclosure-custom-render-function": {
    loader: () =>
      import("./disclosure/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "disclosure/custom-render-function.tsx",
  },
  "disclosure-group-basic": {
    loader: () =>
      import("./disclosure-group/basic").then((module) => module.Basic),
    file: "disclosure-group/basic.tsx",
  },
  "disclosure-group-controlled": {
    loader: () =>
      import("./disclosure-group/controlled").then(
        (module) => module.Controlled,
      ),
    file: "disclosure-group/controlled.tsx",
  },
  "drawer-backdrop-variants": {
    loader: () =>
      import("./drawer/backdrop-variants").then(
        (module) => module.BackdropVariants,
      ),
    file: "drawer/backdrop-variants.tsx",
  },
  "drawer-basic": {
    loader: () => import("./drawer/basic").then((module) => module.Basic),
    file: "drawer/basic.tsx",
  },
  "drawer-controlled": {
    loader: () =>
      import("./drawer/controlled").then((module) => module.Controlled),
    file: "drawer/controlled.tsx",
  },
  "drawer-navigation": {
    loader: () =>
      import("./drawer/navigation").then((module) => module.Navigation),
    file: "drawer/navigation.tsx",
  },
  "drawer-non-dismissable": {
    loader: () =>
      import("./drawer/non-dismissable").then(
        (module) => module.NonDismissable,
      ),
    file: "drawer/non-dismissable.tsx",
  },
  "drawer-placements": {
    loader: () =>
      import("./drawer/placements").then((module) => module.Placements),
    file: "drawer/placements.tsx",
  },
  "drawer-scrollable-content": {
    loader: () =>
      import("./drawer/scrollable-content").then(
        (module) => module.ScrollableContent,
      ),
    file: "drawer/scrollable-content.tsx",
  },
  "drawer-with-form": {
    loader: () =>
      import("./drawer/with-form").then((module) => module.WithForm),
    file: "drawer/with-form.tsx",
  },
  "dropdown-controlled": {
    loader: () =>
      import("./dropdown/controlled").then((module) => module.Controlled),
    file: "dropdown/controlled.tsx",
  },
  "dropdown-controlled-open-state": {
    loader: () =>
      import("./dropdown/controlled-open-state").then(
        (module) => module.ControlledOpenState,
      ),
    file: "dropdown/controlled-open-state.tsx",
  },
  "dropdown-custom-trigger": {
    loader: () =>
      import("./dropdown/custom-trigger").then(
        (module) => module.CustomTrigger,
      ),
    file: "dropdown/custom-trigger.tsx",
  },
  "dropdown-default": {
    loader: () => import("./dropdown/default").then((module) => module.Default),
    file: "dropdown/default.tsx",
  },
  "dropdown-long-press-trigger": {
    loader: () =>
      import("./dropdown/long-press-trigger").then(
        (module) => module.LongPressTrigger,
      ),
    file: "dropdown/long-press-trigger.tsx",
  },
  "dropdown-single-with-custom-indicator": {
    loader: () =>
      import("./dropdown/single-with-custom-indicator").then(
        (module) => module.SingleWithCustomIndicator,
      ),
    file: "dropdown/single-with-custom-indicator.tsx",
  },
  "dropdown-with-custom-submenu-indicator": {
    loader: () =>
      import("./dropdown/with-custom-submenu-indicator").then(
        (module) => module.WithCustomSubmenuIndicator,
      ),
    file: "dropdown/with-custom-submenu-indicator.tsx",
  },
  "dropdown-with-descriptions": {
    loader: () =>
      import("./dropdown/with-descriptions").then(
        (module) => module.WithDescriptions,
      ),
    file: "dropdown/with-descriptions.tsx",
  },
  "dropdown-with-disabled-items": {
    loader: () =>
      import("./dropdown/with-disabled-items").then(
        (module) => module.WithDisabledItems,
      ),
    file: "dropdown/with-disabled-items.tsx",
  },
  "dropdown-with-icons": {
    loader: () =>
      import("./dropdown/with-icons").then((module) => module.WithIcons),
    file: "dropdown/with-icons.tsx",
  },
  "dropdown-with-keyboard-shortcuts": {
    loader: () =>
      import("./dropdown/with-keyboard-shortcuts").then(
        (module) => module.WithKeyboardShortcuts,
      ),
    file: "dropdown/with-keyboard-shortcuts.tsx",
  },
  "dropdown-with-multiple-selection": {
    loader: () =>
      import("./dropdown/with-multiple-selection").then(
        (module) => module.WithMultipleSelection,
      ),
    file: "dropdown/with-multiple-selection.tsx",
  },
  "dropdown-with-section-level-selection": {
    loader: () =>
      import("./dropdown/with-section-level-selection").then(
        (module) => module.WithSectionLevelSelection,
      ),
    file: "dropdown/with-section-level-selection.tsx",
  },
  "dropdown-with-sections": {
    loader: () =>
      import("./dropdown/with-sections").then((module) => module.WithSections),
    file: "dropdown/with-sections.tsx",
  },
  "dropdown-with-single-selection": {
    loader: () =>
      import("./dropdown/with-single-selection").then(
        (module) => module.WithSingleSelection,
      ),
    file: "dropdown/with-single-selection.tsx",
  },
  "dropdown-with-submenus": {
    loader: () =>
      import("./dropdown/with-submenus").then((module) => module.WithSubmenus),
    file: "dropdown/with-submenus.tsx",
  },
  "error-message-basic": {
    loader: () =>
      import("./error-message/basic").then(
        (module) => module.ErrorMessageBasic,
      ),
    file: "error-message/basic.tsx",
  },
  "field-error-basic": {
    loader: () => import("./field-error/basic").then((module) => module.Basic),
    file: "field-error/basic.tsx",
  },
  "fieldset-basic": {
    loader: () => import("./fieldset/basic").then((module) => module.Basic),
    file: "fieldset/basic.tsx",
  },
  "fieldset-on-surface": {
    loader: () =>
      import("./fieldset/on-surface").then((module) => module.OnSurface),
    file: "fieldset/on-surface.tsx",
  },
  "form-basic": {
    loader: () => import("./form/basic").then((module) => module.Basic),
    file: "form/basic.tsx",
  },
  "form-custom-render-function": {
    loader: () =>
      import("./form/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "form/custom-render-function.tsx",
  },
  "input-basic": {
    loader: () => import("./input/basic").then((module) => module.Basic),
    file: "input/basic.tsx",
  },
  "input-controlled": {
    loader: () =>
      import("./input/controlled").then((module) => module.Controlled),
    file: "input/controlled.tsx",
  },
  "input-full-width": {
    loader: () =>
      import("./input/full-width").then((module) => module.FullWidth),
    file: "input/full-width.tsx",
  },
  "input-group-default": {
    loader: () =>
      import("./input-group/default").then((module) => module.Default),
    file: "input-group/default.tsx",
  },
  "input-group-disabled": {
    loader: () =>
      import("./input-group/disabled").then((module) => module.Disabled),
    file: "input-group/disabled.tsx",
  },
  "input-group-full-width": {
    loader: () =>
      import("./input-group/full-width").then((module) => module.FullWidth),
    file: "input-group/full-width.tsx",
  },
  "input-group-invalid": {
    loader: () =>
      import("./input-group/invalid").then((module) => module.Invalid),
    file: "input-group/invalid.tsx",
  },
  "input-group-on-surface": {
    loader: () =>
      import("./input-group/on-surface").then((module) => module.OnSurface),
    file: "input-group/on-surface.tsx",
  },
  "input-group-password-with-toggle": {
    loader: () =>
      import("./input-group/password-with-toggle").then(
        (module) => module.PasswordWithToggle,
      ),
    file: "input-group/password-with-toggle.tsx",
  },
  "input-group-required": {
    loader: () =>
      import("./input-group/required").then((module) => module.Required),
    file: "input-group/required.tsx",
  },
  "input-group-variants": {
    loader: () =>
      import("./input-group/variants").then((module) => module.Variants),
    file: "input-group/variants.tsx",
  },
  "input-group-with-badge-suffix": {
    loader: () =>
      import("./input-group/with-badge-suffix").then(
        (module) => module.WithBadgeSuffix,
      ),
    file: "input-group/with-badge-suffix.tsx",
  },
  "input-group-with-copy-suffix": {
    loader: () =>
      import("./input-group/with-copy-suffix").then(
        (module) => module.WithCopySuffix,
      ),
    file: "input-group/with-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-copy-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-copy-suffix").then(
        (module) => module.WithIconPrefixAndCopySuffix,
      ),
    file: "input-group/with-icon-prefix-and-copy-suffix.tsx",
  },
  "input-group-with-icon-prefix-and-text-suffix": {
    loader: () =>
      import("./input-group/with-icon-prefix-and-text-suffix").then(
        (module) => module.WithIconPrefixAndTextSuffix,
      ),
    file: "input-group/with-icon-prefix-and-text-suffix.tsx",
  },
  "input-group-with-keyboard-shortcut": {
    loader: () =>
      import("./input-group/with-keyboard-shortcut").then(
        (module) => module.WithKeyboardShortcut,
      ),
    file: "input-group/with-keyboard-shortcut.tsx",
  },
  "input-group-with-loading-suffix": {
    loader: () =>
      import("./input-group/with-loading-suffix").then(
        (module) => module.WithLoadingSuffix,
      ),
    file: "input-group/with-loading-suffix.tsx",
  },
  "input-group-with-prefix-and-suffix": {
    loader: () =>
      import("./input-group/with-prefix-and-suffix").then(
        (module) => module.WithPrefixAndSuffix,
      ),
    file: "input-group/with-prefix-and-suffix.tsx",
  },
  "input-group-with-prefix-icon": {
    loader: () =>
      import("./input-group/with-prefix-icon").then(
        (module) => module.WithPrefixIcon,
      ),
    file: "input-group/with-prefix-icon.tsx",
  },
  "input-group-with-suffix-icon": {
    loader: () =>
      import("./input-group/with-suffix-icon").then(
        (module) => module.WithSuffixIcon,
      ),
    file: "input-group/with-suffix-icon.tsx",
  },
  "input-group-with-text-prefix": {
    loader: () =>
      import("./input-group/with-text-prefix").then(
        (module) => module.WithTextPrefix,
      ),
    file: "input-group/with-text-prefix.tsx",
  },
  "input-group-with-text-suffix": {
    loader: () =>
      import("./input-group/with-text-suffix").then(
        (module) => module.WithTextSuffix,
      ),
    file: "input-group/with-text-suffix.tsx",
  },
  "input-group-with-textarea": {
    loader: () =>
      import("./input-group/with-textarea").then(
        (module) => module.WithTextArea,
      ),
    file: "input-group/with-textarea.tsx",
  },
  "input-on-surface": {
    loader: () =>
      import("./input/on-surface").then((module) => module.OnSurface),
    file: "input/on-surface.tsx",
  },
  "input-otp-basic": {
    loader: () => import("./input-otp/basic").then((module) => module.Basic),
    file: "input-otp/basic.tsx",
  },
  "input-otp-controlled": {
    loader: () =>
      import("./input-otp/controlled").then((module) => module.Controlled),
    file: "input-otp/controlled.tsx",
  },
  "input-otp-disabled": {
    loader: () =>
      import("./input-otp/disabled").then((module) => module.Disabled),
    file: "input-otp/disabled.tsx",
  },
  "input-otp-form-example": {
    loader: () =>
      import("./input-otp/form-example").then((module) => module.FormExample),
    file: "input-otp/form-example.tsx",
  },
  "input-otp-four-digits": {
    loader: () =>
      import("./input-otp/four-digits").then((module) => module.FourDigits),
    file: "input-otp/four-digits.tsx",
  },
  "input-otp-on-complete": {
    loader: () =>
      import("./input-otp/on-complete").then((module) => module.OnComplete),
    file: "input-otp/on-complete.tsx",
  },
  "input-otp-on-surface": {
    loader: () =>
      import("./input-otp/on-surface").then((module) => module.OnSurface),
    file: "input-otp/on-surface.tsx",
  },
  "input-otp-variants": {
    loader: () =>
      import("./input-otp/variants").then((module) => module.Variants),
    file: "input-otp/variants.tsx",
  },
  "input-otp-with-pattern": {
    loader: () =>
      import("./input-otp/with-pattern").then((module) => module.WithPattern),
    file: "input-otp/with-pattern.tsx",
  },
  "input-otp-with-validation": {
    loader: () =>
      import("./input-otp/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "input-otp/with-validation.tsx",
  },
  "input-types": {
    loader: () => import("./input/types").then((module) => module.Types),
    file: "input/types.tsx",
  },
  "input-variants": {
    loader: () => import("./input/variants").then((module) => module.Variants),
    file: "input/variants.tsx",
  },
  "kbd-basic": {
    loader: () => import("./kbd/basic").then((module) => module.Basic),
    file: "kbd/basic.tsx",
  },
  "kbd-inline-usage": {
    loader: () => import("./kbd/inline").then((module) => module.InlineUsage),
    file: "kbd/inline.tsx",
  },
  "kbd-instructional-text": {
    loader: () =>
      import("./kbd/instructional").then((module) => module.InstructionalText),
    file: "kbd/instructional.tsx",
  },
  "kbd-navigation-keys": {
    loader: () =>
      import("./kbd/navigation").then((module) => module.NavigationKeys),
    file: "kbd/navigation.tsx",
  },
  "kbd-special-keys": {
    loader: () => import("./kbd/special").then((module) => module.SpecialKeys),
    file: "kbd/special.tsx",
  },
  "kbd-variants": {
    loader: () => import("./kbd/variants").then((module) => module.Variants),
    file: "kbd/variants.tsx",
  },
  "label-basic": {
    loader: () => import("./label/basic").then((module) => module.Basic),
    file: "label/basic.tsx",
  },
  "link-basic": {
    loader: () => import("./link/basic").then((module) => module.LinkBasic),
    file: "link/basic.tsx",
  },
  "link-custom-icon": {
    loader: () =>
      import("./link/custom-icon").then((module) => module.LinkCustomIcon),
    file: "link/custom-icon.tsx",
  },
  "link-custom-render-function": {
    loader: () =>
      import("./link/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "link/custom-render-function.tsx",
  },
  "link-icon-placement": {
    loader: () =>
      import("./link/icon-placement").then(
        (module) => module.LinkIconPlacement,
      ),
    file: "link/icon-placement.tsx",
  },
  "link-underline-and-offset": {
    loader: () =>
      import("./link/underline-and-offset").then(
        (module) => module.LinkUnderlineAndOffset,
      ),
    file: "link/underline-and-offset.tsx",
  },
  "list-box-controlled": {
    loader: () =>
      import("./list-box/controlled").then((module) => module.Controlled),
    file: "list-box/controlled.tsx",
  },
  "list-box-custom-check-icon": {
    loader: () =>
      import("./list-box/custom-check-icon").then(
        (module) => module.CustomCheckIcon,
      ),
    file: "list-box/custom-check-icon.tsx",
  },
  "list-box-custom-render-function": {
    loader: () =>
      import("./list-box/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "list-box/custom-render-function.tsx",
  },
  "list-box-default": {
    loader: () => import("./list-box/default").then((module) => module.Default),
    file: "list-box/default.tsx",
  },
  "list-box-multi-select": {
    loader: () =>
      import("./list-box/multi-select").then((module) => module.MultiSelect),
    file: "list-box/multi-select.tsx",
  },
  "list-box-virtualization": {
    loader: () =>
      import("./list-box/virtualization").then(
        (module) => module.Virtualization,
      ),
    file: "list-box/virtualization.tsx",
  },
  "list-box-with-disabled-items": {
    loader: () =>
      import("./list-box/with-disabled-items").then(
        (module) => module.WithDisabledItems,
      ),
    file: "list-box/with-disabled-items.tsx",
  },
  "list-box-with-sections": {
    loader: () =>
      import("./list-box/with-sections").then((module) => module.WithSections),
    file: "list-box/with-sections.tsx",
  },
  "meter-basic": {
    loader: () => import("./meter/basic").then((module) => module.Basic),
    file: "meter/basic.tsx",
  },
  "meter-colors": {
    loader: () => import("./meter/colors").then((module) => module.Colors),
    file: "meter/colors.tsx",
  },
  "meter-custom-value": {
    loader: () =>
      import("./meter/custom-value").then((module) => module.CustomValue),
    file: "meter/custom-value.tsx",
  },
  "meter-sizes": {
    loader: () => import("./meter/sizes").then((module) => module.Sizes),
    file: "meter/sizes.tsx",
  },
  "meter-without-label": {
    loader: () =>
      import("./meter/without-label").then((module) => module.WithoutLabel),
    file: "meter/without-label.tsx",
  },
  "modal-backdrop-variants": {
    loader: () =>
      import("./modal/backdrop-variants").then(
        (module) => module.BackdropVariants,
      ),
    file: "modal/backdrop-variants.tsx",
  },
  "modal-close-methods": {
    loader: () =>
      import("./modal/close-methods").then((module) => module.CloseMethods),
    file: "modal/close-methods.tsx",
  },
  "modal-controlled": {
    loader: () =>
      import("./modal/controlled").then((module) => module.Controlled),
    file: "modal/controlled.tsx",
  },
  "modal-custom-animations": {
    loader: () =>
      import("./modal/custom-animations").then(
        (module) => module.CustomAnimations,
      ),
    file: "modal/custom-animations.tsx",
  },
  "modal-custom-backdrop": {
    loader: () =>
      import("./modal/custom-backdrop").then((module) => module.CustomBackdrop),
    file: "modal/custom-backdrop.tsx",
  },
  "modal-custom-portal": {
    loader: () =>
      import("./modal/custom-portal").then((module) => module.CustomPortal),
    file: "modal/custom-portal.tsx",
  },
  "modal-custom-trigger": {
    loader: () =>
      import("./modal/custom-trigger").then((module) => module.CustomTrigger),
    file: "modal/custom-trigger.tsx",
  },
  "modal-default": {
    loader: () => import("./modal/default").then((module) => module.Default),
    file: "modal/default.tsx",
  },
  "modal-dismiss-behavior": {
    loader: () =>
      import("./modal/dismiss-behavior").then(
        (module) => module.DismissBehavior,
      ),
    file: "modal/dismiss-behavior.tsx",
  },
  "modal-placements": {
    loader: () =>
      import("./modal/placements").then((module) => module.Placements),
    file: "modal/placements.tsx",
  },
  "modal-scroll-comparison": {
    loader: () =>
      import("./modal/scroll-comparison").then(
        (module) => module.ScrollComparison,
      ),
    file: "modal/scroll-comparison.tsx",
  },
  "modal-sizes": {
    loader: () => import("./modal/sizes").then((module) => module.Sizes),
    file: "modal/sizes.tsx",
  },
  "modal-with-form": {
    loader: () => import("./modal/with-form").then((module) => module.WithForm),
    file: "modal/with-form.tsx",
  },
  "number-field-basic": {
    loader: () => import("./number-field/basic").then((module) => module.Basic),
    file: "number-field/basic.tsx",
  },
  "number-field-controlled": {
    loader: () =>
      import("./number-field/controlled").then((module) => module.Controlled),
    file: "number-field/controlled.tsx",
  },
  "number-field-custom-icons": {
    loader: () =>
      import("./number-field/custom-icons").then(
        (module) => module.CustomIcons,
      ),
    file: "number-field/custom-icons.tsx",
  },
  "number-field-custom-render-function": {
    loader: () =>
      import("./number-field/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "number-field/custom-render-function.tsx",
  },
  "number-field-disabled": {
    loader: () =>
      import("./number-field/disabled").then((module) => module.Disabled),
    file: "number-field/disabled.tsx",
  },
  "number-field-form-example": {
    loader: () =>
      import("./number-field/form-example").then(
        (module) => module.FormExample,
      ),
    file: "number-field/form-example.tsx",
  },
  "number-field-full-width": {
    loader: () =>
      import("./number-field/full-width").then((module) => module.FullWidth),
    file: "number-field/full-width.tsx",
  },
  "number-field-on-surface": {
    loader: () =>
      import("./number-field/on-surface").then((module) => module.OnSurface),
    file: "number-field/on-surface.tsx",
  },
  "number-field-required": {
    loader: () =>
      import("./number-field/required").then((module) => module.Required),
    file: "number-field/required.tsx",
  },
  "number-field-validation": {
    loader: () =>
      import("./number-field/validation").then((module) => module.Validation),
    file: "number-field/validation.tsx",
  },
  "number-field-variants": {
    loader: () =>
      import("./number-field/variants").then((module) => module.Variants),
    file: "number-field/variants.tsx",
  },
  "number-field-with-chevrons": {
    loader: () =>
      import("./number-field/with-chevrons").then(
        (module) => module.WithChevrons,
      ),
    file: "number-field/with-chevrons.tsx",
  },
  "number-field-with-description": {
    loader: () =>
      import("./number-field/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "number-field/with-description.tsx",
  },
  "number-field-with-format-options": {
    loader: () =>
      import("./number-field/with-format-options").then(
        (module) => module.WithFormatOptions,
      ),
    file: "number-field/with-format-options.tsx",
  },
  "number-field-with-step": {
    loader: () =>
      import("./number-field/with-step").then((module) => module.WithStep),
    file: "number-field/with-step.tsx",
  },
  "number-field-with-validation": {
    loader: () =>
      import("./number-field/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "number-field/with-validation.tsx",
  },
  "pagination-basic": {
    loader: () =>
      import("./pagination/basic").then((module) => module.PaginationBasic),
    file: "pagination/basic.tsx",
  },
  "pagination-controlled": {
    loader: () =>
      import("./pagination/controlled").then(
        (module) => module.PaginationControlled,
      ),
    file: "pagination/controlled.tsx",
  },
  "pagination-custom-icons": {
    loader: () =>
      import("./pagination/custom-icons").then(
        (module) => module.PaginationCustomIcons,
      ),
    file: "pagination/custom-icons.tsx",
  },
  "pagination-disabled": {
    loader: () =>
      import("./pagination/disabled").then(
        (module) => module.PaginationDisabled,
      ),
    file: "pagination/disabled.tsx",
  },
  "pagination-simple-prev-next": {
    loader: () =>
      import("./pagination/simple-prev-next").then(
        (module) => module.PaginationSimplePrevNext,
      ),
    file: "pagination/simple-prev-next.tsx",
  },
  "pagination-sizes": {
    loader: () =>
      import("./pagination/sizes").then((module) => module.PaginationSizes),
    file: "pagination/sizes.tsx",
  },
  "pagination-with-ellipsis": {
    loader: () =>
      import("./pagination/with-ellipsis").then(
        (module) => module.PaginationWithEllipsis,
      ),
    file: "pagination/with-ellipsis.tsx",
  },
  "pagination-with-summary": {
    loader: () =>
      import("./pagination/with-summary").then(
        (module) => module.PaginationWithSummary,
      ),
    file: "pagination/with-summary.tsx",
  },
  "popover-basic": {
    loader: () =>
      import("./popover/basic").then((module) => module.PopoverBasic),
    file: "popover/basic.tsx",
  },
  "popover-custom-render-function": {
    loader: () =>
      import("./popover/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "popover/custom-render-function.tsx",
  },
  "popover-interactive": {
    loader: () =>
      import("./popover/interactive").then(
        (module) => module.PopoverInteractive,
      ),
    file: "popover/interactive.tsx",
  },
  "popover-placement": {
    loader: () =>
      import("./popover/placement").then((module) => module.PopoverPlacement),
    file: "popover/placement.tsx",
  },
  "popover-with-arrow": {
    loader: () =>
      import("./popover/with-arrow").then((module) => module.PopoverWithArrow),
    file: "popover/with-arrow.tsx",
  },
  "progress-bar-basic": {
    loader: () => import("./progress-bar/basic").then((module) => module.Basic),
    file: "progress-bar/basic.tsx",
  },
  "progress-bar-colors": {
    loader: () =>
      import("./progress-bar/colors").then((module) => module.Colors),
    file: "progress-bar/colors.tsx",
  },
  "progress-bar-custom-value": {
    loader: () =>
      import("./progress-bar/custom-value").then(
        (module) => module.CustomValue,
      ),
    file: "progress-bar/custom-value.tsx",
  },
  "progress-bar-indeterminate": {
    loader: () =>
      import("./progress-bar/indeterminate").then(
        (module) => module.Indeterminate,
      ),
    file: "progress-bar/indeterminate.tsx",
  },
  "progress-bar-sizes": {
    loader: () => import("./progress-bar/sizes").then((module) => module.Sizes),
    file: "progress-bar/sizes.tsx",
  },
  "progress-bar-without-label": {
    loader: () =>
      import("./progress-bar/without-label").then(
        (module) => module.WithoutLabel,
      ),
    file: "progress-bar/without-label.tsx",
  },
  "progress-circle-basic": {
    loader: () =>
      import("./progress-circle/basic").then((module) => module.Basic),
    file: "progress-circle/basic.tsx",
  },
  "progress-circle-colors": {
    loader: () =>
      import("./progress-circle/colors").then((module) => module.Colors),
    file: "progress-circle/colors.tsx",
  },
  "progress-circle-custom-svg": {
    loader: () =>
      import("./progress-circle/custom-svg").then((module) => module.CustomSvg),
    file: "progress-circle/custom-svg.tsx",
  },
  "progress-circle-indeterminate": {
    loader: () =>
      import("./progress-circle/indeterminate").then(
        (module) => module.Indeterminate,
      ),
    file: "progress-circle/indeterminate.tsx",
  },
  "progress-circle-sizes": {
    loader: () =>
      import("./progress-circle/sizes").then((module) => module.Sizes),
    file: "progress-circle/sizes.tsx",
  },
  "progress-circle-with-label": {
    loader: () =>
      import("./progress-circle/with-label").then((module) => module.WithLabel),
    file: "progress-circle/with-label.tsx",
  },
  "radio-group-basic": {
    loader: () => import("./radio-group/basic").then((module) => module.Basic),
    file: "radio-group/basic.tsx",
  },
  "radio-group-controlled": {
    loader: () =>
      import("./radio-group/controlled").then((module) => module.Controlled),
    file: "radio-group/controlled.tsx",
  },
  "radio-group-custom-indicator": {
    loader: () =>
      import("./radio-group/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "radio-group/custom-indicator.tsx",
  },
  "radio-group-custom-render-function": {
    loader: () =>
      import("./radio-group/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "radio-group/custom-render-function.tsx",
  },
  "radio-group-disabled": {
    loader: () =>
      import("./radio-group/disabled").then((module) => module.Disabled),
    file: "radio-group/disabled.tsx",
  },
  "radio-group-horizontal": {
    loader: () =>
      import("./radio-group/horizontal").then((module) => module.Horizontal),
    file: "radio-group/horizontal.tsx",
  },
  "radio-group-on-surface": {
    loader: () =>
      import("./radio-group/on-surface").then((module) => module.OnSurface),
    file: "radio-group/on-surface.tsx",
  },
  "radio-group-uncontrolled": {
    loader: () =>
      import("./radio-group/uncontrolled").then(
        (module) => module.Uncontrolled,
      ),
    file: "radio-group/uncontrolled.tsx",
  },
  "radio-group-validation": {
    loader: () =>
      import("./radio-group/validation").then((module) => module.Validation),
    file: "radio-group/validation.tsx",
  },
  "radio-group-variants": {
    loader: () =>
      import("./radio-group/variants").then((module) => module.Variants),
    file: "radio-group/variants.tsx",
  },
  "range-calendar-allows-non-contiguous-ranges": {
    loader: () =>
      import("./range-calendar/allows-non-contiguous-ranges").then(
        (module) => module.AllowsNonContiguousRanges,
      ),
    file: "range-calendar/allows-non-contiguous-ranges.tsx",
  },
  "range-calendar-anchor-unavailable-dates": {
    loader: () =>
      import("./range-calendar/anchor-unavailable-dates").then(
        (module) => module.AnchorUnavailableDates,
      ),
    file: "range-calendar/anchor-unavailable-dates.tsx",
  },
  "range-calendar-basic": {
    loader: () =>
      import("./range-calendar/basic").then((module) => module.Basic),
    file: "range-calendar/basic.tsx",
  },
  "range-calendar-booking-calendar": {
    loader: () =>
      import("./range-calendar/booking-calendar").then(
        (module) => module.BookingCalendar,
      ),
    file: "range-calendar/booking-calendar.tsx",
  },
  "range-calendar-controlled": {
    loader: () =>
      import("./range-calendar/controlled").then((module) => module.Controlled),
    file: "range-calendar/controlled.tsx",
  },
  "range-calendar-day-view": {
    loader: () =>
      import("./range-calendar/day-view").then((module) => module.DayView),
    file: "range-calendar/day-view.tsx",
  },
  "range-calendar-default-value": {
    loader: () =>
      import("./range-calendar/default-value").then(
        (module) => module.DefaultValue,
      ),
    file: "range-calendar/default-value.tsx",
  },
  "range-calendar-disabled": {
    loader: () =>
      import("./range-calendar/disabled").then((module) => module.Disabled),
    file: "range-calendar/disabled.tsx",
  },
  "range-calendar-focused-value": {
    loader: () =>
      import("./range-calendar/focused-value").then(
        (module) => module.FocusedValue,
      ),
    file: "range-calendar/focused-value.tsx",
  },
  "range-calendar-international-calendar": {
    loader: () =>
      import("./range-calendar/international-calendar").then(
        (module) => module.InternationalCalendar,
      ),
    file: "range-calendar/international-calendar.tsx",
  },
  "range-calendar-invalid": {
    loader: () =>
      import("./range-calendar/invalid").then((module) => module.Invalid),
    file: "range-calendar/invalid.tsx",
  },
  "range-calendar-min-max-dates": {
    loader: () =>
      import("./range-calendar/min-max-dates").then(
        (module) => module.MinMaxDates,
      ),
    file: "range-calendar/min-max-dates.tsx",
  },
  "range-calendar-multiple-months": {
    loader: () =>
      import("./range-calendar/multiple-months").then(
        (module) => module.MultipleMonths,
      ),
    file: "range-calendar/multiple-months.tsx",
  },
  "range-calendar-read-only": {
    loader: () =>
      import("./range-calendar/read-only").then((module) => module.ReadOnly),
    file: "range-calendar/read-only.tsx",
  },
  "range-calendar-unavailable-dates": {
    loader: () =>
      import("./range-calendar/unavailable-dates").then(
        (module) => module.UnavailableDates,
      ),
    file: "range-calendar/unavailable-dates.tsx",
  },
  "range-calendar-week-view": {
    loader: () =>
      import("./range-calendar/week-view").then((module) => module.WeekView),
    file: "range-calendar/week-view.tsx",
  },
  "range-calendar-weeks-in-month": {
    loader: () =>
      import("./range-calendar/weeks-in-month").then(
        (module) => module.WeeksInMonth,
      ),
    file: "range-calendar/weeks-in-month.tsx",
  },
  "range-calendar-with-indicators": {
    loader: () =>
      import("./range-calendar/with-indicators").then(
        (module) => module.WithIndicators,
      ),
    file: "range-calendar/with-indicators.tsx",
  },
  "range-calendar-year-picker": {
    loader: () =>
      import("./range-calendar/year-picker").then(
        (module) => module.YearPicker,
      ),
    file: "range-calendar/year-picker.tsx",
  },
  "scroll-shadow-custom-size": {
    loader: () =>
      import("./scroll-shadow/custom-size").then((module) => module.default),
    file: "scroll-shadow/custom-size.tsx",
  },
  "scroll-shadow-default": {
    loader: () =>
      import("./scroll-shadow/default").then((module) => module.default),
    file: "scroll-shadow/default.tsx",
  },
  "scroll-shadow-hide-scroll-bar": {
    loader: () =>
      import("./scroll-shadow/hide-scroll-bar").then(
        (module) => module.default,
      ),
    file: "scroll-shadow/hide-scroll-bar.tsx",
  },
  "scroll-shadow-orientation": {
    loader: () =>
      import("./scroll-shadow/orientation").then((module) => module.default),
    file: "scroll-shadow/orientation.tsx",
  },
  "scroll-shadow-visibility-change": {
    loader: () =>
      import("./scroll-shadow/visibility-change").then(
        (module) => module.default,
      ),
    file: "scroll-shadow/visibility-change.tsx",
  },
  "scroll-shadow-with-card": {
    loader: () =>
      import("./scroll-shadow/with-card").then((module) => module.default),
    file: "scroll-shadow/with-card.tsx",
  },
  "search-field-basic": {
    loader: () => import("./search-field/basic").then((module) => module.Basic),
    file: "search-field/basic.tsx",
  },
  "search-field-controlled": {
    loader: () =>
      import("./search-field/controlled").then((module) => module.Controlled),
    file: "search-field/controlled.tsx",
  },
  "search-field-custom-icons": {
    loader: () =>
      import("./search-field/custom-icons").then(
        (module) => module.CustomIcons,
      ),
    file: "search-field/custom-icons.tsx",
  },
  "search-field-custom-render-function": {
    loader: () =>
      import("./search-field/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "search-field/custom-render-function.tsx",
  },
  "search-field-disabled": {
    loader: () =>
      import("./search-field/disabled").then((module) => module.Disabled),
    file: "search-field/disabled.tsx",
  },
  "search-field-form-example": {
    loader: () =>
      import("./search-field/form-example").then(
        (module) => module.FormExample,
      ),
    file: "search-field/form-example.tsx",
  },
  "search-field-full-width": {
    loader: () =>
      import("./search-field/full-width").then((module) => module.FullWidth),
    file: "search-field/full-width.tsx",
  },
  "search-field-on-surface": {
    loader: () =>
      import("./search-field/on-surface").then((module) => module.OnSurface),
    file: "search-field/on-surface.tsx",
  },
  "search-field-required": {
    loader: () =>
      import("./search-field/required").then((module) => module.Required),
    file: "search-field/required.tsx",
  },
  "search-field-validation": {
    loader: () =>
      import("./search-field/validation").then((module) => module.Validation),
    file: "search-field/validation.tsx",
  },
  "search-field-variants": {
    loader: () =>
      import("./search-field/variants").then((module) => module.Variants),
    file: "search-field/variants.tsx",
  },
  "search-field-with-description": {
    loader: () =>
      import("./search-field/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "search-field/with-description.tsx",
  },
  "search-field-with-keyboard-shortcut": {
    loader: () =>
      import("./search-field/with-keyboard-shortcut").then(
        (module) => module.WithKeyboardShortcut,
      ),
    file: "search-field/with-keyboard-shortcut.tsx",
  },
  "search-field-with-validation": {
    loader: () =>
      import("./search-field/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "search-field/with-validation.tsx",
  },
  "select-asynchronous-loading": {
    loader: () =>
      import("./select/asynchronous-loading").then(
        (module) => module.AsynchronousLoading,
      ),
    file: "select/asynchronous-loading.tsx",
  },
  "select-controlled": {
    loader: () =>
      import("./select/controlled").then((module) => module.Controlled),
    file: "select/controlled.tsx",
  },
  "select-controlled-multiple": {
    loader: () =>
      import("./select/controlled-multiple").then(
        (module) => module.ControlledMultiple,
      ),
    file: "select/controlled-multiple.tsx",
  },
  "select-controlled-open-state": {
    loader: () =>
      import("./select/controlled-open-state").then(
        (module) => module.ControlledOpenState,
      ),
    file: "select/controlled-open-state.tsx",
  },
  "select-custom-indicator": {
    loader: () =>
      import("./select/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "select/custom-indicator.tsx",
  },
  "select-custom-render-function": {
    loader: () =>
      import("./select/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "select/custom-render-function.tsx",
  },
  "select-custom-value": {
    loader: () =>
      import("./select/custom-value").then((module) => module.CustomValue),
    file: "select/custom-value.tsx",
  },
  "select-default": {
    loader: () => import("./select/default").then((module) => module.Default),
    file: "select/default.tsx",
  },
  "select-disabled": {
    loader: () => import("./select/disabled").then((module) => module.Disabled),
    file: "select/disabled.tsx",
  },
  "select-full-width": {
    loader: () =>
      import("./select/full-width").then((module) => module.FullWidth),
    file: "select/full-width.tsx",
  },
  "select-multiple-select": {
    loader: () =>
      import("./select/multiple-select").then(
        (module) => module.MultipleSelect,
      ),
    file: "select/multiple-select.tsx",
  },
  "select-on-surface": {
    loader: () =>
      import("./select/on-surface").then((module) => module.OnSurface),
    file: "select/on-surface.tsx",
  },
  "select-required": {
    loader: () => import("./select/required").then((module) => module.Required),
    file: "select/required.tsx",
  },
  "select-variants": {
    loader: () => import("./select/variants").then((module) => module.Variants),
    file: "select/variants.tsx",
  },
  "select-with-description": {
    loader: () =>
      import("./select/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "select/with-description.tsx",
  },
  "select-with-disabled-options": {
    loader: () =>
      import("./select/with-disabled-options").then(
        (module) => module.WithDisabledOptions,
      ),
    file: "select/with-disabled-options.tsx",
  },
  "select-with-sections": {
    loader: () =>
      import("./select/with-sections").then((module) => module.WithSections),
    file: "select/with-sections.tsx",
  },
  "separator-basic": {
    loader: () => import("./separator/basic").then((module) => module.Basic),
    file: "separator/basic.tsx",
  },
  "separator-custom-render-function": {
    loader: () =>
      import("./separator/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "separator/custom-render-function.tsx",
  },
  "separator-variants": {
    loader: () =>
      import("./separator/variants").then((module) => module.Variants),
    file: "separator/variants.tsx",
  },
  "separator-vertical": {
    loader: () =>
      import("./separator/vertical").then((module) => module.Vertical),
    file: "separator/vertical.tsx",
  },
  "separator-with-content": {
    loader: () =>
      import("./separator/with-content").then((module) => module.WithContent),
    file: "separator/with-content.tsx",
  },
  "separator-with-surface": {
    loader: () =>
      import("./separator/with-surface").then((module) => module.WithSurface),
    file: "separator/with-surface.tsx",
  },
  "skeleton-animation-types": {
    loader: () =>
      import("./skeleton/animation-types").then(
        (module) => module.AnimationTypes,
      ),
    file: "skeleton/animation-types.tsx",
  },
  "skeleton-basic": {
    loader: () => import("./skeleton/basic").then((module) => module.Basic),
    file: "skeleton/basic.tsx",
  },
  "skeleton-grid": {
    loader: () => import("./skeleton/grid").then((module) => module.Grid),
    file: "skeleton/grid.tsx",
  },
  "skeleton-list": {
    loader: () => import("./skeleton/list").then((module) => module.List),
    file: "skeleton/list.tsx",
  },
  "skeleton-single-shimmer": {
    loader: () =>
      import("./skeleton/single-shimmer").then(
        (module) => module.SingleShimmer,
      ),
    file: "skeleton/single-shimmer.tsx",
  },
  "skeleton-text-content": {
    loader: () =>
      import("./skeleton/text-content").then((module) => module.TextContent),
    file: "skeleton/text-content.tsx",
  },
  "skeleton-user-profile": {
    loader: () =>
      import("./skeleton/user-profile").then((module) => module.UserProfile),
    file: "skeleton/user-profile.tsx",
  },
  "slider-custom-render-function": {
    loader: () =>
      import("./slider/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "slider/custom-render-function.tsx",
  },
  "slider-default": {
    loader: () => import("./slider/default").then((module) => module.Default),
    file: "slider/default.tsx",
  },
  "slider-disabled": {
    loader: () => import("./slider/disabled").then((module) => module.Disabled),
    file: "slider/disabled.tsx",
  },
  "slider-range": {
    loader: () => import("./slider/range").then((module) => module.Range),
    file: "slider/range.tsx",
  },
  "slider-vertical": {
    loader: () => import("./slider/vertical").then((module) => module.Vertical),
    file: "slider/vertical.tsx",
  },
  "spinner-basic": {
    loader: () =>
      import("./spinner/basic").then((module) => module.SpinnerBasic),
    file: "spinner/basic.tsx",
  },
  "spinner-colors": {
    loader: () =>
      import("./spinner/colors").then((module) => module.SpinnerColors),
    file: "spinner/colors.tsx",
  },
  "spinner-sizes": {
    loader: () =>
      import("./spinner/sizes").then((module) => module.SpinnerSizes),
    file: "spinner/sizes.tsx",
  },
  "surface-variants": {
    loader: () =>
      import("./surface/variants").then((module) => module.Variants),
    file: "surface/variants.tsx",
  },
  "switch-basic": {
    loader: () => import("./switch/basic").then((module) => module.Basic),
    file: "switch/basic.tsx",
  },
  "switch-controlled": {
    loader: () =>
      import("./switch/controlled").then((module) => module.Controlled),
    file: "switch/controlled.tsx",
  },
  "switch-custom-render-function": {
    loader: () =>
      import("./switch/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "switch/custom-render-function.tsx",
  },
  "switch-custom-styles": {
    loader: () =>
      import("./switch/custom-styles").then((module) => module.CustomStyles),
    file: "switch/custom-styles.tsx",
  },
  "switch-default-selected": {
    loader: () =>
      import("./switch/default-selected").then(
        (module) => module.DefaultSelected,
      ),
    file: "switch/default-selected.tsx",
  },
  "switch-disabled": {
    loader: () => import("./switch/disabled").then((module) => module.Disabled),
    file: "switch/disabled.tsx",
  },
  "switch-form": {
    loader: () => import("./switch/form").then((module) => module.Form),
    file: "switch/form.tsx",
  },
  "switch-group": {
    loader: () => import("./switch/group").then((module) => module.Group),
    file: "switch/group.tsx",
  },
  "switch-group-horizontal": {
    loader: () =>
      import("./switch/group-horizontal").then(
        (module) => module.GroupHorizontal,
      ),
    file: "switch/group-horizontal.tsx",
  },
  "switch-label-position": {
    loader: () =>
      import("./switch/label-position").then((module) => module.LabelPosition),
    file: "switch/label-position.tsx",
  },
  "switch-render-props": {
    loader: () =>
      import("./switch/render-props").then((module) => module.RenderProps),
    file: "switch/render-props.tsx",
  },
  "switch-sizes": {
    loader: () => import("./switch/sizes").then((module) => module.Sizes),
    file: "switch/sizes.tsx",
  },
  "switch-with-description": {
    loader: () =>
      import("./switch/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "switch/with-description.tsx",
  },
  "switch-with-icons": {
    loader: () =>
      import("./switch/with-icons").then((module) => module.WithIcons),
    file: "switch/with-icons.tsx",
  },
  "switch-without-label": {
    loader: () =>
      import("./switch/without-label").then((module) => module.WithoutLabel),
    file: "switch/without-label.tsx",
  },
  "table-async-loading": {
    loader: () =>
      import("./table/async-loading").then((module) => module.AsyncLoading),
    file: "table/async-loading.tsx",
  },
  "table-basic": {
    loader: () => import("./table/basic").then((module) => module.Basic),
    file: "table/basic.tsx",
  },
  "table-column-resizing": {
    loader: () =>
      import("./table/column-resizing").then((module) => module.ColumnResizing),
    file: "table/column-resizing.tsx",
  },
  "table-custom-cells": {
    loader: () =>
      import("./table/custom-cells").then((module) => module.CustomCells),
    file: "table/custom-cells.tsx",
  },
  "table-empty-state": {
    loader: () =>
      import("./table/empty-state").then((module) => module.EmptyStateDemo),
    file: "table/empty-state.tsx",
  },
  "table-expandable-rows": {
    loader: () =>
      import("./table/expandable-rows").then((module) => module.ExpandableRows),
    file: "table/expandable-rows.tsx",
  },
  "table-pagination": {
    loader: () =>
      import("./table/pagination").then((module) => module.PaginationDemo),
    file: "table/pagination.tsx",
  },
  "table-secondary-variant": {
    loader: () =>
      import("./table/secondary-variant").then(
        (module) => module.SecondaryVariant,
      ),
    file: "table/secondary-variant.tsx",
  },
  "table-selection": {
    loader: () =>
      import("./table/selection").then((module) => module.SelectionDemo),
    file: "table/selection.tsx",
  },
  "table-sorting": {
    loader: () => import("./table/sorting").then((module) => module.Sorting),
    file: "table/sorting.tsx",
  },
  "table-tanstack-table": {
    loader: () =>
      import("./table/tanstack-table").then((module) => module.TanstackTable),
    file: "table/tanstack-table.tsx",
  },
  "table-virtualization": {
    loader: () =>
      import("./table/virtualization").then((module) => module.Virtualization),
    file: "table/virtualization.tsx",
  },
  "tabs-custom-render-function": {
    loader: () =>
      import("./tabs/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "tabs/custom-render-function.tsx",
  },
  "tag-group-basic": {
    loader: () =>
      import("./tag-group/basic").then((module) => module.TagGroupBasic),
    file: "tag-group/basic.tsx",
  },
  "tag-group-controlled": {
    loader: () =>
      import("./tag-group/controlled").then(
        (module) => module.TagGroupControlled,
      ),
    file: "tag-group/controlled.tsx",
  },
  "tag-group-custom-render-function": {
    loader: () =>
      import("./tag-group/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "tag-group/custom-render-function.tsx",
  },
  "tag-group-disabled": {
    loader: () =>
      import("./tag-group/disabled").then((module) => module.TagGroupDisabled),
    file: "tag-group/disabled.tsx",
  },
  "tag-group-selection-modes": {
    loader: () =>
      import("./tag-group/selection-modes").then(
        (module) => module.TagGroupSelectionModes,
      ),
    file: "tag-group/selection-modes.tsx",
  },
  "tag-group-sizes": {
    loader: () =>
      import("./tag-group/sizes").then((module) => module.TagGroupSizes),
    file: "tag-group/sizes.tsx",
  },
  "tag-group-variants": {
    loader: () =>
      import("./tag-group/variants").then((module) => module.TagGroupVariants),
    file: "tag-group/variants.tsx",
  },
  "tag-group-with-error-message": {
    loader: () =>
      import("./tag-group/with-error-message").then(
        (module) => module.TagGroupWithErrorMessage,
      ),
    file: "tag-group/with-error-message.tsx",
  },
  "tag-group-with-list-data": {
    loader: () =>
      import("./tag-group/with-list-data").then(
        (module) => module.TagGroupWithListData,
      ),
    file: "tag-group/with-list-data.tsx",
  },
  "tag-group-with-prefix": {
    loader: () =>
      import("./tag-group/with-prefix").then(
        (module) => module.TagGroupWithPrefix,
      ),
    file: "tag-group/with-prefix.tsx",
  },
  "tag-group-with-remove-button": {
    loader: () =>
      import("./tag-group/with-remove-button").then(
        (module) => module.TagGroupWithRemoveButton,
      ),
    file: "tag-group/with-remove-button.tsx",
  },
  "textarea-basic": {
    loader: () => import("./textarea/basic").then((module) => module.Basic),
    file: "textarea/basic.tsx",
  },
  "textarea-controlled": {
    loader: () =>
      import("./textarea/controlled").then((module) => module.Controlled),
    file: "textarea/controlled.tsx",
  },
  "textarea-full-width": {
    loader: () =>
      import("./textarea/full-width").then((module) => module.FullWidth),
    file: "textarea/full-width.tsx",
  },
  "textarea-on-surface": {
    loader: () =>
      import("./textarea/on-surface").then((module) => module.OnSurface),
    file: "textarea/on-surface.tsx",
  },
  "textarea-rows": {
    loader: () => import("./textarea/rows").then((module) => module.Rows),
    file: "textarea/rows.tsx",
  },
  "textarea-variants": {
    loader: () =>
      import("./textarea/variants").then((module) => module.Variants),
    file: "textarea/variants.tsx",
  },
  "textfield-basic": {
    loader: () => import("./textfield/basic").then((module) => module.Basic),
    file: "textfield/basic.tsx",
  },
  "textfield-controlled": {
    loader: () =>
      import("./textfield/controlled").then((module) => module.Controlled),
    file: "textfield/controlled.tsx",
  },
  "textfield-custom-render-function": {
    loader: () =>
      import("./textfield/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "textfield/custom-render-function.tsx",
  },
  "textfield-disabled": {
    loader: () =>
      import("./textfield/disabled").then((module) => module.Disabled),
    file: "textfield/disabled.tsx",
  },
  "textfield-full-width": {
    loader: () =>
      import("./textfield/full-width").then((module) => module.FullWidth),
    file: "textfield/full-width.tsx",
  },
  "textfield-input-types": {
    loader: () =>
      import("./textfield/input-types").then((module) => module.InputTypes),
    file: "textfield/input-types.tsx",
  },
  "textfield-on-surface": {
    loader: () =>
      import("./textfield/on-surface").then((module) => module.OnSurface),
    file: "textfield/on-surface.tsx",
  },
  "textfield-required": {
    loader: () =>
      import("./textfield/required").then((module) => module.Required),
    file: "textfield/required.tsx",
  },
  "textfield-textarea": {
    loader: () =>
      import("./textfield/textarea").then((module) => module.TextAreaExample),
    file: "textfield/textarea.tsx",
  },
  "textfield-validation": {
    loader: () =>
      import("./textfield/validation").then((module) => module.Validation),
    file: "textfield/validation.tsx",
  },
  "textfield-with-description": {
    loader: () =>
      import("./textfield/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "textfield/with-description.tsx",
  },
  "textfield-with-error": {
    loader: () =>
      import("./textfield/with-error").then((module) => module.WithError),
    file: "textfield/with-error.tsx",
  },
  "time-field-basic": {
    loader: () => import("./time-field/basic").then((module) => module.Basic),
    file: "time-field/basic.tsx",
  },
  "time-field-controlled": {
    loader: () =>
      import("./time-field/controlled").then((module) => module.Controlled),
    file: "time-field/controlled.tsx",
  },
  "time-field-custom-render-function": {
    loader: () =>
      import("./time-field/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "time-field/custom-render-function.tsx",
  },
  "time-field-disabled": {
    loader: () =>
      import("./time-field/disabled").then((module) => module.Disabled),
    file: "time-field/disabled.tsx",
  },
  "time-field-form-example": {
    loader: () =>
      import("./time-field/form-example").then((module) => module.FormExample),
    file: "time-field/form-example.tsx",
  },
  "time-field-full-width": {
    loader: () =>
      import("./time-field/full-width").then((module) => module.FullWidth),
    file: "time-field/full-width.tsx",
  },
  "time-field-invalid": {
    loader: () =>
      import("./time-field/invalid").then((module) => module.Invalid),
    file: "time-field/invalid.tsx",
  },
  "time-field-on-surface": {
    loader: () =>
      import("./time-field/on-surface").then((module) => module.OnSurface),
    file: "time-field/on-surface.tsx",
  },
  "time-field-required": {
    loader: () =>
      import("./time-field/required").then((module) => module.Required),
    file: "time-field/required.tsx",
  },
  "time-field-with-description": {
    loader: () =>
      import("./time-field/with-description").then(
        (module) => module.WithDescription,
      ),
    file: "time-field/with-description.tsx",
  },
  "time-field-with-prefix-and-suffix": {
    loader: () =>
      import("./time-field/with-prefix-and-suffix").then(
        (module) => module.WithPrefixAndSuffix,
      ),
    file: "time-field/with-prefix-and-suffix.tsx",
  },
  "time-field-with-prefix-icon": {
    loader: () =>
      import("./time-field/with-prefix-icon").then(
        (module) => module.WithPrefixIcon,
      ),
    file: "time-field/with-prefix-icon.tsx",
  },
  "time-field-with-suffix-icon": {
    loader: () =>
      import("./time-field/with-suffix-icon").then(
        (module) => module.WithSuffixIcon,
      ),
    file: "time-field/with-suffix-icon.tsx",
  },
  "time-field-with-validation": {
    loader: () =>
      import("./time-field/with-validation").then(
        (module) => module.WithValidation,
      ),
    file: "time-field/with-validation.tsx",
  },
  "toast-callbacks": {
    loader: () =>
      import("./toast/callbacks").then((module) => module.Callbacks),
    file: "toast/callbacks.tsx",
  },
  "toast-custom-indicator": {
    loader: () =>
      import("./toast/custom-indicator").then(
        (module) => module.CustomIndicator,
      ),
    file: "toast/custom-indicator.tsx",
  },
  "toast-custom-queue": {
    loader: () =>
      import("./toast/custom-queue").then((module) => module.CustomQueue),
    file: "toast/custom-queue.tsx",
  },
  "toast-custom-toast": {
    loader: () =>
      import("./toast/custom-toast").then((module) => module.CustomToast),
    file: "toast/custom-toast.tsx",
  },
  "toast-default": {
    loader: () => import("./toast/default").then((module) => module.Default),
    file: "toast/default.tsx",
  },
  "toast-placements": {
    loader: () =>
      import("./toast/placements").then((module) => module.Placements),
    file: "toast/placements.tsx",
  },
  "toast-promise": {
    loader: () =>
      import("./toast/promise").then((module) => module.PromiseDemo),
    file: "toast/promise.tsx",
  },
  "toast-simple": {
    loader: () => import("./toast/simple").then((module) => module.Simple),
    file: "toast/simple.tsx",
  },
  "toast-variants": {
    loader: () => import("./toast/variants").then((module) => module.Variants),
    file: "toast/variants.tsx",
  },
  "toggle-button-basic": {
    loader: () =>
      import("./toggle-button/basic").then((module) => module.Basic),
    file: "toggle-button/basic.tsx",
  },
  "toggle-button-controlled": {
    loader: () =>
      import("./toggle-button/controlled").then((module) => module.Controlled),
    file: "toggle-button/controlled.tsx",
  },
  "toggle-button-disabled": {
    loader: () =>
      import("./toggle-button/disabled").then((module) => module.Disabled),
    file: "toggle-button/disabled.tsx",
  },
  "toggle-button-group-attached": {
    loader: () =>
      import("./toggle-button-group/attached").then(
        (module) => module.Attached,
      ),
    file: "toggle-button-group/attached.tsx",
  },
  "toggle-button-group-basic": {
    loader: () =>
      import("./toggle-button-group/basic").then((module) => module.Basic),
    file: "toggle-button-group/basic.tsx",
  },
  "toggle-button-group-controlled": {
    loader: () =>
      import("./toggle-button-group/controlled").then(
        (module) => module.Controlled,
      ),
    file: "toggle-button-group/controlled.tsx",
  },
  "toggle-button-group-disabled": {
    loader: () =>
      import("./toggle-button-group/disabled").then(
        (module) => module.Disabled,
      ),
    file: "toggle-button-group/disabled.tsx",
  },
  "toggle-button-group-full-width": {
    loader: () =>
      import("./toggle-button-group/full-width").then(
        (module) => module.FullWidth,
      ),
    file: "toggle-button-group/full-width.tsx",
  },
  "toggle-button-group-orientation": {
    loader: () =>
      import("./toggle-button-group/orientation").then(
        (module) => module.Orientation,
      ),
    file: "toggle-button-group/orientation.tsx",
  },
  "toggle-button-group-selection-mode": {
    loader: () =>
      import("./toggle-button-group/selection-mode").then(
        (module) => module.SelectionMode,
      ),
    file: "toggle-button-group/selection-mode.tsx",
  },
  "toggle-button-group-sizes": {
    loader: () =>
      import("./toggle-button-group/sizes").then((module) => module.Sizes),
    file: "toggle-button-group/sizes.tsx",
  },
  "toggle-button-group-without-separator": {
    loader: () =>
      import("./toggle-button-group/without-separator").then(
        (module) => module.WithoutSeparator,
      ),
    file: "toggle-button-group/without-separator.tsx",
  },
  "toggle-button-icon-only": {
    loader: () =>
      import("./toggle-button/icon-only").then((module) => module.IconOnly),
    file: "toggle-button/icon-only.tsx",
  },
  "toggle-button-sizes": {
    loader: () =>
      import("./toggle-button/sizes").then((module) => module.Sizes),
    file: "toggle-button/sizes.tsx",
  },
  "toggle-button-variants": {
    loader: () =>
      import("./toggle-button/variants").then((module) => module.Variants),
    file: "toggle-button/variants.tsx",
  },
  "toolbar-attached": {
    loader: () =>
      import("./toolbar/custom-styles").then((module) => module.Attached),
    file: "toolbar/custom-styles.tsx",
  },
  "toolbar-basic": {
    loader: () => import("./toolbar/basic").then((module) => module.Basic),
    file: "toolbar/basic.tsx",
  },
  "toolbar-vertical": {
    loader: () =>
      import("./toolbar/vertical").then((module) => module.Vertical),
    file: "toolbar/vertical.tsx",
  },
  "toolbar-with-button-group": {
    loader: () =>
      import("./toolbar/with-button-group").then(
        (module) => module.WithButtonGroup,
      ),
    file: "toolbar/with-button-group.tsx",
  },
  "tooltip-basic": {
    loader: () =>
      import("./tooltip/basic").then((module) => module.TooltipBasic),
    file: "tooltip/basic.tsx",
  },
  "tooltip-custom-render-function": {
    loader: () =>
      import("./tooltip/custom-render-function").then(
        (module) => module.CustomRenderFunction,
      ),
    file: "tooltip/custom-render-function.tsx",
  },
  "tooltip-custom-trigger": {
    loader: () =>
      import("./tooltip/custom-trigger").then(
        (module) => module.TooltipCustomTrigger,
      ),
    file: "tooltip/custom-trigger.tsx",
  },
  "tooltip-placement": {
    loader: () =>
      import("./tooltip/placement").then((module) => module.TooltipPlacement),
    file: "tooltip/placement.tsx",
  },
  "tooltip-with-arrow": {
    loader: () =>
      import("./tooltip/with-arrow").then((module) => module.TooltipWithArrow),
    file: "tooltip/with-arrow.tsx",
  },
  "typography-primitives": {
    loader: () =>
      import("./typography/primitives").then((module) => module.Primitives),
    file: "typography/primitives.tsx",
  },
  "typography-prose": {
    loader: () => import("./typography/prose").then((module) => module.Prose),
    file: "typography/prose.tsx",
  },
  "typography-render-props": {
    loader: () =>
      import("./typography/render-props").then((module) => module.RenderProps),
    file: "typography/render-props.tsx",
  },
  "typography-typography-scale": {
    loader: () =>
      import("./typography/typography-scale").then(
        (module) => module.TypographyScale,
      ),
    file: "typography/typography-scale.tsx",
  },
};

export function getDemo(name: string) {
  return demos[name];
}
