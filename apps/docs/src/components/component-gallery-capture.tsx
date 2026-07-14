"use client";

import type { ComponentType } from "react";
import { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";

import { galleryDemos } from "@/demos/gallery";

export function ComponentGalleryCapture({
  component,
  theme,
}: {
  component: string;
  theme: "dark" | "light";
}) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [captureData, setCaptureData] = useState<string | null>(null);
  const [Demo, setDemo] = useState<ComponentType | null>(null);
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

    setCaptureData(null);
    setDemo(null);
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
    let isCurrent = true;
    void (async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(target.querySelectorAll("img")).map((image) => {
          if (image.complete) return Promise.resolve();

          return new Promise<void>((resolve) => {
            image.addEventListener("error", () => resolve(), { once: true });
            image.addEventListener("load", () => resolve(), { once: true });
          });
        }),
      );
      const canvas = await html2canvas(target, {
        backgroundColor: null,
        height: target.scrollHeight,
        logging: false,
        scale: 1,
        useCORS: true,
        width: target.scrollWidth,
      });
      if (isCurrent) setCaptureData(canvas.toDataURL("image/png"));
    })().catch(() => {
      if (isCurrent) setHasError(true);
    });

    return () => {
      isCurrent = false;
    };
  }, [Demo]);

  return (
    <main
      className="bg-background grid min-h-screen place-items-center"
      data-capture-status={
        hasError ? "error" : captureData ? "ready" : "loading"
      }
    >
      <div
        ref={targetRef}
        className="bg-background text-foreground flex h-[594px] w-[874px] items-center justify-center overflow-hidden p-10 font-sans"
        data-component-gallery-capture=""
      >
        {Demo ? <Demo /> : null}
      </div>
      <output hidden data-component-gallery-components="">
        {JSON.stringify(galleryDemos.map((item) => item.component))}
      </output>
      <output hidden data-component-gallery-result="">
        {captureData}
      </output>
    </main>
  );
}
