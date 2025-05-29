import List from "@/components/core/list";
import { dashboardData } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";
import AnalyticsCard from "./-components/analytics-card";
import InteractivePerformanceDemo from "./-components/bar-chart";
import WritersDemo from "./-components/pie-chart";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <div className="flex gap-3">
        <List data={dashboardData} renderItem={AnalyticsCard} />
      </div>

      <section className="flex flex-wrap gap-4 mt-5">
        <InteractivePerformanceDemo />
        <WritersDemo />
      </section>
    </main>
  );
}
