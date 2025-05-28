import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="bg-white h-screen flex justify-center items-center">
      <Outlet />
    </main>
  );
}
