import { ReactNode } from "react";
import TableRowData from "../../global/TableRowData";
import FileCard from "../../global/FileCard";
import { twMerge } from "tailwind-merge";
import { FileInterface } from "../../../types";

interface Props {
  surveyData: Array<{ label: string; value: ReactNode | any }>;
}

const SurveyDetails = ({ surveyData }: Props) => {
  const value = (label: string, value: any) => {
    if (label.toLowerCase() === "uploads") {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {value?.map((item: FileInterface) => (
            <FileCard
              fileType={item.type}
              name={item.name}
              size={item.size}
              key={item.name}
            />
          ))}
        </div>
      );
    } else {
      return value;
    }
  };

  return (
    <div className="mt-2">
      <div className="grid grid-cols-2 gap-2">
        {surveyData.map((data) => (
          <div
            className={twMerge(
              data.label.toLowerCase() === "comment" && "col-span-2"
            )}
            key={data.label}
          >
            <TableRowData
              mainText={data.label}
              tagText={value(data.label, data.value)}
              mainTextStyle="text-sm text-grey uppercase leading-loose"
              tagTextStyle="!text-black !text-[13px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyDetails;
