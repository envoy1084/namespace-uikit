"use client";

// @demo-title API Access
import type { EmblaCarouselType } from "embla-carousel";

import { useEffect, useState } from "react";

import { Carousel } from "@thenamespace/uikit";

const NumberSlides = ({ count = 5 }: { count?: number }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <Carousel.Item key={index}>
        <div className="bg-default flex aspect-square items-center justify-center rounded-xl text-4xl font-semibold">
          {index + 1}
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
    <div>
      <Carousel className="max-w-xs" setApi={setApi}>
        <Carousel.Content>
          <NumberSlides />
        </Carousel.Content>
        <Carousel.Previous />
        <Carousel.Next />
      </Carousel>
      <p className="text-muted mt-3 text-center text-sm">
        Slide {current} of {count}
      </p>
    </div>
  );
}

export const DemoApiAccessStoryExample = () => <ApiExample />;
