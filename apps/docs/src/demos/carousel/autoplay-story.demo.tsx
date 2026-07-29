"use client";

// @demo-title Autoplay
import { useRef } from "react";

import { Carousel } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";
import Autoplay from "embla-carousel-autoplay";

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

export const DemoAutoplayStoryExample = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
  return (
    <div className="w-full max-w-xs">
      <Carousel opts={{ loop: true }} plugins={[plugin.current]}>
        <Carousel.Content>
          <NumberSlides />
        </Carousel.Content>
        <Carousel.Dots />
      </Carousel>
    </div>
  );
};
