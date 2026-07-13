"use client";

// @demo-title Multiple Slides
import { Carousel } from "@thenamespace/uikit";

export const ProMultipleSlidesExample = () => (
  <Carousel className="max-w-sm" opts={{ align: "start" }}>
    <Carousel.Content>
      {Array.from({ length: 8 }, (_, index) => (
        <Carousel.Item className="basis-1/3" key={index}>
          <div className="bg-default flex aspect-square items-center justify-center rounded-xl text-xl font-semibold">
            {index + 1}
          </div>
        </Carousel.Item>
      ))}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel>
);
