import type { Meta, StoryObj } from "@storybook/react";
import type { EmblaCarouselType } from "embla-carousel";

import { useEffect, useState } from "react";

import Autoplay from "embla-carousel-autoplay";

import { Carousel } from "./index";

const images = Array.from(
  { length: 6 },
  (_, index) =>
    `https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/${index + 1}.jpeg`,
);
const imageAlts = [
  "Sneakers front view",
  "Sneakers side view",
  "Sneakers back view",
  "Sneakers top view",
  "Sneakers detail view",
  "Sneakers sole view",
];
const meta = {
  component: Carousel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  title: "Components/Carousel",
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

const ImageSlides = ({ modal = false }: { modal?: boolean }) => (
  <>
    {images.map((src, index) => (
      <Carousel.Item key={src}>
        <img
          alt={imageAlts[index]}
          className={`w-full rounded-xl object-cover ${modal ? "aspect-4/3" : "aspect-square"}`}
          src={src}
        />
      </Carousel.Item>
    ))}
  </>
);
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

export const Default: Story = {
  render: () => (
    <Carousel className="max-w-sm" opts={{ loop: true }}>
      <Carousel.Content>
        <ImageSlides />
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Dots />
      <Carousel.Thumbnails>
        {images.map((src, index) => (
          <Carousel.Thumbnail
            alt={imageAlts[index]}
            index={index}
            key={src}
            src={src}
          />
        ))}
      </Carousel.Thumbnails>
    </Carousel>
  ),
};
export const ModalType: Story = {
  name: "Type: Modal",
  render: () => (
    <Carousel className="max-w-sm px-16" opts={{ loop: true }} type="modal">
      <Carousel.Content>
        <ImageSlides modal />
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Thumbnails>
        {images.map((src, index) => (
          <Carousel.Thumbnail
            alt={imageAlts[index]}
            index={index}
            key={src}
            src={src}
          />
        ))}
      </Carousel.Thumbnails>
    </Carousel>
  ),
};
export const MultipleSlides: Story = {
  render: () => (
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
  ),
};
export const InfiniteLoop: Story = {
  render: () => (
    <Carousel className="max-w-xs" opts={{ loop: true }}>
      <Carousel.Content>
        <NumberSlides />
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel>
  ),
};
export const AutoplayStory: Story = {
  name: "Autoplay",
  render: () => (
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
  ),
};
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
export const ApiAccessStory: Story = {
  name: "API Access",
  render: () => <ApiExample />,
};
