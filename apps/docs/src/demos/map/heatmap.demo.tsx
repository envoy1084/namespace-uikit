"use client";

// @demo-title Heatmap
import { useEffect } from "react";

import { Map, useMap } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
};

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

const heatmapSourceId = "pickup-heatmap-source";

const heatmapLayerId = "pickup-heatmap-layer";

const demandCenters = [
  { intensity: 1, latitude: 40.758, longitude: -73.9855, name: "Midtown" },
  { intensity: 0.9, latitude: 40.723, longitude: -74, name: "SoHo" },
  {
    intensity: 0.75,
    latitude: 40.7265,
    longitude: -73.9815,
    name: "East Village",
  },
  {
    intensity: 0.7,
    latitude: 40.7081,
    longitude: -73.9571,
    name: "Williamsburg",
  },
  {
    intensity: 0.8,
    latitude: 40.7549,
    longitude: -73.9707,
    name: "Midtown East",
  },
  { intensity: 0.55, latitude: 40.8116, longitude: -73.9465, name: "Harlem" },
];

const seededFraction = (seed: number) => {
  const value = Math.sin(seed) * 10_000;
  return value - Math.floor(value);
};

const heatmapData = {
  features: demandCenters.flatMap((center, centerIndex) =>
    Array.from({ length: 36 }, (_, pointIndex) => {
      const seed = centerIndex * 100 + pointIndex;
      const angle = seededFraction(seed) * Math.PI * 2;
      const distance = seededFraction(seed + 0.5) * 0.016;
      return {
        geometry: {
          coordinates: [
            center.longitude + Math.cos(angle) * distance,
            center.latitude + Math.sin(angle) * distance * 0.75,
          ],
          type: "Point" as const,
        },
        properties: {
          weight: 0.3 + seededFraction(seed + 0.25) * 0.7 * center.intensity,
        },
        type: "Feature" as const,
      };
    }),
  ),
  type: "FeatureCollection" as const,
};

function HeatLayer() {
  const { isLoaded, map } = useMap();
  useEffect(() => {
    if (!isLoaded || !map) return;
    const addLayer = () => {
      if (map.getSource(heatmapSourceId)) return;
      const beforeId = map
        .getStyle()
        .layers?.find((layer) => layer.type === "symbol")?.id;
      map.addSource(heatmapSourceId, { data: heatmapData, type: "geojson" });
      map.addLayer(
        {
          id: heatmapLayerId,
          source: heatmapSourceId,
          type: "heatmap",
          paint: {
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(66, 133, 244, 0)",
              0.25,
              "rgba(66, 133, 244, 0.4)",
              0.5,
              "rgba(34, 197, 94, 0.55)",
              0.75,
              "rgba(249, 115, 22, 0.7)",
              1,
              "rgba(239, 68, 68, 0.85)",
            ],
            "heatmap-intensity": 0.9,
            "heatmap-opacity": 0.8,
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              18,
              14,
              40,
            ],
            "heatmap-weight": ["get", "weight"],
          },
        },
        beforeId,
      );
    };
    if (map.isStyleLoaded()) addLayer();
    else map.once("idle", addLayer);
    return () => {
      map.off("idle", addLayer);
      if (map.getLayer(heatmapLayerId)) map.removeLayer(heatmapLayerId);
      if (map.getSource(heatmapSourceId)) map.removeSource(heatmapSourceId);
    };
  }, [isLoaded, map]);
  return null;
}

export const DemoHeatmapExample = () => (
  <div className="relative h-[420px] w-full overflow-hidden rounded-lg border">
    <Map center={[-73.975, 40.752]} styles={styles} zoom={11.4}>
      <HeatLayer />
      <Map.Controls>
        <Map.ZoomControl />
      </Map.Controls>
    </Map>
    <Card className="bg-overlay shadow-overlay absolute top-3 left-3 z-10 w-[240px] gap-3 p-4">
      <Card.Header>
        <Card.Title className="text-sm">Pickup demand</Card.Title>
        <Card.Description>New York · last hour</Card.Description>
      </Card.Header>
      <Card.Content className="gap-2">
        <div
          className="h-2 w-full rounded-full"
          style={{
            background:
              "linear-gradient(to right, rgba(66, 133, 244, 0.4), rgba(34, 197, 94, 0.55), rgba(249, 115, 22, 0.7), rgba(239, 68, 68, 0.85))",
          }}
        />
        <div className="text-muted flex items-center justify-between text-xs">
          <span>Low</span>
          <span>High</span>
        </div>
      </Card.Content>
    </Card>
  </div>
);
