"use client";

// @demo-title Store Locator
import { useState } from "react";

import { Map } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const storeLocations = [
  {
    address: "NW 13th Ave",
    color: "#4285f4",
    distance: "0.8 mi",
    latitude: 45.5265,
    longitude: -122.6842,
    name: "Pearl pickup",
    orders: "31 ready",
    status: "Open",
  },
  {
    address: "SW 3rd Ave",
    color: "#22c55e",
    distance: "1.6 mi",
    latitude: 45.5181,
    longitude: -122.6765,
    name: "Downtown desk",
    orders: "18 ready",
    status: "Open",
  },
  {
    address: "SE Hawthorne",
    color: "#f97316",
    distance: "2.4 mi",
    latitude: 45.5128,
    longitude: -122.6538,
    name: "Hawthorne hub",
    orders: "Queue full",
    status: "Busy",
  },
  {
    address: "NE Alberta",
    color: "#8b5cf6",
    distance: "3.1 mi",
    latitude: 45.5591,
    longitude: -122.6467,
    name: "Alberta counter",
    orders: "9 ready",
    status: "Open",
  },
];

function StoreLocatorDemo() {
  const [selected, setSelected] = useState<
    (typeof storeLocations)[number] | null
  >(storeLocations[0]!);
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map center={[-122.678, 45.538]} pitch={18} styles={styles} zoom={12.25}>
        {storeLocations.map((location) => (
          <Map.Marker
            key={location.name}
            latitude={location.latitude}
            longitude={location.longitude}
            onClick={() => setSelected(location)}
          >
            <Map.MarkerContent>
              <Map.MarkerDot color={location.color} />
              <Map.MarkerLabel>{location.name}</Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{location.name}</span>
              <span className="text-background/70 ml-1">{location.orders}</span>
            </Map.MarkerTooltip>
          </Map.Marker>
        ))}
        {selected ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selected.latitude}
            longitude={selected.longitude}
            offset={18}
            onClose={() => setSelected(null)}
          >
            <div className="space-y-1 pr-4 text-xs">
              <p className="font-medium">{selected.name}</p>
              <p className="text-muted">{selected.address}</p>
              <p className="text-muted">
                {selected.status} · {selected.orders}
              </p>
            </div>
          </Map.Popup>
        ) : null}
        <Map.Controls>
          <Map.ZoomControl />
          <Map.LocateControl />
        </Map.Controls>
      </Map>
      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Pickup network</Card.Title>
          <Card.Description>4 locations near Portland</Card.Description>
        </Card.Header>
        <Card.Content className="gap-2">
          {storeLocations.slice(0, 3).map((location) => (
            <button
              className="hover:bg-surface-tertiary flex items-center justify-between rounded-md px-2 py-1 text-left transition"
              key={location.name}
              type="button"
              onClick={() => setSelected(location)}
            >
              <span className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: location.color }}
                />
                <span className="text-xs font-medium">{location.name}</span>
              </span>
              <span className="text-muted text-xs">{location.distance}</span>
            </button>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
}

export const DemoStoreLocatorExample = () => <StoreLocatorDemo />;
