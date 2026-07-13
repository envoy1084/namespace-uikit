// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Incident Monitor
import { useState } from "react";

import { Map } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const incidents = [
  {
    assignee: "NOC",
    id: "INC-2048",
    latitude: 40.758,
    longitude: -73.9855,
    service: "Payments",
    severity: "critical",
    status: "Investigating",
    title: "Checkout errors",
  },
  {
    assignee: "Edge",
    id: "INC-2049",
    latitude: 40.7505,
    longitude: -73.9934,
    service: "CDN",
    severity: "warning",
    status: "Mitigating",
    title: "Elevated latency",
  },
  {
    assignee: "Data",
    id: "INC-2050",
    latitude: 40.7306,
    longitude: -73.9866,
    service: "Analytics",
    severity: "info",
    status: "Monitoring",
    title: "Queue backlog",
  },
  {
    assignee: "Ops",
    id: "INC-2051",
    latitude: 40.7061,
    longitude: -74.0086,
    service: "Auth",
    severity: "warning",
    status: "Assigned",
    title: "Login retries",
  },
  {
    assignee: "Mobile",
    id: "INC-2052",
    latitude: 40.7182,
    longitude: -73.9571,
    service: "Push",
    severity: "info",
    status: "Triaged",
    title: "Notification delay",
  },
  {
    assignee: "NOC",
    id: "INC-2053",
    latitude: 40.6782,
    longitude: -73.9442,
    service: "Search",
    severity: "critical",
    status: "Investigating",
    title: "Index shard down",
  },
  {
    assignee: "Infra",
    id: "INC-2054",
    latitude: 40.7484,
    longitude: -73.956,
    service: "Compute",
    severity: "warning",
    status: "Mitigating",
    title: "Host pressure",
  },
  {
    assignee: "Support",
    id: "INC-2055",
    latitude: 40.7411,
    longitude: -74.0039,
    service: "Tickets",
    severity: "info",
    status: "Monitoring",
    title: "Webhook retries",
  },
  {
    assignee: "Infra",
    id: "INC-2056",
    latitude: 40.7128,
    longitude: -74.006,
    service: "API",
    severity: "critical",
    status: "Paging",
    title: "Error budget burn",
  },
  {
    assignee: "Data",
    id: "INC-2057",
    latitude: 40.7295,
    longitude: -74.0324,
    service: "Warehouse",
    severity: "warning",
    status: "Assigned",
    title: "Sync delayed",
  },
  {
    assignee: "Edge",
    id: "INC-2058",
    latitude: 40.6892,
    longitude: -74.0445,
    service: "DNS",
    severity: "info",
    status: "Resolved",
    title: "Failover complete",
  },
  {
    assignee: "Mobile",
    id: "INC-2059",
    latitude: 40.7516,
    longitude: -73.9755,
    service: "App",
    severity: "warning",
    status: "Monitoring",
    title: "Crash spike",
  },
];

const incidentColors = {
  critical: "#ef4444",
  info: "#4285f4",
  warning: "#f97316",
};

const incidentPointColor = [
  "match",
  ["get", "severity"],
  "critical",
  incidentColors.critical,
  "warning",
  incidentColors.warning,
  "info",
  incidentColors.info,
  "#4285f4",
];

const incidentData = {
  features: incidents.map(({ latitude, longitude, ...incident }) => ({
    geometry: { coordinates: [longitude, latitude], type: "Point" as const },
    properties: incident,
    type: "Feature" as const,
  })),
  type: "FeatureCollection" as const,
};

function IncidentMonitorDemo() {
  const [selected, setSelected] = useState<{
    coordinates: [number, number];
    properties: (typeof incidentData.features)[number]["properties"];
  } | null>(null);
  const critical = incidents.filter(
    (incident) => incident.severity === "critical",
  ).length;
  const warning = incidents.filter(
    (incident) => incident.severity === "warning",
  ).length;
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
      <Map center={[-73.985, 40.728]} pitch={18} styles={styles} zoom={10.7}>
        <Map.ClusterLayer
          clusterColors={["#4285f4", "#f97316", "#ef4444"]}
          clusterRadius={42}
          clusterThresholds={[4, 8]}
          data={incidentData}
          pointColor={incidentPointColor}
          onPointClick={(feature, coordinates) =>
            setSelected({
              coordinates,
              properties:
                feature.properties as (typeof incidentData.features)[number]["properties"],
            })
          }
        />
        {selected ? (
          <Map.Popup
            closeButton
            closeOnClick={false}
            focusAfterOpen={false}
            latitude={selected.coordinates[1]}
            longitude={selected.coordinates[0]}
            onClose={() => setSelected(null)}
          >
            <div className="space-y-2 pr-4 text-xs">
              <div>
                <p className="font-medium">{selected.properties.title}</p>
                <p className="text-muted">{selected.properties.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <span>
                  <strong className="text-foreground block">Service</strong>
                  {selected.properties.service}
                </span>
                <span>
                  <strong className="text-foreground block">Owner</strong>
                  {selected.properties.assignee}
                </span>
              </div>
              <p className="text-muted">
                {selected.properties.severity} · {selected.properties.status}
              </p>
            </div>
          </Map.Popup>
        ) : null}
        <Map.Controls>
          <Map.ZoomControl />
          <Map.FullscreenControl />
        </Map.Controls>
      </Map>
      <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[250px] gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">Incident monitor</Card.Title>
          <Card.Description>New York operations</Card.Description>
        </Card.Header>
        <Card.Content className="gap-3">
          <div className="grid grid-cols-3 gap-3 text-xs">
            <span>
              <strong className="text-foreground block text-base">
                {incidents.length}
              </strong>
              Open
            </span>
            <span>
              <strong className="text-foreground block text-base">
                {critical}
              </strong>
              Critical
            </span>
            <span>
              <strong className="text-foreground block text-base">
                {warning}
              </strong>
              Warning
            </span>
          </div>
          <div className="space-y-1">
            {(["critical", "warning", "info"] as const).map((severity) => (
              <div
                className="flex items-center justify-between text-xs"
                key={severity}
              >
                <span className="flex items-center gap-2 capitalize">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: incidentColors[severity] }}
                  />
                  {severity}
                </span>
                <span className="text-muted">
                  {
                    incidents.filter(
                      (incident) => incident.severity === severity,
                    ).length
                  }
                </span>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}

const properties = [
  {
    baths: 2,
    beds: 3,
    id: "noe-valley",
    latitude: 37.7502,
    longitude: -122.4337,
    name: "Noe Valley Victorian",
    neighborhood: "Noe Valley",
    price: "$1.28m",
    sqft: "1,850",
  },
  {
    baths: 1,
    beds: 2,
    id: "mission-loft",
    latitude: 37.7599,
    longitude: -122.4148,
    name: "Mission District loft",
    neighborhood: "Mission",
    price: "$895k",
    sqft: "1,120",
  },
  {
    baths: 2,
    beds: 2,
    id: "hayes-valley",
    latitude: 37.7759,
    longitude: -122.4245,
    name: "Hayes Valley condo",
    neighborhood: "Hayes Valley",
    price: "$1.05m",
    sqft: "1,340",
  },
  {
    baths: 3,
    beds: 4,
    id: "marina-view",
    latitude: 37.8021,
    longitude: -122.4382,
    name: "Marina view home",
    neighborhood: "Marina",
    price: "$2.4m",
    sqft: "2,600",
  },
  {
    baths: 1,
    beds: 1,
    id: "soma-studio",
    latitude: 37.7785,
    longitude: -122.395,
    name: "SoMa studio",
    neighborhood: "SoMa",
    price: "$650k",
    sqft: "780",
  },
  {
    baths: 2,
    beds: 3,
    id: "inner-sunset",
    latitude: 37.7644,
    longitude: -122.4692,
    name: "Inner Sunset flat",
    neighborhood: "Inner Sunset",
    price: "$1.12m",
    sqft: "1,540",
  },
];

export const DemoIncidentMonitorExample = () => <IncidentMonitorDemo />;
