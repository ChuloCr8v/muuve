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
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {summaryData.map((item) => (
        <div
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
