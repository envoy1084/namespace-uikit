"use client";

// @demo-title Cards
import { Card, PromptSuggestion } from "@thenamespace/uikit";

const prompts = [
  {
    description: "Turn rough notes into a clear weekly update.",
    id: "weekly-update",
    title: "Weekly project update",
  },
  {
    description: "Capture decisions, owners, and next steps.",
    id: "meeting-summary",
    title: "Meeting summary",
  },
  {
    description: "Outline milestones, risks, and launch tasks.",
    id: "launch-plan",
    title: "Launch planning",
  },
];

export const ProCardsExample = () => (
  <div className="mx-auto w-full max-w-[960px]">
    <PromptSuggestion variant="card">
      <PromptSuggestion.Header>
        <PromptSuggestion.Title>
          Starter prompts for everyday work
        </PromptSuggestion.Title>
        <PromptSuggestion.Description>
          Pick one to see what kinds of conversations this template is designed
          for.
        </PromptSuggestion.Description>
      </PromptSuggestion.Header>
      <PromptSuggestion.Group
        description="Planning, updates, and stakeholder communication."
        label="At work"
      >
        <PromptSuggestion.Items>
          {prompts.map((prompt) => (
            <PromptSuggestion.Item key={prompt.id}>
              <Card.Header>
                <PromptSuggestion.ItemTitle>
                  {prompt.title}
                </PromptSuggestion.ItemTitle>
                <PromptSuggestion.ItemDescription>
                  {prompt.description}
                </PromptSuggestion.ItemDescription>
              </Card.Header>
            </PromptSuggestion.Item>
          ))}
        </PromptSuggestion.Items>
      </PromptSuggestion.Group>
    </PromptSuggestion>
  </div>
);
