import { Tag } from "antd";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  summaryData: {
    label: string;
    value: number;
    icon: ReactNode;
  }[];
};

const SummaryCards = ({ summaryData }: Props) => {
  const color = (label: string) => {
    switch (label.toLowerCase()) {
      case "total":
        return "blue";
      case "active":
        return "green";
      case "deactivated":
        return "red";
      default:
        return "yellow";
    }
  };

  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {summaryData.map((item) => (
        <div
          className={twMerge(
            `bg-white border hover:border-${color(
              item.label
            )}-600 px-4 py-1 flex items-center justify-between w-full rounded-md cursor-pointer`
          )}
        >
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">{item.value}</p>
            <p className="text-grey text-[13px]">{item.label}</p>
          </div>
          <Tag
            color={color(item.label)}
            className="h-8 w-8 rounded-full text-lg flex items-center justify-center"
          >
            {item.icon}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
