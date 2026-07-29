"use client";

// @demo-title Multiple Slides
import { Carousel } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

export const DemoMultipleSlidesExample = () => (
  <div className="w-full max-w-sm">
    <Carousel opts={{ align: "start" }}>
      <Carousel.Content>
        {Array.from({ length: 8 }, (_, index) => index + 1).map((number) => (
          <Carousel.Item className="basis-1/3" key={number}>
            <div className="p-1">
              <Card className="select-none">
                <Card.Content className="flex aspect-square items-center justify-center">
                  <span className="text-2xl font-semibold tabular-nums">{number}</span>
                </Card.Content>
              </Card>
            </div>
          </Carousel.Item>
        ))}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  </div>
);
