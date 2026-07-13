"use client";

// @demo-title Default
import { Carousel } from "@thenamespace/uikit";

const images = Array.from(
  { length: 6 },
  (_, index) =>
    `/assets/components-images/shoes/product-view/${index + 1}.jpeg`,
);

const imageAlts = [
  "Sneakers front view",
  "Sneakers side view",
  "Sneakers back view",
  "Sneakers top view",
  "Sneakers detail view",
  "Sneakers sole view",
];

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

export const DemoDefaultExample = () => (
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
);
