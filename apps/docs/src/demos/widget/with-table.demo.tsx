"use client";

// @demo-title With Table
import { Widget } from "@thenamespace/uikit";
import { Table } from "@thenamespace/uikit/table";

const members = [
  { email: "kate@acme.com", name: "Kate Moore", role: "CEO", status: "Active" },
  { email: "john@acme.com", name: "John Smith", role: "CTO", status: "Active" },
  {
    email: "sara@acme.com",
    name: "Sara Johnson",
    role: "CMO",
    status: "On Leave",
  },
  {
    email: "michael@acme.com",
    name: "Michael Brown",
    role: "CFO",
    status: "Active",
  },
];

export const DemoWithTableExample = () => (
  <Widget className="w-full max-w-[640px]">
    <Widget.Header>
      <div>
        <Widget.Title>Team Members</Widget.Title>
        <Widget.Description className="block">4 members</Widget.Description>
      </div>
    </Widget.Header>
    <Widget.Content className="p-0">
      <Table variant="secondary">
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members">
            <Table.Header className="sr-only">
              <Table.Column isRowHeader>Name</Table.Column>
              <Table.Column>Role</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Email</Table.Column>
            </Table.Header>
            <Table.Body>
              {members.map((member, index) => (
                <Table.Row
                  className={
                    index === members.length - 1 ? "[&_td]:border-b-0" : ""
                  }
                  key={member.email}
                >
                  <Table.Cell>{member.name}</Table.Cell>
                  <Table.Cell>{member.role}</Table.Cell>
                  <Table.Cell>{member.status}</Table.Cell>
                  <Table.Cell>{member.email}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </Widget.Content>
  </Widget>
);
