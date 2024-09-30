import { Tag } from "antd";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SummaryDataType {
  label: string;
  value: number;
  icon: ReactNode;
}

type Props = {
  summaryData: SummaryDataType[];
};

const SummaryCards = ({ summaryData }: Props) => {
  const color = (label: string) => {
    switch (label.toLowerCase()) {
      case "total":
        return "blue";
      case "active"  && "assigned":
        return "green";
      case "deactivated" && "faulty":
        return "red";
      default:
        return "yellow";
    }
  };

  // const bgColor = (label: string) => {
  //   switch (label.toLowerCase()) {
  //     case "total":
  //       return "hover:bg-blue-100 hover:border-blue-300 hover:text-blue-600";
  //     case "active":
  //       return "hover:bg-green-100 hover:border-green-300 hover:text-green-600";
  //     case "deactivated":
  //       return "hover:bg-red-100 hover:border-red-300 hover:text-red-600";
  //     default:
  //       return "hover:bg-yellow-100 hover:border-yellow-300 hover:text-yellow-600";
  //   }
  // };

  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {summaryData.map((item) => (
        <div
          className={twMerge(
            `group bg-white border !bg-opacity-20 p-2 px-4 flex items-center justify-between w-full rounded-md duration-150`
            // bgColor(item.label)
          )}
        >
          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold">{item.value}</p>
            <p className="text-grey group-hover:text-inherit duration-150 leading-none">
              {item.label}
            </p>
          </div>
          <Tag
            color={color(item.label)}
            className="h-10 w-10 rounded-full flex items-center justify-center border-none"
          >
            {item.icon}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
