import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CgArrowRight } from "react-icons/cg";
import { useState } from "react";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";
import { FaChevronUp } from "react-icons/fa";
import AttachmentCard from "../global/AttachmentCard";
import { FaCircle } from "react-icons/fa6";
import { SurveyLog } from "../../api/types";

type Props = {
  log: SurveyLog;
};

dayjs.extend(relativeTime);

const ProjectLogItem = ({ log: logs }: Props) => {
  const [closedLogs, setClosedLogs] = useState<Array<string>>([]);
  const { action, toStaff, byStaff, comment, attachments, createdAt, id } =
    logs;

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
        return "text-[#379D51]";
      case "reverted":
        return "text-[#F05050]";
      default:
        return "text-[#B9A325]";
    }
  };

  return (
    <div className="w-full project-log">
      <div className="flex items-start w-full border-l gap-x-4">
        <FaCircle
          className={twMerge(
            "-ml-[5px] mt-7 text-xl rounded-full log-icon ",
            color()
          )}
        />
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between pt-6 log-header">
            <p className="font-semibold capitalize">{action}</p>
            <div className="flex items-center gap-4 text-grey">
              <p className="text-sm"> {dayjs().from(createdAt, true)} ago</p>
              <Button
                className="p-1 border rounded w-fit h-fit"
                onClick={toggle}
              >
                <FaChevronUp
                  className={twMerge(closedLogs.includes(id) && "rotate-180")}
                />
              </Button>
            </div>
          </div>

          <p className="flex items-center gap-1 text-grey">
            by{" "}
            <span className="font-medium text-primary">
              {byStaff.staff.name}{" "}
            </span>
            {toStaff && <CgArrowRight />}{" "}
            <span className="font-medium text-primary">
              {toStaff ? toStaff.staff.name : ""}
            </span>
          </p>
          <div
            className={twMerge(
              "space-y-2",
              closedLogs.includes(id) &&
                "h-0 overflow-hidden transition-all duration-300 ease-in-out"
            )}
          >
            <div className="p-3 border rounded">{comment}</div>
            {attachments && (
              <div className="grid grid-cols-2 gap-3">
                {attachments.uploads.map((up) => (
                  <AttachmentCard
                    id={up.id}
                    name={up.name}
                    size={up.size}
                    key={up.key}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLogItem;
