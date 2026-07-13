"use client";

// @demo-title Autoplay
import { Carousel } from "@thenamespace/uikit";
import Autoplay from "embla-carousel-autoplay";

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

export const ProAutoplayStoryExample = () => (
  <Carousel
    className="max-w-xs"
    opts={{ loop: true }}
    plugins={[Autoplay({ delay: 2000, stopOnInteraction: true })]}
  >
    <Carousel.Content>
      <NumberSlides />
    </Carousel.Content>
    <Carousel.Dots />
  </Carousel>
);
