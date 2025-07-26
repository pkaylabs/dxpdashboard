import List from "@/components/core/list";
import { createFileRoute } from "@tanstack/react-router";
import AnalyticsCard, {
  DashboardCardProps,
} from "./-components/analytics-card";
import InteractivePerformanceDemo from "./-components/bar-chart";
import WritersDemo from "./-components/pie-chart";
import { TbWorldPin } from "react-icons/tb";
import { HiMiniUsers, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { SiAirplayvideo } from "react-icons/si";
import { useGetWebDashboardDataQuery } from "@/redux/features/dashboard/dashboardApiSlice";

export const Route = createFileRoute("/_app/dashboard")({
  loader: async () => {},
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useGetWebDashboardDataQuery(undefined);

  console.log("data", data);

  const dashboardData: DashboardCardProps[] = [
    {
      icon: TbWorldPin,
      title: "Content Upload",
      value: data?.content_upload,
      progress: 60,
      progressColor: "bg-[#0ECC44]",
    },
    {
      icon: HiOutlineSquare3Stack3D,
      title: "Blog Posts",
      value: data?.blog_posts,
      progress: 85,
      progressColor: "bg-[#FFCC00] ",
    },
    {
      icon: SiAirplayvideo,
      title: "Total Views",
      value: data?.views,
      progress: 75,
      progressColor: "bg-[#FF3B30] ",
    },
    {
      icon: HiMiniUsers,
      title: "Users",
      value: data?.users,
      progress: 45,
      progressColor: "bg-[#AF52DE] ",
    },
  ];

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
