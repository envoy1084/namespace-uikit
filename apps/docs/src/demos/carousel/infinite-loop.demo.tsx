"use client";

// @demo-title Infinite Loop
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

export const DemoInfiniteLoopExample = () => (
  <Carousel className="max-w-xs" opts={{ loop: true }}>
    <Carousel.Content>
      <NumberSlides />
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel>
);
