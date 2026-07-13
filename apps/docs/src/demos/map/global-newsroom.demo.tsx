// @ts-nocheck -- Complex demo data intentionally uses heterogeneous shapes.
"use client";

// @demo-title Global Newsroom
import { useMemo, useState } from "react";

import { Map } from "@thenamespace/uikit";
import { Card } from "@thenamespace/uikit/card";

const styles = {
  dark: "/assets/maps/dark-matter.json",
  light: "/assets/maps/voyager.json",
};

const newsroomStories = [
  {
    audience: "2.4m",
    city: "Vancouver",
    country: "Canada",
    desk: "Environment",
    headline: "Coastal cities prepare for a record king tide",
    latitude: 49.2827,
    longitude: -123.1207,
    reporter: "Mira Chen",
    status: "Editing",
    updated: "4 min ago",
  },
  {
    audience: "3.1m",
    city: "Mexico City",
    country: "Mexico",
    desk: "Culture",
    headline: "Night markets turn old rail yards into public stages",
    latitude: 19.4326,
    longitude: -99.1332,
    reporter: "Leo Vargas",
    status: "Filed",
    updated: "11 min ago",
  },
  {
    audience: "5.6m",
    city: "New York",
    country: "United States",
    desk: "Business",
    headline: "Publishers test subscriber bundles for local coverage",
    latitude: 40.7128,
    longitude: -74.006,
    reporter: "Ari Bloom",
    status: "Live",
    updated: "2 min ago",
  },
  {
    audience: "1.9m",
    city: "Bogota",
    country: "Colombia",
    desk: "Policy",
    headline: "Mayors coordinate new transit safety pledges",
    latitude: 4.711,
    longitude: -74.0721,
    reporter: "Sofia Rojas",
    status: "Review",
    updated: "18 min ago",
  },
  {
    audience: "2.7m",
    city: "Sao Paulo",
    country: "Brazil",
    desk: "Markets",
    headline: "Coffee futures climb as exporters hedge rainfall risk",
    latitude: -23.5558,
    longitude: -46.6396,
    reporter: "Nina Costa",
    status: "Editing",
    updated: "7 min ago",
  },
  {
    audience: "4.8m",
    city: "London",
    country: "United Kingdom",
    desk: "Politics",
    headline: "Parliament opens hearings on campaign transparency",
    latitude: 51.5072,
    longitude: -0.1276,
    reporter: "Theo Marsh",
    status: "Live",
    updated: "Now",
  },
  {
    audience: "1.8m",
    city: "Paris",
    country: "France",
    desk: "Culture",
    headline: "Museum nights draw a younger crowd across the city",
    latitude: 48.8566,
    longitude: 2.3522,
    reporter: "Camille Laurent",
    status: "Filed",
    updated: "22 min ago",
  },
  {
    audience: "3.3m",
    city: "Berlin",
    country: "Germany",
    desk: "Technology",
    headline: "Open-source maintainers form a regional funding pact",
    latitude: 52.52,
    longitude: 13.405,
    reporter: "Jonas Weber",
    status: "Review",
    updated: "15 min ago",
  },
  {
    audience: "2.2m",
    city: "Cairo",
    country: "Egypt",
    desk: "Heritage",
    headline: "Restoration teams reopen a long-closed archive wing",
    latitude: 30.0444,
    longitude: 31.2357,
    reporter: "Mona Saleh",
    status: "Editing",
    updated: "9 min ago",
  },
  {
    audience: "2.6m",
    city: "Lagos",
    country: "Nigeria",
    desk: "Business",
    headline: "Fintech founders shift focus toward merchant tools",
    latitude: 6.5244,
    longitude: 3.3792,
    reporter: "Tomi Adeyemi",
    status: "Live",
    updated: "5 min ago",
  },
  {
    audience: "1.5m",
    city: "Nairobi",
    country: "Kenya",
    desk: "Science",
    headline: "Conservation labs publish a new migration forecast",
    latitude: -1.2921,
    longitude: 36.8219,
    reporter: "Iris Kamau",
    status: "Filed",
    updated: "30 min ago",
  },
  {
    audience: "3.8m",
    city: "Dubai",
    country: "United Arab Emirates",
    desk: "Travel",
    headline: "Airlines add capacity ahead of winter conference season",
    latitude: 25.2048,
    longitude: 55.2708,
    reporter: "Rami Haddad",
    status: "Review",
    updated: "13 min ago",
  },
  {
    audience: "4.1m",
    city: "Mumbai",
    country: "India",
    desk: "Film",
    headline: "Streaming studios bet on shorter theatrical windows",
    latitude: 19.076,
    longitude: 72.8777,
    reporter: "Anika Rao",
    status: "Editing",
    updated: "6 min ago",
  },
  {
    audience: "5.2m",
    city: "Singapore",
    country: "Singapore",
    desk: "Finance",
    headline: "Regional exchanges align rules for carbon contracts",
    latitude: 1.3521,
    longitude: 103.8198,
    reporter: "Kai Tan",
    status: "Live",
    updated: "3 min ago",
  },
  {
    audience: "3.6m",
    city: "Seoul",
    country: "South Korea",
    desk: "Technology",
    headline: "Chip suppliers report stronger demand for smart devices",
    latitude: 37.5665,
    longitude: 126.978,
    reporter: "Min Seo",
    status: "Review",
    updated: "17 min ago",
  },
  {
    audience: "4.4m",
    city: "Tokyo",
    country: "Japan",
    desk: "Transport",
    headline: "Rail operators trial crowd forecasting at major stations",
    latitude: 35.6762,
    longitude: 139.6503,
    reporter: "Ren Sato",
    status: "Editing",
    updated: "8 min ago",
  },
  {
    audience: "2.9m",
    city: "Sydney",
    country: "Australia",
    desk: "Sports",
    headline: "Harbor venues release plans for a summer finals week",
    latitude: -33.8688,
    longitude: 151.2093,
    reporter: "Elena Brooks",
    status: "Filed",
    updated: "26 min ago",
  },
  {
    audience: "1.7m",
    city: "Auckland",
    country: "New Zealand",
    desk: "Climate",
    headline: "Island councils compare emergency alert upgrades",
    latitude: -36.8509,
    longitude: 174.7645,
    reporter: "Talia Reed",
    status: "Review",
    updated: "20 min ago",
  },
];

const newsroomData = {
  features: newsroomStories.map(({ latitude, longitude, ...story }) => ({
    geometry: { coordinates: [longitude, latitude], type: "Point" as const },
    properties: { ...story, id: `${story.city}-${story.headline}` },
    type: "Feature" as const,
  })),
  type: "FeatureCollection" as const,
};

const newsroomPointColor = [
  "match",
  ["get", "status"],
  "Live",
  "#22c55e",
  "Editing",
  "#4285f4",
  "Review",
  "#f97316",
  "Filed",
  "#8b5cf6",
  "#4285f4",
];

function GlobalNewsroomDemo() {
  const [selected, setSelected] = useState(
    newsroomData.features[5]!.properties,
  );
  const pointPaint = useMemo(
    () => ({
      "circle-radius": ["case", ["==", ["get", "id"], selected.id], 8, 6],
      "circle-stroke-color": [
        "case",
        ["==", ["get", "id"], selected.id],
        "#111827",
        "#ffffff",
      ],
      "circle-stroke-width": 2,
    }),
    [selected.id],
  );
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <Map
        center={[-58, 13]}
        projection={{ type: "globe" }}
        styles={styles}
        zoom={2.1}
      >
        <Map.ClusterLayer
          clusterColors={["#4285f4", "#8b5cf6", "#f97316"]}
          clusterRadius={58}
          clusterThresholds={[4, 8]}
          data={newsroomData}
          pointColor={newsroomPointColor}
          pointPaint={pointPaint}
          onPointClick={(feature) =>
            setSelected(feature.properties as typeof selected)
          }
        />
      </Map>
      <Card className="bg-overlay shadow-overlay absolute bottom-3 left-1/2 z-10 w-[calc(100%-24px)] max-w-[380px] -translate-x-1/2 gap-3 p-4">
        <Card.Header>
          <Card.Title className="text-sm">{selected.headline}</Card.Title>
          <Card.Description>
            {selected.city}, {selected.country} · {selected.desk}
          </Card.Description>
        </Card.Header>
        <Card.Content className="grid grid-cols-2 gap-3 text-xs">
          <span>
            <strong className="text-foreground block text-base">
              {selected.status}
            </strong>
            Status
          </span>
          <span>
            <strong className="text-foreground block text-base">
              {selected.audience}
            </strong>
            Reach
          </span>
          <span>
            <strong className="text-foreground block text-base">
              {selected.updated}
            </strong>
            Updated
          </span>
          <span>
            <strong className="text-foreground block text-base">
              {selected.reporter}
            </strong>
            Reporter
          </span>
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

export const DemoGlobalNewsroomExample = () => <GlobalNewsroomDemo />;
