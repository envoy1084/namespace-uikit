"use client";

// @demo-title Flight Paths
import { Map } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const airports = [
  {
    code: "SFO",
    latitude: 37.6213,
    longitude: -122.379,
    name: "San Francisco",
  },
  { code: "JFK", latitude: 40.6413, longitude: -73.7781, name: "New York" },
  { code: "LHR", latitude: 51.47, longitude: -0.4543, name: "London" },
  { code: "CDG", latitude: 49.0097, longitude: 2.5479, name: "Paris" },
  { code: "DXB", latitude: 25.2532, longitude: 55.3657, name: "Dubai" },
  { code: "SIN", latitude: 1.3644, longitude: 103.9915, name: "Singapore" },
  { code: "HND", latitude: 35.5494, longitude: 139.7798, name: "Tokyo" },
  { code: "SYD", latitude: -33.9399, longitude: 151.1753, name: "Sydney" },
];

const airportByCode = Object.fromEntries(
  airports.map((airport) => [airport.code, airport]),
);

const flightOperations = [
  {
    color: "#4285f4",
    from: "SFO",
    load: "82%",
    seats: "187",
    status: "Boarding",
    to: "HND",
  },
  {
    color: "#4285f4",
    from: "HND",
    load: "76%",
    seats: "144",
    status: "On time",
    to: "SIN",
  },
  {
    color: "#22c55e",
    from: "JFK",
    load: "91%",
    seats: "212",
    status: "Priority",
    to: "LHR",
  },
  {
    color: "#22c55e",
    from: "CDG",
    load: "68%",
    seats: "126",
    status: "Open",
    to: "DXB",
  },
  {
    color: "#f97316",
    from: "DXB",
    load: "94%",
    seats: "231",
    status: "Gate hold",
    to: "SYD",
  },
  {
    color: "#8b5cf6",
    from: "LHR",
    load: "73%",
    seats: "158",
    status: "Connection",
    to: "SFO",
  },
];

const flights = flightOperations.map((flight) => {
  const from = airportByCode[flight.from]!;
  const to = airportByCode[flight.to]!;
  return {
    color: flight.color,
    from: [from.longitude, from.latitude] as [number, number],
    id: `${flight.from}-${flight.to}`,
    load: flight.load,
    route: `${flight.from} → ${flight.to}`,
    seats: flight.seats,
    status: flight.status,
    to: [to.longitude, to.latitude] as [number, number],
    width: flight.status === "Gate hold" ? 3.5 : 2.5,
  };
});

export const DemoFlightPathsExample = () => (
  <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
    <Map
      center={[24, 28]}
      projection={{ type: "globe" }}
      styles={styles}
      zoom={1.9}
    >
      <Map.Arc
        curvature={0.34}
        data={flights}
        hoverPaint={{ "line-opacity": 1, "line-width": 5 }}
        paint={{
          "line-color": ["get", "color"],
          "line-opacity": 0.74,
          "line-width": ["get", "width"],
        }}
      />
      {airports.map((airport) => (
        <Map.Marker
          key={airport.code}
          latitude={airport.latitude}
          longitude={airport.longitude}
        >
          <Map.MarkerContent>
            <Map.MarkerDot color="#4285f4" />
            <Map.MarkerLabel>{airport.code}</Map.MarkerLabel>
          </Map.MarkerContent>
          <Map.MarkerTooltip>
            <span className="font-medium">{airport.code}</span>
            <span className="text-background/70 ml-1">{airport.name}</span>
          </Map.MarkerTooltip>
        </Map.Marker>
      ))}
      <Map.Controls>
        <Map.ZoomControl />
        <Map.CompassControl />
      </Map.Controls>
    </Map>
    <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[260px] gap-3 p-4">
      <Card.Header>
        <Card.Title className="text-sm">Flight operations</Card.Title>
        <Card.Description>Long-haul capacity desk</Card.Description>
      </Card.Header>
      <Card.Content className="gap-3">
        <div className="grid grid-cols-3 gap-3 text-xs">
          <span>
            <strong className="text-foreground block text-base">6</strong>
            Routes
          </span>
          <span>
            <strong className="text-foreground block text-base">1.1k</strong>
            Seats
          </span>
          <span>
            <strong className="text-foreground block text-base">94%</strong>
            Peak
          </span>
        </div>
        <div className="space-y-1">
          {flights.slice(0, 3).map((flight) => (
            <div
              className="flex items-center justify-between text-xs"
              key={flight.id}
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-0.5 w-4 rounded-full"
                  style={{ backgroundColor: flight.color }}
                />
                {flight.route}
              </span>
              <span className="text-muted">{flight.load}</span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  </div>
);
