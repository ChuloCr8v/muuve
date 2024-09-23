import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import FileCard from "../../Global/FileCard";
import TableRowData from "../../Global/TableRowData";

interface Props {
  jobData: Array<{ label: string; value: ReactNode | any }>;
}

const JobDetails = ({ jobData }: Props) => {
  const value = (label: string, value: any) => {
    if (label.toLowerCase() === "uploads") {
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {value.map((item: File) => (
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
      <div className="grid grid-cols-2 gap-4">
        {jobData.map((data) => (
          <div
            className={twMerge(
              (data.label.toLowerCase() === "uploads" ||
                data.label.toLowerCase() === "comment" ||
                data.label.toLowerCase() === "service address" ||
                data.label.toLowerCase() === "service description" ||
                data.label.toLowerCase() === "customer email" ||
                data.label.toLowerCase() === "customer name") &&
                "col-span-2",
              (data.label.toLowerCase() === "service description" ||
                data.label.toLowerCase() === "customer email") &&
                "border-b pb-4"
            )}
            key={data.label}
          >
            <TableRowData
              mainText={data.label}
              tagText={value(data.label, data.value)}
              mainTextStyle="text-grey text-sm uppercase leading-loose"
              tagTextStyle="!text-black !text-[13px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobDetails;
