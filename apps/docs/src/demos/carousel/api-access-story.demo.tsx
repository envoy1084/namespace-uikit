"use client";

import { useEffect, useState } from "react";

import { Carousel } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
// @demo-title API Access
import type { EmblaCarouselType } from "embla-carousel";

const NumberSlides = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => index + 1).map((number) => (
      <Carousel.Item key={number}>
        <div className="p-1">
          <Card className="select-none">
            <Card.Content className="flex aspect-square items-center justify-center">
              <span className="text-4xl font-semibold tabular-nums">{number}</span>
            </Card.Content>
          </Card>
        </div>
      </Carousel.Item>
    ))}
  </>
);

function ApiExample() {
  const [api, setApi] = useState<EmblaCarouselType>(),
    [current, setCurrent] = useState(1),
    [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Carousel setApi={setApi}>
        <Carousel.Content>
          <NumberSlides />
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
      <p className="text-muted text-center text-sm tabular-nums">
        Slide {current} of {count}
      </p>
    </div>
  );
}

export const DemoApiAccessStoryExample = () => <ApiExample />;
