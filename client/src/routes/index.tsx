import { createFileRoute } from "@tanstack/react-router";
import Hero from "./-components/hero";
import Features from "./-components/features";
import Stats from "./-components/stats";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
    </div>
  );
}
