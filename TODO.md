# HeroUI Pro component implementation

This is the source of truth for the HeroUI Pro parity project. A component is only complete when all four boxes are checked:

1. Public API, behavior, exports, and CSS class names match the documentation.
2. Storybook contains the same documented stories and states.
3. Light and dark modes have been visually compared with HeroUI Pro Storybook.
4. Typecheck, lint, package build, Storybook build, and the component's focused interactions pass.

## Phase 1 — Charts and shared visualization primitives

- [x] [Chart Tooltip docs](https://heroui.pro/docs/react/components/chart-tooltip) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-charttooltip--docs)
- [x] [Area Chart docs](https://heroui.pro/docs/react/components/area-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-areachart--docs)
- [x] [Bar Chart docs](https://heroui.pro/docs/react/components/bar-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-barchart--docs)
- [x] [Line Chart docs](https://heroui.pro/docs/react/components/line-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-linechart--docs)
- [x] [Composed Chart docs](https://heroui.pro/docs/react/components/composed-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-composedchart--docs)
- [x] [Pie Chart docs](https://heroui.pro/docs/react/components/pie-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-piechart--docs)
- [x] [Radar Chart docs](https://heroui.pro/docs/react/components/radar-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-radarchart--docs)
- [x] [Radial Chart docs](https://heroui.pro/docs/react/components/radial-chart) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-charts-radialchart--docs)

## Phase 2 — Small shared primitives

- [x] [Number Value docs](https://heroui.pro/docs/react/components/number-value) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-numbervalue--docs)
- [x] [Pressable Feedback docs](https://heroui.pro/docs/react/components/pressable-feedback) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-pressablefeedback--docs)
- [x] [Trend Chip docs](https://heroui.pro/docs/react/components/trend-chip) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-trendchip--docs)
- [x] [Rating docs](https://heroui.pro/docs/react/components/rating) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-rating--docs)
- [x] [Emoji Reaction Button docs](https://heroui.pro/docs/react/components/emoji-reaction-button) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-emojireactionbutton--docs)
- [x] [Resizable docs](https://heroui.pro/docs/react/components/resizable) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-resizable--docs)

## Phase 3 — Forms

- [x] [Number Stepper docs](https://heroui.pro/docs/react/components/number-stepper) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-numberstepper--docs) — implementation and stories added; final catalog-wide visual audit remains
- [x] [Cell Color Picker docs](https://heroui.pro/docs/react/components/cell-color-picker) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-cellcolorpicker--docs)
- [x] [Cell Select docs](https://heroui.pro/docs/react/components/cell-select) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-cellselect--docs)
- [x] [Cell Slider docs](https://heroui.pro/docs/react/components/cell-slider) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-cellslider--docs)
- [x] [Cell Switch docs](https://heroui.pro/docs/react/components/cell-switch) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-cellswitch--docs)
- [x] [Checkbox Button Group docs](https://heroui.pro/docs/react/components/checkbox-button-group) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-checkboxbuttongroup--docs)
- [x] [Inline Select docs](https://heroui.pro/docs/react/components/inline-select) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-inlineselect--docs)
- [x] [Native Select docs](https://heroui.pro/docs/react/components/native-select) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-nativeselect--docs)
- [x] [Radio Button Group docs](https://heroui.pro/docs/react/components/radio-button-group) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-radiobuttongroup--docs)
- [x] [Drop Zone docs](https://heroui.pro/docs/react/components/drop-zone) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-dropzone--docs)
- [x] [Rich Text Editor docs](https://heroui.pro/docs/react/components/rich-text-editor) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-richtexteditor--docs)

## Phase 4 — Data display and dashboard composition

- [x] [Empty State docs](https://heroui.pro/docs/react/components/empty-state) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-emptystate--docs)
- [x] [Action Bar docs](https://heroui.pro/docs/react/components/action-bar) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-actionbar--docs)
- [x] [Agenda docs](https://heroui.pro/docs/react/components/agenda) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-agenda--docs)
- [x] [Carousel docs](https://heroui.pro/docs/react/components/carousel) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-carousel--docs)
- [x] [Floating TOC docs](https://heroui.pro/docs/react/components/floating-toc) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-floatingtoc--docs)
- [x] [Hover Card docs](https://heroui.pro/docs/react/components/hover-card) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-hovercard--docs)
- [x] [Item Card docs](https://heroui.pro/docs/react/components/item-card) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-itemcard--docs)
- [x] [Item Card Group docs](https://heroui.pro/docs/react/components/item-card-group) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-itemcardgroup--docs)
- [x] [KPI docs](https://heroui.pro/docs/react/components/kpi) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-kpi-key-performance-indicator--docs)
- [x] [KPI Group docs](https://heroui.pro/docs/react/components/kpi-group) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-kpigroup--docs)
- [x] [Widget docs](https://heroui.pro/docs/react/components/widget) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-widget--docs)
- [x] [List View docs](https://heroui.pro/docs/react/components/list-view) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-listview--docs)
- [x] [File Tree docs](https://heroui.pro/docs/react/components/file-tree) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-filetree--docs)
- [x] [Timeline docs](https://heroui.pro/docs/react/components/timeline) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-timeline--docs)
- [x] [Kanban docs](https://heroui.pro/docs/react/components/kanban) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-kanban--docs)
- [x] [Data Grid docs](https://heroui.pro/docs/react/components/data-grid) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-datagrid--docs)
- [x] [Map docs](https://heroui.pro/docs/react/components/map) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-data-display-map--docs)

## Phase 5 — Navigation and overlays

- [x] [Segment docs](https://heroui.pro/docs/react/components/segment) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-segment--docs)
- [x] [Stepper docs](https://heroui.pro/docs/react/components/stepper) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-stepper--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Command docs](https://heroui.pro/docs/react/components/command) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-command--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Context Menu docs](https://heroui.pro/docs/react/components/context-menu) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-contextmenu--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Navbar docs](https://heroui.pro/docs/react/components/navbar) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-navbar--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Sidebar docs](https://heroui.pro/docs/react/components/sidebar) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-sidebar--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [AppLayout docs](https://heroui.pro/docs/react/components/app-layout) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-applayout--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Emoji Picker docs](https://heroui.pro/docs/react/components/emoji-picker) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-emojipicker--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Sheet docs](https://heroui.pro/docs/react/components/sheet) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-sheet--docs) — implementation and all reference stories added; final catalog-wide visual audit remains

## Phase 6 — AI building blocks and compositions

- [x] [Text Shimmer docs](https://heroui.pro/docs/react/components/text-shimmer) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-textshimmer--docs) — implementation and reference story added; final catalog-wide visual audit remains
- [x] [Code Block docs](https://heroui.pro/docs/react/components/code-block) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-codeblock--docs) — implementation and reference story added; final catalog-wide visual audit remains
- [x] [Markdown docs](https://heroui.pro/docs/react/components/markdown) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-markdown--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chat Attachment docs](https://heroui.pro/docs/react/components/chat-attachment) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatattachment--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chat Source docs](https://heroui.pro/docs/react/components/chat-source) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatsource--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chat Message Actions docs](https://heroui.pro/docs/react/components/chat-message-actions) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatmessageactions--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chat Tool docs](https://heroui.pro/docs/react/components/chat-tool) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chattool--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chain Of Thought docs](https://heroui.pro/docs/react/components/chain-of-thought) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chainofthought--docs)
- [x] [Chat Loader docs](https://heroui.pro/docs/react/components/chat-loader) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatloader--docs) — implementation and reference story added; final catalog-wide visual audit remains
- [x] [Chat Message docs](https://heroui.pro/docs/react/components/chat-message) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatmessage--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Chat Conversation docs](https://heroui.pro/docs/react/components/chat-conversation) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatconversation--docs)
- [x] [Chat List View docs](https://heroui.pro/docs/react/components/chat-list-view) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatlistview--docs)
- [x] [Prompt Suggestion docs](https://heroui.pro/docs/react/components/prompt-suggestion) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-promptsuggestion--docs) — implementation and all reference stories added; final catalog-wide visual audit remains
- [x] [Prompt Input docs](https://heroui.pro/docs/react/components/prompt-input) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-promptinput--docs) — implementation and all reference stories added; final catalog-wide visual audit remains

## Final audit

- [x] Every component and documented compound part is exported from the package root and a component subpath.
- [x] Every documented CSS class and state selector is present.
- [x] Every reference Storybook story has a matching local story.
- [x] Every component has light-mode and dark-mode visual comparison evidence.
- [x] Keyboard, focus, disabled, controlled, and responsive interactions are verified where applicable.
- [x] UIKit typecheck, lint, build, pack inspection, and Storybook production build pass.

## Visual parity follow-up audit

### Shared foundations

- [x] Compare Storybook typography, font loading, antialiasing, and perceived weight with the official HeroUI Storybook before applying component-specific weight overrides.
- [ ] Replace hardcoded SVGs, emoji, and mismatched icons throughout Storybook with HeroUI icons where available and Hugeicons otherwise.
- [ ] Verify all follow-up fixes in light and dark mode, including hover, press, focus, disabled, animation, and responsive states where applicable.

### Shared primitives and charts

- [x] Segment matches official active, inactive-hover, tint, separator, radius, and motion styles.
- [x] Chart axes use the official typography weight across area, bar, composed, line, pie, radar, and radial charts.
- [x] ChartTooltip matches official padding and radius in every tooltip variant.
- [x] Bar Chart percentage chip uses the official dark-green text treatment.
- [x] TextShimmer animation timing, gradient, direction, and easing match the official Storybook.
- [x] ChainOfThought hover and disclosure text transitions animate like the official Storybook.

### Dependent complex components

- [x] Agenda composes the shared Segment component for its top view switcher and matches official behavior.
- [ ] Navbar Search Docs uses the official input variant and user icon; Dashboard renders without errors.
- [ ] Sidebar is re-audited for hover actions, menu icons, collapsed square icons, spacing, and all official states.
- [ ] AppLayout is re-audited after Navbar and Sidebar fixes.

### Collections, data display, and overlays

- [x] Carousel navigation dots match the official shape, spacing, active state, and interaction.
- [ ] DataGrid stories match official data, selection count, badge colors, controls, and layouts.
- [x] FileTree checkbox stories visibly identify selected items.
- [x] FloatingTOC content typography matches the official weight.
- [ ] Kanban stories match official boards and group backgrounds; dragging does not add an incorrect hamburger icon.
- [ ] Map component and stories match official tooltips, controls, markers, overlays, and layouts.
- [ ] Timeline Centered Milestones pill colors and all subsequent stories match the official Storybook.
- [ ] Sheet positions, widths, responsive behavior, and story trigger variants match the official Storybook.
- [ ] EmojiPicker navigation scrolls to emoji groups and includes the official complete emoji set.

### AI components and stories

- [ ] ChatAttachment stories use the standard Hugeicons icon set.
- [ ] ChatLoader dots match the official size, spacing, timing, and animation.
- [ ] ChatSource stories include stacked favicons and use the correct Hugeicons.
- [ ] ChatTool code typography and spacing between code blocks match the official Storybook.
- [ ] PromptInput stories restore model selection and replace incorrect or emoji icons with the official iconography.

### Form and interaction components

- [ ] PressableFeedback standalone highlight and final two card hover/press states match official behavior.
- [ ] CellSelect uses the official Hugeicon.
- [ ] CellSlider hover line is vertically centered and expands correctly while pressed.
- [ ] DropZone file-list retry buttons use the official variant in regular and compact stories.
- [ ] InlineSelect uses correctly sized Hugeicon chevrons.
- [ ] NativeSelect does not retain an incorrect trigger focus treatment after selection or click.
- [ ] RadioButtonGroup custom indicator, delivery/payment logos, and subscription-plan styling match official stories.
- [ ] RichTextEditor component and stories are fully re-audited for radii, spacing, menus, controls, and states.

### Completion gates

- [ ] Every item above has official/local Storybook comparison evidence.
- [ ] Formatting, lint, typecheck, UIKit build, Storybook production build, package pack, and flat-subpath consumer imports pass.
