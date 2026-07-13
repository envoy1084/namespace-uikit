"use client";

// @demo-title Default
import {
  ChatAttachment,
  ChatAttachmentGroup,
  ChatMessage,
} from "@thenamespace/uikit";

const image = "/assets/images/egg.webp";

export const ProDefaultExample = () => (
  <ChatMessage.User>
    <ChatAttachmentGroup className="mb-2">
      <ChatAttachment mediaType="image" name="screenshot.png" src={image} />
    </ChatAttachmentGroup>
    <ChatMessage.Bubble>
      <ChatMessage.Content>What is in this screenshot?</ChatMessage.Content>
    </ChatMessage.Bubble>
  </ChatMessage.User>
);
