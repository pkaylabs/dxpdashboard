import React, { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ChevronDownIcon } from "../../-components/charts/bar";
import { formatCompactNumber } from "@/utils";

const writersData = [
  {
    id: "tourist-bloggers",
    label: "Tourist Blogs",
    value: 15,
    color: "#B83FD4",
  },
  {
    id: "hotel-bloggers",
    label: "Hotel Blogs",
    value: 30,
    color: "#F4C542",
  },
  {
    id: "travel-bloggers",
    label: "Travel Blogs",
    value: 35,
    color: "#5BA8C7",
  },
  {
    id: "political-writers",
    label: "Political writers",
    value: 20,
    color: "#EF4444",
  },
];

const writersLegend = [
  {
    name: "Tourist Blogs",
    value: 15,
    color: "#B83FD4",
  },
  {
    name: "Hotel Blogs",
    value: 30,
    color: "#F4C542",
  },
  {
    name: "Travel Blogs",
    value: 35,
    color: "#5BA8C7",
  },
  {
    name: "Political writers",
    value: 20,
    color: "#EF4444",
  },
];

interface PieDataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

interface MyResponsivePieProps {
  data: PieDataItem[];
  onSliceClick: (slice: ComputedDatum<PieDataItem>) => void;
}

const MyResponsivePie = ({ data, onSliceClick }: MyResponsivePieProps) => (
  <ResponsivePie
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    startAngle={-90}
    innerRadius={0.7}
    padAngle={0}
    cornerRadius={0}
    activeOuterRadiusOffset={8}
    activeInnerRadiusOffset={8}
    colors={(slice: { data: PieDataItem }) => slice.data.color}
    borderWidth={2}
    borderColor={{
      from: "color",
      modifiers: [["darker", 0.1]],
    }}
    enableArcLinkLabels={false}
    enableArcLabels={false}
    onClick={onSliceClick}
    motionConfig="gentle"
    transitionMode="pushIn"
    animate={true}
    // Custom tooltip
    tooltip={({ datum }) => (
      <div className="bg-white text-[#06275A] p-2 rounded-md shadow-lg">
        <div className="font-semibold text-xs mb-1 text-nowrap ">
          {datum.label}
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-xs"
            style={{ backgroundColor: datum.color }}
          />
          <span className="text-xs">
            {datum.value} writers (
            {(
              (datum.value /
                data.reduce(
                  (sum: number, item: PieDataItem) => sum + item.value,
                  0
                )) *
              100
            ).toFixed(1)}
            %)
          </span>
        </div>
      </div>
    )}
    // Enhanced hover effects
    theme={{
      tooltip: {
        container: {
          background: "transparent",
          border: "none",
          borderRadius: 0,
          boxShadow: "none",
          padding: 0,
        },
      },
    }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.1)",
        size: 3,
        padding: 2,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.1)",
        rotation: -45,
        lineWidth: 4,
        spacing: 8,
      },
    ]}
    fill={[
      {
        match: { id: "tourist-bloggers" },
        id: "dots",
      },
      {
        match: { id: "hotel-bloggers" },
        id: "lines",
      },
    ]}
    legends={[]}
  />
);

interface WritersPieChartProps {
  data?: PieDataItem[];
  title?: string;
  timeFrame?: string;
  timeFrameOptions?: string[];
  onTimeFrameChange?: (timeFrame: string) => void;
  className?: string;
}

import type { ComputedDatum } from "@nivo/pie";

const WritersPieChart: React.FC<WritersPieChartProps> = ({
  data = writersData,
  title = "Blogs by Category",
  timeFrame = "Weekly",
  timeFrameOptions = ["Daily", "Weekly", "Monthly", "Yearly"],
  onTimeFrameChange,
  className = "",
}) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(timeFrame);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleTimeFrameChange = (newTimeFrame: string) => {
    setSelectedTimeFrame(newTimeFrame);
    setIsDropdownOpen(false);
    onTimeFrameChange?.(newTimeFrame);
  };

  const handleSliceClick = (slice: ComputedDatum<PieDataItem>) => {
    setSelectedSlice(selectedSlice === slice.data.id ? null : slice.data.id);
    console.log("Slice clicked:", slice);
  };

  interface WritersLegendItem {
    name: string;
    value: number;
    color: string;
  }

  const handleLegendClick = (item: WritersLegendItem) => {
    setSelectedSlice(
      selectedSlice === item.name.toLowerCase().replace(/\s+/g, "-")
        ? null
        : item.name.toLowerCase().replace(/\s+/g, "-")
    );
  };

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`font-inter bg-white w-full max-w-xs p-5 rounded-xl shadow-sm transition-all duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-[#06275A] ">{title}</h2>

          {/* Summary Stats */}
          {/* <div className="flex items-center gap-3 text-sm">
            <div className="px-3 py-1 bg-primary-50 rounded-full">
              <span className="text-primary-700 font-medium">
                Total: {total}
              </span>
            </div>
          </div> */}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Filter Toggle */}
          {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <FilterIcon className="text-gray-500" />
          </button> */}

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
                className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
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
      <div className="relative">
        {/* Center content overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-1">Total Writers</p>
            <h3 className="text-2xl font-bold text-primary-800">{total}</h3>
          </div>
        </div>

        {/* Nivo Pie Chart */}
        <div className="h-70">
          <MyResponsivePie data={data} onSliceClick={handleSliceClick} />
        </div>
      </div>

      {/* Interactive Legend */}
      <div className="mt-6 space-y-2">
        {writersLegend.map((item, index) => {
          const itemId = item.name.toLowerCase().replace(/\s+/g, "-");
          const isSelected = selectedSlice === itemId;
          const isHovered = hoveredItem === itemId;

          return (
            <div
              key={index}
              className={`flex justify-between items-center p-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                isSelected
                  ? "bg-primary-50 border border-primary-200 shadow-sm"
                  : ""
              } ${isHovered ? "transform scale-[1.02]" : ""}`}
              onClick={() => handleLegendClick(item)}
              onMouseEnter={() => setHoveredItem(itemId)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-sm flex-shrink-0 transition-all duration-200 ${
                    isHovered ? "scale-110 shadow-md" : ""
                  }`}
                  style={{ backgroundColor: item.color }}
                />
                <p
                  className={`font-medium text-sm transition-colors duration-200 ${
                    isSelected ? "text-[#06275A] " : "text-gray-800"
                  }`}
                >
                  {item.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-bold transition-colors duration-200 ${
                    isSelected ? "text-[#06275A]" : "text-gray-800"
                  }`}
                >
                  {formatCompactNumber(item.value)}
                </span>
                <div
                  className={`text-xs p-1 rounded-full transition-all duration-200 ${
                    isSelected ? "bg-[#06275A] text-white" : "text-gray-500"
                  }`}
                >
                  {((item.value / total) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Item Details */}
      {selectedSlice && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#06285a37] to-[#38cda072] rounded-lg border border-gray-200 animate-drop-down">
          {(() => {
            const selectedItem = writersLegend.find(
              (item) =>
                item.name.toLowerCase().replace(/\s+/g, "-") === selectedSlice
            );
            if (!selectedItem) return null;

            const percentage = ((selectedItem.value / total) * 100).toFixed(1);
            const rank =
              writersLegend
                .sort((a, b) => b.value - a.value)
                .findIndex(
                  (item) =>
                    item.name.toLowerCase().replace(/\s+/g, "-") ===
                    selectedSlice
                ) + 1;

            return (
              <div>
                <h3 className="font-semibold text-[#031d44] mb-3">
                  {selectedItem.name} Analytics
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 block mb-1">Writers</span>
                    <div className="font-bold text-2xl text-primary-700">
                      {selectedItem.value}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 block mb-1">Share</span>
                    <div className="font-bold text-2xl text-secondary-700">
                      {percentage}%
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 block mb-1">Rank</span>
                    <div className="font-bold text-2xl text-gray-700">
                      #{rank}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <span className="text-gray-600 block mb-1">Status</span>
                    <div
                      className={`font-bold text-lg ${
                        selectedItem.value >= 25
                          ? "text-[#10B981]"
                          : selectedItem.value >= 15
                            ? "text-[#F59E0B]"
                            : "text-[#EF4444]"
                      }`}
                    >
                      {selectedItem.value >= 25
                        ? "High"
                        : selectedItem.value >= 15
                          ? "Medium"
                          : "Low"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes drop-down {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-drop-down {
          animation: drop-down 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const WritersDemo: React.FC = () => {
  const [currentData, setCurrentData] = useState(writersData);

  const weeklyData = [
    {
      id: "tourist-bloggers",
      label: "Tourist Blogs",
      value: 15,
      color: "#B83FD4",
    },
    {
      id: "hotel-bloggers",
      label: "Hotel Blogs",
      value: 30,
      color: "#F4C542",
    },
    {
      id: "travel-bloggers",
      label: "Travel Blogs",
      value: 35,
      color: "#5BA8C7",
    },
    {
      id: "political-writers",
      label: "Political writers",
      value: 20,
      color: "#EF4444",
    },
  ];

  const monthlyData = [
    {
      id: "tourist-bloggers",
      label: "Tourist Blogs",
      value: 125,
      color: "#B83FD4",
    },
    {
      id: "hotel-bloggers",
      label: "Hotel Blogs",
      value: 240,
      color: "#F4C542",
    },
    {
      id: "travel-bloggers",
      label: "Travel Blogs",
      value: 285,
      color: "#5BA8C7",
    },
    {
      id: "political-writers",
      label: "Political writers",
      value: 150,
      color: "#EF4444",
    },
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
    console.log("Time frame changed to:", timeFrame);
  };

  return (
    <WritersPieChart
      data={currentData}
      onTimeFrameChange={handleTimeFrameChange}
    />
  );
};

export default WritersDemo;
