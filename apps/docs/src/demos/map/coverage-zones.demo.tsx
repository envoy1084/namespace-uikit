"use client";

// @demo-title Coverage Zones
import { useEffect } from "react";

import { Map, useMap } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

const coverageSourceId = "coverage-zones-source";

const coverageFillId = "coverage-zones-fill";

const coverageLineId = "coverage-zones-line";

const coverageData = {
  features: [
    {
      geometry: {
        coordinates: [
          [
            [-97.764, 30.295],
            [-97.735, 30.3],
            [-97.723, 30.276],
            [-97.752, 30.267],
            [-97.773, 30.277],
            [-97.764, 30.295],
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {
        fill: "#4285f4",
        name: "North same-day",
        stroke: "#2563eb",
        volume: "84% covered",
      },
      type: "Feature" as const,
    },
    {
      geometry: {
        coordinates: [
          [
            [-97.752, 30.267],
            [-97.723, 30.276],
            [-97.714, 30.247],
            [-97.744, 30.238],
            [-97.769, 30.25],
            [-97.752, 30.267],
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {
        fill: "#22c55e",
        name: "Core express",
        stroke: "#16a34a",
        volume: "96% covered",
      },
      type: "Feature" as const,
    },
    {
      geometry: {
        coordinates: [
          [
            [-97.769, 30.25],
            [-97.744, 30.238],
            [-97.734, 30.212],
            [-97.771, 30.207],
            [-97.792, 30.226],
            [-97.769, 30.25],
          ],
        ],
        type: "Polygon" as const,
      },
      properties: {
        fill: "#f97316",
        name: "South scheduled",
        stroke: "#ea580c",
        volume: "71% covered",
      },
      type: "Feature" as const,
    },
  ],
  type: "FeatureCollection" as const,
};

const coverageZones = [
  {
    color: "#4285f4",
    latitude: 30.284,
    longitude: -97.748,
    name: "North same-day",
    volume: "84%",
  },
  {
    color: "#22c55e",
    latitude: 30.255,
    longitude: -97.738,
    name: "Core express",
    volume: "96%",
  },
  {
    color: "#f97316",
    latitude: 30.225,
    longitude: -97.766,
    name: "South scheduled",
    volume: "71%",
  },
];

function CoverageLayer() {
  const { isLoaded, map } = useMap();
  useEffect(() => {
    if (!isLoaded || !map) return;
    const addLayers = () => {
      if (map.getSource(coverageSourceId)) return;
      const beforeId = map
        .getStyle()
        .layers?.find((layer) => layer.type === "symbol")?.id;
      map.addSource(coverageSourceId, { data: coverageData, type: "geojson" });
      map.addLayer(
        {
          id: coverageFillId,
          paint: { "fill-color": ["get", "fill"], "fill-opacity": 0.18 },
          source: coverageSourceId,
          type: "fill",
        },
        beforeId,
      );
      map.addLayer(
        {
          id: coverageLineId,
          paint: {
            "line-color": ["get", "stroke"],
            "line-opacity": 0.9,
            "line-width": 2,
          },
          source: coverageSourceId,
          type: "line",
        },
        beforeId,
      );
    };
    if (map.isStyleLoaded()) addLayers();
    else map.once("idle", addLayers);
    return () => {
      map.off("idle", addLayers);
      if (map.getLayer(coverageLineId)) map.removeLayer(coverageLineId);
      if (map.getLayer(coverageFillId)) map.removeLayer(coverageFillId);
      if (map.getSource(coverageSourceId)) map.removeSource(coverageSourceId);
    };
  }, [isLoaded, map]);
  return null;
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

export const DemoCoverageZonesExample = () => (
  <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
    <Map center={[-97.748, 30.254]} pitch={18} styles={styles} zoom={10.9}>
      <CoverageLayer />
      {coverageZones.map((zone) => (
        <Map.Marker
          key={zone.name}
          latitude={zone.latitude}
          longitude={zone.longitude}
        >
          <Map.MarkerContent>
            <Map.MarkerDot color={zone.color} />
            <Map.MarkerLabel>{zone.volume}</Map.MarkerLabel>
          </Map.MarkerContent>
          <Map.MarkerTooltip>
            <span className="font-medium">{zone.name}</span>
            <span className="text-background/70 ml-1">
              {zone.volume} covered
            </span>
          </Map.MarkerTooltip>
        </Map.Marker>
      ))}
      <Map.Controls>
        <Map.ZoomControl />
        <Map.CompassControl />
      </Map.Controls>
    </Map>
    <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
      <Card.Header>
        <Card.Title className="text-sm">Coverage zones</Card.Title>
        <Card.Description>Austin delivery capacity</Card.Description>
      </Card.Header>
      <Card.Content className="gap-2">
        {coverageZones.map((zone) => (
          <div
            className="flex items-center justify-between text-xs"
            key={zone.name}
          >
            <span className="flex items-center gap-2">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: zone.color }}
              />
              {zone.name}
            </span>
            <span className="text-muted">{zone.volume}</span>
          </div>
        ))}
      </Card.Content>
    </Card>
  </div>
);
