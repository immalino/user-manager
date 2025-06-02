import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
      <ReactQueryDevtools buttonPosition="bottom-right" />
      <TanStackRouterDevtools />
    </div>
  ),
});
