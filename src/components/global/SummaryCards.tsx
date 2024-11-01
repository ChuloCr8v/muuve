import { twMerge } from "tailwind-merge";

export interface SummaryDataType {
  label: string;
  value: number;
  iconColor: string;
  iconBg: string;
  background: string;
  icon: React.ReactNode;
}

type Props = {
  summaryData: SummaryDataType[];
};

const SummaryCards = ({ summaryData }: Props) => {
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
            `group bg-white border p-2 px-4 flex items-center justify-between w-full rounded-md duration-150`,
            item.background ? `bg-[${item.background}]` : "bg-[#F2F9FC]"
          )}
        >
          <div className="flex flex-col items-start gap-1">
            <p className="font-semibold">{item.value}</p>
            <p className="leading-none duration-150 text-grey group-hover:text-inherit">
              {item.label}
            </p>
          </div>

          <div
            style={{ color: item.iconColor, background: item.iconBg }}
            className="flex items-center p-2 rounded-full"
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
