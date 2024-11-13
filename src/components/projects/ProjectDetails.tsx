import { ReactNode } from "react";
import TableRowData from "../global/TableRowData";
import FileCard from "../global/FileCard";
import { twMerge } from "tailwind-merge";
import { FileInterface } from "../../types";

interface Props {
  data: Array<{ label: string; value: ReactNode | any }>;
}

const ProjectDetails = ({ data }: Props) => {
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
        {data.map((d) => (
          <div
            className={twMerge(
              (d.label.toLowerCase() === "comment" ||
                d.label.toLowerCase() === "attachments") &&
                "col-span-2"
            )}
            key={d.label}
          >
            <TableRowData
              mainText={d.label}
              tagText={value(d.label, d.value)}
              mainTextStyle="text-sm text-grey uppercase leading-loose"
              tagTextStyle="!text-black !text-[13px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
