"use client";

import type { CalendarDate } from "@internationalized/date";

import type {
  ComponentPropsWithRef,
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  ReactElement,
  ReactNode,
} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button, cn } from "@heroui/react";
import {
  CalendarDateTime,
  getLocalTimeZone,
  isSameDay,
  startOfWeek,
  today,
} from "@internationalized/date";

import { Segment } from "../buttons/segment";

export type AgendaView = "day" | "month" | "week";
export type AgendaEventStatus = "confirmed" | "unconfirmed";
export interface AgendaEventData {
  color?: string;
  end: CalendarDateTime;
  id: string;
  isAllDay?: boolean;
  isReadOnly?: boolean;
  start: CalendarDateTime;
  status?: AgendaEventStatus;
  title: string;
}
export interface AgendaStateOptions {
  date?: CalendarDate;
  defaultDate?: CalendarDate;
  defaultSelectedEventId?: null | string;
  defaultView?: AgendaView;
  endHour?: number;
  events: AgendaEventData[];
  onDateChange?: (date: CalendarDate) => void;
  onEventCreate?: (event: {
    end: CalendarDateTime;
    start: CalendarDateTime;
  }) => void;
  onEventDelete?: (id: string) => void;
  onEventMove?: (
    id: string,
    start: CalendarDateTime,
    end: CalendarDateTime,
  ) => void;
  onEventResize?: (
    id: string,
    start: CalendarDateTime,
    end: CalendarDateTime,
  ) => void;
  onEventSelect?: (id: null | string) => void;
  onViewChange?: (view: AgendaView) => void;
  selectedEventId?: null | string;
  slotDuration?: number;
  startHour?: number;
  view?: AgendaView;
  weekDays?: number;
}
export interface AgendaLayoutItem {
  colSpan: number;
  colStart: number;
  event: AgendaEventData;
  row: number;
}
export interface AgendaDropPreview {
  color?: string;
  dateStr: string;
  heightPx?: number;
  topPx?: number;
}
export type AgendaDragState =
  | { type: "idle" }
  | { eventId: string; type: "moving" | "resizing" };
export interface AgendaState {
  allDayCountPerDay: number[];
  allDayLayout: AgendaLayoutItem[];
  date: CalendarDate;
  dragState: AgendaDragState;
  dropPreview: AgendaDropPreview | null;
  endHour: number;
  events: AgendaEventData[];
  getAllEventsForDay: (date: CalendarDate) => AgendaEventData[];
  getEventLayout: (id: string) => { columnIndex: number; totalColumns: number };
  getEventsForDay: (date: CalendarDate) => AgendaEventData[];
  getMonthRowLayout: (week: CalendarDate[]) => {
    items: AgendaLayoutItem[];
    rowCount: number;
    rowCountPerCol: number[];
  };
  getPerCellEvents: (
    date: CalendarDate,
    week: CalendarDate[],
  ) => AgendaEventData[];
  goToNext: () => void;
  goToPrevious: () => void;
  goToToday: () => void;
  heading: string;
  isAllDayExpanded: boolean;
  onEventCreate?: AgendaStateOptions["onEventCreate"];
  onEventDelete?: AgendaStateOptions["onEventDelete"];
  onEventMove?: AgendaStateOptions["onEventMove"];
  onEventResize?: AgendaStateOptions["onEventResize"];
  selectEvent: (id: null | string) => void;
  selectedEventId: null | string;
  setDate: (date: CalendarDate) => void;
  setDragState: (state: AgendaDragState) => void;
  setDropPreview: (preview: AgendaDropPreview | null) => void;
  setView: (view: AgendaView) => void;
  slotDuration: number;
  startHour: number;
  timeZone: string;
  toggleAllDayExpanded: () => void;
  view: AgendaView;
  visibleDays: CalendarDate[];
  visibleWeeks: CalendarDate[][];
}
function eventOnDate(event: AgendaEventData, date: CalendarDate): boolean {
  return (
    isSameDay(event.start, date) ||
    (event.start.compare(date) <= 0 && event.end.compare(date) >= 0)
  );
}

function dateTimeAt(
  date: CalendarDate,
  startHour: number,
  minutes: number,
): CalendarDateTime {
  const total = startHour * 60 + minutes;
  return new CalendarDateTime(
    date.year,
    date.month,
    date.day,
    Math.floor(total / 60),
    total % 60,
  );
}

export function useAgenda(options: AgendaStateOptions): AgendaState {
  const zone = getLocalTimeZone();
  const now = today(zone);
  const [internalView, setInternalView] = useState<AgendaView>(
    options.defaultView ?? "week",
  );
  const view = options.view ?? internalView;
  const [internalDate, setInternalDate] = useState<CalendarDate>(
    options.defaultDate ?? now,
  );
  const date = options.date ?? internalDate;
  const [internalSelected, setInternalSelected] = useState<null | string>(
    options.defaultSelectedEventId ?? null,
  );
  const selectedEventId = options.selectedEventId ?? internalSelected;
  const [isAllDayExpanded, setAllDayExpanded] = useState(true);
  const [dragState, setDragState] = useState<AgendaDragState>({ type: "idle" });
  const [dropPreview, setDropPreview] = useState<AgendaDropPreview | null>(
    null,
  );
  const weekDays = options.weekDays ?? 7;
  const setView = useCallback(
    (value: AgendaView) => {
      if (options.view === undefined) setInternalView(value);
      options.onViewChange?.(value);
    },
    [options],
  );
  const setDate = useCallback(
    (value: CalendarDate) => {
      if (options.date === undefined) setInternalDate(value);
      options.onDateChange?.(value);
    },
    [options],
  );
  const selectEvent = useCallback(
    (id: null | string) => {
      if (options.selectedEventId === undefined) setInternalSelected(id);
      options.onEventSelect?.(id);
    },
    [options],
  );
  const visibleDays = useMemo(() => {
    if (view === "day") return [date];
    const base =
      weekDays >= 7
        ? startOfWeek(date, "en-US")
        : date.subtract({ days: Math.floor(weekDays / 2) });
    return Array.from({ length: weekDays }, (_, index) =>
      base.add({ days: index }),
    );
  }, [date, view, weekDays]);
  const visibleWeeks = useMemo(() => {
    if (view !== "month") return [];
    const start = startOfWeek(date.set({ day: 1 }), "en-US");
    return Array.from({ length: 6 }, (_, row) =>
      Array.from({ length: 7 }, (_value, column) =>
        start.add({ days: row * 7 + column }),
      ),
    );
  }, [date, view]);
  const getEventsForDay = useCallback(
    (day: CalendarDate) =>
      options.events.filter(
        (event) => !event.isAllDay && eventOnDate(event, day),
      ),
    [options.events],
  );
  const getAllEventsForDay = useCallback(
    (day: CalendarDate) =>
      options.events.filter((event) => eventOnDate(event, day)),
    [options.events],
  );
  const getEventLayout = useCallback(
    (id: string) => {
      const target = options.events.find((event) => event.id === id);
      if (!target) return { columnIndex: 0, totalColumns: 1 };
      const peers = options.events.filter(
        (event) =>
          !event.isAllDay &&
          isSameDay(event.start, target.start) &&
          event.start.compare(target.end) < 0 &&
          target.start.compare(event.end) < 0,
      );
      return {
        columnIndex: Math.max(
          0,
          peers.findIndex((event) => event.id === id),
        ),
        totalColumns: Math.max(1, peers.length),
      };
    },
    [options.events],
  );
  const layoutForWeek = useCallback(
    (week: CalendarDate[]) => {
      const items: AgendaLayoutItem[] = [];
      const rowEnds: number[] = [];
      for (const event of options.events.filter((item) => item.isAllDay)) {
        const covered = week
          .map((day, index) => (eventOnDate(event, day) ? index : -1))
          .filter((index) => index >= 0);
        if (!covered.length) continue;
        const colStart = covered[0]!,
          colSpan = covered.at(-1)! - colStart + 1;
        let row = rowEnds.findIndex((end) => end < colStart);
        if (row < 0) {
          row = rowEnds.length;
          rowEnds.push(-1);
        }
        rowEnds[row] = colStart + colSpan - 1;
        items.push({ colSpan, colStart, event, row });
      }
      const rowCountPerCol = week.map((_day, index) =>
        items
          .filter(
            (item) =>
              index >= item.colStart && index < item.colStart + item.colSpan,
          )
          .reduce((max, item) => Math.max(max, item.row + 1), 0),
      );
      return { items, rowCount: rowEnds.length, rowCountPerCol };
    },
    [options.events],
  );
  const heading = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric",
      }).format(date.toDate(zone)),
    [date, zone],
  );
  return {
    allDayCountPerDay: visibleDays.map(
      (day) =>
        options.events.filter(
          (event) => event.isAllDay && eventOnDate(event, day),
        ).length,
    ),
    allDayLayout: layoutForWeek(visibleDays).items,
    date,
    dragState,
    dropPreview,
    endHour: options.endHour ?? 24,
    events: options.events,
    getAllEventsForDay,
    getEventLayout,
    getEventsForDay,
    getMonthRowLayout: layoutForWeek,
    getPerCellEvents: (day, week) => {
      const spanning = new Set(
        layoutForWeek(week).items.map((item) => item.event.id),
      );
      return getAllEventsForDay(day).filter((event) => !spanning.has(event.id));
    },
    goToNext: () =>
      setDate(
        view === "day"
          ? date.add({ days: 1 })
          : view === "week"
            ? date.add({ days: weekDays })
            : date.add({ months: 1 }),
      ),
    goToPrevious: () =>
      setDate(
        view === "day"
          ? date.subtract({ days: 1 })
          : view === "week"
            ? date.subtract({ days: weekDays })
            : date.subtract({ months: 1 }),
      ),
    goToToday: () => setDate(now),
    heading,
    isAllDayExpanded,
    onEventCreate: options.onEventCreate,
    onEventDelete: options.onEventDelete,
    onEventMove: options.onEventMove,
    onEventResize: options.onEventResize,
    selectEvent,
    selectedEventId,
    setDate,
    setDragState,
    setDropPreview,
    setView,
    slotDuration: options.slotDuration ?? 60,
    startHour: options.startHour ?? 0,
    timeZone: zone,
    toggleAllDayExpanded: () => setAllDayExpanded((value) => !value),
    view,
    visibleDays,
    visibleWeeks,
  };
}

const AgendaContext = createContext<AgendaState | null>(null);
function useAgendaContext(): AgendaState {
  const value = useContext(AgendaContext);
  if (!value)
    throw new Error("Agenda components must be used within Agenda.Root");
  return value;
}
export interface AgendaRootProps
  extends AgendaState, Omit<ComponentPropsWithRef<"div">, "onSelect"> {}
function AgendaRoot({
  children,
  className,
  ...state
}: AgendaRootProps): ReactElement {
  const context = state as AgendaState;
  return (
    <AgendaContext value={context}>
      <div
        className={cn("agenda", `agenda--${state.view}`, className)}
        data-slot="agenda"
        data-view={state.view}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (
            (event.key === "Delete" || event.key === "Backspace") &&
            state.selectedEventId
          )
            state.onEventDelete?.(state.selectedEventId);
        }}
      >
        {children}
      </div>
    </AgendaContext>
  );
}
function slotDiv(name: string, tag: "div" | "header" = "div") {
  return function Slot({
    children,
    className,
    ...props
  }: ComponentPropsWithRef<"div">): ReactElement {
    const Tag = tag;
    return (
      <Tag
        {...props}
        className={cn(`agenda__${name}`, className)}
        data-slot={`agenda-${name}`}
      >
        {children}
      </Tag>
    );
  };
}
const AgendaHeader: ReturnType<typeof slotDiv> = slotDiv("header", "header");
const AgendaNavigation: ReturnType<typeof slotDiv> = slotDiv("navigation");
const AgendaBody: ReturnType<typeof slotDiv> = slotDiv("body");
function AgendaHeading({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"h1">): ReactElement {
  const { heading } = useAgendaContext();
  return (
    <h1
      {...props}
      className={cn("agenda__heading", className)}
      data-slot="agenda-heading"
    >
      {children ?? heading}
    </h1>
  );
}
function AgendaNavButton({
  children,
  className,
  slot = "next",
}: {
  children?: ReactNode;
  className?: string;
  slot?: "next" | "previous";
}): ReactElement {
  const agenda = useAgendaContext();
  return (
    <Button
      isIconOnly
      aria-label={slot === "previous" ? "Previous" : "Next"}
      className={cn("agenda__nav-button", className) ?? "agenda__nav-button"}
      size="sm"
      variant="ghost"
      onPress={slot === "previous" ? agenda.goToPrevious : agenda.goToNext}
    >
      {children ?? (slot === "previous" ? "‹" : "›")}
    </Button>
  );
}
function AgendaTodayButton({
  children = "Today",
  className,
}: {
  children?: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <Button
      className={
        cn("agenda__today-button", className) ?? "agenda__today-button"
      }
      size="sm"
      variant="outline"
      onPress={useAgendaContext().goToToday}
    >
      {children}
    </Button>
  );
}
function AgendaViewSelector({
  children,
  className,
  size = "sm",
}: {
  children?: ReactNode;
  className?: string;
  size?: "lg" | "md" | "sm";
}): ReactElement {
  const { setView, view } = useAgendaContext();
  return (
    <Segment
      aria-label="Calendar view"
      className={
        cn("agenda__view-selector", className) ?? "agenda__view-selector"
      }
      selectedKey={view}
      size={size}
      onSelectionChange={(next) => {
        if (next === "day" || next === "week" || next === "month") {
          setView(next);
        }
      }}
    >
      {children ??
        (["day", "week", "month"] as const).map((item) => (
          <Segment.Item id={item} key={item}>
            {item[0]?.toUpperCase()}
            {item.slice(1)}
          </Segment.Item>
        ))}
    </Segment>
  );
}
function AgendaDayHeader({ date }: { date: CalendarDate }): ReactElement {
  const zone = getLocalTimeZone();
  const isToday = isSameDay(date, today(zone));
  return (
    <div className="agenda__day-header" data-slot="agenda-day-header">
      <span
        className="agenda__day-header-name"
        data-today={isToday || undefined}
      >
        {new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(
          date.toDate(zone),
        )}
      </span>
      <span
        className="agenda__day-header-date"
        data-today={isToday || undefined}
      >
        {date.day}
      </span>
    </div>
  );
}
function AgendaWeekHeader({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  const { visibleDays } = useAgendaContext();
  return (
    <div
      {...props}
      className={cn("agenda__week-header", className)}
      data-slot="agenda-week-header"
    >
      {children ??
        visibleDays.map((date) => (
          <AgendaDayHeader date={date} key={date.toString()} />
        ))}
    </div>
  );
}
function AgendaAllDaySection({
  children,
  className,
  collapsedLabel = (count: number) => `${count} event${count === 1 ? "" : "s"}`,
}: ComponentPropsWithRef<"div"> & {
  collapsedLabel?: (count: number) => string;
}): ReactElement {
  const agenda = useAgendaContext();
  return (
    <div
      className={cn("agenda__all-day-section", className)}
      data-expanded={agenda.isAllDayExpanded || undefined}
      data-slot="agenda-all-day-section"
      style={{
        gridTemplateColumns: `repeat(${Math.max(1, agenda.visibleDays.length)}, minmax(0, 1fr))`,
      }}
    >
      <div className="agenda__all-day-dividers" aria-hidden>
        {agenda.visibleDays.map((day) => (
          <div
            className="agenda__all-day-divider"
            data-weekend={
              [0, 6].includes(day.toDate(agenda.timeZone).getDay()) || undefined
            }
            key={day.toString()}
          />
        ))}
      </div>
      <Button
        isIconOnly
        aria-label={
          agenda.isAllDayExpanded
            ? "Collapse all-day events"
            : "Expand all-day events"
        }
        className="agenda__all-day-toggle"
        data-expanded={agenda.isAllDayExpanded || undefined}
        size="sm"
        variant="ghost"
        onPress={agenda.toggleAllDayExpanded}
      >
        ⌄
      </Button>
      {agenda.isAllDayExpanded
        ? children
        : agenda.allDayCountPerDay.map((count, index) => (
            <span
              className="agenda__all-day-summary"
              key={agenda.visibleDays[index]?.toString()}
            >
              {count ? collapsedLabel(count) : null}
            </span>
          ))}
    </div>
  );
}
function AgendaAllDayLabel({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement {
  return (
    <span
      {...props}
      className={cn("agenda__all-day-label", className)}
      data-slot="agenda-all-day-label"
    >
      {children}
    </span>
  );
}
function AgendaAllDayEvent({
  children,
  className,
  colSpan,
  colStart,
  event,
  row,
  style,
  ...props
}: ComponentPropsWithRef<"div"> & AgendaLayoutItem): ReactElement {
  const agenda = useAgendaContext();
  return (
    <div
      {...props}
      className={cn("agenda__all-day-event", className)}
      data-selected={agenda.selectedEventId === event.id || undefined}
      data-slot="agenda-all-day-event"
      data-status={event.status ?? "confirmed"}
      role="button"
      style={
        {
          gridColumn: `${colStart + 1} / span ${colSpan}`,
          gridRow: row + 1,
          "--agenda-event-accent": event.color,
          ...style,
        } as CSSProperties
      }
      tabIndex={0}
      onClick={() => agenda.selectEvent(event.id)}
    >
      {children ?? event.title}
    </div>
  );
}
function AgendaTimeGrid({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  const agenda = useAgendaContext();
  const hours = Array.from(
    { length: agenda.endHour - agenda.startHour },
    (_, index) => agenda.startHour + index,
  );
  return (
    <div
      {...props}
      className={cn(
        "agenda__time-grid",
        `agenda__time-grid--${agenda.view}`,
        className,
      )}
      data-slot="agenda-time-grid"
    >
      <div className="agenda__time-labels">
        {hours.map((hour) => (
          <div className="agenda__time-label" key={hour}>
            <span>
              {hour
                ? new Intl.DateTimeFormat(undefined, {
                    hour: "numeric",
                  }).format(new Date(2020, 0, 1, hour))
                : ""}
            </span>
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
function AgendaDayColumn({
  children,
  className,
  date,
  ...props
}: ComponentPropsWithRef<"div"> & { date: CalendarDate }): ReactElement {
  const agenda = useAgendaContext();
  const columnRef = useRef<HTMLDivElement>(null);
  const [createPreview, setCreatePreview] = useState<{
    heightPx: number;
    topPx: number;
  } | null>(null);
  const slots = Math.ceil(
    ((agenda.endHour - agenda.startHour) * 60) / agenda.slotDuration,
  );
  const pixelsPerMinute = 60 / agenda.slotDuration;
  const minuteAt = useCallback(
    (clientY: number) => {
      const rect = columnRef.current?.getBoundingClientRect();
      if (!rect) return 0;
      const totalMinutes = (agenda.endHour - agenda.startHour) * 60;
      const ratio = Math.max(
        0,
        Math.min(1, (clientY - rect.top) / rect.height),
      );
      return Math.round((ratio * totalMinutes) / 5) * 5;
    },
    [agenda.endHour, agenda.startHour],
  );
  const handleCreate = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (
        event.button !== 0 ||
        !agenda.onEventCreate ||
        (event.target as Element).closest("[data-slot='agenda-event']")
      )
        return;
      agenda.selectEvent(null);
      const startMinute = minuteAt(event.clientY);
      setCreatePreview({
        heightPx: 5 * pixelsPerMinute,
        topPx: startMinute * pixelsPerMinute,
      });
      const move = (moveEvent: MouseEvent) => {
        const minute = minuteAt(moveEvent.clientY);
        const start = Math.min(startMinute, minute);
        const end = Math.max(startMinute, minute);
        setCreatePreview({
          heightPx: Math.max(end - start, 5) * pixelsPerMinute,
          topPx: start * pixelsPerMinute,
        });
      };
      const up = (upEvent: MouseEvent) => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        setCreatePreview(null);
        const minute = minuteAt(upEvent.clientY);
        const start = Math.min(startMinute, minute);
        const end = Math.max(startMinute, minute);
        const finalEnd = end === start ? start + 60 : end;
        agenda.onEventCreate?.({
          start: dateTimeAt(date, agenda.startHour, start),
          end: dateTimeAt(date, agenda.startHour, finalEnd),
        });
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    },
    [agenda, date, minuteAt, pixelsPerMinute],
  );
  return (
    <div
      ref={columnRef}
      {...props}
      className={cn("agenda__day-column", className)}
      data-date={date.toString()}
      data-slot="agenda-day-column"
      data-weekend={
        [0, 6].includes(date.toDate(agenda.timeZone).getDay()) || undefined
      }
      onMouseDown={handleCreate}
    >
      {Array.from({ length: slots }, (_, index) => (
        <div
          className="agenda__time-slot"
          data-last={index === slots - 1 || undefined}
          data-slot="agenda-time-slot"
          key={index}
        />
      ))}
      {children}
      {createPreview ? (
        <div
          className="agenda__create-preview"
          style={{
            height: createPreview.heightPx,
            top: createPreview.topPx,
          }}
        />
      ) : null}
      {agenda.dropPreview?.dateStr === date.toString() &&
      agenda.dropPreview.topPx != null ? (
        <div
          className="agenda__drop-preview"
          style={{
            borderColor: agenda.dropPreview.color,
            height: agenda.dropPreview.heightPx,
            top: agenda.dropPreview.topPx,
          }}
        />
      ) : null}
    </div>
  );
}
function AgendaEvent({
  children,
  className,
  event,
  style,
}: {
  children?: ReactNode;
  className?: string;
  event: AgendaEventData;
  style?: CSSProperties;
}): ReactElement {
  const agenda = useAgendaContext();
  const eventRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setDragging] = useState(false);
  const [isResizing, setResizing] = useState(false);
  const [resizeDelta, setResizeDelta] = useState(0);
  const top =
    (((event.start.hour - agenda.startHour) * 60 + event.start.minute) * 60) /
    agenda.slotDuration;
  const minutes =
    (event.end.hour - event.start.hour) * 60 +
    event.end.minute -
    event.start.minute;
  const height = Math.max(20, (minutes * 60) / agenda.slotDuration);
  const pixelsPerMinute = 60 / agenda.slotDuration;
  const layout = agenda.getEventLayout(event.id);
  const width = 100 / layout.totalColumns;
  const snapMinutes = (pixels: number) =>
    Math.round(pixels / pixelsPerMinute / 5) * 5;
  const handleMoveStart = (pointer: ReactPointerEvent<HTMLDivElement>) => {
    if (
      pointer.button !== 0 ||
      !agenda.onEventMove ||
      event.isReadOnly ||
      (pointer.target as Element).closest(".agenda__resize-handle")
    )
      return;
    pointer.stopPropagation();
    pointer.preventDefault();
    const originX = pointer.clientX;
    const originY = pointer.clientY;
    let moved = false;
    const move = (moveEvent: PointerEvent) => {
      const x = moveEvent.clientX - originX;
      const y = moveEvent.clientY - originY;
      if (!moved && (Math.abs(x) > 3 || Math.abs(y) > 3)) {
        moved = true;
        setDragging(true);
        agenda.setDragState({ eventId: event.id, type: "moving" });
      }
      if (!moved) return;
      setDragOffset({ x, y });
      const column = eventRef.current?.closest<HTMLElement>(
        "[data-slot='agenda-day-column']",
      );
      const columnWidth = column?.getBoundingClientRect().width ?? 1;
      const dayDelta = Math.round(x / columnWidth);
      const minuteDelta = snapMinutes(y);
      const next = event.start.add({ days: dayDelta, minutes: minuteDelta });
      agenda.setDropPreview({
        ...(event.color ? { color: event.color } : {}),
        dateStr: `${next.year}-${String(next.month).padStart(2, "0")}-${String(next.day).padStart(2, "0")}`,
        heightPx: height,
        topPx:
          ((next.hour - agenda.startHour) * 60 + next.minute) * pixelsPerMinute,
      });
    };
    const up = (upEvent: PointerEvent) => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      setDragging(false);
      agenda.setDragState({ type: "idle" });
      agenda.setDropPreview(null);
      if (moved) {
        suppressClick.current = true;
        const column = eventRef.current?.closest<HTMLElement>(
          "[data-slot='agenda-day-column']",
        );
        const columnWidth = column?.getBoundingClientRect().width ?? 1;
        const dayDelta = Math.round((upEvent.clientX - originX) / columnWidth);
        const minuteDelta = snapMinutes(upEvent.clientY - originY);
        agenda.onEventMove?.(
          event.id,
          event.start.add({ days: dayDelta, minutes: minuteDelta }),
          event.end.add({ days: dayDelta, minutes: minuteDelta }),
        );
      }
      setDragOffset({ x: 0, y: 0 });
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
  const handleResizeStart = (pointer: ReactPointerEvent<HTMLDivElement>) => {
    if (pointer.button !== 0 || !agenda.onEventResize || event.isReadOnly)
      return;
    pointer.stopPropagation();
    pointer.preventDefault();
    const originY = pointer.clientY;
    setResizing(true);
    agenda.setDragState({ eventId: event.id, type: "resizing" });
    const move = (moveEvent: PointerEvent) =>
      setResizeDelta(moveEvent.clientY - originY);
    const up = (upEvent: PointerEvent) => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      const minuteDelta = snapMinutes(upEvent.clientY - originY);
      setResizeDelta(0);
      setResizing(false);
      agenda.setDragState({ type: "idle" });
      if (Math.abs(minuteDelta) >= 5) {
        suppressClick.current = true;
        agenda.onEventResize?.(
          event.id,
          event.start,
          event.end.add({ minutes: minuteDelta }),
        );
      }
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };
  return (
    <div
      ref={eventRef}
      className={cn("agenda__event", className)}
      data-dragging={isDragging || undefined}
      data-event-id={event.id}
      data-readonly={event.isReadOnly || undefined}
      data-resizing={isResizing || undefined}
      data-selected={agenda.selectedEventId === event.id || undefined}
      data-slot="agenda-event"
      data-status={event.status ?? "confirmed"}
      role="button"
      style={
        {
          height: Math.max(5 * pixelsPerMinute, height + resizeDelta),
          left: `calc(${layout.columnIndex * width}% + 2px)`,
          right: "auto",
          top,
          width: `calc(${width}% - 4px)`,
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          "--agenda-event-accent": event.color,
          ...(event.color
            ? {
                "--agenda-event-color": `color-mix(in srgb, ${event.color} 15%, transparent)`,
              }
            : {}),
          ...style,
        } as CSSProperties
      }
      tabIndex={0}
      onClick={() => {
        if (suppressClick.current) {
          suppressClick.current = false;
          return;
        }
        agenda.selectEvent(event.id);
      }}
      onPointerDown={handleMoveStart}
    >
      {children ?? (
        <>
          <AgendaEventTitle>{event.title}</AgendaEventTitle>
          <AgendaEventTime event={event} />
        </>
      )}
      {agenda.onEventResize && !event.isReadOnly ? (
        <div
          className="agenda__resize-handle"
          onPointerDown={handleResizeStart}
        />
      ) : null}
    </div>
  );
}
function AgendaEventTitle({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"span">): ReactElement {
  return (
    <span
      {...props}
      className={cn("agenda__event-title", className)}
      data-slot="agenda-event-title"
    >
      {children}
    </span>
  );
}
function AgendaEventTime({
  className,
  event,
  ...props
}: Omit<ComponentPropsWithRef<"span">, "children"> & {
  event?: AgendaEventData;
}): ReactElement {
  const value = event;
  return (
    <span
      {...props}
      className={cn("agenda__event-time", className)}
      data-slot="agenda-event-time"
    >
      {value
        ? `${String(value.start.hour).padStart(2, "0")}:${String(value.start.minute).padStart(2, "0")} – ${String(value.end.hour).padStart(2, "0")}:${String(value.end.minute).padStart(2, "0")}`
        : null}
    </span>
  );
}
function AgendaCurrentTimeIndicator(
  props: ComponentPropsWithRef<"div">,
): ReactElement | null {
  const agenda = useAgendaContext();
  const now = new Date();
  if (now.getHours() < agenda.startHour || now.getHours() >= agenda.endHour)
    return null;
  const top =
    (((now.getHours() - agenda.startHour) * 60 + now.getMinutes()) * 60) /
    agenda.slotDuration;
  return (
    <div {...props} className="agenda__current-time-indicator" style={{ top }}>
      <span className="agenda__current-time-label">
        {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
      </span>
      <span className="agenda__current-time-line" />
    </div>
  );
}
function AgendaMonthGrid({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <div
      {...props}
      className={cn("agenda__month-grid", className)}
      data-slot="agenda-month-grid"
    >
      <div className="agenda__month-weekday-header">
        {"SMTWTFS".split("").map((day, index) => (
          <span className="agenda__month-weekday" key={index}>
            {day}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}
function AgendaMonthRow({
  children,
  className,
  spanningRowCount = 0,
  style,
  ...props
}: ComponentPropsWithRef<"div"> & { spanningRowCount?: number }): ReactElement {
  return (
    <div
      {...props}
      className={cn("agenda__month-row", className)}
      data-slot="agenda-month-row"
      style={
        {
          "--agenda-month-spanning-zone": `${spanningRowCount * 22}px`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
function AgendaMonthSpanningEvent(
  props: ComponentPropsWithRef<"div"> & AgendaLayoutItem,
): ReactElement {
  return (
    <AgendaAllDayEvent
      {...props}
      className={cn("agenda__month-spanning-event", props.className)}
    />
  );
}
function AgendaMonthCell({
  children,
  className,
  date,
  maxEvents = 2,
  moreLabel = (count: number) => `${count} more`,
  spanningRowCount = 0,
  ...props
}: ComponentPropsWithRef<"div"> & {
  date: CalendarDate;
  maxEvents?: number;
  moreLabel?: (count: number) => string;
  spanningRowCount?: number;
}): ReactElement {
  const agenda = useAgendaContext();
  const events = agenda
    .getAllEventsForDay(date)
    .filter((event) => !event.isAllDay);
  const isOutside = date.month !== agenda.date.month;
  return (
    <div
      {...props}
      className={cn("agenda__month-cell", className)}
      data-outside-month={isOutside || undefined}
      data-slot="agenda-month-cell"
      style={
        {
          "--agenda-month-spanning-zone": `${spanningRowCount * 22}px`,
        } as CSSProperties
      }
    >
      <button
        className="agenda__month-cell-date"
        type="button"
        onClick={() => {
          agenda.setDate(date);
          agenda.setView("day");
        }}
      >
        {date.day}
      </button>
      {children ??
        events
          .slice(0, maxEvents)
          .map((event) => <AgendaMonthEvent event={event} key={event.id} />)}
      {events.length > maxEvents ? (
        <button
          className="agenda__month-cell-more"
          type="button"
          onClick={() => {
            agenda.setDate(date);
            agenda.setView("day");
          }}
        >
          {moreLabel(events.length - maxEvents)}
        </button>
      ) : null}
    </div>
  );
}
function AgendaMonthEvent({
  children,
  className,
  event,
}: {
  children?: ReactNode;
  className?: string;
  event: AgendaEventData;
}): ReactElement {
  const agenda = useAgendaContext();
  return (
    <Button
      className={cn("agenda__month-event", className) ?? "agenda__month-event"}
      data-status={event.status ?? "confirmed"}
      size="sm"
      style={{ "--agenda-event-accent": event.color } as CSSProperties}
      variant="ghost"
      onPress={() => agenda.selectEvent(event.id)}
    >
      {children ?? event.title}
    </Button>
  );
}
type AgendaComponent = typeof AgendaRoot & {
  AllDayEvent: typeof AgendaAllDayEvent;
  AllDayLabel: typeof AgendaAllDayLabel;
  AllDaySection: typeof AgendaAllDaySection;
  Body: typeof AgendaBody;
  CurrentTimeIndicator: typeof AgendaCurrentTimeIndicator;
  DayColumn: typeof AgendaDayColumn;
  DayHeader: typeof AgendaDayHeader;
  Event: typeof AgendaEvent;
  EventTime: typeof AgendaEventTime;
  EventTitle: typeof AgendaEventTitle;
  Header: typeof AgendaHeader;
  Heading: typeof AgendaHeading;
  MonthCell: typeof AgendaMonthCell;
  MonthEvent: typeof AgendaMonthEvent;
  MonthGrid: typeof AgendaMonthGrid;
  MonthRow: typeof AgendaMonthRow;
  MonthSpanningEvent: typeof AgendaMonthSpanningEvent;
  NavButton: typeof AgendaNavButton;
  Navigation: typeof AgendaNavigation;
  Root: typeof AgendaRoot;
  TimeGrid: typeof AgendaTimeGrid;
  TodayButton: typeof AgendaTodayButton;
  ViewSelector: typeof AgendaViewSelector;
  WeekHeader: typeof AgendaWeekHeader;
};
export const Agenda: AgendaComponent = Object.assign(AgendaRoot, {
  AllDayEvent: AgendaAllDayEvent,
  AllDayLabel: AgendaAllDayLabel,
  AllDaySection: AgendaAllDaySection,
  Body: AgendaBody,
  CurrentTimeIndicator: AgendaCurrentTimeIndicator,
  DayColumn: AgendaDayColumn,
  DayHeader: AgendaDayHeader,
  Event: AgendaEvent,
  EventTime: AgendaEventTime,
  EventTitle: AgendaEventTitle,
  Header: AgendaHeader,
  Heading: AgendaHeading,
  MonthCell: AgendaMonthCell,
  MonthEvent: AgendaMonthEvent,
  MonthGrid: AgendaMonthGrid,
  MonthRow: AgendaMonthRow,
  MonthSpanningEvent: AgendaMonthSpanningEvent,
  NavButton: AgendaNavButton,
  Navigation: AgendaNavigation,
  Root: AgendaRoot,
  TimeGrid: AgendaTimeGrid,
  TodayButton: AgendaTodayButton,
  ViewSelector: AgendaViewSelector,
  WeekHeader: AgendaWeekHeader,
});
export {
  AgendaAllDayEvent,
  AgendaAllDayLabel,
  AgendaAllDaySection,
  AgendaBody,
  AgendaCurrentTimeIndicator,
  AgendaDayColumn,
  AgendaDayHeader,
  AgendaEvent,
  AgendaEventTime,
  AgendaEventTitle,
  AgendaHeader,
  AgendaHeading,
  AgendaMonthCell,
  AgendaMonthEvent,
  AgendaMonthGrid,
  AgendaMonthRow,
  AgendaMonthSpanningEvent,
  AgendaNavButton,
  AgendaNavigation,
  AgendaRoot,
  AgendaTimeGrid,
  AgendaTodayButton,
  AgendaViewSelector,
  AgendaWeekHeader,
};
export type { CalendarDate, CalendarDateTime };
