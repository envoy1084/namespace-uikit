"use client";

// @demo-title Pressable Cards
import { PressableFeedback } from "@thenamespace/uikit";
import { Button } from "@thenamespace/uikit/button";
import { Card } from "@thenamespace/uikit/card";

export const DemoPressableCardsExample = () => (
  <div className="grid w-[500px] grid-cols-12 gap-4">
    <Card className="relative col-span-12 h-[220px] overflow-hidden">
      <PressableFeedback.Ripple className="z-1" />
      <img
        alt="NEO Home Robot"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        src="/assets/docs/neo1.jpeg"
      />
      <Card.Header className="z-10">
        <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
          NEO
        </Card.Title>
        <Card.Description className="text-sm leading-5 font-medium text-black/50">
          Home Robot
        </Card.Description>
      </Card.Header>
      <Card.Footer className="z-10 mt-auto flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-black">Available soon</div>
          <div className="text-xs text-black/60">Get notified</div>
        </div>
        <Button className="bg-white text-black" size="sm" variant="tertiary">
          <PressableFeedback.Ripple />
          Notify me
        </Button>
      </Card.Footer>
    </Card>
    {[
      {
        name: "Indie Hackers",
        members: 148,
        image: "demo1.jpg",
        color: "text-rose-200",
        author: "John",
        authorAvatar: "/assets/avatars/blue.jpg",
      },
      {
        name: "AI Builders",
        members: 362,
        image: "demo2.jpg",
        color: "text-sky-300",
        author: "Martha",
        authorAvatar: "/assets/avatars/pink.jpg",
      },
    ].map((item) => (
      <Card
        className="col-span-6 cursor-pointer gap-2 overflow-hidden"
        key={item.name}
      >
        <PressableFeedback.Ripple className={item.color} />
        <Card.Header>
          <img
            alt={item.name}
            className="size-14 rounded-xl object-cover"
            src={`/assets/docs/${item.image}`}
          />
        </Card.Header>
        <Card.Content className="mt-1">
          <p className="text-sm leading-4 font-medium">{item.name}</p>
          <p className="text-muted text-xs">{item.members} members</p>
        </Card.Content>
        <Card.Footer className="flex items-center gap-1.5">
          <img
            alt={item.author}
            className="size-5 rounded-full object-cover"
            src={item.authorAvatar}
          />
          <p className="text-muted text-xs">By {item.author}</p>
        </Card.Footer>
      </Card>
    ))}
    {[
      {
        title: "Bridging the Future",
        time: "Today, 6:30 PM",
        image: "robot1.jpeg",
        imageAlt: "Futuristic Robot",
      },
      {
        title: "Avocado Hackathon",
        time: "Wed, 4:30 PM",
        image: "avocado.jpeg",
        imageAlt: "Avocado Hackathon",
      },
    ].map((item) => (
      <Card
        className="col-span-12 flex cursor-pointer flex-row gap-3 overflow-hidden p-2"
        key={item.title}
        variant="transparent"
      >
        <PressableFeedback.Highlight />
        <img
          alt={item.imageAlt}
          className="aspect-square h-20 w-20 shrink-0 rounded-xl object-cover"
          src={`/assets/docs/${item.image}`}
        />
        <div className="flex flex-1 flex-col justify-center gap-1">
          <Card.Title className="text-sm">{item.title}</Card.Title>
          <Card.Description className="text-xs">{item.time}</Card.Description>
        </div>
      </Card>
    ))}
  </div>
);
