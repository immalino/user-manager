import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/add-user/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto"></div>
    </div>
  );
}
