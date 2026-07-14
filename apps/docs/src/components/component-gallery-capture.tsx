"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";

import { galleryDemos } from "@/demos/gallery";

declare global {
  interface Window {
    captureComponentGallery?: () => Promise<string>;
    componentGalleryComponents?: string[];
  }
}

export function ComponentGalleryCapture({
  component,
  theme,
}: {
  component: string;
  theme: "dark" | "light";
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [Demo, setDemo] = useState<ComponentType | null>(null);
  const [isCaptureReady, setCaptureReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const selectedDemo = galleryDemos.find(
    (item) => item.component === component,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    let isCurrent = true;

    window.componentGalleryComponents = galleryDemos.map(
      (item) => item.component,
    );
    setDemo(null);
    setCaptureReady(false);
    setHasError(false);

    if (!selectedDemo) {
      setHasError(true);
      return;
    }

    void selectedDemo
      .loader()
      .then((LoadedDemo) => {
        if (isCurrent) setDemo(() => LoadedDemo);
        return LoadedDemo;
      })
      .catch(() => {
        if (isCurrent) setHasError(true);
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedDemo]);

  useEffect(() => {
    if (!Demo || !targetRef.current) return;

    const target = targetRef.current;
    window.captureComponentGallery = async () => {
      await document.fonts.ready;
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        height: target.scrollHeight,
        logging: false,
        scale: 1,
        useCORS: true,
        width: target.scrollWidth,
      });

      return canvas.toDataURL("image/png");
    };
    setCaptureReady(true);

    return () => {
      delete window.captureComponentGallery;
    };
  }, [Demo]);

  return (
    <main
      className="bg-background grid min-h-screen place-items-center"
      data-capture-status={
        hasError ? "error" : isCaptureReady ? "ready" : "loading"
      }
    >
      <div
        ref={targetRef}
        className="bg-background text-foreground flex h-[594px] w-[874px] items-center justify-center overflow-hidden p-10 font-sans"
        data-component-gallery-capture=""
      >
        {Demo ? <Demo /> : null}
      </div>
    </main>
  );
}
