import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  mainText: ReactNode;
  tagText?: ReactNode;
  mainTextStyle?: string;

  tagTextStyle?: string;
};

const TableRowData = ({
  mainText,
  tagText,
  mainTextStyle,
  tagTextStyle,
}: Props) => {
  return (
    <div className="text-left">
      <p
        className={twMerge(
          "text-grey font-semibold text-[13px] capitalize",
          mainTextStyle
        )}
      >
        {mainText}
      </p>
      <p className={twMerge(tagTextStyle, "text-grey text-[11px]")}>
        {tagText}
      </p>
    </div>
  );
};

export default TableRowData;
