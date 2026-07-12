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

const defaultRoute: [number, number][] = [
  [-122.39385, 37.79519],
  [-122.39412, 37.79548],
  [-122.39462, 37.79601],
  [-122.39475, 37.79603],
  [-122.39482, 37.79601],
  [-122.39483, 37.79588],
  [-122.39458, 37.79532],
  [-122.39435, 37.79502],
  [-122.39416, 37.79484],
  [-122.39367, 37.7945],
  [-122.3933, 37.79428],
  [-122.39325, 37.79425],
  [-122.39314, 37.79417],
  [-122.39271, 37.79382],
  [-122.39259, 37.7937],
  [-122.39225, 37.79339],
  [-122.39163, 37.79287],
  [-122.39134, 37.79255],
  [-122.39127, 37.79243],
  [-122.3911, 37.79204],
  [-122.39078, 37.79137],
  [-122.39051, 37.79105],
  [-122.39025, 37.79083],
  [-122.3899, 37.79056],
  [-122.38873, 37.78962],
  [-122.38853, 37.78939],
  [-122.38826, 37.78894],
  [-122.38803, 37.78805],
  [-122.38799, 37.78762],
  [-122.388, 37.78723],
  [-122.38802, 37.78699],
  [-122.38816, 37.78519],
  [-122.38819, 37.78489],
  [-122.38821, 37.78463],
  [-122.3884, 37.78232],
  [-122.38843, 37.78188],
  [-122.38846, 37.78135],
  [-122.38857, 37.78097],
  [-122.38886, 37.78059],
  [-122.38954, 37.78003],
  [-122.38978, 37.77985],
  [-122.39064, 37.77919],
  [-122.3908, 37.77907],
  [-122.39137, 37.77863],
  [-122.39186, 37.77823],
  [-122.39181, 37.77807],
  [-122.39161, 37.77791],
  [-122.39122, 37.7776],
  [-122.39107, 37.77749],
  [-122.39084, 37.77727],
  [-122.3907, 37.77716],
  [-122.39049, 37.77702],
  [-122.3901, 37.77652],
  [-122.39006, 37.77638],
  [-122.39003, 37.77614],
  [-122.38995, 37.77537],
  [-122.38995, 37.77468],
  [-122.38995, 37.77451],
  [-122.38995, 37.77443],
  [-122.38981, 37.77302],
  [-122.3898, 37.77286],
  [-122.38972, 37.77207],
  [-122.3897, 37.77181],
  [-122.38963, 37.77116],
  [-122.3896, 37.77076],
  [-122.38958, 37.77063],
  [-122.38945, 37.76919],
  [-122.38941, 37.76882],
  [-122.38919, 37.76884],
  [-122.38873, 37.76886],
  [-122.38779, 37.76892],
];
type DefaultStop = {
  kind: "start" | "stop" | "finish";
  label: string;
  latitude: number;
  longitude: number;
  status: string;
  time: string;
};
const defaultStops: DefaultStop[] = [
  {
    kind: "start",
    label: "Ferry Building",
    latitude: 37.79519,
    longitude: -122.39385,
    status: "Pickup ready",
    time: "9:12 AM",
  },
  {
    kind: "stop",
    label: "Market Street",
    latitude: 37.7896,
    longitude: -122.3887,
    status: "Next stop",
    time: "9:19 AM",
  },
  {
    kind: "finish",
    label: "Chase Center",
    latitude: 37.76892,
    longitude: -122.38779,
    status: "Dropoff",
    time: "9:27 AM",
  },
];

function DefaultMapDemo() {
  const [selected, setSelected] = useState<DefaultStop | null>(
    defaultStops[1]!,
  );
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-122.3927, 37.7816]}
        pitch={26}
        styles={styles}
        zoom={13.25}
      >
        <Map.Route coordinates={defaultRoute} />
        {defaultStops.map((stop) => (
          <Map.Marker
            key={stop.label}
            latitude={stop.latitude}
            longitude={stop.longitude}
            onClick={() => setSelected(stop)}
          >
            <Map.MarkerContent>
              <Map.MarkerDot
                color={stop.kind === "start" ? "#22c55e" : undefined}
                ringColor={stop.kind === "start" ? "#bbf7d0" : undefined}
              />
              <Map.MarkerLabel>
                {stop.kind === "start" ? "Start" : stop.label}
              </Map.MarkerLabel>
            </Map.MarkerContent>
            <Map.MarkerTooltip>
              <span className="font-medium">{stop.label}</span>
              <span className="text-background/70 ml-1">{stop.time}</span>
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
              <p className="font-medium">{selected.label}</p>
              <p className="text-muted">{selected.status}</p>
              <p className="text-muted">Arrival {selected.time}</p>
            </div>
          </Map.Popup>
        ) : null}
        <Map.Controls>
          <Map.ZoomControl />
          <Map.CompassControl />
          <Map.FullscreenControl />
        </Map.Controls>
      </Map>
      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[230px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Route planner</Card.Title>
          <Card.Description>Mission Bay dispatch</Card.Description>
        </Card.Header>
        <Card.Content className="grid grid-cols-3 gap-3 text-xs">
          <span>
            <strong className="text-foreground block text-base">7m</strong>ETA
          </span>
          <span>
            <strong className="text-foreground block text-base">3</strong>Stops
          </span>
          <span>
            <strong className="text-foreground block text-base">3.7</strong>Km
          </span>
        </Card.Content>
      </Card>
    </div>
  );
}

export const Default: Story = {
  render: () => <DefaultMapDemo />,
};

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

export const StoreLocator: Story = {
  render: () => <StoreLocatorDemo />,
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
