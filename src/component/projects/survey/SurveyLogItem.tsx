import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CgArrowRight } from "react-icons/cg";
import { SurveyLogInterface } from "../../../types";
import AttachmentCard from "../../Global/AttachmentCard";
import { useState } from "react";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";
import { FaChevronUp } from "react-icons/fa";

type Props = {
  data: SurveyLogInterface;
};

dayjs.extend(relativeTime);

const SurveyLogItem = ({ data }: Props) => {
  const [closedLogs, setClosedLogs] = useState<Array<number>>([]);
  const { action, to, by, comment, attachments, createdAt, id } = data;

  const toggle = () => {
    setClosedLogs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((logId) => logId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const color = () => {
    switch (action.toLowerCase()) {
      case "completed":
        return "#379D51";
      case "reverted":
        return "#F05050";
      default:
        return "#B9A325";
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-start gap-x-4">
        <div
          style={{ backgroundColor: color() }}
          className="h-2 w-4 rounded-full"
        ></div>
        <div className="space-y-2 -mt-1.5">
          <div className="flex items-center justify-between">
            <p className="font-semibold capitalize">
              Survey {action}
              {action.toLowerCase() === "assigned" && (
                <span className="lowercase">
                  {" "}
                  to <span className="capitalize"> {to}</span>
                </span>
              )}
            </p>
            <div className="flex items-center gap-4 text-grey">
              <p className="text-sm"> {dayjs().from(createdAt, true)} ago</p>
              <Button
                className="w-fit h-fit p-1 rounded border"
                onClick={toggle}
              >
                <FaChevronUp
                  className={twMerge(closedLogs.includes(id) && "rotate-180")}
                />
              </Button>
            </div>
          </div>

          <p className="flex items-center gap-1 text-grey">
            by <span className="font-medium text-primary">{by} </span>
            <CgArrowRight />{" "}
            <span className="font-medium text-primary">{to}</span>
          </p>
          <div
            className={twMerge(
              "space-y-2",
              closedLogs.includes(id) &&
                "h-0 overflow-hidden transition-all duration-300 ease-in-out"
            )}
          >
            <div className="border rounded p-3">{comment}</div>
            <div className="grid grid-cols-2 gap-3">
              {attachments.map((attachment) => (
                <AttachmentCard
                  name={attachment.name}
                  size={attachment.size}
                  key={attachment.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyLogItem;
