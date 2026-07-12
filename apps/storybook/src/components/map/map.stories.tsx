import type { Meta, StoryObj } from "@storybook/react";

import { useEffect, useState } from "react";

import { Icon } from "@iconify/react";
import { Avatar } from "@thenamespace/uikit/avatar";
import { Card } from "@thenamespace/uikit/card";
import { Chip } from "@thenamespace/uikit/chip";

import { Map, useMap } from "./index";

const meta = {
  component: Map,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  title: "Components/Data Display/Map",
} satisfies Meta<typeof Map>;
export default meta;
type Story = StoryObj<typeof meta>;

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};
const MapFrame = ({
  children,
  center = [-97.7431, 30.2672] as [number, number],
  projection,
  zoom = 11,
}: {
  children?: React.ReactNode;
  center?: [number, number];
  projection?: { type: "globe" | "mercator" };
  zoom?: number;
}) => (
  <div className="border-border h-[520px] w-full overflow-hidden rounded-2xl border">
    <Map
      aria-label="Interactive map"
      center={center}
      projection={projection}
      styles={styles}
      zoom={zoom}
    >
      {children}
      <Map.Controls>
        <Map.ZoomControl />
        <Map.CompassControl />
        <Map.LocateControl />
        <Map.FullscreenControl />
      </Map.Controls>
    </Map>
  </div>
);
const locations = [
  {
    id: "downtown",
    latitude: 30.2672,
    longitude: -97.7431,
    name: "Downtown Austin",
  },
  {
    id: "south",
    latitude: 30.2308,
    longitude: -97.7596,
    name: "South Congress",
  },
  { id: "east", latitude: 30.2625, longitude: -97.7188, name: "East Austin" },
  { id: "domain", latitude: 30.4014, longitude: -97.7254, name: "The Domain" },
];

export const Default: Story = {
  render: () => (
    <MapFrame>
      {locations.slice(0, 3).map((location, index) => (
        <Map.Marker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <Map.MarkerContent>
            <Map.MarkerDot color={index === 0 ? "var(--accent)" : "#4285f4"} />
            <Map.MarkerLabel>{location.name}</Map.MarkerLabel>
          </Map.MarkerContent>
          <Map.MarkerTooltip>{location.name}</Map.MarkerTooltip>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

export const StoreLocator: Story = {
  render: () => (
    <MapFrame>
      {locations.map((location, index) => (
        <Map.Marker
          key={location.id}
          latitude={location.latitude}
          longitude={location.longitude}
        >
          <Map.MarkerContent>
            <span className="bg-accent text-accent-foreground flex size-8 items-center justify-center rounded-full shadow-lg">
              <Icon icon="lucide:store" />
            </span>
          </Map.MarkerContent>
          <Map.MarkerPopup closeButton>
            <div className="space-y-2">
              <strong>{location.name}</strong>
              <p className="text-muted m-0 text-xs">
                Open today until {index % 2 ? "8 PM" : "9 PM"}
              </p>
              <Chip color="success" size="sm" variant="soft">
                Pickup available
              </Chip>
            </div>
          </Map.MarkerPopup>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

const routes = [
  [
    [-97.78, 30.28],
    [-97.7431, 30.2672],
    [-97.71, 30.25],
  ],
  [
    [-97.76, 30.22],
    [-97.73, 30.25],
    [-97.7, 30.29],
  ],
] as [number, number][][];
export const FleetDispatch: Story = {
  render: () => (
    <MapFrame>
      {routes.map((coordinates, index) => (
        <Map.Route
          color={index ? "#22c55e" : "#4285f4"}
          coordinates={coordinates}
          id={`fleet-${index}`}
          key={index}
        />
      ))}
      {routes.map((route, index) => {
        const [longitude, latitude] = route[1];
        return (
          <Map.Marker
            key={index}
            latitude={latitude}
            longitude={longitude}
            rotation={index * 35}
          >
            <Map.MarkerContent>
              <span className="bg-foreground text-background flex size-8 items-center justify-center rounded-full shadow-lg">
                <Icon icon="lucide:truck" />
              </span>
            </Map.MarkerContent>
            <Map.MarkerTooltip>Driver {index + 1} · En route</Map.MarkerTooltip>
          </Map.Marker>
        );
      })}
    </MapFrame>
  ),
};

export const EventOperations: Story = {
  render: () => (
    <MapFrame center={[-73.9857, 40.7484]} zoom={13}>
      {[
        {
          latitude: 40.7484,
          longitude: -73.9857,
          label: "Main stage",
          icon: "lucide:music",
        },
        {
          latitude: 40.7527,
          longitude: -73.9772,
          label: "Operations",
          icon: "lucide:radio-tower",
        },
        {
          latitude: 40.742,
          longitude: -73.992,
          label: "Medical",
          icon: "lucide:heart-pulse",
        },
      ].map((point) => (
        <Map.Marker
          key={point.label}
          latitude={point.latitude}
          longitude={point.longitude}
        >
          <Map.MarkerContent>
            <span className="bg-overlay text-accent flex size-9 items-center justify-center rounded-xl shadow-lg">
              <Icon icon={point.icon} />
            </span>
            <Map.MarkerLabel position="bottom">{point.label}</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

function CoverageLayer() {
  const { isLoaded, map } = useMap();
  useEffect(() => {
    if (!isLoaded || !map) return;
    const data = {
      type: "FeatureCollection" as const,
      features: [
        {
          type: "Feature" as const,
          properties: { fill: "#4285f4" },
          geometry: {
            type: "Polygon" as const,
            coordinates: [
              [
                [-97.78, 30.29],
                [-97.72, 30.3],
                [-97.7, 30.25],
                [-97.76, 30.23],
                [-97.78, 30.29],
              ],
            ],
          },
        },
      ],
    };
    map.addSource("coverage", { data, type: "geojson" });
    map.addLayer({
      id: "coverage-fill",
      source: "coverage",
      type: "fill",
      paint: { "fill-color": ["get", "fill"], "fill-opacity": 0.25 },
    });
    map.addLayer({
      id: "coverage-line",
      source: "coverage",
      type: "line",
      paint: { "line-color": "#2563eb", "line-width": 2 },
    });
    return () => {
      if (map.getLayer("coverage-line")) map.removeLayer("coverage-line");
      if (map.getLayer("coverage-fill")) map.removeLayer("coverage-fill");
      if (map.getSource("coverage")) map.removeSource("coverage");
    };
  }, [isLoaded, map]);
  return null;
}
export const CoverageZones: Story = {
  render: () => (
    <MapFrame>
      <CoverageLayer />
      <Map.Popup closeButton latitude={30.2672} longitude={-97.7431}>
        <strong>Core express</strong>
        <p className="text-muted m-0 text-xs">96% of orders covered</p>
      </Map.Popup>
    </MapFrame>
  ),
};

const flights = [
  {
    from: [-122.4194, 37.7749] as [number, number],
    id: "sfo-jfk",
    label: "SFO → JFK",
    to: [-73.7781, 40.6413] as [number, number],
  },
  {
    from: [-0.4543, 51.47] as [number, number],
    id: "lhr-dxb",
    label: "LHR → DXB",
    to: [55.3657, 25.2532] as [number, number],
  },
  {
    from: [139.7798, 35.5494] as [number, number],
    id: "hnd-sin",
    label: "HND → SIN",
    to: [103.9915, 1.3644] as [number, number],
  },
];
export const FlightPaths: Story = {
  render: () => (
    <MapFrame center={[10, 25]} projection={{ type: "globe" }} zoom={1.2}>
      <Map.Arc
        data={flights}
        hoverPaint={{ "line-color": "#22c55e", "line-width": 4 }}
        onHover={() => {}}
      />
      {flights
        .flatMap((flight) => [flight.from, flight.to])
        .map(([longitude, latitude], index) => (
          <Map.Marker key={index} latitude={latitude} longitude={longitude}>
            <Map.MarkerContent>
              <Map.MarkerDot color="#4285f4" />
            </Map.MarkerContent>
          </Map.Marker>
        ))}
    </MapFrame>
  ),
};

export const GlobalNewsroom: Story = {
  render: () => (
    <MapFrame center={[0, 20]} projection={{ type: "globe" }} zoom={1.1}>
      <Map.Arc
        curvature={0.28}
        data={flights}
        paint={{
          "line-color": "#8b5cf6",
          "line-opacity": 0.65,
          "line-width": 2,
        }}
      />
      {[
        { city: "London", coords: [-0.1276, 51.5072] },
        { city: "New York", coords: [-74.006, 40.7128] },
        { city: "Tokyo", coords: [139.6917, 35.6895] },
      ].map((office) => (
        <Map.Marker
          key={office.city}
          latitude={office.coords[1]}
          longitude={office.coords[0]}
        >
          <Map.MarkerContent>
            <span className="bg-overlay flex size-8 items-center justify-center rounded-full shadow-lg">
              <Icon icon="lucide:newspaper" />
            </span>
            <Map.MarkerLabel>{office.city}</Map.MarkerLabel>
          </Map.MarkerContent>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

const incidentPoints = {
  type: "FeatureCollection" as const,
  features: Array.from({ length: 80 }, (_, index) => ({
    type: "Feature" as const,
    properties: { id: index, severity: index % 3 },
    geometry: {
      type: "Point" as const,
      coordinates: [
        -97.7431 + Math.sin(index * 2.1) * 0.15,
        30.2672 + Math.cos(index * 1.7) * 0.12,
      ],
    },
  })),
};
export const IncidentMonitor: Story = {
  render: () => (
    <MapFrame zoom={9}>
      <Map.ClusterLayer
        clusterThresholds={[10, 30]}
        data={incidentPoints}
        pointColor="#ef4444"
      />
      <div className="pointer-events-none absolute top-3 left-3 z-10">
        <Card className="p-3">
          <strong>Incident monitor</strong>
          <p className="text-muted m-0 text-xs">80 active reports</p>
        </Card>
      </div>
    </MapFrame>
  ),
};

const visitors = [
  { name: "Maya", coords: [-74.006, 40.7128], avatar: "blue" },
  { name: "Eli", coords: [-0.1276, 51.5072], avatar: "orange" },
  { name: "Nora", coords: [139.6917, 35.6895], avatar: "green" },
  { name: "Paz", coords: [151.2093, -33.8688], avatar: "red" },
];
export const LiveVisitors: Story = {
  render: () => (
    <MapFrame center={[20, 15]} projection={{ type: "globe" }} zoom={1}>
      {visitors.map((visitor) => (
        <Map.Marker
          key={visitor.name}
          latitude={visitor.coords[1]}
          longitude={visitor.coords[0]}
        >
          <Map.MarkerContent>
            <Avatar className="ring-surface size-8 ring-2" size="sm">
              <Avatar.Image
                alt={visitor.name}
                src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/${visitor.avatar}.jpg`}
              />
              <Avatar.Fallback>{visitor.name[0]}</Avatar.Fallback>
            </Avatar>
            <span className="border-surface bg-success absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2" />
          </Map.MarkerContent>
          <Map.MarkerTooltip>{visitor.name} · viewing now</Map.MarkerTooltip>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

const properties = [
  { price: "$625K", latitude: 30.2672, longitude: -97.7431 },
  { price: "$890K", latitude: 30.282, longitude: -97.752 },
  { price: "$1.2M", latitude: 30.25, longitude: -97.72 },
  { price: "$540K", latitude: 30.235, longitude: -97.77 },
];
export const PropertyListings: Story = {
  render: () => (
    <MapFrame zoom={12}>
      {properties.map((property) => (
        <Map.Marker
          key={property.price}
          latitude={property.latitude}
          longitude={property.longitude}
        >
          <Map.MarkerContent>
            <span className="bg-overlay ring-border rounded-full px-2 py-1 text-xs font-semibold shadow-lg ring-1">
              {property.price}
            </span>
          </Map.MarkerContent>
          <Map.MarkerPopup closeButton>
            <div className="space-y-1">
              <strong>Modern Austin home</strong>
              <p className="text-muted m-0 text-xs">
                3 beds · 2 baths · 1,840 ft²
              </p>
              <Chip color="accent" size="sm" variant="soft">
                {property.price}
              </Chip>
            </div>
          </Map.MarkerPopup>
        </Map.Marker>
      ))}
    </MapFrame>
  ),
};

function TrackingDemo() {
  const [progress, setProgress] = useState(1);
  useEffect(() => {
    const id = window.setInterval(
      () => setProgress((value) => (value + 1) % routes[0].length),
      1800,
    );
    return () => window.clearInterval(id);
  }, []);
  const [longitude, latitude] = routes[0][progress];
  return (
    <MapFrame>
      <Map.Route coordinates={routes[0]} id="tracking" />
      <Map.Marker latitude={latitude} longitude={longitude}>
        <Map.MarkerContent>
          <span className="bg-accent text-accent-foreground flex size-9 items-center justify-center rounded-full shadow-lg">
            <Icon icon="lucide:bike" />
          </span>
        </Map.MarkerContent>
      </Map.Marker>
      <div className="pointer-events-none absolute bottom-3 left-3 z-10">
        <Card className="p-3">
          <strong>Courier arriving</strong>
          <p className="text-muted m-0 text-xs">ETA 8 minutes</p>
        </Card>
      </div>
    </MapFrame>
  );
}
export const LiveTracking: Story = { render: () => <TrackingDemo /> };

function HeatLayer() {
  const { isLoaded, map } = useMap();
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource("heat", { data: incidentPoints, type: "geojson" });
    map.addLayer({
      id: "heat-layer",
      source: "heat",
      type: "heatmap",
      paint: {
        "heatmap-intensity": 1.2,
        "heatmap-radius": 28,
        "heatmap-opacity": 0.85,
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "#3b82f6",
          0.5,
          "#8b5cf6",
          0.8,
          "#f59e0b",
          1,
          "#ef4444",
        ],
      },
    });
    return () => {
      if (map.getLayer("heat-layer")) map.removeLayer("heat-layer");
      if (map.getSource("heat")) map.removeSource("heat");
    };
  }, [isLoaded, map]);
  return null;
}
export const Heatmap: Story = {
  render: () => (
    <MapFrame zoom={9}>
      <HeatLayer />
      <div className="bg-overlay/90 pointer-events-none absolute top-3 right-3 z-10 rounded-xl p-3 text-xs shadow-lg">
        <strong>Demand density</strong>
        <div className="mt-2 h-2 w-36 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
      </div>
    </MapFrame>
  ),
};
