import { ComponentType } from "react";
import { IconBaseProps } from "react-icons";

export interface DashboardCardProps {
  icon: ComponentType<IconBaseProps>;
  title: string;
  value: number;
  progress: number;
  progressColor: string;
}

const AnalyticsCard = ({
  icon: IconComponent,
  title,
  value,
  progress,
  progressColor,
}: DashboardCardProps) => {
  return (
    <div className="font-inter flex flex-col gap-5 flex-1 w-full bg-white shadow-sm rounded-lg p-5">
      <div className="flex items-center space-x-1.5">
        <IconComponent className="text-[#06275A] text-2xl" />
        <h4 className="font-semibold text-lg text-[#06275A] ">{title}</h4>
      </div>
      <div className="flex justify-center">
        <h2 className="font-bold text-[#06275A] text-3xl">
          {value}
        </h2>
      </div>
      <div className="w-full h-3 rounded-full bg-gray-200 mt-3">
        <div
          className={`h-full ${progressColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AnalyticsCard;
