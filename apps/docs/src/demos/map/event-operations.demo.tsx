"use client";

// @demo-title Event Operations
import { useState } from "react";

import {
  FirstAidKitIcon,
  GpsSignal01Icon,
  SecurityCheckIcon,
  StreetFoodIcon,
  TrafficLightIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Map } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const eventStations = [
  {
    Icon: UserGroupIcon,
    color: "#4285f4",
    details: "2,400 guests checked in over the last 20 minutes.",
    id: "gate",
    label: "Main gate",
    latitude: 37.7693,
    longitude: -122.4862,
    metric: "78% flow",
    status: "On pace",
  },
  {
    Icon: StreetFoodIcon,
    color: "#f97316",
    details:
      "North row is above forecast; two vendors are opening overflow lines.",
    id: "food",
    label: "Food row",
    latitude: 37.7672,
    longitude: -122.4818,
    metric: "14 min wait",
    status: "High demand",
  },
  {
    Icon: FirstAidKitIcon,
    color: "#ef4444",
    details: "Medical tent has two open teams and one active response.",
    id: "medical",
    label: "Medical tent",
    latitude: 37.7709,
    longitude: -122.4776,
    metric: "2 min SLA",
    status: "Ready",
  },
  {
    Icon: SecurityCheckIcon,
    color: "#22c55e",
    details: "Security check is staffed for both park entrances.",
    id: "security",
    label: "Security desk",
    latitude: 37.7726,
    longitude: -122.4827,
    metric: "6 teams",
    status: "Covered",
  },
  {
    Icon: GpsSignal01Icon,
    color: "#8b5cf6",
    details: "Temporary network mesh is healthy across the venue.",
    id: "signal",
    label: "Signal tower",
    latitude: 37.7686,
    longitude: -122.475,
    metric: "96% signal",
    status: "Stable",
  },
  {
    Icon: TrafficLightIcon,
    color: "#14b8a6",
    details: "Ride-share lane has a small backup near the west exit.",
    id: "traffic",
    label: "Exit lane",
    latitude: 37.7654,
    longitude: -122.4868,
    metric: "8 min clear",
    status: "Watch",
  },
];

function EventOperationsDemo() {
  const [selected, setSelected] = useState<
    (typeof eventStations)[number] | null
  >(eventStations[0]!);
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.4817, 37.7689]}
        pitch={20}
        styles={styles}
        zoom={14.35}
      >
        {eventStations.map((station) => {
          const isSelected = selected?.id === station.id;
          return (
            <Map.Marker
              key={station.id}
              latitude={station.latitude}
              longitude={station.longitude}
              onClick={() => setSelected(station)}
            >
              <Map.MarkerContent>
                <span
                  className="shadow-overlay flex size-8 items-center justify-center rounded-full border-2 border-white/90 text-white transition data-[selected=true]:scale-110 data-[selected=true]:ring-2 data-[selected=true]:ring-white/70"
                  data-selected={isSelected || undefined}
                  style={{ backgroundColor: station.color }}
                >
                  <HugeiconsIcon
                    aria-hidden
                    className="size-4"
                    icon={station.Icon}
                  />
                </span>
                <Map.MarkerLabel>{station.label}</Map.MarkerLabel>
              </Map.MarkerContent>
              <Map.MarkerTooltip
                className="bg-overlay text-foreground shadow-overlay w-[320px] rounded-3xl p-4"
                offset={20}
              >
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="font-medium">{station.label}</p>
                    <p className="text-muted">{station.status}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <span>
                      <strong className="text-foreground block">Metric</strong>
                      {station.metric}
                    </span>
                    <span>
                      <strong className="text-foreground block">Desk</strong>
                      Live ops
                    </span>
                  </div>
                  <p className="text-muted">{station.details}</p>
                </div>
              </Map.MarkerTooltip>
            </Map.Marker>
          );
        })}
        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
          <Map.FullscreenControl />
        </Map.Controls>
      </Map>
      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[260px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Event command</Card.Title>
          <Card.Description>Golden Gate Park live ops</Card.Description>
        </Card.Header>
        <Card.Content className="gap-3">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <span>
              <strong className="text-foreground block text-base">6</strong>
              Teams
            </span>
            <span>
              <strong className="text-foreground block text-base">18k</strong>
              Guests
            </span>
            <span>
              <strong className="text-foreground block text-base">94%</strong>
              Flow
            </span>
          </div>
          <div className="space-y-1">
            {eventStations.slice(0, 4).map((station) => (
              <button
                className="hover:bg-surface-tertiary flex w-full items-center justify-between rounded-md px-2 py-1 text-left transition"
                key={station.id}
                type="button"
                onClick={() => setSelected(station)}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="flex size-5 items-center justify-center rounded-full text-white"
                    style={{ backgroundColor: station.color }}
                  >
                    <HugeiconsIcon
                      aria-hidden
                      className="size-3"
                      icon={station.Icon}
                    />
                  </span>
                  <span className="text-xs font-medium">{station.label}</span>
                </span>
                <span className="text-muted text-xs">{station.metric}</span>
              </button>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

export const DemoEventOperationsExample = () => <EventOperationsDemo />;
