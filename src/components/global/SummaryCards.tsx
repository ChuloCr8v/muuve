import { twMerge } from "tailwind-merge";
import SummaryCardIcon from "../../hooks/useSummaryCardIcon";

interface SummaryDataType {
  label: string;
  value: number;
}

type Props = {
  summaryData: SummaryDataType[];
};

const SummaryCards = ({ summaryData }: Props) => {
  // const color = (label: string) => {
  //   switch (label.toLowerCase()) {
  //     case "total":
  //       return "blue";
  //     case "active"  && "assigned":
  //       return "green";
  //     case "deactivated" && "faulty":
  //       return "red";
  //     default:
  //       return "yellow";
  //   }
  // };

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

  const cardCount = summaryData.length;
  return (
    <div
      className={twMerge(
        `grid grid-cols-4 gap-3 w-full grid-cols-${cardCount}`
      )}
    >
      {summaryData.map((item) => (
        <div
          key={item.label}
          className={twMerge(
            `group bg-white border p-2 px-4 flex items-center justify-between w-full rounded-md duration-150`
          )}
        >
          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold">{item.value}</p>
            <p className="text-grey group-hover:text-inherit duration-150 leading-none">
              {item.label}
            </p>
          </div>

          <SummaryCardIcon label={item.label} />
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
