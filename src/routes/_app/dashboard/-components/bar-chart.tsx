import React, { useState, useEffect } from "react";
import {
  PerformanceChart,
  PerformanceData,
} from "../../-components/charts/bar";
import { useGetWebDashboardDataQuery } from "@/redux/features/dashboard/dashboardApiSlice";

export interface ViewByDay {
  day: string;
  percentage: number;
  status: string;
  views: number;
  target?: number; // Optional target value for comparison
}

interface DashboardPayload {
  views_by_day: ViewByDay[];
  min_max_views: { min_views: number; max_views: number };
  yaxis_labels: number[];
}

export interface PerformanceChartProps {
  data: PerformanceData[]; // our bars
  title?: string;
  timeFrame: string; // “Weekly”, etc.
  timeFrameOptions: string[];
  onTimeFrameChange: (f: string) => void;
  onBarClick: (d: ViewByDay, i: number) => void;
  yAxisLabels: string[]; // e.g. ["0","1","2"]
  showTargets?: boolean;
  showComparison?: boolean;
  animated?: boolean;
}

const DEFAULT_Y_LABELS = ["0%", "20%", "40%", "60%", "80%", "100%"];
const TIME_FRAMES = ["Daily"];

const InteractivePerformanceDemo: React.FC = () => {
  const { data } = useGetWebDashboardDataQuery(undefined);
  const raw = data as DashboardPayload | undefined;

  const [chartData, setChartData] = useState<ViewByDay[]>([]);
  const [yLabels, setYLabels] = useState<string[]>(DEFAULT_Y_LABELS);
  const [timeFrame, setTimeFrame] = useState<string>(TIME_FRAMES[0]);

  useEffect(() => {
    if (raw) {
      setChartData(
        raw.views_by_day.map((d) => ({
          day: d.day,
          percentage: d.percentage,
          status: d.status,
          views: d.views,
          target: raw.min_max_views.max_views,
        }))
      );
      setYLabels(raw.yaxis_labels.map((n) => `${n}`));
    } else {
      setChartData([]);
      setYLabels(DEFAULT_Y_LABELS);
    }
  }, [raw, timeFrame]);

  const handleTimeFrameChange = (newFrame: string) => {
    // setTimeFrame(newFrame);
    console.log("Time frame switched to", newFrame);
  };

  const handleBarClick = (item: ViewByDay, idx: number) => {
    console.log("Bar clicked:", item, idx);
  };

  return (
    <div className="flex-1">
      <PerformanceChart
        data={chartData}
        title="User Views Performance"
        timeFrame={timeFrame}
        timeFrameOptions={TIME_FRAMES}
        onTimeFrameChange={handleTimeFrameChange}
        onBarClick={handleBarClick}
        showTargets
        showComparison
        animated
        yAxisLabels={yLabels}
        className="h-full"
      />
    </div>
  );
};

export default InteractivePerformanceDemo;
