import { createFileRoute } from "@tanstack/react-router";

import {
  HomeFooter,
  HomeHero,
  PackageExportStrip,
  RegistrationShowcase,
  ToolkitOverview,
} from "@/components/home";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f4f4] font-sans text-[#1f1f1f]">
      <HomeHero />
      <ToolkitOverview />
      <PackageExportStrip />
      <RegistrationShowcase />
      <HomeFooter />
    </div>
  );
}
