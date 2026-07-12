"use client";

import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";

import type {
  ComponentPropsWithRef,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Button, cn } from "@heroui/react";
import useEmblaCarousel from "embla-carousel-react";

type CarouselType = "in-place" | "miniatures" | "modal";
interface ContextValue {
  api: EmblaCarouselType | undefined;
  canScrollNext: boolean;
  canScrollPrev: boolean;
  emblaRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
  scrollSnapCount: number;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  setViewportWrapper: (node: HTMLDivElement | null) => void;
  type: CarouselType;
  viewportWrapper: HTMLDivElement | null;
}
const Context = createContext<ContextValue | null>(null);
const useCarousel = () => {
  const value = useContext(Context);
  if (!value)
    throw new Error("Carousel components must be used inside Carousel.Root");
  return value;
};

export interface CarouselRootProps extends ComponentPropsWithRef<"div"> {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  setApi?: (api: EmblaCarouselType) => void;
  type?: CarouselType;
}
function CarouselRoot({
  children,
  className,
  onKeyDown,
  opts,
  plugins,
  setApi,
  type = "in-place",
  ...props
}: CarouselRootProps): ReactElement {
  const [emblaRef, api] = useEmblaCarousel(opts, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0),
    [scrollSnapCount, setScrollSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false),
    [canScrollNext, setCanScrollNext] = useState(false);
  const [viewportWrapper, setViewportWrapper] = useState<HTMLDivElement | null>(
    null,
  );
  const update = useCallback((embla: EmblaCarouselType) => {
    setSelectedIndex(embla.selectedScrollSnap());
    setScrollSnapCount(embla.scrollSnapList().length);
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);
  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    update(api);
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api, setApi, update]);
  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]),
    scrollNext = useCallback(() => api?.scrollNext(), [api]),
    scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);
  return (
    <Context
      value={{
        api,
        canScrollNext,
        canScrollPrev,
        emblaRef,
        scrollNext,
        scrollPrev,
        scrollSnapCount,
        scrollTo,
        selectedIndex,
        setViewportWrapper,
        type,
        viewportWrapper,
      }}
    >
      <div
        {...props}
        aria-roledescription="carousel"
        className={cn("carousel", `carousel--${type}`, className)}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (!event.defaultPrevented && event.key === "ArrowLeft")
            scrollPrev();
          if (!event.defaultPrevented && event.key === "ArrowRight")
            scrollNext();
        }}
        role="region"
        tabIndex={0}
      >
        {children}
      </div>
    </Context>
  );
}
function CarouselContent({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  const { emblaRef, setViewportWrapper } = useCarousel();
  return (
    <div className="carousel__viewport-wrapper" ref={setViewportWrapper}>
      <div className="carousel__viewport" ref={emblaRef}>
        <div {...props} className={cn("carousel__content", className)}>
          {children}
        </div>
      </div>
    </div>
  );
}
function CarouselItem({
  className,
  ...props
}: ComponentPropsWithRef<"div">): ReactElement {
  return (
    <div
      {...props}
      aria-roledescription="slide"
      className={cn("carousel__item", className)}
      role="group"
    />
  );
}
const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg aria-hidden fill="none" height="18" viewBox="0 0 24 24" width="18">
    <path
      d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);
interface CarouselControlProps extends Omit<
  ComponentPropsWithRef<typeof Button>,
  "children" | "className" | "onPress"
> {
  children?: ReactNode;
  className?: string;
}
function CarouselPrevious({
  children,
  className,
  ...props
}: CarouselControlProps): ReactElement {
  const { canScrollPrev, scrollPrev, type, viewportWrapper } = useCarousel();
  const button = (
    <Button
      {...props}
      aria-label={props["aria-label"] ?? "Previous slide"}
      className={cn("carousel__previous", className) ?? "carousel__previous"}
      isDisabled={!canScrollPrev}
      isIconOnly
      onPress={scrollPrev}
      size="sm"
      variant="tertiary"
    >
      {children ?? <Chevron direction="left" />}
    </Button>
  );
  return type === "miniatures" || !viewportWrapper
    ? button
    : createPortal(button, viewportWrapper);
}
function CarouselNext({
  children,
  className,
  ...props
}: CarouselControlProps): ReactElement {
  const { canScrollNext, scrollNext, type, viewportWrapper } = useCarousel();
  const button = (
    <Button
      {...props}
      aria-label={props["aria-label"] ?? "Next slide"}
      className={cn("carousel__next", className) ?? "carousel__next"}
      isDisabled={!canScrollNext}
      isIconOnly
      onPress={scrollNext}
      size="sm"
      variant="tertiary"
    >
      {children ?? <Chevron direction="right" />}
    </Button>
  );
  return type === "miniatures" || !viewportWrapper
    ? button
    : createPortal(button, viewportWrapper);
}

export interface CarouselDotsProps extends ComponentPropsWithRef<"div"> {
  renderDot?: (state: { index: number; isSelected: boolean }) => ReactNode;
}
function CarouselDots({
  className,
  renderDot,
  ...props
}: CarouselDotsProps): ReactElement | null {
  const { scrollSnapCount, scrollTo, selectedIndex } = useCarousel();
  if (scrollSnapCount <= 1) return null;
  return (
    <div
      {...props}
      aria-label="Slide indicators"
      className={cn("carousel__dots", className)}
      role="tablist"
    >
      {Array.from({ length: scrollSnapCount }, (_, index) => (
        <Button
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={selectedIndex === index}
          className="carousel__dot"
          data-selected={selectedIndex === index || undefined}
          isIconOnly
          key={index}
          onPress={() => scrollTo(index)}
          size="sm"
          variant="tertiary"
        >
          {renderDot?.({ index, isSelected: selectedIndex === index })}
        </Button>
      ))}
    </div>
  );
}
export interface CarouselThumbnailsProps extends ComponentPropsWithRef<"div"> {
  hideScrollBar?: boolean;
  scrollShadowSize?: number;
}
function CarouselThumbnails({
  className,
  hideScrollBar = true,
  scrollShadowSize = 40,
  style,
  ...props
}: CarouselThumbnailsProps): ReactElement {
  return (
    <div
      {...props}
      aria-label="Slide thumbnails"
      className={cn(
        "carousel__thumbnails",
        hideScrollBar && "carousel__thumbnails--hide-scrollbar",
        className,
      )}
      role="tablist"
      style={
        {
          ...style,
          "--carousel-scroll-shadow-size": `${scrollShadowSize}px`,
        } as CSSProperties
      }
    />
  );
}
export interface CarouselThumbnailProps extends Omit<
  ComponentPropsWithRef<typeof Button>,
  "children" | "className" | "onPress"
> {
  alt?: string;
  children?: ReactNode;
  className?: string;
  index: number;
  src?: string;
}
function CarouselThumbnail({
  alt = "",
  children,
  className,
  index,
  src,
  ...props
}: CarouselThumbnailProps): ReactElement {
  const { scrollTo, selectedIndex } = useCarousel();
  return (
    <Button
      {...props}
      aria-label={props["aria-label"] ?? `Go to slide ${index + 1}`}
      aria-selected={selectedIndex === index}
      className={cn("carousel__thumbnail", className) ?? "carousel__thumbnail"}
      data-selected={selectedIndex === index || undefined}
      isIconOnly
      onPress={() => scrollTo(index)}
      variant="tertiary"
    >
      {children ?? (src ? <img alt={alt} src={src} /> : null)}
    </Button>
  );
}

type CarouselComponent = typeof CarouselRoot & {
  Content: typeof CarouselContent;
  Dots: typeof CarouselDots;
  Item: typeof CarouselItem;
  Next: typeof CarouselNext;
  Previous: typeof CarouselPrevious;
  Root: typeof CarouselRoot;
  Thumbnail: typeof CarouselThumbnail;
  Thumbnails: typeof CarouselThumbnails;
};
export const Carousel: CarouselComponent = Object.assign(CarouselRoot, {
  Content: CarouselContent,
  Dots: CarouselDots,
  Item: CarouselItem,
  Next: CarouselNext,
  Previous: CarouselPrevious,
  Root: CarouselRoot,
  Thumbnail: CarouselThumbnail,
  Thumbnails: CarouselThumbnails,
});
export {
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselRoot,
  CarouselThumbnail,
  CarouselThumbnails,
};
