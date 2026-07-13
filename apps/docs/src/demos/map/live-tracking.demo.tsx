"use client";

// @demo-title Live Tracking
import { useEffect, useState } from "react";

import { Map } from "@thenamespace/uikit";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const avatarRoot = "/assets/avatars";

const trackingDuration = 45_000;

const trackingMinutes = 9;

const trackingRoute = [
  [-122.3937, 37.7955],
  [-122.3963, 37.7935],
  [-122.4008, 37.79],
  [-122.4055, 37.7862],
  [-122.4102, 37.7825],
  [-122.4148, 37.7788],
  [-122.4195, 37.7751],
  [-122.4216, 37.7724],
  [-122.4213, 37.7692],
  [-122.4211, 37.7659],
  [-122.4208, 37.7626],
  [-122.4206, 37.7593],
  [-122.4204, 37.7561],
] as [number, number][];

const trackingDestination = trackingRoute[trackingRoute.length - 1]!;

const trackingSegments = trackingRoute
  .slice(1)
  .map((point, index) =>
    Math.hypot(
      point[0] - trackingRoute[index]![0],
      point[1] - trackingRoute[index]![1],
    ),
  );

const trackingDistance = trackingSegments.reduce(
  (total, distance) => total + distance,
  0,
);

const trackingPosition = (progress: number) => {
  let remaining = progress * trackingDistance;
  for (let index = 0; index < trackingSegments.length; index++) {
    const distance = trackingSegments[index]!;
    if (remaining <= distance) {
      const ratio = distance === 0 ? 0 : remaining / distance;
      const from = trackingRoute[index]!;
      const to = trackingRoute[index + 1]!;
      return {
        index,
        point: [
          from[0] + (to[0] - from[0]) * ratio,
          from[1] + (to[1] - from[1]) * ratio,
        ] as [number, number],
      };
    }
    remaining -= distance;
  }
  return { index: trackingRoute.length - 2, point: trackingDestination };
};

function TrackingDemo() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame: number;
    let startedAt: number | null = null;
    const update = (time: number) => {
      if (startedAt === null) startedAt = time;
      setProgress(((time - startedAt) % trackingDuration) / trackingDuration);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);
  const { index, point } = trackingPosition(progress);
  const completedRoute = [...trackingRoute.slice(0, index + 1), point];
  const eta = Math.max(1, Math.ceil((1 - progress) * trackingMinutes));
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map center={[-122.4085, 37.776]} pitch={30} styles={styles} zoom={13.1}>
        <Map.Route
          color="#94a3b8"
          coordinates={trackingRoute}
          dashArray={[1.5, 1.5]}
          opacity={0.6}
          width={3}
        />
        <Map.Route
          color="#4285f4"
          coordinates={completedRoute}
          opacity={0.9}
          width={4}
        />
        <Map.Marker latitude={point[1]} longitude={point[0]}>
          <Map.MarkerContent>
            <Map.MarkerDot color="#4285f4" />
            <Map.MarkerLabel>Courier</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>
        <Map.Marker
          latitude={trackingDestination[1]}
          longitude={trackingDestination[0]}
        >
          <Map.MarkerContent>
            <Map.MarkerDot color="#22c55e" />
            <Map.MarkerLabel>Drop-off</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>
        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
        </Map.Controls>
      </Map>
      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[250px] gap-3 p-4">
        <Card.Header className="flex-row items-center gap-3">
          <Avatar size="sm">
            <Avatar.Image
              alt="Noah the courier"
              src={`${avatarRoot}/green.jpg`}
            />
            <Avatar.Fallback>NO</Avatar.Fallback>
          </Avatar>
          <div className="min-w-0">
            <Card.Title className="text-sm">Noah is on the way</Card.Title>
            <Card.Description>Order #4128 · 2 items</Card.Description>
          </div>
        </Card.Header>
        <Card.Content className="gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted">Estimated arrival</span>
            <span className="font-semibold">{eta} min</span>
          </div>
          <div className="bg-surface-tertiary h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-[#4285f4] transition-[width] duration-150 ease-linear"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export const DemoLiveTrackingExample = () => <TrackingDemo />;
