import { createFileRoute } from "@tanstack/react-router";
import Header from "./-components/header";

export const Route = createFileRoute("/add-user/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Header />
      </div>
    </div>
  );
}
