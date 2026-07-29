"use client";

// @demo-title Type: Modal
import { Carousel } from "@thenamespace/uikit";

const images = [
  {
    alt: "Sneakers front view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/1.jpeg",
  },
  {
    alt: "Sneakers side view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/2.jpeg",
  },
  {
    alt: "Sneakers back view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/3.jpeg",
  },
  {
    alt: "Sneakers top view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/4.jpeg",
  },
  {
    alt: "Sneakers detail view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/5.jpeg",
  },
  {
    alt: "Sneakers sole view",
    src: "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/shoes/product-view/6.jpeg",
  },
];

const ImageSlides = ({ modal = false }: { modal?: boolean }) => (
  <>
    {images.map((image) => (
      <Carousel.Item key={image.src}>
        <div className="overflow-hidden rounded-3xl">
          <img
            alt={image.alt}
            className={`${modal ? "aspect-[4/3]" : "aspect-[1/1]"} w-full object-cover select-none`}
            draggable={false}
            src={image.src}
          />
        </div>
      </Carousel.Item>
    ))}
  </>
);

export const DemoModalTypeExample = () => (
  <div className="w-full max-w-sm px-16">
    <Carousel opts={{ loop: true }} type="modal">
      <Carousel.Content>
        <ImageSlides modal />
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
      <Carousel.Thumbnails>
        {images.map((image, index) => (
          <Carousel.Thumbnail alt={image.alt} index={index} key={image.src} src={image.src} />
        ))}
      </Carousel.Thumbnails>
    </Carousel>
  </div>
);
