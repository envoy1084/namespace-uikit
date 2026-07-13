"use client";

// @demo-title Usage Summary
import { Widget } from "@thenamespace/uikit";
import { ProgressCircle } from "@thenamespace/uikit/progress-circle";
import { Table } from "@thenamespace/uikit/table";

const usage = [
  {
    amount: "33.1K",
    color: "default",
    label: "Total API Requests",
    progress: 33,
  },
  { amount: "98.2M", color: "accent", label: "Input Tokens", progress: 62 },
  { amount: "59M", color: "accent", label: "Output Tokens", progress: 37 },
  { amount: "$149.61", color: "accent", label: "Total Spend", progress: 75 },
] as const;

export const DemoUsageSummaryExample = () => (
  <Widget className="w-full max-w-[520px]">
    <div className="grid grid-cols-[5fr_2fr] items-center px-5 py-2">
      <span className="text-muted text-xs font-medium">Usage Type</span>
      <span className="text-muted text-xs font-medium">Amount</span>
    </div>
    <Widget.Content className="flex flex-col gap-0 p-0">
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Usage summary">
            <Table.Header className="sr-only">
              <Table.Column isRowHeader>Usage Type</Table.Column>
              <Table.Column>Amount</Table.Column>
            </Table.Header>
            <Table.Body>
              {usage.map((item, index) => (
                <Table.Row
                  className={
                    index === usage.length - 1 ? "[&_td]:border-b-0" : ""
                  }
                  key={item.label}
                >
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <ProgressCircle
                        aria-label={`${item.label} usage`}
                        color={item.color}
                        size="sm"
                        value={item.progress}
                      >
                        <ProgressCircle.Track>
                          <ProgressCircle.TrackCircle />
                          <ProgressCircle.FillCircle />
                        </ProgressCircle.Track>
                      </ProgressCircle>
                      <span className="text-foreground text-sm font-medium">
                        {item.label}
                      </span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-foreground text-sm font-semibold">
                      {item.amount}
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Widget.Content>
  </Widget>
);
