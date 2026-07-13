"use client";

// @demo-title Approval
import { ChatMessage, ChatTool } from "@thenamespace/uikit";

const Assistant = ({ children }: { children: React.ReactNode }) => (
  <ChatMessage.Assistant>
    <ChatMessage.Avatar show alt="Assistant" fallback="AI" />
    <ChatMessage.Body>{children}</ChatMessage.Body>
  </ChatMessage.Assistant>
);

export const DemoApprovalExample = () => (
  <Assistant>
    <ChatTool
      defaultExpanded
      approveLabel="Approve"
      argsText='{"to":"team@acme.com","subject":"Launch update"}'
      rejectLabel="Reject"
      state="requires-action"
      toolName="sendEmail"
      triggerPrefix="Approval needed: "
      onApprove={() => {}}
      onReject={() => {}}
    />
  </Assistant>
);
