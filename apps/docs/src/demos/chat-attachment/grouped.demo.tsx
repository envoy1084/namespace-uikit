"use client";

// @demo-title Grouped
import { ChatAttachment, ChatAttachmentGroup } from "@thenamespace/uikit";

const image = "/assets/images/egg.webp";

export const DemoGroupedExample = () => (
  <ChatAttachmentGroup>
    <ChatAttachment mimeType="application/pdf" name="brief.pdf" />
    <ChatAttachment mediaType="image" name="wireframe.png" src={image} />
    <ChatAttachment mediaType="image" name="screenshot.png" src={image} />
  </ChatAttachmentGroup>
);
