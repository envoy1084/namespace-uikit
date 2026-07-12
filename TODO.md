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
- [ ] [Context Menu docs](https://heroui.pro/docs/react/components/context-menu) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-contextmenu--docs)
- [ ] [Navbar docs](https://heroui.pro/docs/react/components/navbar) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-navbar--docs)
- [ ] [Sidebar docs](https://heroui.pro/docs/react/components/sidebar) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-sidebar--docs)
- [ ] [AppLayout docs](https://heroui.pro/docs/react/components/app-layout) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-applayout--docs)
- [ ] [Emoji Picker docs](https://heroui.pro/docs/react/components/emoji-picker) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-emojipicker--docs)
- [ ] [Sheet docs](https://heroui.pro/docs/react/components/sheet) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-sheet--docs)

## Phase 6 — AI building blocks and compositions

- [ ] [Text Shimmer docs](https://heroui.pro/docs/react/components/text-shimmer) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-textshimmer--docs)
- [ ] [Code Block docs](https://heroui.pro/docs/react/components/code-block) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-codeblock--docs)
- [ ] [Markdown docs](https://heroui.pro/docs/react/components/markdown) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-markdown--docs)
- [ ] [Chat Attachment docs](https://heroui.pro/docs/react/components/chat-attachment) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatattachment--docs)
- [ ] [Chat Source docs](https://heroui.pro/docs/react/components/chat-source) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatsource--docs)
- [ ] [Chat Message Actions docs](https://heroui.pro/docs/react/components/chat-message-actions) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatmessageactions--docs)
- [ ] [Chat Tool docs](https://heroui.pro/docs/react/components/chat-tool) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chattool--docs)
- [ ] [Chain Of Thought docs](https://heroui.pro/docs/react/components/chain-of-thought) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chainofthought--docs)
- [ ] [Chat Loader docs](https://heroui.pro/docs/react/components/chat-loader) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatloader--docs)
- [ ] [Chat Message docs](https://heroui.pro/docs/react/components/chat-message) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatmessage--docs)
- [ ] [Chat Conversation docs](https://heroui.pro/docs/react/components/chat-conversation) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatconversation--docs)
- [ ] [Chat List View docs](https://heroui.pro/docs/react/components/chat-list-view) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-chatlistview--docs)
- [ ] [Prompt Suggestion docs](https://heroui.pro/docs/react/components/prompt-suggestion) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-promptsuggestion--docs)
- [ ] [Prompt Input docs](https://heroui.pro/docs/react/components/prompt-input) · [Storybook](https://storybook.heroui.pro/?path=/docs/components-ai-promptinput--docs)

## Final audit

- [ ] Every component and documented compound part is exported from the package root and a component subpath.
- [ ] Every documented CSS class and state selector is present.
- [ ] Every reference Storybook story has a matching local story.
- [ ] Every component has light-mode and dark-mode visual comparison evidence.
- [ ] Keyboard, focus, disabled, controlled, and responsive interactions are verified where applicable.
- [ ] UIKit typecheck, lint, build, pack inspection, and Storybook production build pass.
