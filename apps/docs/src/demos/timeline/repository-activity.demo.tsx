"use client";

// @demo-title Repository Activity
import {
  AddCircleIcon,
  EyeIcon,
  GitCommitHorizontalIcon,
  GitMergeIcon,
  GitPullRequestIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Timeline } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";
import { Link } from "@thenamespace/uikit/link";

const TimelineGlyph = ({ icon }: { icon: IconSvgElement }) => (
  <HugeiconsIcon aria-hidden icon={icon} strokeWidth={2} />
);

const activity = [
  {
    actor: "Rina Sol",
    icon: GitCommitHorizontalIcon,
    repositories: [
      { commits: "126 commits", name: "lumenforge/interface" },
      { commits: "32 commits", name: "mistral-bench/checkout" },
      { commits: "18 commits", name: "pixelwell/cli" },
      { commits: "7 commits", name: "signalnest/webhooks" },
    ],
    status: "success",
    title: "Committed across 4 product workspaces",
  },
  {
    actor: "Theo Park",
    date: "May 19",
    icon: GitMergeIcon,
    pullRequest: {
      comments: "8 comments",
      description:
        "Reworked focus rings, empty states, and column resize handles for audit tables.",
      title: "Tighten keyboard states in reporting grids",
    },
    status: "current",
    title: "Merged a pull request in lumenforge/interface",
  },
  {
    actor: "Iris Moon",
    icon: AddCircleIcon,
    repositories: [
      { commits: "16 triaged", name: "lumenforge/interface" },
      { commits: "9 resolved", name: "pixelwell/cli" },
      { commits: "6 open", name: "signalnest/webhooks" },
    ],
    status: "warning",
    title: "Opened 31 issues across 3 workspaces",
  },
  {
    actor: "Mara Voss",
    date: "May 28",
    icon: EyeIcon,
    repositories: [
      { commits: "24 reviews", name: "lumenforge/interface" },
      { commits: "13 reviews", name: "mistral-bench/checkout" },
      { commits: "9 reviews", name: "pixelwell/cli" },
      { commits: "5 reviews", name: "signalnest/webhooks" },
    ],
    status: "default",
    title: "Reviewed 51 pull requests in 4 workspaces",
  },
] as const;

export const DemoRepositoryActivityExample = () => (
  <div className="w-full max-w-[620px] min-w-0">
    <div className="mb-4 flex items-center gap-4">
      <h3 className="text-foreground m-0 text-sm font-semibold">May 2026</h3>
      <div className="bg-separator h-px flex-1" />
    </div>
    <Timeline size="sm">
      {activity.map((item) => (
        <Timeline.Item key={item.title} status={item.status}>
          <Timeline.Marker>
            <TimelineGlyph icon={item.icon} />
          </Timeline.Marker>
          <Timeline.Content className="gap-2.5">
            <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <h3 className="text-foreground m-0 text-sm leading-5 font-medium">
                  {item.title}
                </h3>
                <p className="text-muted m-0 text-xs leading-5">{item.actor}</p>
              </div>
              {"date" in item ? (
                <time className="text-muted shrink-0 text-xs leading-5">
                  {item.date}
                </time>
              ) : null}
            </div>
            {"repositories" in item ? (
              <div className="grid gap-1">
                {item.repositories.map((repo) => (
                  <div
                    className="grid min-w-0 grid-cols-1 gap-0.5 sm:grid-cols-[minmax(0,200px)_auto] sm:items-center sm:gap-3"
                    key={repo.name}
                  >
                    <Link className="truncate text-xs" href="#">
                      {repo.name}
                    </Link>
                    <span className="text-muted text-xs">{repo.commits}</span>
                  </div>
                ))}
              </div>
            ) : null}
            {"pullRequest" in item ? (
              <Card className="w-full min-w-0 p-3">
                <Card.Header className="gap-2.5 p-0">
                  <HugeiconsIcon
                    aria-hidden
                    className="text-accent size-4 shrink-0"
                    icon={GitPullRequestIcon}
                  />
                  <div className="min-w-0">
                    <Card.Title className="text-sm leading-5">
                      {item.pullRequest.title}
                    </Card.Title>
                    <Card.Description className="mt-1 text-xs leading-5">
                      {item.pullRequest.description}
                    </Card.Description>
                  </div>
                </Card.Header>
                <Card.Footer className="mt-3 flex flex-wrap items-center gap-2 p-0">
                  <Chip color="success" size="sm" variant="soft">
                    +18
                  </Chip>
                  <Chip color="danger" size="sm" variant="soft">
                    -4
                  </Chip>
                  <div aria-hidden className="flex items-center gap-0.5">
                    <span className="bg-success size-2" />
                    <span className="bg-success size-2" />
                    <span className="bg-success size-2" />
                    <span className="bg-danger size-2" />
                    <span className="bg-separator size-2" />
                  </div>
                  <span className="text-muted text-xs">
                    - {item.pullRequest.comments}
                  </span>
                </Card.Footer>
              </Card>
            ) : null}
            {item.title.startsWith("Opened") ? (
              <div className="flex flex-wrap gap-2">
                <Chip color="success" size="sm" variant="soft">
                  16 triaged
                </Chip>
                <Chip color="accent" size="sm" variant="soft">
                  9 assigned
                </Chip>
                <Chip color="danger" size="sm" variant="soft">
                  6 open
                </Chip>
              </div>
            ) : null}
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);
