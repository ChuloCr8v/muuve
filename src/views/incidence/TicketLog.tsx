import { Button } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";
import { FaChevronUp } from "react-icons/fa";
import { FaCircle } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { TicketsHistoryDataType } from "../../types";
import AttachmentCard from "../../components/global/AttachmentCard";

type Props = {
  data: TicketsHistoryDataType;
};

dayjs.extend(relativeTime);

const TicketLogItem = ({ data }: Props) => {
  const [closedLogs, setClosedLogs] = useState<Array<number>>([]);
  const { action, assignee, by, description, attachments, date, id } = data;

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
      case "resolved ticket":
        return "text-[#379D51]";
      default:
        return "text-[#0A95CC]";
    }
  };

  return (
    <div className="w-full ticket-log">
      <div className="border-l flex w-full items-start gap-x-4">
        <FaCircle
          className={twMerge(
            "-ml-[7px] mt-8 text-sm rounded-full ticket-log-icon",
            color()
          )}
        />
        <div className="space-y-2 w-full text-sm">
          <div className="flex items-center justify-between pt-6 log-header">
            <p className="capitalize">{action}</p>
            <div className="flex items-center gap-4 text-grey">
              <p className="text-sm"> {dayjs().from(date, true)} ago</p>
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

          <p className="flex items-center gap-1 text-grey leading-none">
            by <span className="capitalize text-primary">{by}</span>
            {action.toLowerCase() === "assigned ticket" && (
              <>
                <CgArrowRight />
                <span className="font-medium text-primary">{assignee}</span>
              </>
            )}
          </p>

          <div
            className={twMerge(
              "space-y-2",
              closedLogs.includes(id) &&
                "h-0 overflow-hidden transition-all duration-300 ease-in-out"
            )}
          >
            {description ? (
              <div className="border rounded p-3">{description}</div>
            ) : (
              ""
            )}
            <div className="grid grid-cols-2 gap-3">
              {attachments.map((attachment) => (
                <AttachmentCard
                  name={attachment.name}
                  size={attachment.size}
                  key={attachment.name}
                  id={""}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketLogItem;
