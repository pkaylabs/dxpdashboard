import React, { useState, useEffect, useRef } from "react";
import { ViewByDay } from "../../dashboard/-components/bar-chart";

// Chevron Down Icon for dropdown
export const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

// Filter Icon
export const FilterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46" />
  </svg>
);

// Trend Up Icon
const TrendUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

export interface PerformanceData {
  day: string;
  value: number;
  target?: number;
  previous?: number;
}

export interface PerformanceChartProps {
  data: ViewByDay[];
  title?: string;
  timeFrame?: string;
  timeFrameOptions?: string[];
  onTimeFrameChange?: (timeFrame: string) => void;
  onBarClick?: (data: ViewByDay, index: number) => void;
  className?: string;
  yAxisLabels?: string[]; // e.g. ["0%", "20%", "40%", "60%", "80%", "100%"]
  showTargets?: boolean;
  showComparison?: boolean;
  animated?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title = "Performance",
  timeFrame = "Weekly",
  timeFrameOptions = ["Daily", "Weekly", "Monthly", "Yearly"],
  onTimeFrameChange,
  onBarClick,
  className = "",
  yAxisLabels,
  showTargets = true,
  // showComparison = true,
  animated = true,
}) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrame);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBar, setSelectedBar] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatedHeights, setAnimatedHeights] = useState<number[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  const maxValue = Math.max(...data.map((item) => item.views));

  // const yAxisLabels = ["0%", "20%", "40%", "60%", "80%", "100%"];

  // Animation effect
  useEffect(() => {
    if (animated) {
      setIsAnimating(true);
      setAnimatedHeights(data.map(() => 0));

      const timer = setTimeout(() => {
        setAnimatedHeights(data.map((item) => item.views));
        setIsAnimating(false);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      setAnimatedHeights(data.map((item) => item.views));
    }
  }, [data, animated]);

  const handleTimeFrameChange = (newTimeFrame: string) => {
    setSelectedTimeFrame(newTimeFrame);
    setIsDropdownOpen(false);
    setSelectedBar(null);
    onTimeFrameChange?.(newTimeFrame);
  };

  const handleBarClick = (item: ViewByDay, index: number) => {
    setSelectedBar(selectedBar === index ? null : index);
    onBarClick?.(item, index);
  };

  const getBarColor = (index: number, value: number, target?: number) => {
    if (selectedBar === index) return "bg-[#06275A] shadow-lg";
    if (hoveredBar === index) return "bg-[#06275A]";
    if (target && value >= target) return "bg-[#06275A]";
    if (target && value < target * 0.8) return "bg-[#06275A]";
    return "bg-[#06275A]";
  };

  // interface GetBarHeightParams {
  //   value: number;
  //   i: number;
  // }

  // const getBarHeight = (value: number, i: number): number =>
  //   ((animated ? animatedHeights[i] : value) / maxValue) * 320;
  const getBarHeight = (value: number, i: number) => (value / maxValue) * 320;

  // Calculate performance metrics
  // const totalPerformance =
  //   data.reduce((sum, item) => sum + item.views, 0) / data.length;
  // const previousTotal =
  //   showComparison && data.every((item) => item.previous)
  //     ? data.reduce((sum, item) => sum + (item.previous || 0), 0) / data.length
  //     : 0;
  // const performanceChange = previousTotal
  //   ? ((totalPerformance - previousTotal) / previousTotal) * 100
  //   : 0;

  return (
    <div
      className={`bg-white w-full p-4 rounded-xl shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-[#06275A] ">{title}</h2>

          {/* Performance Summary */}
          <div className="flex items-center gap-3 text-sm">
            {/* <div className="px-3 py-1 bg-primary-50 rounded-full">
              <span className="text-[#06275A] font-medium">
                Avg: {totalPerformance.toFixed(1)}%
              </span>
            </div> */}

            {/* {showComparison && previousTotal > 0 && (
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  performanceChange >= 0
                    ? "bg-success/10 text-success"
                    : "bg-error/10 text-error"
                }`}
              >
                <TrendUpIcon
                  className={`w-3 h-3 text-[#06275A] ${performanceChange < 0 ? "rotate-180" : ""}`}
                />
                <span className="font-medium text-[#06275A]">
                  {Math.abs(performanceChange).toFixed(1)}%
                </span>
              </div>
            )} */}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Filter Toggle */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <FilterIcon className="text-gray-500" />
          </button>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-[#06275A] text-primary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:bg-white"
            >
              <span className="text-sm text-[#06275A] font-medium">
                {selectedTimeFrame}
              </span>
              <ChevronDownIcon
                className={`transition-transform text-[#06275A] duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-[140px] animate-drop-down">
                {timeFrameOptions.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => handleTimeFrameChange(option)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                      index === 0 ? "rounded-t-xl" : ""
                    } ${
                      index === timeFrameOptions.length - 1
                        ? "rounded-b-xl"
                        : ""
                    } ${
                      selectedTimeFrame === option
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-gray-700"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative" ref={chartRef}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-100 flex flex-col justify-between text-right pr-4 text-sm text-[#06275A] font-medium">
          {(yAxisLabels ?? ["0", "20", "40", "60", "80", "100"])
            .slice()
            .reverse()
            .map((label, index) => (
              <div
                key={index}
                className="flex items-center h-0 transition-all duration-300"
              >
                <span className="hover:text-primary-800 cursor-default">
                  {label}
                </span>
              </div>
            ))}
        </div>

        {/* Chart area */}
        <div className="ml-16">
          {/* Horizontal grid lines */}
          <div className="relative h-[320px] border-l-2 border-b-2 border-gray-200">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="absolute w-full border-t border-gray-100 transition-colors duration-300 hover:border-gray-200"
                style={{ bottom: `${index * 20}%` }}
              />
            ))}

            {/* Target lines (if enabled) */}
            {showTargets &&
              data.map(
                (item, index) =>
                  item.target && (
                    <div
                      key={`target-${index}`}
                      className="absolute border-t-2 border-dashed border-secondary opacity-60 transition-opacity duration-300"
                      style={{
                        bottom: `${(item.target / 100) * 320}px`,
                        left: `${index * (100 / data.length) + 15 / data.length}%`,
                        width: `${100 / data.length - 4}%`,
                      }}
                    />
                  )
              )}

            {/* Bars Container */}
            <div className="absolute bottom-0  left-0 w-full h-full flex items-end justify-between px-2">
              {data.map((item, index) => (
                <div
                  key={item.day}
                  className="flex flex-col items-center flex-1 mx-1"
                >
                  {/* Bar Container */}
                  <div className="relative w-full max-w-8 group cursor-pointer">
                    {/* Previous period bar (comparison) */}
                    {/* {showComparison && item.previous && (
                      <div
                        className="absolute w-full bg-gray-300 rounded-t-md opacity-40 transition-all duration-300"
                        style={{
                          height: `${(item.previous / 100) * 320}px`,
                          right: "2px",
                        }}
                      />
                    )} */}

                    {/* Main Bar */}
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ease-out cursor-pointer transform hover:scale-105 active:scale-95 ${getBarColor(index, item.views, item.target)}`}
                      style={{
                        // height: `${getBarHeight(item.views, index)}px`,
                        height:`${getBarHeight(item.views, index)}px`,
                        // minHeight: animatedHeights[index] > 0 ? "4px" : "0px",
                        boxShadow:
                          selectedBar === index
                            ? "0 8px 25px rgba(6, 39, 90, 0.3)"
                            : "none",
                      }}
                      onClick={() => handleBarClick(item, index)}
                      onMouseEnter={() => setHoveredBar(index)}
                      onMouseLeave={() => setHoveredBar(null)}
                    />

                    {/* Interactive Tooltip */}
                    <div
                      className={`absolute z-20 bg-white bottom-full border border-gray-200 rounded-lg left-1/2 transform -translate-x-1/2 mb-3 transition-all duration-300 ${
                        hoveredBar === index || selectedBar === index
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2"
                      }`}
                    >
                      <div className="bg-primary-900 text-[#06275A] text-xs px-3 py-2 whitespace-nowrap shadow-lg">
                        <div className="font-semibold">{item.day}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span>Views: {item.views}</span>
                          {item.percentage && (
                            <span className="text-secondary-200">
                              Percentage: {Math.round(item.percentage)}%
                            </span>
                          )}
                        </div>
                        {/* {showComparison && item.previous && (
                          <div className="text-gray-300 text-xs mt-1">
                            Previous: {item.previous}%
                            <span
                              className={`ml-1 ${item.value >= item.previous ? "text-success" : "text-error"}`}
                            >
                              ({item.value >= item.previous ? "+" : ""}
                              {(item.value - item.previous).toFixed(1)}%)
                            </span>
                          </div>
                        )} */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-t-4 border-t-[#06275A] border-l-4 border-l-transparent border-r-4 border-r-transparent" />
                      </div>
                    </div>

                    {/* Selection Indicator */}
                    {selectedBar === index && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#0ECC44] rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex items-center justify-between px-2 mt-6">
            {data.map((item, index) => (
              <div key={item.day} className="flex-1 mx-1 text-center">
                <button
                  className={`text-sm font-medium transition-all duration-200 hover:text-[#06275A] cursor-pointer px-2 py-1 rounded ${
                    selectedBar === index
                      ? "text-[#06275A] bg-[#06285a1e]"
                      : "text-gray-500"
                  }`}
                  onClick={() => handleBarClick(item, index)}
                >
                  {item.day}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Bar Details */}
      {selectedBar !== null ? (
        <div className="mt-6 p-4 py-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-[#06275A] animate-drop-down">
          <h3 className="font-semibold text-[#06275A] mb-2">
            {data[selectedBar].day} Performance Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Views</span>
              <div className="font-bold text-[#06275A]">
                {data[selectedBar].views}
              </div>
            </div>
            {data[selectedBar].percentage && (
              <div>
                <span className="text-gray-600">Percentage</span>
                <div className="font-bold text-[#06275A]">
                  {Math.round(data[selectedBar].percentage)}%
                </div>
              </div>
            )}
            {/* {showComparison && data[selectedBar].previous && (
              <div>
                <span className="text-gray-600">Previous</span>
                <div className="font-bold text-[#06275A]">
                  {data[selectedBar].previous}%
                </div>
              </div>
            )} */}
            <div>
              <span className="text-gray-600">Status</span>
              <div
                className={`font-bold ${
                  data[selectedBar].target &&
                  data[selectedBar].views >= data[selectedBar].target!
                    ? "text-[#0ECC44]"
                    : "text-[#FF3B30]"
                }`}
              >
                {data[selectedBar].target &&
                data[selectedBar].views >= data[selectedBar].target!
                  ? data[selectedBar].status || "On Target"
                  : data[selectedBar].status || "Below Target"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 p-4 py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-[#06275A] flex justify-center items-center animate-drop-down">
          <h4 className="text-[#06275A] ">
            Select a bar to view performance detail
          </h4>
        </div>
      )}

      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};
