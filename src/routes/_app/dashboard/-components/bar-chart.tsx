import { useState } from "react";
import {
  defaultData,
  PerformanceChart,
  PerformanceData,
} from "../../-components/charts/bar";

const InteractivePerformanceDemo: React.FC = () => {
  const [currentData, setCurrentData] = useState(defaultData);

  const weeklyData = [
    { day: "Monday", value: 65, target: 70, previous: 58 },
    { day: "Tuesday", value: 45, target: 60, previous: 52 },
    { day: "Wednesday", value: 100, target: 85, previous: 88 },
    { day: "Thursday", value: 80, target: 75, previous: 72 },
    { day: "Friday", value: 55, target: 65, previous: 48 },
    { day: "Saturday", value: 80, target: 70, previous: 75 },
    { day: "Sunday", value: 28, target: 40, previous: 35 },
  ];

  const monthlyData = [
    { day: "Jan", value: 75, target: 80, previous: 68 },
    { day: "Feb", value: 85, target: 80, previous: 78 },
    { day: "Mar", value: 65, target: 75, previous: 72 },
    { day: "Apr", value: 90, target: 85, previous: 82 },
    { day: "May", value: 70, target: 75, previous: 65 },
    { day: "Jun", value: 95, target: 85, previous: 88 },
    { day: "Jul", value: 60, target: 70, previous: 55 },
  ];

  const handleTimeFrameChange = (timeFrame: string) => {
    switch (timeFrame) {
      case "Weekly":
        setCurrentData(weeklyData);
        break;
      case "Monthly":
        setCurrentData(monthlyData);
        break;
      default:
        setCurrentData(weeklyData);
    }
  };

  const handleBarClick = (data: PerformanceData, index: number) => {
    console.log("Bar clicked:", data, index);
  };
  return (
    <div className="flex-1">
      <PerformanceChart
        data={currentData}
        onTimeFrameChange={handleTimeFrameChange}
        onBarClick={handleBarClick}
        showTargets={true}
        showComparison={true}
        animated={true}
      />
    </div>
  );
};

export default InteractivePerformanceDemo;
