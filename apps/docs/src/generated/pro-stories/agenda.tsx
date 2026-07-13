// @ts-nocheck -- Generated from the tested Storybook story for docs rendering.
"use client";
import type { Meta, StoryObj } from "@storybook/react";

import { useCallback, useMemo, useState } from "react";

import { CalendarDateTime } from "@internationalized/date";
import { Agenda, type AgendaEventData, useAgenda } from "@thenamespace/uikit";

const meta = {
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/Agenda",
} satisfies Meta<typeof Agenda>;
export default meta;
type Story = StoryObj<typeof meta>;
const at = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute = 0,
) => new CalendarDateTime(year, month, day, hour, minute);

function initialEvents(): AgendaEventData[] {
  const now = new Date();
  const year = now.getFullYear(),
    month = now.getMonth() + 1,
    day = now.getDate();
  return [
    {
      color: "#10b981",
      end: at(year, month, day + 2, 23, 59),
      id: "holiday",
      isAllDay: true,
      start: at(year, month, day),
      title: "Company Holiday",
    },
    {
      color: "#3b82f6",
      end: at(year, month, day, 23, 59),
      id: "offsite",
      isAllDay: true,
      start: at(year, month, day),
      title: "Team Offsite",
    },
    {
      end: at(year, month, day, 9, 30),
      id: "standup",
      start: at(year, month, day, 9),
      title: "Team Standup",
    },
    {
      color: "#d946ef",
      end: at(year, month, day, 13),
      id: "lunch",
      start: at(year, month, day, 12),
      title: "Lunch",
    },
    {
      color: "#3b82f6",
      end: at(year, month, day, 15, 30),
      id: "review",
      start: at(year, month, day, 14),
      title: "Design Review",
    },
    {
      color: "#10b981",
      end: at(year, month, day, 16, 30),
      id: "one-one",
      start: at(year, month, day, 16),
      title: "1:1 with Manager",
    },
    {
      color: "#f59e0b",
      end: at(year, month, day + 1, 10),
      id: "product",
      start: at(year, month, day + 1, 9),
      title: "Product Sync",
    },
    {
      color: "#8b5cf6",
      end: at(year, month, day + 1, 10, 15),
      id: "eng",
      start: at(year, month, day + 1, 9, 15),
      title: "Eng Huddle",
    },
    {
      color: "#ef4444",
      end: at(year, month, day + 1, 15, 30),
      id: "client",
      start: at(year, month, day + 1, 14, 30),
      title: "Client Call",
    },
    {
      color: "#06b6d4",
      end: at(year, month, day + 2, 14, 20),
      id: "check-in",
      start: at(year, month, day + 2, 14),
      title: "Quick Check-in",
    },
    {
      color: "#06b6d4",
      end: at(year, month, day + 2, 15),
      id: "wrap-up",
      start: at(year, month, day + 2, 14, 40),
      title: "Wrap-up Notes",
    },
    {
      color: "#3b82f6",
      end: at(year, month, day + 3, 11, 15),
      id: "planning",
      start: at(year, month, day + 3, 10, 15),
      status: "unconfirmed",
      title: "Planning",
    },
    {
      color: "#6b7280",
      end: at(year, month, day + 4, 10),
      id: "allhands",
      isReadOnly: true,
      start: at(year, month, day + 4, 9),
      title: "Company All-Hands",
    },
    {
      color: "#8b5cf6",
      end: at(year, month, day + 4, 12),
      id: "code-review",
      start: at(year, month, day + 4, 11),
      title: "Code Review",
    },
    {
      color: "#ef4444",
      end: at(year, month, day + 4, 16),
      id: "retro",
      start: at(year, month, day + 4, 15),
      title: "Retro",
    },
  ];
}

function Demo() {
  const seed = useMemo(initialEvents, []);
  const [events, setEvents] = useState(seed);
  const create = useCallback(
    ({ end, start }: { end: CalendarDateTime; start: CalendarDateTime }) =>
      setEvents((current) => [
        ...current,
        {
          color: "#06b6d4",
          end,
          id: `new-${current.length}`,
          start,
          title: "New Event",
        },
      ]),
    [],
  );
  const move = useCallback(
    (id: string, start: CalendarDateTime, end: CalendarDateTime) =>
      setEvents((current) =>
        current.map((event) =>
          event.id === id ? { ...event, end, start } : event,
        ),
      ),
    [],
  );
  const remove = useCallback(
    (id: string) =>
      setEvents((current) => current.filter((event) => event.id !== id)),
    [],
  );
  const state = useAgenda({
    defaultView: "week",
    events,
    onEventCreate: create,
    onEventDelete: remove,
    onEventMove: move,
    onEventResize: move,
  });
  return (
    <div className="h-[600px] w-full">
      <Agenda {...state}>
        <Agenda.Header>
          <Agenda.Heading />
          <Agenda.ViewSelector />
          <Agenda.Navigation>
            <Agenda.NavButton slot="previous" />
            <Agenda.TodayButton />
            <Agenda.NavButton slot="next" />
          </Agenda.Navigation>
        </Agenda.Header>
        <Agenda.Body>
          {state.view !== "month" ? (
            <>
              <Agenda.WeekHeader />
              <Agenda.AllDaySection>
                {state.allDayLayout.map((item) => (
                  <Agenda.AllDayEvent {...item} key={item.event.id} />
                ))}
              </Agenda.AllDaySection>
              <Agenda.TimeGrid>
                <Agenda.CurrentTimeIndicator />
                {state.visibleDays.map((date) => (
                  <Agenda.DayColumn date={date} key={date.toString()}>
                    {state.getEventsForDay(date).map((event) => (
                      <Agenda.Event event={event} key={event.id} />
                    ))}
                  </Agenda.DayColumn>
                ))}
              </Agenda.TimeGrid>
            </>
          ) : (
            <Agenda.MonthGrid>
              {state.visibleWeeks.map((week, row) => {
                const layout = state.getMonthRowLayout(week);
                return (
                  <Agenda.MonthRow key={row} spanningRowCount={layout.rowCount}>
                    {layout.items.map((item) => (
                      <Agenda.MonthSpanningEvent
                        {...item}
                        key={item.event.id}
                      />
                    ))}
                    {week.map((date, column) => (
                      <Agenda.MonthCell
                        date={date}
                        key={date.toString()}
                        spanningRowCount={layout.rowCountPerCol[column] ?? 0}
                      >
                        {state
                          .getPerCellEvents(date, week)
                          .slice(0, 2)
                          .map((event) => (
                            <Agenda.MonthEvent event={event} key={event.id} />
                          ))}
                      </Agenda.MonthCell>
                    ))}
                  </Agenda.MonthRow>
                );
              })}
            </Agenda.MonthGrid>
          )}
        </Agenda.Body>
      </Agenda>
    </div>
  );
}
export const Default: Story = { render: () => <Demo /> };
